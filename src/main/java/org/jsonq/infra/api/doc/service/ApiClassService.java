package org.jsonq.infra.api.doc.service;

import java.util.List;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.jsonq.infra.api.doc.respository.ApiClassDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiClassService {

    @Autowired
    private ApiClassDao apiClassDao;

    public List<ApiClass> listByName(String name, List<Long> moduleIds) {
        return apiClassDao.listByName(name, moduleIds);
    }

    public Long replaceAndGetId(ApiClass apiClass) {
        return apiClassDao.replaceAndGetId(apiClass);
    }

    public List<ApiClass> listByModuleId(Long moduleId) {
        return apiClassDao.listByModuleId(moduleId);
    }

    public int deleteByIdBatch(List<Long> ids) {
        return apiClassDao.deleteByIdBatch(ids);
    }
}