package org.jsonq.infra.api.doc.core.po;

import org.jsonq.common.repository.po.Entity;

import javax.persistence.Table;


/**
 * @author jq
 * @date 2018/3/15
 */
@Table(name = "geog_village")
public class GeogVillagePo extends Entity {

    public enum ColumnName {
        id("id"),
        name("name"),
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

    private String name;
    private Byte isSearch;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Byte getIsSearch() {
        return isSearch;
    }

    public void setIsSearch(Byte isSearch) {
        this.isSearch = isSearch;
    }
}
