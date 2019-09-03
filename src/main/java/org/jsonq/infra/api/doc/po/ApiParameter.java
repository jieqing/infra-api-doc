package org.jsonq.infra.api.doc.po;

import javax.persistence.Transient;
import com.youanmi.commons.base.core.entity.Entity;

public class ApiParameter extends Entity {

    public enum ColumnName {
        /**
         * 数据库字段名枚举
         */
        urlId("urlId"),
        type("type"),
        parentId("parentId"),
        name("name");
        private final String value;

        ColumnName(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        /**
         * QueryParam转Example用
         */
        @Override
        public String toString() {
            return this.value;
        }
    }

    private Long urlId;
    private Byte type;
    private Long parentId;
    private String name;
    private String dataType;
    private String description;
    @Transient
    private String dateValue;

    public Long getUrlId() {
        return urlId;
    }

    public void setUrlId(Long urlId) {
        this.urlId = urlId;
    }

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType == null ? null : dataType.trim();
    }

    public String getDateValue() {
        return dateValue;
    }

    public void setDateValue(String dateValue) {
        this.dateValue = dateValue == null ? null : dateValue.trim();
    }
}