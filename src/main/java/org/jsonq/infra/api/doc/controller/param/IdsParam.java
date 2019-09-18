package org.jsonq.infra.api.doc.controller.param;

import com.youanmi.commons.base.core.entity.Serial;
import lombok.Data;

import java.util.List;

/**
 * @author jq
 * @date 2019/09/10
 */
@Data
public class IdsParam extends Serial {

    private List<Long> ids;
}
