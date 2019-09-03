package org.jsonq.infra.api.doc.service;

import java.util.List;
import javax.annotation.Resource;
import org.jsonq.infra.api.doc.po.ApiParameterValue;
import org.jsonq.infra.api.doc.respository.ApiParameterValueDao;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiParameterValueService  {

    @Resource
    private ApiParameterValueDao apiParameterValueDao;

    public List<ApiParameterValue> listByParameterIds(List<Long> parameterIds, Long userId) {
        return apiParameterValueDao.listByParameterIds(parameterIds, userId);
    }

    public void replaceList(List<ApiParameterValue> list, Long userId) {
        apiParameterValueDao.replaceList(list, userId);
    }
}