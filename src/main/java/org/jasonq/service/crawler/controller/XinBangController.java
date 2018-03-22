package org.jasonq.service.crawler.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasonq.service.crawler.api.dto.XinBangGzhDto;
import org.jasonq.service.crawler.facade.CrawlerXinBangFacade;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * 小程序案例管理
 * 
 * @author jq
 *
 */
@RestController
@RequestMapping(value = "/gzh")
public class XinBangController {

    private Logger logger = LogManager.getLogger(XinBangController.class);

    @Resource
    private CrawlerXinBangFacade crawlerXinBangFacade;

    @RequestMapping(value = "/xb/search", method = RequestMethod.GET)
    public List<XinBangGzhDto> listWithChild(@RequestParam String publicName, @RequestParam String nonce,
            @RequestParam String xyz, @RequestParam String order, @RequestParam String filter)
            throws Exception {
        return crawlerXinBangFacade.search(publicName, nonce, xyz, order, filter);
    }

    // @RequestMapping(value = "/update", method = RequestMethod.POST)
    // public int update(@RequestBody DictionaryPo po) {
    // return service.updateById(po);
    // }
    //
    // @RequestMapping(value = "/add", method = RequestMethod.POST)
    // public int add(@RequestBody DictionaryPo po) {
    // return service.add(po);
    // }
    //
    // @RequestMapping(value = "/delete", method = RequestMethod.POST)
    // public int delete(@RequestParam String id) throws Exception {
    // return service.deleteById(id);
    // }

}
