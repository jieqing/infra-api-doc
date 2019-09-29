package org.jsonq.infra.api.doc.controller.param;

import lombok.Data;
import org.jsonq.infra.api.doc.po.ApiParameterValue;

import java.util.List;

/**
 * @author jq
 * @date 2018/08/06
 */
@Data
public class ParameterValueAddParam {

    private List<ApiParameterValue> apiParameterValueList;
    private ApiParameterValue headers;
    private Long userId;
    private Long urlId;

}
