package org.jsonq.service.crawler.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.constant.Constant;
import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.common.repository.po.Entity;
import org.jsonq.common.repository.query.Order;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.service.crawler.po.GeogVillagePo;
import org.jsonq.service.crawler.repository.sql.GeogVillageMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值
 * 
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class GeogVillageRepository extends BaseSqlRepository<GeogVillagePo, GeogVillageMapper> {

    private Logger logger = LogManager.getLogger(GeogVillageRepository.class);

    public GeogVillagePo poll() {
        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(GeogVillagePo.ColumnName.isSearch, Constant.NO);
        queryParam.addOrder(Entity.ColumnName.id, Order.OrderType.asc);
        queryParam.setPageSize(1);
        return pageByParam(queryParam).getData().get(0);
    }
}
