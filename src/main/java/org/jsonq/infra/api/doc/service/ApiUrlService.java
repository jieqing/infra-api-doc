package org.jsonq.infra.api.doc.service;

import java.util.List;
import javax.annotation.Resource;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.jsonq.infra.api.doc.dao.ApiUrlDao;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class ApiUrlService {

    @Resource
    private ApiUrlDao apiUrlDao;

    public List<ApiUrl> listByClassId(Long classId) {
        return apiUrlDao.listByClassId(classId);
    }

    public Long replace(ApiUrl apiUrl) {
        return apiUrlDao.replace(apiUrl);
    }

    public int deleteByIds(List<Long> ids) {
        return apiUrlDao.deleteByIds(ids);
    }
}