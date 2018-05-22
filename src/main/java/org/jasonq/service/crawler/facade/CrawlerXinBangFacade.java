package org.jasonq.service.crawler.facade;

import com.google.common.collect.Lists;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.domain.util.BeanCopyUtil;
import org.jasonq.common.domain.vo.Response;
import org.jasonq.common.util.StringUtil;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.common.util.collection.MapUtil;
import org.jasonq.domain.crawler.api.dto.CompanyDto;
import org.jasonq.domain.crawler.api.dto.WxPublicDto;
import org.jasonq.domain.crawler.api.facade.ICrawlerFacade;
import org.jasonq.service.crawler.api.dto.QiChaChaDto;
import org.jasonq.service.crawler.api.dto.XinBangGzhDto;
import org.jasonq.service.crawler.api.facade.ICrawlerXinBangFacade;
import org.jasonq.service.crawler.core.po.CompanyPo;
import org.jasonq.service.crawler.core.po.WxPublicPo;
import org.jasonq.service.crawler.core.service.CompanyService;
import org.jasonq.service.crawler.core.service.WxPublicService;
import org.jasonq.service.crawler.task.CrawlerCompanyTask;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Objects;


/**
 * 组装数据，通过调用多个service，facade来完成一个完整的业务功能 返回DTO
 *
 * @author jq
 */
@Service
public class CrawlerXinBangFacade implements ICrawlerXinBangFacade {

    private Logger logger = LogManager.getLogger(CrawlerXinBangFacade.class);

    @Resource
    private CompanyService companyService;
    @Resource
    private WxPublicService wxPublicService;
    @Resource
    private CrawlerCompanyTask crawlerCompanyTask;
    @Resource
    private ICrawlerFacade crawlerFacade;

    String XB_SEARCH_URL =
            "https://www.newrank.cn/xdnphb/data/weixinuser/searchWeixinDataByCondition?hasDeal=false&keyName=%s&filter=%s&order=%s"
                    + "&nonce=%s&xyz=%s";

    /**
     * 根据公众号微信号，企业名称绑定数据库数据
     */
    @Override
    synchronized public List<XinBangGzhDto> search(String key, String nonce, String xyz, String order,
                                                   String filter) throws Exception {
        List<WxPublicDto> wxPublicDtos = crawlerFacade
                .searchGzhFromXinBang(String.format(XB_SEARCH_URL, key, filter, order, nonce, xyz));
        List<WxPublicPo> wxPublicPos = BeanCopyUtil.toList(wxPublicDtos, WxPublicPo.class);
        if (CollectionUtil.isEmpty(wxPublicPos)) {
            return Lists.newArrayList();
        }
        // 绑定数据库记录，绑定了的有id
        // 有id的，更新热度，阅读量；没id的插数据库
        List<WxPublicPo> dbWxPublicPos =
                wxPublicService.listByWxNos(CollectionUtil.getColumnValues(wxPublicPos, "wxNo"));
        Map<Object, WxPublicPo> wxNoMap = MapUtil.toMap(dbWxPublicPos, "wxNo");
        List<WxPublicPo> needAdds = Lists.newArrayList();
        for (WxPublicPo wxPublicPo : wxPublicPos) {
            WxPublicPo dbPublicPo = wxNoMap.get(wxPublicPo.getWxNo());
            if (dbPublicPo != null) {
                wxPublicPo.setId(dbPublicPo.getId());
                wxPublicPo.setIsCall(dbPublicPo.getIsCall());
                wxPublicPo.setIsCooperate(dbPublicPo.getIsCooperate());
                // 如果需要更新
                if (!Objects.equals(wxPublicPo.getHotNum(), dbPublicPo.getHotNum())) {
                    WxPublicPo needUpdate = new WxPublicPo();
                    needUpdate.setId(wxPublicPo.getId());
                    needUpdate.setHotNum(wxPublicPo.getHotNum());
                    needUpdate.setAvgReadAll(wxPublicPo.getAvgReadAll());
                    wxPublicService.updateById(needUpdate);
                }
            } else {
                needAdds.add(wxPublicPo);
            }
        }
        wxPublicService.addBatch(needAdds);

        // 数据库中的企业信息数据
        List<String> certifiedCompanyList = CollectionUtil.getColumnValues(wxPublicPos, "certifiedCompany");
        List<CompanyPo> companyPos = companyService.listByNames(certifiedCompanyList);
        Map<String, CompanyPo> dbCompanyNameMap = MapUtil.toMap(companyPos, "companyName");
        for (WxPublicPo wxPublicPo : wxPublicPos) {
            CompanyPo companyPo = dbCompanyNameMap.get(wxPublicPo.getCertifiedCompany());
            if (companyPo != null) {
                wxPublicPo.setCompanyPo(companyPo);
            }
        }
        // 前10条企业信息，如果数据库里没有，就实时爬
        for (int i = 0; i < wxPublicPos.size() && i < 10; i++) {
            WxPublicPo wxPublicPo = wxPublicPos.get(i);
            if (wxPublicPo.getCompanyPo().getId() == null) {
                CompanyPo companyPo =
                        crawlerCompanyInfo(wxPublicPo.getCertifiedCompany());
                if (companyPo != null) {
                    wxPublicPo.setCompanyPo(companyPo);
                }
            }
        }
        // 后面的离线搜
        addAsyncSearchQueue(wxPublicPos);

        // 只显示400以上热度的
        return filterUnHot(wxPublicPos);
    }

