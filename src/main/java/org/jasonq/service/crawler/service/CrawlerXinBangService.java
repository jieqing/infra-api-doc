package org.jasonq.service.crawler.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import org.jasonq.common.util.StreamUtil;
import org.jasonq.common.util.StringUtil;
import org.jasonq.common.util.collection.CollectionUtil;
import org.jasonq.common.util.collection.Lists;
import org.jasonq.service.crawler.dto.QiChaChaDto;
import org.jasonq.service.crawler.dto.XinBangGzhDto;
import org.jasonq.service.crawler.repository.DictionaryRepository;
import org.jsoup.Connection;
import org.jsoup.helper.HttpConnection;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


/**
 * 小程序案例管理
 * 
 * @author jq
 *
 */
@Service
public class CrawlerXinBangService {

    private static final Logger logger = LoggerFactory.getLogger(DictionaryRepository.class);

    String XB_SEARCH_URL =
            "https://www.newrank.cn/xdnphb/data/weixinuser/searchWeixinDataByCondition?hasDeal=false&keyName=%s&filter=nickname&order=NRI"
                    + "&nonce=%s&xyz=%s";
    String QCC_SEARCH_URL = "http://www.qichacha.com/search?key=%s";
    String QCC_GZ_COOKIE =
            "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; acw_sc__=5aa8d3fb169ede7a02cec39eee2d8ba31ea6d2a4; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49; PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521010775625%2C%22updated%22%3A%201521014035367%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521009760; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521014036";
    String QCC_ZS_COOKIE =
            "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521008005; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521011043; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521010775625%2C%22updated%22%3A%201521011052085%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D";

    public List<XinBangGzhDto> search(String key, String nonce, String xyz) throws Exception {
        // key = URLEncoder.encode(key, "UTF-8");
        List<XinBangGzhDto> xinBangGzhDtos = searchByXinBang(String.format(XB_SEARCH_URL, key, nonce, xyz));
        if (CollectionUtil.isEmpty(xinBangGzhDtos)) {
            return xinBangGzhDtos;
        }
        // 只取前10条
        xinBangGzhDtos = xinBangGzhDtos.subList(0, Math.min(10, xinBangGzhDtos.size()));
        buildQiChaChaInfo(xinBangGzhDtos);
        return xinBangGzhDtos;
    }

    private void buildQiChaChaInfo(List<XinBangGzhDto> xinBangGzhDtos) throws IOException {
        for (XinBangGzhDto xinBangGzhDto : xinBangGzhDtos) {
            if (StringUtil.isEmpty(xinBangGzhDto.getCertifiedCompany())) {
                return;
            }
            try {
                Connection con = HttpConnection.connect(String.format(QCC_SEARCH_URL,
                    URLEncoder.encode(xinBangGzhDto.getCertifiedCompany(), "UTF-8")));
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
                    continue;
                }
                Elements firstCompany = companyElem.get(0).select("td");
                // 第一个
                String logoUrl = firstCompany.get(0).select("img").attr("src");
                Element baseInfoElem = firstCompany.get(1);
                String companyName = baseInfoElem.select("a").get(0).text();
                if(!companyName.equals(xinBangGzhDto.getCertifiedCompany())){
                    continue;
                }
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

                QiChaChaDto qiChaChaDto = new QiChaChaDto();
                qiChaChaDto.setLogoUrl(logoUrl);
                qiChaChaDto.setCompanyName(companyName);
                qiChaChaDto.setCreateDay(createDay);
                qiChaChaDto.setRegisterMoney(registerMoney);
                qiChaChaDto.setLegalPerson(legalPerson);
                qiChaChaDto.setEmail(email);
                qiChaChaDto.setPhone(phone);
                qiChaChaDto.setAddress(address);
                xinBangGzhDto.setQiChaChaDto(qiChaChaDto);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private List<XinBangGzhDto> searchByXinBang(String url) throws Exception {
        List<XinBangGzhDto> resultList = Lists.newArrayList();
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
                XinBangGzhDto xinBangGzhDto = new XinBangGzhDto();
                String name = jsonObject.getString("name");
                if (StringUtil.isNotEmpty(name)) {
                    xinBangGzhDto.setGzhName(name.replace("#font", "").replace("@font", ""));
                }
                xinBangGzhDto.setWxNo(jsonObject.getString("account"));
                String description = jsonObject.getString("description");
                if (StringUtil.isNotEmpty(description)) {
                    xinBangGzhDto.setIntroduce(description.replace("#font", "").replace("@font", ""));
                }
                xinBangGzhDto.setType(jsonObject.getString("type"));
                String tags = jsonObject.getString("tags");
                if (StringUtil.isNotEmpty(tags)) {
                    xinBangGzhDto.setTags(tags.replace("#font", "").replace("@font", ""));
                }
                xinBangGzhDto.setCity(jsonObject.getString("city"));
                xinBangGzhDto.setImgUrl(jsonObject.getString("indexUrl"));
                xinBangGzhDto.setHotNum(jsonObject.getDouble("weekLog1pmark"));
                xinBangGzhDto.setAvgReadAll(jsonObject.getDouble("avg_read_all"));
                String certifiedText = jsonObject.getString("certifiedText");
                if (StringUtil.isNotEmpty(certifiedText)) {
                    xinBangGzhDto.setCertifiedCompany(certifiedText.replace("微信认证：", ""));
                }
                resultList.add(xinBangGzhDto);
            }
        }
        return resultList;
    }

}
