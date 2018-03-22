package org.jasonq.service.crawler.facade;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.common.util.collection.MapUtil;
import org.jasonq.service.crawler.core.service.CompanyService;
import org.jasonq.service.crawler.core.service.CrawlerXinBangService;
import org.jasonq.service.crawler.dto.QiChaChaDto;
import org.jasonq.service.crawler.dto.XinBangGzhDto;
import org.jasonq.service.crawler.task.CrawlerCompanyTask;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;


/**
 * 组装数据，通过调用多个service，facade来完成一个完整的业务功能 返回DTO
 * 
 * @author jq
 *
 */
@Service
public class CrawlerXinBangFacade {

    private Logger logger = LogManager.getLogger(CrawlerXinBangFacade.class);

    @Resource
    private CompanyService companyService;

    @Resource
    private CrawlerXinBangService crawlerXinBangService;
    @Resource
    private CrawlerCompanyTask crawlerCompanyTask;

    String XB_SEARCH_URL =
            "https://www.newrank.cn/xdnphb/data/weixinuser/searchWeixinDataByCondition?hasDeal=false&keyName=%s&filter=%s&order=%s"
                    + "&nonce=%s&xyz=%s";

    synchronized public List<XinBangGzhDto> search(String key, String nonce, String xyz, String order,
            String filter) throws Exception {
        List<XinBangGzhDto> xinBangGzhDtos = crawlerXinBangService
            .searchByXinBang(String.format(XB_SEARCH_URL, key, filter, order, nonce, xyz));
        if (CollectionUtil.isEmpty(xinBangGzhDtos)) {
            return xinBangGzhDtos;
        }

        // 数据库中的企业信息数据
        List<String> certifiedCompanyList =
                CollectionUtil.getColumnValues(xinBangGzhDtos, "certifiedCompany");
        List<QiChaChaDto> dbQiChaChaDtos = companyService.listByNames(certifiedCompanyList);
        Map<String, QiChaChaDto> dbCompanyNameMap = MapUtil.toMap(dbQiChaChaDtos, "companyName");
        for (XinBangGzhDto xinBangGzhDto : xinBangGzhDtos) {
            QiChaChaDto qiChaChaDto = dbCompanyNameMap.get(xinBangGzhDto.getCertifiedCompany());
            if (qiChaChaDto != null) {
                xinBangGzhDto.setQiChaChaDto(qiChaChaDto);
            }
        }
        // 每次搜索，只实时爬前10条企业信息
        for (int i = 0; i < xinBangGzhDtos.size() && i < 10; i++) {
            XinBangGzhDto xinBangGzhDto = xinBangGzhDtos.get(i);
            if (xinBangGzhDto.getQiChaChaDto().getId() == null) {
                QiChaChaDto qiChaChaDto =
                        crawlerXinBangService.crawlerCompany(xinBangGzhDto.getCertifiedCompany());
                if (qiChaChaDto != null) {
                    xinBangGzhDto.setQiChaChaDto(qiChaChaDto);
                }
            }
        }
        // 后面的离线搜
        for (int i = 10; i < xinBangGzhDtos.size(); i++) {
            crawlerCompanyTask.offer(xinBangGzhDtos.get(i).getCertifiedCompany());
        }

        // 有些公众号，查过，查不出企业就不查了
        List<XinBangGzhDto> resultList = Lists.newArrayList();
        for (XinBangGzhDto xinBangGzhDto : xinBangGzhDtos) {
            if (xinBangGzhDto.getHotNum() != null && xinBangGzhDto.getHotNum() >= 400) {
                resultList.add(xinBangGzhDto);
            }
        }
        return resultList;
    }

}
