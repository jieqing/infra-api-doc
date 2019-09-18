package org.jsonq.infra.api.doc.po;


import com.youanmi.commons.base.core.entity.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Table
public class ApiModuleDefaultIp extends Entity {

    private Long moduleId;
    private Long moduleIpId;
    private Long userId;

}