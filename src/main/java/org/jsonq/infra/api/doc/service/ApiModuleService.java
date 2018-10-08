package org.jsonq.infra.api.doc.service;

import java.util.List;
import javax.annotation.Resource;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.infra.api.doc.po.ApiModule;
import org.jsonq.infra.api.doc.po.User;
import org.jsonq.infra.api.doc.respository.ApiModuleRepository;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiModuleService extends BaseService<ApiModule, ApiModuleRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());

    @Resource
    private UserService userService;

    public List<ApiModule> listByUserId(Long userId) {
        User user = userService.selectById(userId);
        return repository.listByRoleId(user.getRoleId());
    }

    public Long replaceAndGetId(String moduleName) {
        ApiModule apiModule = new ApiModule();
        apiModule.setName(moduleName);

        QueryParam<Enum> checkDbEntityParam = QueryParam.create()
                .addQuery(ApiModule.ColumnName.name, apiModule.getName());
        repository.replace(apiModule, checkDbEntityParam);
        return apiModule.getId();
    }


}