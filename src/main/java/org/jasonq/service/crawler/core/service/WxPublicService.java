package org.jasonq.service.crawler.core.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.service.crawler.core.po.WxPublicPo;
import org.jasonq.service.crawler.core.repository.WxPublicRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 * 
 * @author jq
 * @date 2018/3/6
 */
@Service
public class WxPublicService {

    private Logger logger = LogManager.getLogger(this.getClass());

    @Resource
    private WxPublicRepository wxPublicRepository;

    public WxPublicPo selectByCertifiedCompany(String certifiedCompany) {
        List<WxPublicPo> wxPublicPos =
                wxPublicRepository.listByCertifiedCompanys(Lists.newArrayList(certifiedCompany));
        if (CollectionUtil.isEmpty(wxPublicPos)) {
            return null;
        }
        return wxPublicPos.get(0);
    }

    public List<WxPublicPo> listByCertifiedCompanys(List<String> certifiedCompanys) {
        return wxPublicRepository.listByCertifiedCompanys(certifiedCompanys);
    }

    public List<WxPublicPo> listByWxNos(List<String> wxNames) {
        return wxPublicRepository.listByWxNos(wxNames);
    }

    public int updateById(WxPublicPo entity) {
        return wxPublicRepository.updateById(entity);
    }

    public int updateByIdBatch(List<WxPublicPo> list) {
        return wxPublicRepository.updateByIdBatch(list);
    }

    public int add(WxPublicPo entity) {
        return wxPublicRepository.insert(entity);
    }

    public int addBatch(List<WxPublicPo> list) {
        try {
            return wxPublicRepository.insertBatch(list);
        }
        catch (DuplicateKeyException e) {
        }
        return 0;
    }

    public int deleteById(String id) throws InstantiationException, IllegalAccessException {
        return wxPublicRepository.deleteById(id);
    }
}