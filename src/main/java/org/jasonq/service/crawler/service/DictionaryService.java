package org.jasonq.service.crawler.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


/**
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class DictionaryService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    //
    // @Resource
    // private DictionaryRepository dictionaryRepository;
    //
    // /**
    // * 把所有子孙查出来，都放在当前层返回。即返回的list不包含嵌套结构
    // *
    // * @param parentCode
    // * @return
    // */
    // public List<DictionaryPo> listWithChild(String parentCode) {
    // List<DictionaryPo> dictionaryPoList =
    // dictionaryRepository.listByParentCode(parentCode);
    // if (CollectionUtils.isEmpty(dictionaryPoList)) {
    // return Lists.newArrayList();
    // }
    //
    // List<DictionaryPo> resultList = Lists.newArrayList(dictionaryPoList);
    // for (DictionaryPo sysDictionaryPo : dictionaryPoList) {
    // resultList.addAll(listWithChild(sysDictionaryPo.getCode()));
    // }
    // return resultList;
    // }
    //
    // public int updateById(DictionaryPo entity) {
    // return dictionaryRepository.updateById(entity);
    // }
    //
    // public int add(DictionaryPo entity) {
    // return dictionaryRepository.insert(entity);
    // }
    //
    // public int deleteById(String id) throws InstantiationException,
    // IllegalAccessException {
    // return dictionaryRepository.deleteById(id);
    // }
}