package org.jsonq.infra.api.doc.core.repository;

import com.google.common.collect.Lists;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.common.repository.po.Page;
import org.jsonq.common.repository.query.Query;
import org.jsonq.common.repository.query.QueryParam;
import org.jsonq.common.util.collection.CollectionUtil;
import org.jsonq.infra.api.doc.core.repository.sql.WxPublicMapper;
import org.jsonq.service.crawler.core.po.WxPublicPo;
import org.jsonq.service.crawler.core.repository.sql.WxPublicMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


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


    public Page<WxPublicPo> pageByName(String publicName, int pageIndex, int pageSize) {
        QueryParam<Enum> param = QueryParam.create(pageIndex, pageSize);
        param.addQuery(WxPublicPo.ColumnName.publicName, Query.Opt.like, publicName);
        return pageByParam(param);
    }

}
