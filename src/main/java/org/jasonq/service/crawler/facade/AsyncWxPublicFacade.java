package org.jasonq.service.crawler.facade;

import com.google.common.collect.Lists;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.util.StringUtil;
import org.jasonq.service.crawler.api.facade.IAsyncWxPublicFacade;
import org.jasonq.service.crawler.core.po.AsyncWxPublicPo;
import org.jasonq.service.crawler.core.service.AsyncWxPublicService;
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
    public int addBatch(String publicNames) {
        if (StringUtil.isEmpty(publicNames)) {
            return 0;
        }
        String[] split = publicNames.split(",");
        List<AsyncWxPublicPo> list = Lists.newArrayList();
        for (String name : split) {
            AsyncWxPublicPo asyncWxPublicPo = new AsyncWxPublicPo();
            asyncWxPublicPo.setPublicName(name);
            list.add(asyncWxPublicPo);
        }
        return asyncWxPublicService.addBatch(list);
    }
}
