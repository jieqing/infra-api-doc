package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.Data;

@Data
@Table
public class ApiParameter extends Entity {

    private Long urlId;
    private Byte type;
    private Long parentId;
    private String name;
    private String dataType;
    private String description;
    @Transient
    private String dateValue;

}