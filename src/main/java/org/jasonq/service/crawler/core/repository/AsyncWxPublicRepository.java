package org.jasonq.service.crawler.core.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.constant.Constant;
import org.jasonq.common.repository.BaseSqlRepository;
import org.jasonq.service.crawler.core.po.AsyncWxPublicPo;
import org.jasonq.service.crawler.core.repository.sql.AsyncWxPublicMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class AsyncWxPublicRepository extends BaseSqlRepository<AsyncWxPublicPo, AsyncWxPublicMapper> {

    private Logger logger = LogManager.getLogger(AsyncWxPublicRepository.class);

    @Override
    public int insertBatch(List<AsyncWxPublicPo> list) {
        for (AsyncWxPublicPo asyncWxPublicPo : list) {
            asyncWxPublicPo.setIsSearch(Constant.NO);
        }
        return super.insertBatch(list);
    }
}
