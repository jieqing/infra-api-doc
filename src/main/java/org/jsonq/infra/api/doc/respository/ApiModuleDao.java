package org.jsonq.infra.api.doc.respository;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import java.util.List;
import org.jsonq.infra.api.doc.po.ApiModule;
import org.jsonq.infra.api.doc.respository.sql.ApiModuleMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiModuleDao extends BaseDao<ApiModule, ApiModuleMapper> {

    public List<ApiModule> listByRoleId(Long roleId) {
        return this.listByParam(QueryParam.create().addQuery("roleId", roleId));
    }

    public Long replaceAndGetId(String moduleName) {
        ApiModule apiModule = new ApiModule();
        apiModule.setName(moduleName);

        QueryParam checkDbEntityParam = QueryParam.create()
                .addQuery("name", apiModule.getName());
        super.replace(apiModule, checkDbEntityParam);
        return apiModule.getId();
    }
}
