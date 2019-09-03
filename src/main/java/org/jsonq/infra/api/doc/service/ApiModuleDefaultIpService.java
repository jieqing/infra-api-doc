package org.jsonq.infra.api.doc.service;

import org.jsonq.infra.api.doc.po.ApiModuleDefaultIp;
import org.jsonq.infra.api.doc.respository.ApiModuleDefaultIpDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiModuleDefaultIpService {

    @Autowired
    private ApiModuleDefaultIpDao apiModuleDefaultIpDao;

    public ApiModuleDefaultIp getByModuleId(Long moduleId, Long userId) {
        return apiModuleDefaultIpDao.getByModuleId(moduleId, userId);
    }
}