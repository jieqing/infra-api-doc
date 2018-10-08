package org.jsonq.infra.api.doc.task;

import com.google.common.collect.Lists;
import com.youanmi.commons.base.annotation.ApiDoc;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import javax.annotation.Resource;
import org.apache.commons.collections.CollectionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsonq.common.constant.string.ConstAction;
import org.jsonq.common.constant.string.ConstJavaDataType;
import org.jsonq.common.util.collection.CollectionUtil;
import org.jsonq.common.util.collection.MapUtil;
import org.jsonq.infra.api.doc.constants.ApiConstants;
import org.jsonq.infra.api.doc.po.ApiClass;
import org.jsonq.infra.api.doc.po.ApiParameter;
import org.jsonq.infra.api.doc.po.ApiUrl;
import org.jsonq.infra.api.doc.service.ApiClassService;
import org.jsonq.infra.api.doc.service.ApiModuleService;
import org.jsonq.infra.api.doc.service.ApiParameterService;
import org.jsonq.infra.api.doc.service.ApiUrlService;
import org.reflections.Reflections;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * 离线爬公众号
 *
 * @author jq
 */
@Service
public class ScanApiJarTask {

    private Logger logger = LogManager.getLogger(ScanApiJarTask.class);

    @Resource
    private ApiModuleService apiModuleService;
    @Resource
    private ApiClassService apiClassService;
    @Resource
    private ApiUrlService apiUrlService;
    @Resource
    private ApiParameterService apiParameterService;

    /**
     * 旧的class和method会删除
     */
//    @PostConstruct
    public void run() throws InstantiationException, IllegalAccessException {
        Reflections reflections = new Reflections("com.youanmi.scrm.pcis.controller");

        Set<Class<?>> classesList = reflections.getTypesAnnotatedWith(RestController.class);
        classesList.addAll(reflections.getTypesAnnotatedWith(Controller.class));

        if (CollectionUtils.isEmpty(classesList)) {
            return;
        }
        String moduleName = classesList.iterator().next().getPackage().getName().split("\\.")[3];
        Long moduleId = apiModuleService.replaceAndGetId(moduleName);
        List<ApiClass> dbApiClasses = apiClassService.listByModuleId(moduleId);
        Map<String, ApiClass> needDeleteClassMap = MapUtil.toMap(dbApiClasses, "name");

        // 开始分析Class
        for (Class classes : classesList) {
//            if (!classes.getName().contains("PlatformBaseController")) {
//                continue;
//            }

            ApiClass apiClass = new ApiClass();
            String[] classNames = classes.getName().split("\\.");
            apiClass.setModuleId(moduleId);
            String className = classNames[classNames.length - 1];
            apiClass.setName(className);
            ApiDoc classApiDoc = (ApiDoc) classes.getAnnotation(ApiDoc.class);
            if (classApiDoc != null) {
                apiClass.setDescription(classApiDoc.desc());
            }
            Long apiClassId = apiClassService.replaceAndGetId(apiClass);
            // 删除代码中不存在的class
            if (needDeleteClassMap.containsKey(className)) {
                needDeleteClassMap.remove(className);
            }
            try {
                parseMethod(classes, apiClassId);
            } catch (Throwable ignored) {
            }
        }

        List<Long> classIds = CollectionUtil.getColumnValues(needDeleteClassMap.values(), "id");
        apiClassService.deleteByIdBatch(classIds);
        logger.info("解析完成");
    }

