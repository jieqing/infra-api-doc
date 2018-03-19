package org.jasonq.service.crawler.controller;

import java.util.List;

import javax.annotation.Resource;

import org.jasonq.service.crawler.dto.XinBangGzhDto;
import org.jasonq.service.crawler.service.CrawlerXinBangService;
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

    @Resource
    private CrawlerXinBangService crawlerXinBangService;

    @RequestMapping(value = "/xb/search", method = RequestMethod.GET)
    public List<XinBangGzhDto> listWithChild(@RequestParam String gzhName, @RequestParam String nonce,
            @RequestParam String xyz) throws Exception {
        return crawlerXinBangService.search(gzhName, nonce, xyz);
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
