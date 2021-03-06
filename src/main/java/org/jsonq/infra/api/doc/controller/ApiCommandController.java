package org.jsonq.infra.api.doc.controller;

import com.youanmi.commons.base.vo.ResultDto;
import org.apache.commons.lang.StringUtils;
import org.jsonq.infra.api.doc.controller.param.IdsParam;
import org.jsonq.infra.api.doc.controller.param.ParameterValueAddParam;
import org.jsonq.infra.api.doc.po.*;
import org.jsonq.infra.api.doc.service.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;


/**
 * CQRS架构，读写分离
 *
 * @author jq
 */
@RestController
public class ApiCommandController {

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
    @Resource
    private ApiParameterValueService apiParameterValueService;

    @RequestMapping(value = "/api/parameterValue/replace", method = RequestMethod.POST)
    public ResultDto<Void> replaceParameterValue(@RequestBody ParameterValueAddParam param) {
        ApiParameterValue headers = param.getHeaders();
        if (headers != null && StringUtils.isNotEmpty(headers.getValue())) {
            if (headers.getParameterId() == null) {
                ApiParameter apiParameter = new ApiParameter();
                apiParameter.setUrlId(param.getUrlId());
                apiParameter.setName("headers");
                Long parameterId = apiParameterService.replace(apiParameter);
                headers.setParameterId(parameterId);
            }
            param.getApiParameterValueList().add(headers);
        }
        apiParameterValueService.replaceList(param.getApiParameterValueList());
        return ResultDto.success();
    }

    @RequestMapping(value = "/api/module/replace", method = RequestMethod.POST)
    public ResultDto<Long> replaceModule(@RequestBody ApiModule param) {
        Long id = apiModuleService.replaceByName(param.getName(), param.getDescription());
        return ResultDto.success(id);
    }

    @RequestMapping(value = "/api/class/replace", method = RequestMethod.POST)
    public ResultDto<Long> replace(@RequestBody ApiClass param) {
        Long id = apiClassService.replaceByName(param);
        return ResultDto.success(id);
    }

    @RequestMapping(value = "/api/class/deleteByIds", method = RequestMethod.POST)
    public ResultDto<Void> deleteByIds(@RequestBody IdsParam param) {
        apiClassService.deleteByIds(param.getIds());
        return ResultDto.success();
    }

    @RequestMapping(value = "/api/url/replace", method = RequestMethod.POST)
    public ResultDto<Long> replace(@RequestBody ApiUrl param) {
        return ResultDto.success(apiUrlService.replace(param));
    }

    @RequestMapping(value = "/api/url/deleteByIds", method = RequestMethod.POST)
    public ResultDto<Void> deleteUrlByIds(@RequestBody IdsParam param) {
        apiUrlService.deleteByIds(param.getIds());
        return ResultDto.success();
    }

    @RequestMapping(value = "/api/parameter/replace", method = RequestMethod.POST)
    public ResultDto<Long> replace(@RequestBody ApiParameter param) {
        return ResultDto.success(apiParameterService.replace(param));
    }

    @RequestMapping(value = "/api/parameter/deleteByIds", method = RequestMethod.POST)
    public ResultDto<Long> replace(@RequestBody IdsParam param) {
        apiParameterService.deleteByIds(param.getIds());
        return ResultDto.success();
    }


}
