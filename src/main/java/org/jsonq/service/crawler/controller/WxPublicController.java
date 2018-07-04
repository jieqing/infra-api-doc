package org.jsonq.service.crawler.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.service.crawler.api.ifacade.IWxPublicFacade;
import org.jsonq.service.crawler.api.param.WxPublicPageParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;


/**
 * @author jq
 */
@RestController
@RequestMapping(value = "/gzh")
public class WxPublicController {

    private Logger logger = LogManager.getLogger(WxPublicController.class);

    @Resource
    private IWxPublicFacade wxPublicFacade;

    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public ResponseEntity listWithChild(@RequestBody WxPublicPageParam pageParam) throws Exception {
        return new ResponseEntity(wxPublicFacade.pageByName(pageParam.getPublicName(), pageParam.getPageIndex(), pageParam.getPageSize()), HttpStatus.OK);
    }

}
