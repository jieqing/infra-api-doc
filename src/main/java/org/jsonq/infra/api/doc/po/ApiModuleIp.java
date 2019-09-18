package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.Data;

@Data
@Table
public class ApiModuleIp extends Entity {

    private Long moduleId;
    private String requestIp;
    private String requestIpDesc;
    @Transient
    private Boolean isDefaultIp;

}