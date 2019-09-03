package org.jsonq.infra.api.doc.controller;

import com.youanmi.scrm.commons.util.collection.CollectionUtil;
import java.util.List;
import javax.annotation.Resource;
import org.jsonq.infra.api.doc.controller.param.SendApiParam;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.jsonq.infra.api.doc.po.ApiModule;
import org.jsonq.infra.api.doc.po.ApiModuleIp;
import org.jsonq.infra.api.doc.po.ApiParameter;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.jsonq.infra.api.doc.service.ApiClassService;
import org.jsonq.infra.api.doc.service.ApiModuleIpService;
import org.jsonq.infra.api.doc.service.ApiModuleService;
import org.jsonq.infra.api.doc.service.ApiParameterService;
import org.jsonq.infra.api.doc.service.ApiUrlService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


/**
 * @author jq
 */
@RestController
public class ApiQueryController {

    @Resource
    private ApiModuleService apiModuleService;
    @Resource
    private ApiModuleIpService apiModuleIpService;
    @Resource
    private ApiClassService apiClassService;
    @Resource
    private ApiUrlService apiUrlService;
    @Resource
    private ApiParameterService apiParameterService;

    @RequestMapping(value = "/api/moduleIp/list", method = RequestMethod.GET)
    public ResponseEntity listModuleIp(@RequestParam Long moduleId, @RequestParam Long userId) {
        List<ApiModuleIp> apiModuleIps = apiModuleIpService.listByModuleId(moduleId, userId);
        return new ResponseEntity(apiModuleIps, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/module/list", method = RequestMethod.GET)
    public ResponseEntity listModule(@RequestParam Long userId) {
        List<ApiModule> apiModules = apiModuleService.listByUserId(userId);
        return new ResponseEntity(apiModules, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/class/list", method = RequestMethod.GET)
    public ResponseEntity listClass(@RequestParam Long userId,
            @RequestParam(required = false) Long moduleId,
            @RequestParam String className) {
        List<ApiModule> apiModules = apiModuleService.listByUserId(userId);
        List<Long> moduleIds = CollectionUtil.getColumnValues(apiModules, "id");
        if (moduleId != null) {
            moduleIds.add(moduleId);
        }

        List<ApiClass> apiClasses = apiClassService.listByName(className, moduleIds);
        return new ResponseEntity(apiClasses, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/url/list", method = RequestMethod.GET)
    public ResponseEntity listUrl(@RequestParam Long classId) {
        List<ApiUrl> apiUrls = apiUrlService.listByClassId(classId);
        return new ResponseEntity(apiUrls, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/parameter/list", method = RequestMethod.GET)
    public ResponseEntity listParameter(@RequestParam Long urlId, @RequestParam Byte type,
            @RequestParam Long userId) {
        List<ApiParameter> apiParameters = apiParameterService.listByUrlId(urlId, type, userId);
        return new ResponseEntity(apiParameters, HttpStatus.OK);
    }


    @RequestMapping(value = "/api/sendApi", method = RequestMethod.POST)
    public ResponseEntity listParameter(@RequestBody SendApiParam param) {
        return new ResponseEntity(
                new RestTemplate().postForObject(param.getUrl(), param.getParam(), Object.class),
                HttpStatus.OK);
    }
}
