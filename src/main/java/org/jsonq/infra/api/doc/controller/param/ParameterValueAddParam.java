package org.jsonq.infra.api.doc.controller.param;

import java.util.List;
import org.jsonq.infra.api.doc.po.ApiParameterValue;

/**
 * @author jq
 * @date 2018/08/06
 */
public class ParameterValueAddParam {

    private List<ApiParameterValue> apiParameterValueList;
    private Long userId;

    public List<ApiParameterValue> getApiParameterValueList() {
        return apiParameterValueList;
    }

    public void setApiParameterValueList(
            List<ApiParameterValue> apiParameterValueList) {
        this.apiParameterValueList = apiParameterValueList;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
