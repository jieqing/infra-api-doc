package org.jasonq.service.crawler;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;

import org.jasonq.common.util.HttpUtil;
import org.jsoup.Connection;
import org.jsoup.helper.HttpConnection;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;


/**
 * @author jq
 * @date 2018/3/14
 */
public class XinBangTest {

    private String ip = "182.141.44.197:9000|115.223.239.79:9000|182.141.60.202:9000|115.223.218.66:9000";
    String QCC_SEARCH_URL = "https://www.qichacha.com/search?key=%s";
    String QCC_GZ_COOKIE =
//            "aliyungf_tc=AQAAAJMCSkaFwAgATRxWy8noF3MtwLIA; csrfToken=b-BKDLkjY_HEiS7hscTiHqho; jsid=SEM-BAIDU-PP-SY-000257; TYCID=d850bf202cea11e8b958efbdb41cbaa5; undefined=d850bf202cea11e8b958efbdb41cbaa5; ssuid=53618305; Hm_lvt_e92c8d65d92d534b0fc290df538b4758=1521624779; Hm_lpvt_e92c8d65d92d534b0fc290df538b4758=1521626850";
//"aliyungf_tc=AQAAAJMCSkaFwAgATRxWy8noF3MtwLIA; csrfToken=b-BKDLkjY_HEiS7hscTiHqho; TYCID=d850bf202cea11e8b958efbdb41cbaa5; undefined=d850bf202cea11e8b958efbdb41cbaa5; ssuid=53618305; jsid=SEM-BAIDU-PP-SY-000257; Hm_lvt_e92c8d65d92d534b0fc290df538b4758=1521624779,1521627414,1521627417; Hm_lpvt_e92c8d65d92d534b0fc290df538b4758=1521627427; token=0033279a1dbd4b8892969ab6a0b15b2e; _utm=88119db218074497881d7e5180ff7962; tyc-user-info=%257B%2522token%2522%253A%2522eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTkxMzE3MTUxOSIsImlhdCI6MTUyMTYyNzQ5MCwiZXhwIjoxNTM3MTc5NDkwfQ.9RNt0MEtTIYfEOEdplCVFZmG9YDfnCzd3xK47x58jWTwrUw0dayhiltf-HVyOTpbWnlBH0XlhTFB4M59uRyCLw%2522%252C%2522integrity%2522%253A%25220%2525%2522%252C%2522state%2522%253A%25220%2522%252C%2522vipManager%2522%253A%25220%2522%252C%2522vnum%2522%253A%25220%2522%252C%2522onum%2522%253A%25220%2522%252C%2522mobile%2522%253A%252215913171519%2522%257D; auth_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTkxMzE3MTUxOSIsImlhdCI6MTUyMTYyNzQ5MCwiZXhwIjoxNTM3MTc5NDkwfQ.9RNt0MEtTIYfEOEdplCVFZmG9YDfnCzd3xK47x58jWTwrUw0dayhiltf-HVyOTpbWnlBH0XlhTFB4M59uRyCLw";

            "PHPSESSID=m582r5cnp7jvb1vsn2ntrio4m3; UM_distinctid=1622216eda3322-0706a11c524765-5e183017-13c680-1622216eda43fd; hasShow=1; acw_tc=AQAAAFu/TwFaugwATRxWywNqApe2DgeK; _uab_collina=152099036045208248024076; zg_did=%7B%22did%22%3A%20%221622216ef3e4e9-0d49ebd2cd7264-5e183017-13c680-1622216ef3f5d2%22%7D; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201520994539306%2C%22updated%22%3A%201520994647844%2C%22info%22%3A%201520990351181%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%7D; CNZZDATA1254842228=1814222760-1520986400-https%253A%252F%252Fwww.baidu.com%252F%7C1520993404; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1520990352; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1520994648";

    @Test
    public void test() throws Exception {
        for (int i = 0; i < 1000; i++) {
            Connection con = HttpConnection
                .connect(String.format(QCC_SEARCH_URL, URLEncoder.encode("小米通讯技术有限公司长春分公司", "UTF-8")));
            con.header("Accept",
                " text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            con.header("Accept-Language", " zh-CN,zh;q=0.9,en;q=0.8");
            con.header("User-Agent",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36");
            con.header("Accept-Encoding", " gzip, deflate");
            con.header("Connection", "Keep-Alive");
            con.header("Host", "www.qichacha.com");
//            con.header("Cookie", QCC_GZ_COOKIE);
            con.timeout(5000);
            Document document = con.get();

            Elements companyElem = document.select(".m_srchList tbody tr");

            Elements firstCompany = companyElem.get(0).select("td");
            // 第一个
            String logoUrl = firstCompany.get(0).select("img").attr("src");
            Element baseInfoElem = firstCompany.get(1);
            String companyName = baseInfoElem.select("a").get(0).text();
            System.out.println(i + companyName);


            String text = document.select(".legalPersonName ").text();
            System.out.println(i + text);
        }

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
