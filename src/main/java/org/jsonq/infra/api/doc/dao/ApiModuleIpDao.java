package org.jsonq.infra.api.doc.dao;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import java.util.List;
import org.jsonq.infra.api.doc.po.ApiModuleIp;
import org.jsonq.infra.api.doc.dao.sql.ApiModuleIpMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiModuleIpDao extends BaseDao<ApiModuleIp, ApiModuleIpMapper> {

    public List<ApiModuleIp> listByModuleId(Long moduleId) {
        return this.listByParam(QueryParam.create().addQuery("moduleId", moduleId));
    }

}
