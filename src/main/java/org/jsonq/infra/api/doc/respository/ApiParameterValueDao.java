package org.jsonq.infra.api.doc.respository;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.Query.Opt;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import java.util.List;
import org.jsonq.infra.api.doc.po.ApiParameterValue;
import org.jsonq.infra.api.doc.respository.sql.ApiParameterValueMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiParameterValueDao extends BaseDao<ApiParameterValue, ApiParameterValueMapper> {

    public List<ApiParameterValue> listByParameterIds(List<Long> parameterIds, Long userId) {
        return listByParam(QueryParam.create()
                .addQuery("parameterId", Opt.in, parameterIds)
                .addQuery("userId", userId));
    }

    public void replaceList(List<ApiParameterValue> list, Long userId) {
        for (ApiParameterValue apiParameterValue : list) {
            apiParameterValue.setUserId(userId);
            super.replace(apiParameterValue,
                    QueryParam.create().addQuery("userId", apiParameterValue.getUserId())
                            .addQuery("parameterId", apiParameterValue.getParameterId()));
        }
    }
}
