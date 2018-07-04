package org.jsonq.infra.api.doc.core.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.constant.Constant;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.service.crawler.core.po.AsyncWxPublicPo;
import org.jsonq.service.crawler.core.repository.AsyncWxPublicRepository;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class AsyncWxPublicService extends BaseService<AsyncWxPublicPo, AsyncWxPublicRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());

    public boolean isSearch(String publicName) {
        return repository.selectOne(publicName, Constant.YES) == null ? false : true;
    }

    public List<AsyncWxPublicPo> getAll() {
        return repository.getAll();
    }

    public AsyncWxPublicPo poll() {
        return repository.poll();
    }


    public int addBatch(List<AsyncWxPublicPo> list) {
        return repository.insertBatch(list);
    }
}