package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Table
public class User extends Entity {

    private String account;
    private String password;
    private String salt;
    private String avatar;
    private String nickname;
    private Long roleId;
    private String email;
    private String mobile;

}