package org.jasonq.service.crawler.core.service;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.common.util.StreamUtil;
import org.jasonq.common.util.StringUtil;
import org.jasonq.service.crawler.core.po.CompanyPo;
import org.jasonq.service.crawler.core.po.WxPublicPo;
import org.jsoup.Connection;
import org.jsoup.helper.HttpConnection;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;


/**
 * 小程序案例管理
 * 
 * @author jq
 *
 */
@Service
public class CrawlerXinBangService {

    private Logger logger = LogManager.getLogger(CrawlerXinBangService.class);

    String QCC_SEARCH_URL = "http://www.qichacha.com/search?key=%s";
    String QCC_GZ_COOKIE =
            // "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd;
            // hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK;
            // _uab_collina=152099036045208248024076;
            // acw_sc__=5aa8d3fb169ede7a02cec39eee2d8ba31ea6d2a4;
            // _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49;
            // PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3;
            // zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D;
            // zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521010775625%2C%22updated%22%3A%201521014035367%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D;
            // CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521009760;
            // Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754;
            // Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521014036";
            "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; _uab_collina=152099036045208248024076; acw_tc=AQAAAGIrcBzCEQEATRxWy2/9IJpjJT5l; hasShow=1; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521621536622%2C%22updated%22%3A%201521623834695%2C%22info%22%3A%201521599693650%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22192.168.1.141%3A28026%22%2C%22cuid%22%3A%20%222c3c28a65227bdf998c461b0d121ba64%22%7D; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521619780; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1521623694,1521623724,1521623729,1521623787; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521623835; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C9B3252533BB9A18BBB457FD38C2FB8E8; PHPSESSID=pcc5vruj0ghj77togerhetnom1";
    String QCC_ZS_COOKIE =
            "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521008005; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521011043; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521010775625%2C%22updated%22%3A%201521011052085%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D";

    @Resource
    private CompanyService companyService;
    @Resource
    private WxPublicService wxPublicService;

    public List<WxPublicPo> searchByXinBang(String url) throws Exception {
        List<WxPublicPo> resultList = Lists.newArrayList();
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("content-type", "application/json;charset=UTF-8");
        conn.setRequestProperty("Cookie",
            "ticket=gQFe8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAySlVOWDE3a0ljbTMxRm80RTFxMVcAAgRIdqhaAwQQDgAA; openid=oFCwWw8XrpNOWaPYa6cvnV3dnuuo; token=95E757051ADC698A3DFDAA819FFFA184; tt_token=true; UM_distinctid=162220d9a1420-0edcf62d5a101f-5e183017-13c680-162220d9a1555b; __root_domain_v=.newrank.cn; ticket=gQFe8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAySlVOWDE3a0ljbTMxRm80RTFxMVcAAgRIdqhaAwQQDgAA; openid=oFCwWw8XrpNOWaPYa6cvnV3dnuuo; token=95E757051ADC698A3DFDAA819FFFA184; tt_token=true; CNZZDATA1253878005=735019981-1520988390-https%253A%252F%252Fwww.baidu.com%252F%7C1520988390; Hm_lvt_a19fd7224d30e3c8a6558dcb38c4beed=1520989745,1520989983,1520993101; Hm_lpvt_a19fd7224d30e3c8a6558dcb38c4beed=1520993101; _qddaz=QD.6c7sqj.66jxvs.jeqe0rr3; _qdda=3-1.1g6dvl; _qddab=3-x0g34a.jeqg0stv");
        InputStream inStream = conn.getInputStream();
        byte[] bytes = StreamUtil.readInputStream(inStream);
        String result = new String(bytes);
        JSONObject parse = (JSONObject) JSONObject.parse(result);
        if (parse != null && parse.getString("success").equals("true")) {
            JSONArray datas = parse.getJSONObject("value").getJSONArray("result");
            for (Object data : datas) {
                JSONObject jsonObject = (JSONObject) data;
                WxPublicPo wxPublicPo = new WxPublicPo();
                String name = jsonObject.getString("name");
                if (StringUtil.isNotEmpty(name)) {
                    wxPublicPo.setPublicName(name.replace("#font", "").replace("@font", ""));
                }
                wxPublicPo.setWxNo(jsonObject.getString("account"));
                String description = jsonObject.getString("description");
                if (StringUtil.isNotEmpty(description)) {
                    wxPublicPo.setIntroduce(description.replace("#font", "").replace("@font", ""));
                }
                wxPublicPo.setType(jsonObject.getString("type"));
                String tags = jsonObject.getString("tags");
                if (StringUtil.isNotEmpty(tags)) {
                    wxPublicPo.setTags(tags.replace("#font", "").replace("@font", ""));
                }
                wxPublicPo.setCity(jsonObject.getString("city"));
                wxPublicPo.setImgUrl(jsonObject.getString("indexUrl"));
                wxPublicPo.setCodeImageUrl(jsonObject.getString("codeImageUrl"));
                wxPublicPo.setHotNum(jsonObject.getDouble("weekLog1pmark"));
                wxPublicPo.setAvgReadAll(jsonObject.getDouble("avg_read_all"));
                String certifiedText = jsonObject.getString("certifiedText");
                if (StringUtil.isNotEmpty(certifiedText)) {
                    wxPublicPo.setCertifiedCompany(certifiedText.replace("微信认证：", "").trim());
                }
                resultList.add(wxPublicPo);
            }
        }
        return resultList;
    }

