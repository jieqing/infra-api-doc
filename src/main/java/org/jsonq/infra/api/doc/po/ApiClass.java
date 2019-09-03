package org.jsonq.infra.api.doc.po;


import com.youanmi.commons.base.core.entity.Entity;

public class ApiClass extends Entity {

    public enum ColumnName {
        /**
         * 数据库字段名枚举
         */
        moduleId("moduleId"),
        name("name"),
        description("description");
        private final String value;

        ColumnName(String value) {
            this.value = value;
        }

        /**
         * QueryParam转Example用
         */
        @Override
        public String toString() {
            return this.value;
        }
    }


    private Long moduleId;
    private String name;
    private String description;

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
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
}