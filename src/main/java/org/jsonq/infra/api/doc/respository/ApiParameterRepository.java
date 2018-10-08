package org.jsonq.infra.api.doc.respository;

import java.util.List;
import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.common.repository.po.Entity.ColumnName;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.po.ApiParameter;
import org.jsonq.infra.api.doc.respository.sql.ApiParameterMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiParameterRepository extends BaseSqlRepository<ApiParameter, ApiParameterMapper> {

    public List<ApiParameter> listByUrlId(Long urlId, Byte type) {
        QueryParam<Enum> param = QueryParam.create()
                .addQuery(ApiParameter.ColumnName.urlId, urlId)
                .addQuery(ApiParameter.ColumnName.type, type);
        return listByParam(param.addOrder(ColumnName.id));
    }
}
