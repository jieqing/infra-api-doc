package org.jsonq.infra.api.doc.dao;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.Order;
import com.youanmi.commons.base.core.dao.query.Query.Opt;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import org.jsonq.infra.api.doc.dao.sql.ApiClassMapper;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiClassDao extends BaseDao<ApiClass, ApiClassMapper> {

    public List<ApiClass> listByName(String name, Long moduleId) {
        return listByParam(QueryParam.create().addQuery("name", Opt.like, name).addQuery("moduleId", moduleId)
                .addOrder("description", Order.OrderType.asc));
    }

    public List<ApiClass> listByModuleId(Long moduleId) {
        return listByParam(QueryParam.create().addQuery("moduleId", moduleId).addOrder("description", Order.OrderType.asc));
    }

    public Long replaceByName(ApiClass apiClass) {
        QueryParam checkDbEntityParam = QueryParam.create()
                .addQuery("moduleId", apiClass.getModuleId())
                .addQuery("name", apiClass.getName());
        super.replace(apiClass, checkDbEntityParam);
        return apiClass.getId();
    }

    public int deleteByIds(List<Long> ids) {
        return super.deleteByIdBatch(ids);
    }
}
