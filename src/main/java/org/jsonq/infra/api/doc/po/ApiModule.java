package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;
import lombok.Data;

import javax.persistence.Table;

@Data
@Table
public class ApiModule extends Entity {

    private Long roleId;
    private String name;
    private String description;

}