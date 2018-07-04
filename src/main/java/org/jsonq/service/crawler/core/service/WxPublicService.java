package org.jsonq.service.crawler.core.service;

import com.google.common.collect.Lists;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.common.repository.po.Page;
import org.jsonq.common.util.collection.CollectionUtil;
import org.jsonq.service.crawler.core.po.WxPublicPo;
import org.jsonq.service.crawler.core.repository.WxPublicRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class WxPublicService extends BaseService<WxPublicPo, WxPublicRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());


    public WxPublicPo selectByCertifiedCompany(String certifiedCompany) {
        List<WxPublicPo> wxPublicPos =
                repository.listByCertifiedCompanys(Lists.newArrayList(certifiedCompany));
        if (CollectionUtil.isEmpty(wxPublicPos)) {
            return null;
        }
        return wxPublicPos.get(0);
    }

    public List<WxPublicPo> listByCertifiedCompanys(List<String> certifiedCompanys) {
        return repository.listByCertifiedCompanys(certifiedCompanys);
    }

    public List<WxPublicPo> listByWxNos(List<String> wxNames) {
        return repository.listByWxNos(wxNames);
    }

    public Page<WxPublicPo> pageByName(String publicName, int pageIndex, int pageSize) {
        return repository.pageByName(publicName, pageIndex, pageSize);
    }

    public int addBatch(List<WxPublicPo> list) {
        try {
            return repository.insertBatch(list);
        } catch (DuplicateKeyException e) {
        }
        return 0;
    }

}