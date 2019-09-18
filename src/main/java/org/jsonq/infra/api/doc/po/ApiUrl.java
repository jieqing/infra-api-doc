package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Table
public class ApiUrl extends Entity {

    private Long classId;
    private String methodName;
    private String requestUrl;
    private String description;
    private String requestType;

}