    private void parseMethod(Class classes, Long apiClassId)
            throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        // 开始分析method
        List<ApiUrl> needDeleteApiUrls = apiUrlService.listByClassId(apiClassId);
        String url = getClassUrl(classes);
        for (Method method : classes.getDeclaredMethods()) {
            // url
            RequestMapping requestMapping = method.getAnnotation(RequestMapping.class);
            ApiUrl apiUrl = new ApiUrl();
            apiUrl.setClassId(apiClassId);
            apiUrl.setMethodName(method.getName());
            ApiDoc methodApiDoc = method.getAnnotation(ApiDoc.class);
            if (methodApiDoc != null) {
                apiUrl.setDescription(methodApiDoc.desc());
            }
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
            // url头加上"/"
            String requestUrl = url + methodUrl;
            if (!requestUrl.startsWith("/")) {
                requestUrl = "/" + requestUrl;
            }
            apiUrl.setRequestUrl(requestUrl);
            Long apiUrlId = apiUrlService.createAndGetId(apiUrl);
            // 删除代码中不存在的url
            for (ApiUrl needDeleteApiUrl : needDeleteApiUrls) {
                if (Objects.equals(needDeleteApiUrl.getRequestUrl(), url)
                        && Objects.equals(needDeleteApiUrl.getRequestType(), requestType)) {
                    needDeleteApiUrls.remove(needDeleteApiUrl);
                    break;
                }
            }

            // 入参
            Parameter[] params = method.getParameters();
            for (Parameter parameter : params) {
                if (parameter.isAnnotationPresent(RequestBody.class)) {
                    List<Field> fields = Lists
                            .newArrayList(parameter.getType().getDeclaredFields());
                    Class<?> superclass = parameter.getType().getSuperclass();
                    if (superclass != null && superclass.getDeclaredFields() != null) {
                        fields.addAll(Lists.newArrayList(superclass.getDeclaredFields()));
                    }
                    parseParameter(apiUrlId, 0L, ApiConstants.ApiParameterType.PARAM_TYPE,
                            fields);
                }
            }
            // 返回值
            if (methodApiDoc != null) {
                Field[] returnFields = methodApiDoc.returnType().getDeclaredFields();
                parseParameter(apiUrlId, 0L, ApiConstants.ApiParameterType.RETURN_TYPE,
                        Lists.newArrayList(returnFields));
            }
        }
        apiUrlService.deleteByIdBatch(CollectionUtil.getColumnValues(needDeleteApiUrls, "id"));
    }

    private void parseParameter(Long apiUrlId, Long parentParameterId, Byte type,
            List<Field> fields)
            throws ClassNotFoundException {
        for (Field field : fields) {
            String dataType = field.getType().getName();
            // 不是java对象类型，也不是复杂类，不解析
            if (!dataType.startsWith("java") && !isClass(dataType)) {
                continue;
            }
            ApiParameter apiParameter = new ApiParameter();
            apiParameter.setUrlId(apiUrlId);
            apiParameter.setParentId(parentParameterId);
            apiParameter.setType(type);
            apiParameter.setName(field.getName());
            ApiDoc apiDoc = field.getAnnotation(ApiDoc.class);
            if (apiDoc != null) {
                apiParameter.setDescription(apiDoc.desc());
            }
            String[] split = dataType.split("\\.");
            apiParameter.setDataType(split[split.length - 1]);
            Long parameterId = apiParameterService.replaceAndGetId(apiParameter);

            // 复杂对象，继续解析成员变量
            if (Objects.equals(dataType, ConstJavaDataType.JAVA_UTIL_LIST)) {
                // 关键的地方，如果是List类型，得到其Generic的类型
                Type fc = field.getGenericType();
                // 如果是泛型参数的类型
                if (fc instanceof ParameterizedType) {
                    ParameterizedType pt = (ParameterizedType) fc;
                    // 得到泛型里的class类型对象。
                    Class genericClazz = (Class) pt.getActualTypeArguments()[0];
                    if (!genericClazz.getName().startsWith("java")) {
                        parseParameter(apiUrlId, parameterId, type,
                                Lists.newArrayList(genericClazz.getDeclaredFields()));
                    }
                }
            } else if (Objects.equals(dataType, ConstJavaDataType.JAVA_LANG_OBJECT)) {

            } else if (!dataType.startsWith("java")) {
                Class<?> aClass = Class.forName(dataType);
                parseParameter(apiUrlId, parameterId, type,
                        Lists.newArrayList(aClass.getDeclaredFields()));
            }
        }
    }

    private boolean isClass(String name) {
        try {
            Class<?> aClass = Class.forName(name);
        } catch (ClassNotFoundException e) {
            return false;
        }
        return true;
    }

    private String getClassUrl(Class classes) {
        RequestMapping annotation = (RequestMapping) classes.getAnnotation(RequestMapping.class);
        if (annotation != null && annotation.value().length > 0) {
            return annotation.value()[0];
        }
        return "";
    }

}
