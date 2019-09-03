package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;

public class ApiModule extends Entity {

    public enum ColumnName {
        /**
         * 数据库字段名枚举
         */
        roleId("roleId"),
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

    private Long roleId;
    private String name;
    private String description;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}