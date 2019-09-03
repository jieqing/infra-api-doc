package org.jsonq.infra.api.doc.service;

import java.util.List;
import java.util.Objects;
import javax.annotation.Resource;
import org.jsonq.infra.api.doc.po.ApiModuleDefaultIp;
import org.jsonq.infra.api.doc.po.ApiModuleIp;
import org.jsonq.infra.api.doc.respository.ApiModuleIpDao;
import org.springframework.stereotype.Service;


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
    @Resource
    private ApiModuleDefaultIpService defaultIpService;

    public List<ApiModuleIp> listByModuleId(Long moduleId, Long userId) {
        List<ApiModuleIp> apiModuleIps = apiModuleIpDao.listByModuleId(moduleId);
        // 默认Ip
        ApiModuleDefaultIp defaultIp = defaultIpService.getByModuleId(moduleId, userId);
        for (ApiModuleIp apiModuleIp : apiModuleIps) {
            if (Objects.equals(apiModuleIp.getId(), defaultIp.getModuleIpId())) {
                apiModuleIp.setDefaultIp(true);
            } else {
                apiModuleIp.setDefaultIp(false);
            }
        }
        return apiModuleIps;
    }
}