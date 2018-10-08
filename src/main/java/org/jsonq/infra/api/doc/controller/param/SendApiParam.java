package org.jsonq.infra.api.doc.controller.param;

/**
 * @author jq
 * @date 2018/08/06
 */
public class SendApiParam {

    private String url;
    private Object param;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Object getParam() {
        return param;
    }

    public void setParam(Object param) {
        this.param = param;
    }
}
