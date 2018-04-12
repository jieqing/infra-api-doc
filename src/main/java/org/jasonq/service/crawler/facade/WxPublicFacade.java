package org.jasonq.service.crawler.facade;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.domain.util.BeanCopyUtil;
import org.jasonq.common.repository.po.Page;
import org.jasonq.service.crawler.api.dto.WxPublicDto;
import org.jasonq.service.crawler.api.facade.IWxPublicFacade;
import org.jasonq.service.crawler.core.po.WxPublicPo;
import org.jasonq.service.crawler.core.service.WxPublicService;
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
