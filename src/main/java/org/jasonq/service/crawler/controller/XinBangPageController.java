package org.jasonq.service.crawler.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


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

}
