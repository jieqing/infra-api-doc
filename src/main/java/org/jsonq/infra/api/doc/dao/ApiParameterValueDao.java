package org.jsonq.infra.api.doc.dao;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.Query.Opt;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import org.jsonq.infra.api.doc.dao.sql.ApiParameterValueMapper;
import org.jsonq.infra.api.doc.po.ApiParameterValue;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiParameterValueDao extends BaseDao<ApiParameterValue, ApiParameterValueMapper> {

    public List<ApiParameterValue> listByParameterIds(List<Long> parameterIds) {
        return listByParam(QueryParam.create()
                .addQuery("parameterId", Opt.in, parameterIds));
    }

    public void replaceList(List<ApiParameterValue> list) {
        for (ApiParameterValue apiParameterValue : list) {
            super.replace(apiParameterValue, QueryParam.create().addQuery("parameterId", apiParameterValue.getParameterId()));
        }
    }
}
