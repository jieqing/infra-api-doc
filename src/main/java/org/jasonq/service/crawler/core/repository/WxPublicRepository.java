package org.jasonq.service.crawler.core.repository;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.repository.BaseSqlRepository;
import org.jasonq.common.repository.query.Query;
import org.jasonq.common.repository.query.QueryParam;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.service.crawler.core.po.WxPublicPo;
import org.jasonq.service.crawler.core.repository.sql.WxPublicMapper;
import org.springframework.stereotype.Repository;

import com.google.common.collect.Lists;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值
 * 
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class WxPublicRepository extends BaseSqlRepository<WxPublicPo, WxPublicMapper> {

    private Logger logger = LogManager.getLogger(WxPublicRepository.class);

    public List<WxPublicPo> listByWxNos(List<String> wxNames) {
        if (CollectionUtil.isEmpty(wxNames)) {
            return Lists.newArrayList();
        }
        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(WxPublicPo.ColumnName.wxNo, Query.Opt.in, wxNames);
        return super.listByParam(queryParam);
    }

    public List<WxPublicPo> listByPublicNames(List<String> publicNames) {
        if (CollectionUtil.isEmpty(publicNames)) {
            return Lists.newArrayList();
        }
        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(WxPublicPo.ColumnName.publicName, Query.Opt.in, publicNames);
        return super.listByParam(queryParam);
    }

    public List<WxPublicPo> listByCertifiedCompanys(List<String> certifiedCompanys) {
        QueryParam<Enum> queryParam = QueryParam.create();
        queryParam.addQuery(WxPublicPo.ColumnName.certifiedCompany, Query.Opt.in, certifiedCompanys);
        return super.listByParam(queryParam);
    }
}
