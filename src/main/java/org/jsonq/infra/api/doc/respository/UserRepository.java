package org.jsonq.infra.api.doc.respository;

import org.jsonq.common.repository.BaseSqlRepository;
import org.jsonq.infra.api.doc.po.User;
import org.jsonq.infra.api.doc.respository.sql.UserMapper;
import org.springframework.stereotype.Repository;


/**
 * 统一持久层入口 负责处理一些基础化的操作，比如一些业务数据，非业务数据的默认值 这一层就要list，one分清楚，
 *
 * @author jq
 * @date 2018/3/6
 */
@Repository
public class UserRepository extends BaseSqlRepository<User, UserMapper> {

}
