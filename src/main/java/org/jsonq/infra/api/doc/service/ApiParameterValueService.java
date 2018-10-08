package org.jsonq.infra.api.doc.service;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.po.ApiParameterValue;
import org.jsonq.infra.api.doc.po.ApiParameterValue.ColumnName;
import org.jsonq.infra.api.doc.respository.ApiParameterValueRepository;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiParameterValueService extends
        BaseService<ApiParameterValue, ApiParameterValueRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());

    public List<ApiParameterValue> listByParameterIds(List<Long> parameterIds, Long userId) {
        return repository.listByParameterIds(parameterIds, userId);
    }

    public void replaceList(List<ApiParameterValue> list, Long userId) {
        for (ApiParameterValue apiParameterValue : list) {
            apiParameterValue.setUserId(userId);
            repository.replace(apiParameterValue,
                    QueryParam.create().addQuery(ColumnName.userId, apiParameterValue.getUserId())
                            .addQuery(ColumnName.parameterId, apiParameterValue.getParameterId()));
        }
    }
}