package org.jasonq.service.crawler.core.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.domain.util.BeanCopyUtil;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.service.crawler.core.po.CompanyPo;
import org.jasonq.service.crawler.core.repository.CompanyRepository;
import org.jasonq.service.crawler.dto.QiChaChaDto;
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

    public QiChaChaDto selectByName(String companyName) {
        List<CompanyPo> companyPoList = companyRepository.listByNames(Lists.newArrayList(companyName));
        if (CollectionUtil.isEmpty(companyPoList)) {
            return null;
        }
        return BeanCopyUtil.to(companyPoList.get(0), QiChaChaDto.class);
    }

    public List<QiChaChaDto> listByNames(List<String> companyNames) {
        List<CompanyPo> companyPoList = companyRepository.listByNames(companyNames);
        return BeanCopyUtil.toList(companyPoList, QiChaChaDto.class);
    }

    public int updateById(CompanyPo entity) {
        return companyRepository.updateById(entity);
    }

    public int add(QiChaChaDto entity) {
        try {
            return companyRepository.insert(BeanCopyUtil.to(entity, CompanyPo.class));
        }
        catch (DuplicateKeyException e) {
            return 1;
        }
    }

    public int deleteById(String id) throws InstantiationException, IllegalAccessException {
        return companyRepository.deleteById(id);
    }
}