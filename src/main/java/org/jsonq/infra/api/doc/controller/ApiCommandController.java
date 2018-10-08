package org.jsonq.infra.api.doc.controller;

import javax.annotation.Resource;
import org.jsonq.infra.api.doc.controller.param.ParameterValueAddParam;
import org.jsonq.infra.api.doc.service.ApiClassService;
import org.jsonq.infra.api.doc.service.ApiModuleIpService;
import org.jsonq.infra.api.doc.service.ApiModuleService;
import org.jsonq.infra.api.doc.service.ApiParameterValueService;
import org.jsonq.infra.api.doc.service.ApiUrlService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * CQRS架构，读写分离
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
    private ApiParameterValueService apiParameterValueService;

    @RequestMapping(value = "/api/parameterValue/replace", method = RequestMethod.POST)
    public ResponseEntity replaceParameterValue(@RequestBody ParameterValueAddParam param) {
        apiParameterValueService.replaceList(param.getApiParameterValueList(), param.getUserId());
        return new ResponseEntity(HttpStatus.OK);
    }

}
