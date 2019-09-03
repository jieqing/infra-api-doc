package org.jsonq.infra.api.doc.service;

import javax.annotation.Resource;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.infra.api.doc.po.User;
import org.jsonq.infra.api.doc.respository.UserDao;
import org.springframework.stereotype.Service;


/**
 * 处理核心的，完整的，独立的单个的小业务逻辑，特点是需要调用本领域模型的多张表。 返回PO
 *
 * @author jq
 * @date 2018/3/6
 */
@Service
public class UserService  {

    @Resource
    private UserDao userDao;

    private Logger logger = LogManager.getLogger(this.getClass());

    public User selectById(Long id) {
        return userDao.selectById(id);
    }
}