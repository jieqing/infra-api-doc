package org.jsonq.infra.api.doc.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 快速查询已经在数据库中的公众号信息
 * 
 * @author jq
 *
 */
@Controller
public class ApiPageController {

    @RequestMapping(value = "/api/index")
    public String xbIndex() {
        return "api/index";
    }

}
