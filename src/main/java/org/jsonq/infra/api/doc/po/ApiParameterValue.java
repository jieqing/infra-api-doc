package org.jsonq.infra.api.doc.po;

import com.youanmi.commons.base.core.entity.Entity;

public class ApiParameterValue extends Entity {

    public enum ColumnName {
        /**
         * 数据库字段名枚举
         */
        userId("userId"),
        parameterId("parameterId");
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

    private Long userId;
    private Long parameterId;
    private String value;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getParameterId() {
        return parameterId;
    }

    public void setParameterId(Long parameterId) {
        this.parameterId = parameterId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value == null ? null : value.trim();
    }

}