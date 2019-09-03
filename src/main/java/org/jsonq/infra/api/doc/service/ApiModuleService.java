package org.jsonq.infra.api.doc.service;

import java.util.List;
import javax.annotation.Resource;
import org.jsonq.infra.api.doc.po.ApiModule;
import org.jsonq.infra.api.doc.po.User;
import org.jsonq.infra.api.doc.respository.ApiModuleDao;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiModuleService {

    @Resource
    private ApiModuleDao apiModuleDao;
    @Resource
    private UserService userService;

    public List<ApiModule> listByUserId(Long userId) {
        User user = userService.selectById(userId);
        return apiModuleDao.listByRoleId(user.getRoleId());
    }

    public Long replaceAndGetId(String moduleName) {
        return apiModuleDao.replaceAndGetId(moduleName);
    }


}