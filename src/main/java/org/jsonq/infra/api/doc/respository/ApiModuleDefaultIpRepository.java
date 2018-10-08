package org.jsonq.infra.api.doc.respository;

import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.po.ApiModuleDefaultIp;
import org.jsonq.infra.api.doc.po.ApiModuleDefaultIp.ColumnName;
import org.jsonq.infra.api.doc.respository.sql.ApiModuleDefaultIpMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiModuleDefaultIpRepository extends
        BaseSqlRepository<ApiModuleDefaultIp, ApiModuleDefaultIpMapper> {

    public ApiModuleDefaultIp getByModuleId(Long moduleId, Long userId) {
        return this.selectOneByParam(QueryParam.create().addQuery(ColumnName.moduleId, moduleId)
                .addQuery(ColumnName.userId, userId));
    }

}
