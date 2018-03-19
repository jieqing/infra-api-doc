package org.jasonq.service.crawler;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;

import org.jasonq.common.util.HttpUtil;
import org.jsoup.Connection;
import org.jsoup.helper.HttpConnection;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;

import com.alibaba.fastjson.JSONObject;


/**
 * @author jq
 * @date 2018/3/14
 */
public class XinBangTest {

    private String ip = "182.141.44.197:9000|115.223.239.79:9000|182.141.60.202:9000|115.223.218.66:9000";

    private String createNonce() {
        String[] a =
                new String[] {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};
        String c = "";
        // for (int b = 0; b < 500; b++){
        int e = 0;
        for (int d = 0; d < 9; d++) {
            e = (int) Math.floor(16 * Math.random());
        }
        c += a[e];
        // }
        return c;
    }

    private String creatXyz(String key) {
        String format = String
            .format("/xdnphb/index/getAutocompleteAccount?AppKey=joker&keyword=%s&nonce=8f44b75a9", key);
        return getMD5(format);
    }

    /**
     * 对字符串md5加密(小写+字母)
     *
     * @param str 传入要加密的字符串
     * @return MD5加密后的字符串
     */
    public String getMD5(String str) {
        try {
            // 生成一个MD5加密计算摘要
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 计算md5函数
            md.update(str.getBytes());
            // digest()最后确定返回md5 hash值，返回值为8为字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
            // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
            return new BigInteger(1, md.digest()).toString(16);
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Test
    public void test() throws Exception {
        // String decode = URLDecoder.decode("%u5B9C%u6625", "UTF-8");

        String nonce = createNonce();
        String urlStr =
                // "https://www.newrank.cn/xdnphb/data/weixinuser/searchWeixinDataByCondition?hasDeal=false&keyName=%E5%AE%9C%E6%98%A5&filter=&order=NRI&nonce=8f44b75a9&xyz=aa2e01f7325d0fed7715245c897a0a1f";
                "https://www.newrank.cn/xdnphb/data/weixinuser/searchWeixinDataByCondition?hasDeal=false&keyName=汽车&filter=&order=NRI&nonce=8f44b75a9&xyz=aa2e01f7325d0fed7715245c897a0a1f";
        String url =
                "http://www.qichacha.com/search?key=%E5%B9%BF%E4%B8%9C%E5%B9%BF%E6%92%AD%E7%94%B5%E8%A7%86%E5%8F%B0";

        String creatXyz = creatXyz("%E6%B1%BD%E8%BD%A6");
        // for (int i = 0; i < 10000000; i++) {
        getDocumentBySouGou(urlStr);
        // }

        // for (int i = 0; i < 10000000; i++) {
        try {
            // setProxy();
            Connection con = HttpConnection.connect(url);
            con.header("Accept",
                " text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            con.header("Accept-Language", " zh-CN,zh;q=0.9,en;q=0.8");
            con.header("User-Agent",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36");
            con.header("Accept-Encoding", " gzip, deflate");
            con.header("Connection", "Keep-Alive");
            con.header("Host", "www.qichacha.com");
            String s2 =
                    "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; acw_sc__=5aa8d3fb169ede7a02cec39eee2d8ba31ea6d2a4; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49; PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521010775625%2C%22updated%22%3A%201521014035367%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521009760; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521014036";
            String s1 =
                    "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521008005; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521011043; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521010775625%2C%22updated%22%3A%201521011052085%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D";
            String s =
                    "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49; PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201520994539306%2C%22updated%22%3A%201520997824699%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22cuid%22%3A%20%223db1095e98c1f2ce19bf6321243e740e%22%7D; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1520997205; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1520997825";
            String c =
                    "PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201520994539306%2C%22updated%22%3A%201520994647844%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%7D; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1520993404; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1520994648";
            String myzs =
                    "UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; _umdata=65F7F3A2F63DF020D114541B4DCEBCBE5E475EC44EDB2AE89A14B210CEC350946AF820144B755070CD43AD3E795C914C2C2C6876544D5A807978A1C0AA56CA49; acw_sc__=5aa8d3fb169ede7a02cec39eee2d8ba31ea6d2a4; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1521009760; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201521010775625%2C%22updated%22%3A%201521013757756%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%222c3c28a65227bdf998c461b0d121ba64%22%7D; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352,1520997754; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1521013758";
            con.header("Cookie", s2);
            con.timeout(50000);
            Document document = con.get();
            // 便利
            Elements select = document.select(".m_srchList tbody tr");
            Element element1 = select.get(0);
            // 固定1
            Element element = element1.select("td").get(1);
            Element a = element.select("a").get(0);
            String text1 = a.text();
            Elements em = a.select("em");
            String text = em.text();
            Element p = element.select("p").get(0);
            String userName = p.text();
            String phone = element.select("p").get(1).text();
            String phone1 = element.select("p").get(2).text();
            System.out.print(phone);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        // }
    }

    private void getDocumentBySouGou(String urlStr) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("content-type", "application/json;charset=UTF-8");
        conn.setRequestProperty("Cookie",
            "ticket=gQFe8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAySlVOWDE3a0ljbTMxRm80RTFxMVcAAgRIdqhaAwQQDgAA; openid=oFCwWw8XrpNOWaPYa6cvnV3dnuuo; token=95E757051ADC698A3DFDAA819FFFA184; tt_token=true; UM_distinctid=162220d9a1420-0edcf62d5a101f-5e183017-13c680-162220d9a1555b; __root_domain_v=.newrank.cn; ticket=gQFe8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAySlVOWDE3a0ljbTMxRm80RTFxMVcAAgRIdqhaAwQQDgAA; openid=oFCwWw8XrpNOWaPYa6cvnV3dnuuo; token=95E757051ADC698A3DFDAA819FFFA184; tt_token=true; CNZZDATA1253878005=735019981-1520988390-https%253A%252F%252Fwww.baidu.com%252F%7C1520988390; Hm_lvt_a19fd7224d30e3c8a6558dcb38c4beed=1520989745,1520989983,1520993101; Hm_lpvt_a19fd7224d30e3c8a6558dcb38c4beed=1520993101; _qddaz=QD.6c7sqj.66jxvs.jeqe0rr3; _qdda=3-1.1g6dvl; _qddab=3-x0g34a.jeqg0stv");
        InputStream inStream = conn.getInputStream();
        byte[] bytes = readInputStream(inStream);
        String result = new String(bytes);
        JSONObject parse = (JSONObject) JSONObject.parse(result);
        String success = parse.getString("success");
        parse.toString();
    }

    static byte[] readInputStream(InputStream inStream) throws Exception {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = inStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, len);
        }
        inStream.close();
        return outStream.toByteArray();
    }

    private int ipIndex = 0;

    private void setProxy() {
        String[] split = ip.split("\\|");
        String ipPort = split[(ipIndex++) % 4];
        HttpUtil.setProxy(ipPort);
    }
}
