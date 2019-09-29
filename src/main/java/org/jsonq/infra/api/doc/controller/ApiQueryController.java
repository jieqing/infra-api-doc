package org.jsonq.infra.api.doc.controller;

import com.google.common.collect.Maps;
import com.youanmi.commons.base.annotation.ApiDoc;
import com.youanmi.commons.base.vo.ResultDto;
import com.youanmi.scrm.commons.util.collection.MapUtil;
import org.apache.commons.lang.StringUtils;
import org.jsonq.infra.api.doc.controller.param.SendApiParam;
import org.jsonq.infra.api.doc.po.*;
import org.jsonq.infra.api.doc.service.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


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
    public ResultDto listUrl(@RequestParam(required = false) Long classId, @RequestParam(required = false) String urlName) {
        List<ApiUrl> apiUrls = apiUrlService.listByClassId(classId, urlName);
        return ResultDto.success(apiUrls);
    }

    @RequestMapping(value = "/api/parameter/list", method = RequestMethod.GET)
    public ResultDto listParameter(@RequestParam Long urlId, @RequestParam(required = false) Byte type) {
        Map<String, Object> result = Maps.newHashMap();
        List<ApiParameter> apiParameters = apiParameterService.listByUrlId(urlId, type);
        Map<String, ApiParameter> nameMap = MapUtil.toMap(apiParameters, "name");
        ApiParameter headers = nameMap.get("headers");
        if (headers != null) {
            result.put("headers", headers);
            apiParameters.remove(headers);
        }
        result.put("list", apiParameters);
        return ResultDto.success(result);
    }

    @RequestMapping(value = "/api/sendApi", method = RequestMethod.POST)
    public ResultDto listParameter(@RequestBody SendApiParam param) {
        String headers = param.getHeaders();
        HttpHeaders requestHeaders = new HttpHeaders();
        if (StringUtils.isNotEmpty(headers)) {
            String[] split = headers.split("\n");
            for (String a : split) {
                String[] b = a.split(":");
                requestHeaders.add(b[0].trim(), b[1].trim());
            }
        }
        RestTemplate template = new RestTemplate();
        HttpEntity<Object> requestEntity = new HttpEntity<>(param.getParam(), requestHeaders);
        ResponseEntity<Object> responseEntity = template.exchange(param.getUrl(), HttpMethod.POST, requestEntity, Object.class);
        return ResultDto.success(responseEntity.getBody());
    }
}
