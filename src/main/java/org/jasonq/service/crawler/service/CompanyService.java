package org.jasonq.service.crawler.service;

import java.util.List;

import javax.annotation.Resource;

import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.service.crawler.dto.QiChaChaDto;
import org.jasonq.service.crawler.po.CompanyPo;
import org.jasonq.service.crawler.repository.CompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;


/**
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class CompanyService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private CompanyRepository companyRepository;

    public List<QiChaChaDto> listByNames(List<String> companyNames) {
        List<CompanyPo> companyPoList = companyRepository.listByNames(companyNames);
        if (CollectionUtil.isEmpty(companyPoList)) {
            return null;
        }
        List<QiChaChaDto> qiChaChaDtos = Lists.newArrayList();
        for (CompanyPo companyPo : companyPoList) {
            QiChaChaDto qiChaChaDto = new QiChaChaDto();
            BeanUtils.copyProperties(companyPo, qiChaChaDto);
            qiChaChaDtos.add(qiChaChaDto);
        }
        return qiChaChaDtos;
    }

    public int updateById(CompanyPo entity) {
        return companyRepository.updateById(entity);
    }

    public int add(QiChaChaDto entity) {
        CompanyPo companyPo = new CompanyPo();
        BeanUtils.copyProperties(entity, companyPo);
        return companyRepository.insert(companyPo);
    }

    public int deleteById(String id) throws InstantiationException, IllegalAccessException {
        return companyRepository.deleteById(id);
    }
}