package org.jsonq.infra.api.doc.service;

import com.google.common.collect.Lists;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.annotation.Resource;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.common.repository.po.Entity.ColumnName;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.common.util.collection.MapUtil;
import org.jsonq.infra.api.doc.constants.ApiConstants.ApiParameterType;
import org.jsonq.infra.api.doc.po.ApiParameter;
import org.jsonq.infra.api.doc.po.ApiParameterValue;
import org.jsonq.infra.api.doc.respository.ApiParameterRepository;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiParameterService extends BaseService<ApiParameter, ApiParameterRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());

    @Resource
    private ApiParameterValueService apiParameterValueService;

    public List<ApiParameter> listByUrlId(Long urlId, Byte type, Long userId) {
        List<ApiParameter> apiParameters = repository.listByUrlId(urlId, type);
        // 组装参数值
        Map<Long, ApiParameter> idMap = MapUtil.toMap(apiParameters, ColumnName.id.getValue());
        if (Objects.equals(type, ApiParameterType.PARAM_TYPE)) {
            List<ApiParameterValue> valueList = apiParameterValueService.listByParameterIds(
                    Lists.newArrayList(idMap.keySet()), userId);
            for (ApiParameterValue value : valueList) {
                ApiParameter apiParameter = idMap.get(value.getParameterId());
                if (apiParameter != null) {
                    apiParameter.setDateValue(value.getValue());
                }
            }
        }
        return apiParameters;
    }

    public Long replaceAndGetId(ApiParameter apiParameter) {
        QueryParam<Enum> checkDbEntityParam = QueryParam.create()
                .addQuery(ApiParameter.ColumnName.urlId, apiParameter.getUrlId())
                .addQuery(ApiParameter.ColumnName.type, apiParameter.getType())
                .addQuery(ApiParameter.ColumnName.parentId, apiParameter.getParentId())
                .addQuery(ApiParameter.ColumnName.name, apiParameter.getName());
        repository.replace(apiParameter, checkDbEntityParam);
        return apiParameter.getId();
    }


}