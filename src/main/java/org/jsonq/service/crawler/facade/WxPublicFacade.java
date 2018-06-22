package org.jsonq.service.crawler.facade;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.util.BeanCopyUtil;
import org.jsonq.common.repository.po.Page;
import org.jsonq.service.crawler.api.dto.WxPublicDto;
import org.jsonq.service.crawler.api.ifacade.IWxPublicFacade;
import org.jsonq.service.crawler.core.po.WxPublicPo;
import org.jsonq.service.crawler.core.service.WxPublicService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


/**
 * 组装数据，通过调用多个service，facade来完成一个完整的业务功能 返回DTO
 *
 * @author jq
 */
@Service
public class WxPublicFacade implements IWxPublicFacade {

    private Logger logger = LogManager.getLogger(WxPublicFacade.class);

    @Resource
    private WxPublicService wxPublicService;

    @Override
    public Page<WxPublicDto> pageByName(String publicName, int pageIndex, int pageSize) {
        Page<WxPublicPo> page = wxPublicService.pageByName(publicName, pageIndex, pageSize);
        return BeanCopyUtil.toPage(page, WxPublicDto.class);
    }
}
