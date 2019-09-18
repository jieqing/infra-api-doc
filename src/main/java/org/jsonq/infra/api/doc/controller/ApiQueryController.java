package org.jsonq.infra.api.doc.controller;

import com.youanmi.commons.base.annotation.ApiDoc;
import com.youanmi.commons.base.vo.ResultDto;
import org.jsonq.infra.api.doc.controller.param.SendApiParam;
import org.jsonq.infra.api.doc.po.*;
import org.jsonq.infra.api.doc.service.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.List;


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

    @ApiDoc(desc = "模块对应的域名")
    @RequestMapping(value = "/api/moduleIp/list", method = RequestMethod.GET)
    public ResultDto listModuleIp(@RequestParam Long moduleId) {
        List<ApiModuleIp> apiModuleIps = apiModuleIpService.listByModuleId(moduleId);
        return ResultDto.success(apiModuleIps);
    }

    @ApiDoc(desc = "模块列表")
    @RequestMapping(value = "/api/module/list", method = RequestMethod.GET)
    public ResultDto listModule() {
        List<ApiModule> apiModules = apiModuleService.listAll();
        return ResultDto.success(apiModules);
    }

    @RequestMapping(value = "/api/class/list", method = RequestMethod.GET)
    public ResultDto listClass(@RequestParam(required = false) Long moduleId,
                               @RequestParam(required = false) String className) {
        List<ApiClass> apiClasses = apiClassService.listByName(className, moduleId);
        return ResultDto.success(apiClasses);
    }

    @RequestMapping(value = "/api/url/list", method = RequestMethod.GET)
    public ResultDto listUrl(@RequestParam Long classId) {
        List<ApiUrl> apiUrls = apiUrlService.listByClassId(classId);
        return ResultDto.success(apiUrls);
    }

    @RequestMapping(value = "/api/parameter/list", method = RequestMethod.GET)
    public ResultDto listParameter(@RequestParam Long urlId, @RequestParam Byte type) {
        List<ApiParameter> apiParameters = apiParameterService.listByUrlId(urlId, type);
        return ResultDto.success(apiParameters);
    }

    @RequestMapping(value = "/api/sendApi", method = RequestMethod.POST)
    public ResultDto listParameter(@RequestBody SendApiParam param) {

        return ResultDto.success(new RestTemplate().postForObject(param.getUrl(), param.getParam(), Object.class));
    }
}
