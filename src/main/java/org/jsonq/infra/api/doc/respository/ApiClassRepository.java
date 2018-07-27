package org.jsonq.infra.api.doc.respository;

import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.jsonq.infra.api.doc.respository.sql.ApiClassMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值
 * 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiClassRepository extends BaseSqlRepository<ApiClass, ApiClassMapper> {

    public ApiClass get(Long moduleId, String name) {
        return super.selectOneByParam(QueryParam.create().addQuery(ApiClass.ColumnName.moduleId, moduleId).addQuery(ApiClass.ColumnName.name, name));
    }
}
