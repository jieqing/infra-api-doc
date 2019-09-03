package org.jsonq.infra.api.doc.respository;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.Query.Opt;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import java.util.List;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.jsonq.infra.api.doc.respository.sql.ApiClassMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiClassDao extends BaseDao<ApiClass, ApiClassMapper> {

    public List<ApiClass> listByName(String name, List<Long> moduleIds) {
        return listByParam(QueryParam.create().addQuery("name", Opt.like, name)
                .addQuery("moduleId", Opt.in, moduleIds));
    }

    public List<ApiClass> listByModuleId(Long moduleId) {
        return listByParam(QueryParam.create().addQuery("moduleId", moduleId));
    }

    public Long replaceAndGetId(ApiClass apiClass) {
        QueryParam checkDbEntityParam = QueryParam.create()
                .addQuery("moduleId", apiClass.getModuleId())
                .addQuery("name", apiClass.getName());
        super.replace(apiClass, checkDbEntityParam);
        return apiClass.getId();
    }

    @Override
    public int deleteByIdBatch(List<Long> ids) {
        return super.deleteByIdBatch(ids);
    }
}
