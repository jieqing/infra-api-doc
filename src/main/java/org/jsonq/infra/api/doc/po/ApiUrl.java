package org.jsonq.infra.api.doc.po;

import org.jsonq.common.repository.po.Entity;

public class ApiUrl extends Entity {
    public enum ColumnName {
        /**
         * 数据库字段名枚举
         */
        classId("classId"),
        requestUrl("requestUrl"),
        description("description"),
        requestType("requestType");
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

    private Long classId;
    private String requestUrl;
    private String description;
    private String requestType;

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl == null ? null : requestUrl.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType == null ? null : requestType.trim();
    }

}