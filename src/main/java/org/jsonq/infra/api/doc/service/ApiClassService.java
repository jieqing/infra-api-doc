package org.jsonq.infra.api.doc.service;

import org.jsonq.infra.api.doc.dao.ApiClassDao;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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

    public List<ApiClass> listByName(String name, Long moduleId) {
        return apiClassDao.listByName(name, moduleId);
    }

    public Long replaceByName(ApiClass apiClass) {
        return apiClassDao.replaceByName(apiClass);
    }

    public List<ApiClass> listByModuleId(Long moduleId) {
        return apiClassDao.listByModuleId(moduleId);
    }

    public int deleteByIds(List<Long> ids) {
        return apiClassDao.deleteByIds(ids);
    }
}