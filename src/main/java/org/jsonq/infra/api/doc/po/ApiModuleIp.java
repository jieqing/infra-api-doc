package org.jsonq.infra.api.doc.po;

import javax.persistence.Transient;
import com.youanmi.commons.base.core.entity.Entity;

public class ApiModuleIp extends Entity {

    public enum ColumnName {
        /**
         * 数据库字段名枚举
         */
        moduleId("moduleId"),
        requestIp("requestIp"),
        requestIpDesc("requestIpDesc");
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
    private String requestIp;
    private String requestIpDesc;
    @Transient
    private Boolean isDefaultIp;

    public Boolean getDefaultIp() {
        return isDefaultIp;
    }

    public void setDefaultIp(Boolean defaultIp) {
        isDefaultIp = defaultIp;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public String getRequestIp() {
        return requestIp;
    }

    public void setRequestIp(String requestIp) {
        this.requestIp = requestIp;
    }

    public String getRequestIpDesc() {
        return requestIpDesc;
    }

    public void setRequestIpDesc(String requestIpDesc) {
        this.requestIpDesc = requestIpDesc;
    }
}