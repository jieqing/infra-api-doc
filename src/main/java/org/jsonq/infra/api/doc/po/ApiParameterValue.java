package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Table
public class ApiParameterValue extends Entity {

    private Long userId;
    private Long parameterId;
    private String value;

}