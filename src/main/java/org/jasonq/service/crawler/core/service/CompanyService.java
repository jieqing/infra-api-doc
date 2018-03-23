package org.jasonq.service.crawler.core.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.service.crawler.core.po.CompanyPo;
import org.jasonq.service.crawler.core.repository.CompanyRepository;
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
public class CompanyService {

    private Logger logger = LogManager.getLogger(this.getClass());

    @Resource
    private CompanyRepository companyRepository;

    public CompanyPo selectByName(String companyName) {
        List<CompanyPo> companyPoList = companyRepository.listByNames(Lists.newArrayList(companyName));
        if (CollectionUtil.isEmpty(companyPoList)) {
            return null;
        }
        return companyPoList.get(0);
    }

    public List<CompanyPo> listByNames(List<String> companyNames) {
        return companyRepository.listByNames(companyNames);
    }

    public int updateById(CompanyPo entity) {
        return companyRepository.updateById(entity);
    }

    public int add(CompanyPo entity) {
        try {
            return companyRepository.insert(entity);
        }
        catch (DuplicateKeyException e) {
        }
        return 0;
    }

    public int deleteById(String id) throws InstantiationException, IllegalAccessException {
        return companyRepository.deleteById(id);
    }
}