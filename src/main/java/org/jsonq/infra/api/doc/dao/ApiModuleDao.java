package org.jsonq.infra.api.doc.dao;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import com.youanmi.scrm.commons.constants.Constants;
import org.jsonq.infra.api.doc.dao.sql.ApiModuleMapper;
import org.jsonq.infra.api.doc.po.ApiModule;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiModuleDao extends BaseDao<ApiModule, ApiModuleMapper> {

    public List<ApiModule> listAll() {
        return super.listByParam(QueryParam.create().addQuery("isDelete", Constants.NO));
    }

    public List<ApiModule> listByRoleId(Long roleId) {
        return this.listByParam(QueryParam.create().addQuery("roleId", roleId));
    }

    public Long replaceByName(String name, String desc) {
        ApiModule apiModule = new ApiModule();
        apiModule.setName(name);
        apiModule.setDescription(desc);

        QueryParam param = QueryParam.create().addQuery("name", apiModule.getName());
        super.replace(apiModule, param);
        return apiModule.getId();
    }
}
