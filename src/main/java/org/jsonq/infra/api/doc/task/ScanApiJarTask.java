package org.jsonq.infra.api.doc.task;

import com.google.common.collect.Lists;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.constant.string.ConstAction;
import org.jsonq.common.constant.string.ConstJavaDataType;
import org.jsonq.infra.api.doc.constants.ApiConstants;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.jsonq.infra.api.doc.po.ApiParameter;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.jsonq.infra.api.doc.service.ApiClassService;
import org.jsonq.infra.api.doc.service.ApiParameterService;
import org.jsonq.infra.api.doc.service.ApiUrlService;
import org.reflections.Reflections;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.lang.reflect.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;


/**
 * 离线爬公众号
 *
 * @author jq
 */
@Service
public class ScanApiJarTask {

    private Logger logger = LogManager.getLogger(ScanApiJarTask.class);

    @Resource
    private ApiClassService apiClassService;
    @Resource
    private ApiUrlService apiUrlService;
    @Resource
    private ApiParameterService apiParameterService;

    private static final Long MODULE_ID = 0L;

    @Scheduled(fixedDelay = 10)
    public void run() throws ClassNotFoundException {
        Reflections reflections = new Reflections("org.jsonq.service.crawler");
        Set<Class<?>> classesList = reflections.getTypesAnnotatedWith(RestController.class);
        classesList.addAll(reflections.getTypesAnnotatedWith(Controller.class));

        // 开始分析Class
        for (Class classes : classesList) {
            if(!classes.getName().contains("PlatformPayMediaController")){
                continue;
            }

            ApiClass apiClass = new ApiClass();
            String[] classNames = classes.getName().split("\\.");
            apiClass.setModuleId(MODULE_ID);
            apiClass.setName(classNames[classNames.length - 1]);
            Long apiClassId = apiClassService.createAndGetId(apiClass);

            String url = getClassUrl(classes);
            // 开始分析method
            for (Method method : classes.getDeclaredMethods()) {
                // url
                RequestMapping requestMapping = method.getAnnotation(RequestMapping.class);
                ApiUrl apiUrl = new ApiUrl();
                apiUrl.setClassId(apiClassId);
                String methodUrl = "";
                String requestType = ConstAction.HTTP_POST;
                if (null != requestMapping) {
                    RequestMethod[] methods = requestMapping.method();
                    if (methods.length > 0) {
                        requestType = methods[0].name();
                    }
                    methodUrl = requestMapping.value()[0];
                }
                apiUrl.setRequestType(requestType);
                apiUrl.setRequestUrl(url + methodUrl);
                Long apiUrlId = apiUrlService.createAndGetId(apiUrl);

                // 入参
                Parameter[] params = method.getParameters();
                for (Parameter parameter : params) {
                    if (parameter.isAnnotationPresent(RequestBody.class)) {
                        List<Field> fields = Lists.newArrayList(parameter.getType().getDeclaredFields());
                        Class<?> superclass = parameter.getType().getSuperclass();
                        if (superclass != null && superclass.getDeclaredFields() != null) {
                            fields.addAll(Lists.newArrayList(superclass.getDeclaredFields()));
                        }
                        parseParameter(apiUrlId, 0L, ApiConstants.ApiParameterType.PARAM_TYPE, fields);
                    }
                }
                // 返回值
                Field[] returnFields = method.getReturnType().getDeclaredFields();
                parseParameter(apiUrlId, 0L, ApiConstants.ApiParameterType.RETURN_TYPE, Lists.newArrayList(returnFields));
            }
        }
        logger.info("解析完成");
    }

    private void parseParameter(Long apiUrlId, Long parentParameterId, Byte type, List<Field> fields) throws ClassNotFoundException {
        for (Field field : fields) {
            ApiParameter apiParameter = new ApiParameter();
            apiParameter.setUrlId(apiUrlId);
            apiParameter.setParentId(parentParameterId);
            apiParameter.setType(type);
            apiParameter.setName(field.getName());
            String dataType = field.getType().getName();
            String[] split = dataType.split("\\.");
            apiParameter.setDataType(split[split.length - 1]);
            Long parameterId = apiParameterService.createAndGetId(apiParameter);

            // 复杂对象，继续解析成员变量
            if (Objects.equals(dataType, ConstJavaDataType.JAVA_UTIL_LIST)) {
                ParameterizedType genericType = (ParameterizedType) field.getGenericType();
                Type[] types = genericType.getActualTypeArguments();
                Class aClass = types[0].getClass();
                if (!aClass.getName().startsWith("java")) {
                    parseParameter(apiUrlId, parameterId, type, Lists.newArrayList(aClass.getDeclaredFields()));
                }
            } else if (!dataType.startsWith("java")) {
                Class<?> aClass = Class.forName(dataType);
                parseParameter(apiUrlId, parameterId, type, Lists.newArrayList(aClass.getDeclaredFields()));
            }
        }
    }

    private String getClassUrl(Class classes) {
        RequestMapping annotation = (RequestMapping) classes.getAnnotation(RequestMapping.class);
        if (annotation != null && annotation.value().length > 0) {
            return annotation.value()[0];
        }
        return "";
    }

}
