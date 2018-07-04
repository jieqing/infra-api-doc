package org.jsonq.service.crawler.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.common.repository.query.Query;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.service.crawler.po.CompanyPo;
import org.jsonq.service.crawler.repository.sql.CompanyMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值
 * 这一层就要list，one分清楚，
 * 
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class CompanyRepository extends BaseSqlRepository<CompanyPo, CompanyMapper> {

    private Logger logger = LogManager.getLogger(CompanyRepository.class);

    public List<CompanyPo> listByNames(List<String> companyNames) {
        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(CompanyPo.ColumnName.companyName, Query.Opt.in, companyNames);
        return super.listByParam(queryParam);
    }
}
