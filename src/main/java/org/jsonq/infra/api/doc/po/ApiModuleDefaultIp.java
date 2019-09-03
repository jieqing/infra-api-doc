package org.jsonq.infra.api.doc.po;


import com.youanmi.commons.base.core.entity.Entity;

public class ApiModuleDefaultIp extends Entity {

    public enum ColumnName {
        /**
         * 数据库字段名枚举
         */
        moduleId("moduleId"),
        moduleIpId("moduleIpId"),
        userId("userId");
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

    private Long moduleId;
    private Long moduleIpId;
    private Long userId;


    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public Long getModuleIpId() {
        return moduleIpId;
    }

    public void setModuleIpId(Long moduleIpId) {
        this.moduleIpId = moduleIpId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}