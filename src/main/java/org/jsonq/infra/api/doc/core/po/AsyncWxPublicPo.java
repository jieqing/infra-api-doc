package org.jsonq.infra.api.doc.core.po;

import org.jsonq.common.repository.po.Entity;

import javax.persistence.Table;


/**
 * @author jq
 * @date 2018/3/15
 */
@Table(name = "async_wx_public")
public class AsyncWxPublicPo extends Entity {

    public enum ColumnName {
        id("id"),
        publicName("publicName"),
        isSearch("isSearch"),
        isDelete("isDelete"),
        others("others"),
        createTime("createTime"),
        updateTime("updateTime");
        private final String value;

        ColumnName(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        // QueryParam转Example用
        @Override
        public String toString() {
            return this.value;
        }
    }

    private String publicName;
    private Byte isSearch;
    private String nonce;
    private String xyz;
    private String orderBy;
    private String filter;


    public String getNonce() {
        return nonce;
    }

    public void setNonce(String nonce) {
        this.nonce = nonce;
    }

    public String getXyz() {
        return xyz;
    }

    public void setXyz(String xyz) {
        this.xyz = xyz;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public String getPublicName() {
        return publicName;
    }

    public void setPublicName(String publicName) {
        this.publicName = publicName;
    }

    public Byte getIsSearch() {
        return isSearch;
    }

    public void setIsSearch(Byte isSearch) {
        this.isSearch = isSearch;
    }
}
