package org.jsonq.service.crawler.service;

import com.google.common.collect.Lists;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.domain.service.BaseService;
import org.jsonq.common.util.collection.CollectionUtil;
import org.jsonq.service.crawler.po.CompanyPo;
import org.jsonq.service.crawler.repository.CompanyRepository;
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
public class CompanyService extends BaseService<CompanyPo, CompanyRepository> {

    private Logger logger = LogManager.getLogger(this.getClass());


    public CompanyPo selectByName(String companyName) {
        List<CompanyPo> companyPoList = repository.listByNames(Lists.newArrayList(companyName));
        if (CollectionUtil.isEmpty(companyPoList)) {
            return null;
        }
        return companyPoList.get(0);
    }

    public List<CompanyPo> listByNames(List<String> companyNames) {
        return repository.listByNames(companyNames);
    }

    @Override
    public int add(CompanyPo entity) {
        try {
            return repository.insert(entity);
        } catch (DuplicateKeyException e) {
        }
        return 0;
    }

}