package org.jsonq.infra.api.doc.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 爬虫新榜公众号信息
 * @author jq
 *
 */
@Controller
public class XinBangPageController {

    @RequestMapping(value = "/gzh")
    public String xbIndex() {
        return "gzh/xinbang";
    }


    @RequestMapping(value = "/gzhlixian")
    public String asyncPublicSearch() {
        return "gzh/asyncPublicSearch";
    }

}