    public CompanyPo crawlerCompanyInfo(String searchCompanyName) {
        if (StringUtil.isEmpty(searchCompanyName)) {
            return null;
        }
        CompanyPo dbCompanyPo = companyService.selectByName(searchCompanyName);
        if (dbCompanyPo != null) {
            return dbCompanyPo;
        }

        WxPublicPo wxPublicPo = wxPublicService.selectByCertifiedCompany(searchCompanyName);
        if (wxPublicPo != null && Objects.equals(wxPublicPo.getCompanyId(), -1L)) {
            return null;
        }

        Response<CompanyDto> companyDtoResponse = crawlerFacade.searchCompanyFromQicChaCha(searchCompanyName);
        CompanyPo companyPo = null;

        if (companyDtoResponse.isSuccess()) {
            companyPo = BeanCopyUtil.to(companyDtoResponse.getData(), CompanyPo.class);
            List<WxPublicPo> wxPublicPos =
                    wxPublicService.listByCertifiedCompanys(Lists.newArrayList(searchCompanyName));
            if (companyPo != null) {
                companyService.add(companyPo);
                for (WxPublicPo publicPo : wxPublicPos) {
                    if (publicPo.getCompanyId() == null) {
                        WxPublicPo needUpdate = new WxPublicPo();
                        needUpdate.setId(publicPo.getId());
                        needUpdate.setCompanyId(companyPo.getId());
                        wxPublicService.updateById(needUpdate);
                    }
                }
            } else {
                for (WxPublicPo publicPo : wxPublicPos) {
                    if (publicPo.getCompanyId() == null) {
                        WxPublicPo needUpdate = new WxPublicPo();
                        needUpdate.setId(publicPo.getId());
                        needUpdate.setCompanyId(-1L);
                        wxPublicService.updateById(needUpdate);
                    }
                }
            }
        }
        return companyPo;
    }

    private List<XinBangGzhDto> filterUnHot(List<WxPublicPo> wxPublicPos) {
        List<XinBangGzhDto> resultList = Lists.newArrayList();
        for (WxPublicPo wxPublicPo : wxPublicPos) {
            if (wxPublicPo.getHotNum() != null && wxPublicPo.getHotNum() >= 400) {
                XinBangGzhDto xinBangGzhDto = BeanCopyUtil.to(wxPublicPo, XinBangGzhDto.class);
                xinBangGzhDto.setQiChaChaDto(BeanCopyUtil.to(wxPublicPo.getCompanyPo(), QiChaChaDto.class));
                resultList.add(xinBangGzhDto);
            }
        }
        return resultList;
    }

    private void addAsyncSearchQueue(List<WxPublicPo> wxPublicPos) {
        for (int i = 10; i < wxPublicPos.size(); i++) {
            crawlerCompanyTask.addAsyncSearchQueue(wxPublicPos.get(i).getCertifiedCompany());
        }
    }

    @Override
    public int updateById(XinBangGzhDto entity) {
        return wxPublicService.updateById(BeanCopyUtil.to(entity, WxPublicPo.class));
    }
}
