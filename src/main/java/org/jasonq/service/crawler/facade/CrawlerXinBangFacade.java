package org.jasonq.service.crawler.facade;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.service.crawler.core.service.CompanyService;
import org.jasonq.service.crawler.core.service.CrawlerXinBangService;
import org.jasonq.service.crawler.dto.XinBangGzhDto;
import org.springframework.stereotype.Service;


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

    String XB_SEARCH_URL =
            "https://www.newrank.cn/xdnphb/data/weixinuser/searchWeixinDataByCondition?hasDeal=false&keyName=%s&filter=nickname&order=NRI"
                    + "&nonce=%s&xyz=%s";

    public List<XinBangGzhDto> search(String key, String nonce, String xyz) throws Exception {
        List<XinBangGzhDto> xinBangGzhDtos =
                crawlerXinBangService.searchByXinBang(String.format(XB_SEARCH_URL, key, nonce, xyz));
        if (CollectionUtil.isEmpty(xinBangGzhDtos)) {
            return xinBangGzhDtos;
        }
        // 只取前10条
        crawlerXinBangService
            .buildQiChaChaInfo(xinBangGzhDtos.subList(0, Math.min(10, xinBangGzhDtos.size())));
        return xinBangGzhDtos;
    }

}
