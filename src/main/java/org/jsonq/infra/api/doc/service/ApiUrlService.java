package org.jsonq.infra.api.doc.service;

import org.jsonq.infra.api.doc.dao.ApiUrlDao;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


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

    public ApiUrl getById(Long id) {
        return apiUrlDao.selectById(id);
    }

    public List<ApiUrl> listByClassId(Long classId, String des) {
        return apiUrlDao.listByClassId(classId, des);
    }

    public Long replace(ApiUrl apiUrl) {
        return apiUrlDao.replace(apiUrl);
    }

    public int deleteByIds(List<Long> ids) {
        return apiUrlDao.deleteByIds(ids);
    }
}