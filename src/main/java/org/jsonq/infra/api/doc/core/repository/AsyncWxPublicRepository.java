package org.jsonq.infra.api.doc.core.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.constant.Constant;
import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.common.repository.po.Entity;
import org.jsonq.common.repository.query.Order;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.core.po.AsyncWxPublicPo;
import org.jsonq.infra.api.doc.core.repository.sql.AsyncWxPublicMapper;
import org.jsonq.service.crawler.core.po.AsyncWxPublicPo;
import org.jsonq.service.crawler.core.repository.sql.AsyncWxPublicMapper;
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

    public List<AsyncWxPublicPo> getAll() {
        return super.listByParam(QueryParam.create());
    }

    public AsyncWxPublicPo poll() {
        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(AsyncWxPublicPo.ColumnName.isSearch, Constant.NO);
        queryParam.addOrder(Entity.ColumnName.id, Order.OrderType.asc);
        return super.selectOneByParam(queryParam);
    }

    public AsyncWxPublicPo selectOne(String publicName, Byte isSearch) {
        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(AsyncWxPublicPo.ColumnName.publicName, publicName);
        queryParam.addQuery(AsyncWxPublicPo.ColumnName.isSearch, isSearch);
        return selectOneByParam(queryParam);
    }
}
