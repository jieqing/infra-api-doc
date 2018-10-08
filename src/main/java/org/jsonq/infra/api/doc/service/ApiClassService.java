package org.jsonq.infra.api.doc.service;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.jsonq.infra.api.doc.respository.ApiClassRepository;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiClassService extends BaseService<ApiClass, ApiClassRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());

    public List<ApiClass> listByName(String name, List<Long> moduleIds) {
        return repository.listByName(name, moduleIds);
    }

    public Long replaceAndGetId(ApiClass apiClass) {
        QueryParam<Enum> checkDbEntityParam = QueryParam.create()
                .addQuery(ApiClass.ColumnName.moduleId, apiClass.getModuleId())
                .addQuery(ApiClass.ColumnName.name, apiClass.getName());
        repository.replace(apiClass, checkDbEntityParam);
        return apiClass.getId();
    }

    public List<ApiClass> listByModuleId(Long moduleId) {
        return repository.listByModuleId(moduleId);
    }

    public int deleteByIdBatch(List<Long> ids)
            throws IllegalAccessException, InstantiationException {
        return repository.deleteByIdBatch(ids);
    }
}