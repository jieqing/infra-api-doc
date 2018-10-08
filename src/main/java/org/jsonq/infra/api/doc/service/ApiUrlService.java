package org.jsonq.infra.api.doc.service;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.jsonq.infra.api.doc.respository.ApiUrlRepository;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiUrlService extends BaseService<ApiUrl, ApiUrlRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());

    public List<ApiUrl> listByClassId(Long classId) {
        return repository.listByClassId(classId);
    }

    public Long createAndGetId(ApiUrl apiUrl) {
        QueryParam<Enum> checkDbEntityParam = QueryParam.create()
                .addQuery(ApiUrl.ColumnName.classId, apiUrl.getClassId())
                .addQuery(ApiUrl.ColumnName.requestUrl, apiUrl.getRequestUrl())
                .addQuery(ApiUrl.ColumnName.requestType, apiUrl.getRequestType());
        repository.replace(apiUrl, checkDbEntityParam);
        return apiUrl.getId();
    }

    public int deleteByIdBatch(List<Long> ids)
            throws IllegalAccessException, InstantiationException {
        return repository.deleteByIdBatch(ids);
    }
}