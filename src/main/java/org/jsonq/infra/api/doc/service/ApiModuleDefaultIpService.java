package org.jsonq.infra.api.doc.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.infra.api.doc.po.ApiModuleDefaultIp;
import org.jsonq.infra.api.doc.respository.ApiModuleDefaultIpRepository;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiModuleDefaultIpService extends
        BaseService<ApiModuleDefaultIp, ApiModuleDefaultIpRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());

    public ApiModuleDefaultIp getByModuleId(Long moduleId, Long userId) {
        return repository.getByModuleId(moduleId, userId);
    }
}