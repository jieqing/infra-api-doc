package org.jsonq.infra.api.doc.dao;

import com.google.common.collect.Lists;
import com.youanmi.commons.base.core.dao.BaseDao;
import com.youanmi.commons.base.core.dao.query.Order;
import com.youanmi.commons.base.core.dao.query.QueryParam;
import org.apache.commons.lang.StringUtils;
import org.jsonq.infra.api.doc.dao.sql.ApiUrlMapper;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.entity.Example;

import java.util.List;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class ApiUrlDao extends BaseDao<ApiUrl, ApiUrlMapper> {

    public List<ApiUrl> listByClassId(Long classId, String urlName) {
        QueryParam param = QueryParam.create()
                .addQuery("classId", classId)
                .addOrder("description", Order.OrderType.asc);
        super.addDefaultParam(param);
        Example example = param.toExample(ApiUrl.class);
        if (StringUtils.isNotEmpty(urlName)) {
            example.and().orLike("description", "%" + urlName + "%")
                    .orLike("requestUrl", "%" + urlName + "%");
        }else {
            if (param.isQueryEmpty()) {
                return Lists.newArrayList();
            }
        }
        return mapper.selectByExample(example);
    }

    public Long replace(ApiUrl apiUrl) {
        QueryParam checkDbEntityParam = QueryParam.create()
                .addQuery("classId", apiUrl.getClassId())
                .addQuery("requestUrl", apiUrl.getRequestUrl())
                .addQuery("requestType", apiUrl.getRequestType());
        super.replace(apiUrl, checkDbEntityParam);
        return apiUrl.getId();
    }

    public int deleteByIds(List<Long> ids) {
        return super.deleteByIdBatch(ids);
    }
}