    /**
     * 控制爬企业的速度，企业信息不好爬，容易被封
     * 
     * @param searchCompanyName
     * @return
     */
    synchronized public CompanyPo crawlerCompanyInfo(String searchCompanyName) {
        if (StringUtil.isEmpty(searchCompanyName)) {
            return null;
        }
        CompanyPo dbCompanyPo = companyService.selectByName(searchCompanyName);
        if (dbCompanyPo != null) {
            return dbCompanyPo;
        }

        WxPublicPo wxPublicPo = wxPublicService.selectByCertifiedCompany(searchCompanyName);
        if (wxPublicPo != null && Objects.equals(wxPublicPo.getCompanyId(), -1L)) {
            return null;
        }

        try {
            Connection con = HttpConnection
                .connect(String.format(QCC_SEARCH_URL, URLEncoder.encode(searchCompanyName, "UTF-8")));
            con.header("Accept",
                " text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            con.header("Accept-Language", " zh-CN,zh;q=0.9,en;q=0.8");
            con.header("User-Agent",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36");
            con.header("Accept-Encoding", " gzip, deflate");
            con.header("Connection", "Keep-Alive");
            con.header("Host", "www.qichacha.com");
            con.header("Cookie", QCC_GZ_COOKIE);
            con.timeout(5000);
            Document document = con.get();
            Elements companyElem = document.select(".m_srchList tbody tr");
            if (companyElem.isEmpty()) {
                logger.error("企查查找不到企业信息");
                return null;
            }
            boolean successSearch = false;
            CompanyPo matchedCompanyPo = null;
            Iterator<Element> iterator = companyElem.iterator();
            while (iterator.hasNext()) {
                Elements companyElems = iterator.next().select("td");
                // 第一个
                String logoUrl = companyElems.get(0).select("img").attr("src");
                Element baseInfoElem = companyElems.get(1);
                String companyName = baseInfoElem.select("a").get(0).text();
                Elements companyInfo = baseInfoElem.select("p");
                String userNameInfo = companyInfo.get(0).text();
                String phoneInfo = companyInfo.get(1).text();
                String addressInfo = companyInfo.get(2).text();

                String[] split = userNameInfo.split("成立时间：");
                String createDay = split[1];
                String[] split1 = split[0].split("注册资本：");
                String registerMoney = split1[1];
                String legalPerson = split1[0].replace("法定代表人：", "");

                String[] split2 = phoneInfo.split("邮箱：");
                String email = split2[1];
                String phone = split2[0].replace("电话：", "");
                String address = addressInfo.replace("地址：", "");

                CompanyPo companyPo = new CompanyPo();
                companyPo.setLogoUrl(logoUrl);
                companyPo.setCompanyName(companyName);
                companyPo.setCreateDay(createDay);
                companyPo.setRegisterMoney(registerMoney);
                companyPo.setLegalPerson(legalPerson);
                companyPo.setEmail(email);
                companyPo.setPhone(phone);
                companyPo.setAddress(address);
                companyService.add(companyPo);

                if (!successSearch && companyName.equals(searchCompanyName)) {
                    successSearch = true;
                    matchedCompanyPo = companyPo;
                }
            }
            // 关联回公众号
            List<WxPublicPo> wxPublicPos =
                    wxPublicService.listByCertifiedCompanys(Lists.newArrayList(searchCompanyName));
            if (successSearch) {
                for (WxPublicPo publicPo : wxPublicPos) {
                    if (publicPo.getCompanyId() == null) {
                        WxPublicPo needUpdate = new WxPublicPo();
                        needUpdate.setId(publicPo.getId());
                        needUpdate.setCompanyId(matchedCompanyPo.getId());
                        wxPublicService.updateById(needUpdate);
                    }
                }
            }
            else {
                for (WxPublicPo publicPo : wxPublicPos) {
                    if (publicPo.getCompanyId() == null) {
                        WxPublicPo needUpdate = new WxPublicPo();
                        needUpdate.setId(publicPo.getId());
                        needUpdate.setCompanyId(-1L);
                        wxPublicService.updateById(needUpdate);
                    }
                }
            }

            if (successSearch) {
                return matchedCompanyPo;
            }
            else {
                return null;
            }
        }
        catch (Exception e) {
            logger.error("爬企业信息出错", e);
        }
        return null;
    }
}
