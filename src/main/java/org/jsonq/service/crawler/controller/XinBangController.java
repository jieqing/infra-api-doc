package org.jsonq.service.crawler.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.service.crawler.api.dto.AsyncWxPublicDto;
import org.jsonq.service.crawler.api.dto.XinBangGzhDto;
import org.jsonq.service.crawler.api.ifacade.IAsyncWxPublicFacade;
import org.jsonq.service.crawler.api.ifacade.ICrawlerXinBangFacade;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


/**
 * @author jq
 */
@RestController
@RequestMapping(value = "/gzh")
public class XinBangController {

    private Logger logger = LogManager.getLogger(XinBangController.class);

    @Resource
    private ICrawlerXinBangFacade crawlerXinBangFacade;
    @Resource
    private IAsyncWxPublicFacade asyncWxPublicFacade;

    @RequestMapping(value = "/xb/search", method = RequestMethod.GET)
    public List<XinBangGzhDto> listWithChild(@RequestParam String publicName, @RequestParam String nonce,
                                             @RequestParam String xyz, @RequestParam String order, @RequestParam String filter)
            throws Exception {
        return crawlerXinBangFacade.search(publicName, nonce, xyz, order, filter);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public int update(@RequestBody XinBangGzhDto dto) {
        return crawlerXinBangFacade.updateById(dto);
    }


    @RequestMapping(value = "/saveAsyncNames", method = RequestMethod.POST)
    public int saveAsyncNames(@RequestBody List<AsyncWxPublicDto> list) {
        return asyncWxPublicFacade.addBatch(list);
    }

    @RequestMapping(value = "/getAsyncAll", method = RequestMethod.GET)
    public String saveAsyncNames() {
        List<AsyncWxPublicDto> all = asyncWxPublicFacade.getAll();
        StringBuilder names = new StringBuilder();
        for (AsyncWxPublicDto asyncWxPublicDto : all) {
            names.append(asyncWxPublicDto.getPublicName());
        }
        return names.toString();
    }

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
