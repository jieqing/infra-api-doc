package org.jsonq.infra.api.doc.service;

import org.jsonq.infra.api.doc.dao.ApiModuleIpDao;
import org.jsonq.infra.api.doc.po.ApiModuleIp;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiModuleIpService {

    @Resource
    private ApiModuleIpDao apiModuleIpDao;

    public List<ApiModuleIp> listByModuleId(Long moduleId) {
        return apiModuleIpDao.listByModuleId(moduleId);
    }
}