package org.jasonq.service.crawler.po;

import org.jasonq.common.repository.po.Entity;

import javax.persistence.Column;
import javax.persistence.Table;



/**
 * @author jq
 * @date 2018/3/6
 */
@Table(name = "dictionary")
public class DictionaryPo extends Entity {

    public enum ColumnName {
        id("id"),
        parentCode("parentCode"),
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

    @Column
    private String parentCode;
    @Column
    private String code;
    @Column
    private String name;
    @Column
    private String value;
    @Column
    private String description;
    @Column
    private Integer level;
    @Column
    private Integer sort;
    @Column
    private String imgUrl;
    @Column
    private Byte isOnline;

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode == null ? null : parentCode.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value == null ? null : value.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl == null ? null : imgUrl.trim();
    }

    public Byte getIsOnline() {
        return isOnline;
    }

    public void setIsOnline(Byte isOnline) {
        this.isOnline = isOnline;
    }

}