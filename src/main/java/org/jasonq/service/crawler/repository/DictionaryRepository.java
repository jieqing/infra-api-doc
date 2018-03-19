package org.jasonq.service.crawler.repository;

import java.util.List;


import org.jasonq.common.repository.BaseSqlRepository;
import org.jasonq.common.repository.query.QueryParam;

import org.jasonq.service.crawler.po.DictionaryPo;
import org.jasonq.service.crawler.repository.sql.DictionaryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值
 * 
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class DictionaryRepository extends BaseSqlRepository<DictionaryPo, DictionaryMapper> {

    private static final Logger logger = LoggerFactory.getLogger(DictionaryRepository.class);

    public List<DictionaryPo> listByParentCode(String parentCode) {

        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(DictionaryPo.ColumnName.parentCode, parentCode);
        return listByParam(queryParam);
    }

}
