package org.jsonq.service.crawler.facade;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.util.BeanCopyUtil;
import org.jsonq.service.crawler.core.po.AsyncWxPublicPo;
import org.jsonq.service.crawler.core.service.AsyncWxPublicService;
import org.jsonq.service.crawler.api.dto.AsyncWxPublicDto;
import org.jsonq.service.crawler.api.ifacade.IAsyncWxPublicFacade;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


/**
 * 组装数据，通过调用多个service，facade来完成一个完整的业务功能 返回DTO
 *
 * @author jq
 */
@Service
public class AsyncWxPublicFacade implements IAsyncWxPublicFacade {

    private Logger logger = LogManager.getLogger(AsyncWxPublicFacade.class);

    @Resource
    private AsyncWxPublicService asyncWxPublicService;


    @Override
    public int addBatch(List<AsyncWxPublicDto> list) {
        return asyncWxPublicService.addBatch(BeanCopyUtil.toList(list, AsyncWxPublicPo.class));
    }

    @Override
    public List<AsyncWxPublicDto> getAll() {
        return BeanCopyUtil.toList(asyncWxPublicService.getAll(), AsyncWxPublicDto.class);
    }
}
