package org.jasonq.service.crawler.core.po;

import javax.persistence.Table;
import javax.persistence.Transient;

import org.jasonq.common.repository.po.Entity;


/**
 * @author jq
 * @date 2018/3/15
 */
@Table(name = "wx_public")
public class WxPublicPo extends Entity {

    public enum ColumnName {
        id("id"),
        wxNo("wxNo"),
        publicName("publicName"),
        certifiedCompany("certifiedCompany"),
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
    private String wxNo;
    private String introduce;
    private String type;
    private String tags;
    private Double hotNum;
    private String imgUrl;
    private String codeImageUrl;
    private Double avgReadAll;
    private String city;
    private String certifiedCompany;
    private Long companyId;
    private Byte isCall;
    private Byte isCooperate;

    @Transient
    private CompanyPo companyPo;

    public Byte getIsCall() {
        return isCall;
    }

    public void setIsCall(Byte isCall) {
        this.isCall = isCall;
    }

    public Byte getIsCooperate() {
        return isCooperate;
    }

    public void setIsCooperate(Byte isCooperate) {
        this.isCooperate = isCooperate;
    }

    public CompanyPo getCompanyPo() {
        return companyPo;
    }

    public void setCompanyPo(CompanyPo companyPo) {
        this.companyPo = companyPo;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCodeImageUrl() {
        return codeImageUrl;
    }

    public void setCodeImageUrl(String codeImageUrl) {
        this.codeImageUrl = codeImageUrl;
    }

    public String getCertifiedCompany() {
        return certifiedCompany;
    }

    public void setCertifiedCompany(String certifiedCompany) {
        this.certifiedCompany = certifiedCompany;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getAvgReadAll() {
        return avgReadAll;
    }

    public void setAvgReadAll(Double avgReadAll) {
        this.avgReadAll = avgReadAll;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPublicName() {
        return publicName;
    }

    public void setPublicName(String publicName) {
        this.publicName = publicName;
    }

    public String getWxNo() {
        return wxNo;
    }

    public void setWxNo(String wxNo) {
        this.wxNo = wxNo;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Double getHotNum() {
        return hotNum;
    }

    public void setHotNum(Double hotNum) {
        this.hotNum = hotNum;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
