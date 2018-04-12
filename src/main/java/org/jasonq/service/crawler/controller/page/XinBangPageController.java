package org.jasonq.service.crawler.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 小程序案例管理
 * 
 * @author jq
 *
 */
@Controller
// @RequestMapping(value = "gzh")
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
