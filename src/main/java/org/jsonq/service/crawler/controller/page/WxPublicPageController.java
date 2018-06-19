package org.jsonq.service.crawler.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 小程序案例管理
 * 
 * @author jq
 *
 */
@Controller
 @RequestMapping(value = "gzh")
public class WxPublicPageController {

    @RequestMapping(value = "/list")
    public String xbIndex() {
        return "gzh/wxPublic";
    }

}
