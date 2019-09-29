var urlList;
$(function () {
    queryModuleList();

    $('#urlId').select2({
        ajax: {
            url: "/api/url/list",
            data: function (params) {
                return {
                    urlName: params.term // search term 请求参数
                };
            },
            processResults: function (data) {
                data = data.data;
                let itemList = [];
                for (let item in data) {
                    itemList.push({id: data[item].id, text: data[item].description + " "+data[item].requestUrl})
                }
                return {results: itemList};
            },
            cache: true,
        },
        placeholder: '请输入接口描述或接口url',//默认文字提示
        language: "zh-CN",
        minimumInputLength: 1,//最少输入多少个字符后开始查询
    });

    $('#urlId').on('change', function () {
        queryParameterList($(this).val());
    });

    // 点击类列表
    $('#classList').on('click', 'li', function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        queryUrlList($(this).attr("id"));
    });
    // 点击url列表
    $('#urlList').on('click', 'li', function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        var urlOne = urlList[$(this).index()];
        urlOne.className = $('#classList .active').attr("name");
        $.templates("#urlOneTmp").link("#urlOne", urlOne);

        queryParameterList($(this).attr("id"));
    });
    // 保存参数值
    $("#saveParameterValue").click(function () {
        var list = [];
        $("#parameter1Table tr").each(function () {
            list.push({
                parameterId: $(this).find("input[name='id']").val(),
                value: $(this).find("input[name='dateValue']").val()
            });
        });

        ajaxPost("/api/parameterValue/replace", {
            apiParameterValueList: list,
            headers: {parameterId: $("#headersId").val(), value: $("#headers").val()},
            urlId: $('#urlList .active').attr("id")
        });
    });
    // 参数值改变事件
    $('#parameter1Table').on('input propertychange', 'input', function () {
        $('#sendApiParam').html(syntaxHighlight(getSendApiParam()));
    });
    // 发送api
    $("#sendApi").click(function () {
        ajaxPost("/api/sendApi",
            {
                url: $("#moduleIpList").val() + $("#requestUrl").html(),
                headers: $("#headers").val(),
                param: getSendApiParam()
            },
            function successCallBack(result) {
                $('#sendApiResult').html(syntaxHighlight(result.data));
            },
            function errorCallBack() {
                $('#sendApiResult').html(syntaxHighlight(null));
            });
    });
});

function getSendApiParam() {
    var re = {};
    $("#parameter1Table tr").each(function () {
        re[$(this).find("td[name='paramName']").html()] = $(this).find(
            "input[name='dateValue']").val();
    });
    return re;
}

// 查询模块列表
function queryModuleList() {
    ajaxGet("/api/module/list",
        function successCallBack(result) {
            $.templates("#moduleListTmp").link("#moduleList", result.data);
            let moduleId = $("#moduleList .active").attr("id");
            queryClassList("", moduleId);
            queryModuleIpList(moduleId);
        });
}

// 查询ip列表
function queryModuleIpList(moduleId) {
    ajaxGet("/api/moduleIp/list?moduleId=" + moduleId,
        function successCallBack(result) {
            $.templates("#moduleIpListTmp").link("#moduleIpList", result.data);
        });
}

// 查询类列表
function queryClassList(className, moduleId) {
    ajaxGet("/api/class/list?className=" + className + "&moduleId=" + moduleId,
        function successCallBack(result) {
            $.templates("#classListTmp").link("#classList", result.data);
            queryUrlList($("#classList .active").attr("id"));
        });
}

// 查询url列表
function queryUrlList(classId) {
    ajaxGet("/api/url/list?classId=" + classId,
        function urlSuccessCallBack(result) {
            urlList = result.data;
            $.templates("#urlListTmp").link("#urlList", result.data);
            result.data[0].className = $('#classList .active').attr("name");
            $.templates("#urlOneTmp").link("#urlOne", result.data[0]);
            queryParameterList($("#urlList .active").attr("id"));
        });
}

// 查询参数
function queryParameterList(urlId) {
    ajaxGet("/api/parameter/list?urlId=" + urlId + "&type=1",
        function successCallBack(result) {
            $.templates("#parameter1TableTmp").link("#parameter1Table", result.data.list);
            $('#sendApiParam').html(syntaxHighlight(getSendApiParam()));
            $('#sendApiResult').html("");
            if (!isEmpty(result.data.headers)) {
                $("#headersId").val(result.data.headers.id);
                $("#headers").val(result.data.headers.dateValue);
            }else {
                $("#headersId").val("");
                $("#headers").val("");
            }
        });
    ajaxGet("/api/parameter/list?urlId=" + urlId + "&type=2",
        function successCallBack(result) {
            $.templates("#parameter2TableTmp").link("#parameter2Table", result.data.list);
        });

}



