package org.jasonq.service.crawler.core.po;

import org.jasonq.common.repository.po.Entity;

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
