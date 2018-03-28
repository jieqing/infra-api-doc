package org.jasonq.service.crawler.core.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.constant.Constant;
import org.jasonq.common.repository.query.QueryParam;
import org.jasonq.service.crawler.core.po.AsyncWxPublicPo;
import org.jasonq.service.crawler.core.repository.AsyncWxPublicRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class AsyncWxPublicService {

    private Logger logger = LogManager.getLogger(this.getClass());

    @Resource
    private AsyncWxPublicRepository asyncWxPublicRepository;

    public boolean isSearch(String publicName) {
        return asyncWxPublicRepository.selectOne(publicName, Constant.YES) == null ? false : true;
    }

    //
//    public List<CompanyPo> listByNames(List<String> companyNames) {
//        return asyncWxPublicRepository.listByNames(companyNames);
//    }


    public List<AsyncWxPublicPo> getAll() {
        return asyncWxPublicRepository.listByParam(QueryParam.create());
    }

    public AsyncWxPublicPo poll() {
        return asyncWxPublicRepository.poll();
    }

    public int updateById(AsyncWxPublicPo entity) {
        return asyncWxPublicRepository.updateById(entity);
    }

    public int addBatch(List<AsyncWxPublicPo> list) {
        return asyncWxPublicRepository.insertBatch(list);
    }
}