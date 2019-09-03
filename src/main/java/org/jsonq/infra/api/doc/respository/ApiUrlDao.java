package org.jsonq.infra.api.doc.respository;

import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import java.util.List;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.jsonq.infra.api.doc.respository.sql.ApiUrlMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiUrlDao extends BaseDao<ApiUrl, ApiUrlMapper> {

    public List<ApiUrl> listByClassId(Long classId) {
        return listByParam(QueryParam.create().addQuery("classId", classId));
    }

    public Long createAndGetId(ApiUrl apiUrl) {
        QueryParam checkDbEntityParam = QueryParam.create()
                .addQuery("classId", apiUrl.getClassId())
                .addQuery("requestUrl", apiUrl.getRequestUrl())
                .addQuery("requestType", apiUrl.getRequestType());
        super.replace(apiUrl, checkDbEntityParam);
        return apiUrl.getId();
    }

    @Override
    public int deleteByIdBatch(List<Long> ids) {
        return super.deleteByIdBatch(ids);
    }
}
