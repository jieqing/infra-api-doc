package org.jsonq.infra.api.doc.controller.param;

import lombok.Data;

/**
 * @author jq
 * @date 2018/08/06
 */
@Data
public class SendApiParam {

    private String url;
    private String headers;
    private Object param;
}
