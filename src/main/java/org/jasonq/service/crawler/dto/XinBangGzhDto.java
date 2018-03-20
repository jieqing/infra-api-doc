package org.jasonq.service.crawler.dto;

import org.jasonq.common.repository.po.Entity;


/**
 * @author jq
 * @date 2018/3/15
 */
public class XinBangGzhDto extends Entity {
    private String gzhName;
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

    private QiChaChaDto qiChaChaDto = new QiChaChaDto();

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

    public QiChaChaDto getQiChaChaDto() {
        return qiChaChaDto;
    }

    public void setQiChaChaDto(QiChaChaDto qiChaChaDto) {
        this.qiChaChaDto = qiChaChaDto;
    }

    public String getGzhName() {
        return gzhName;
    }

    public void setGzhName(String gzhName) {
        this.gzhName = gzhName;
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
