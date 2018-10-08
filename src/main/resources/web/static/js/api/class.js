var urlList;
$(function () {
  queryModuleList();

  // 查询按钮
  // $('#className').bind('keyup', function (event) {
  //   if (event.keyCode == "13") {
  //     //回车执行查询
  //     queryClassList($("#className").val(), $("#moduleList .active").attr("id"));
  //   }
  // });

  $('#className').select2({
    ajax: {
      url: "/api/class/list",
      data: function (params) {
        return {
          className: params.term, // search term 请求参数
          userId: userId
        };
      },
      processResults: function (data) {
        let itemList = [];
        for (let item in data) {
          itemList.push({id: data[item].id, text: data[item].name})
        }
        return {
          results: itemList
        };
      },
      cache: true,
    },
    placeholder:'请选择',//默认文字提示
    language: "zh-CN",
    minimumInputLength: 1,//最少输入多少个字符后开始查询
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

    $.templates("#urlOneTmp").link("#urlOne", urlList[$(this).index()]);

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
    ajaxPost("/api/parameterValue/replace",
        {userId: userId, apiParameterValueList: list});
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
          param: getSendApiParam()
        },
        function successCallBack(result) {
          $('#sendApiResult').html(syntaxHighlight(result));
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
  ajaxGet("/api/module/list?userId=" + userId,
      function successCallBack(result) {
        if (!isEmpty(result)) {
          $.templates("#moduleListTmp").link("#moduleList", result);
          let moduleId = $("#moduleList .active").attr("id");
          queryClassList("", moduleId);
          queryModuleIpList(moduleId);
        }
      });
}

// 查询ip列表
function queryModuleIpList(moduleId) {
  ajaxGet("/api/moduleIp/list?userId=" + userId + "&moduleId=" + moduleId,
      function successCallBack(result) {
        if (!isEmpty(result)) {
          $.templates("#moduleIpListTmp").link("#moduleIpList", result);
        }
      });
}

// 查询类列表
function queryClassList(className, moduleId) {
  ajaxGet("/api/class/list?className=" + className + "&moduleId=" + moduleId
      + "&userId=" + userId,
      function successCallBack(result) {
        if (!isEmpty(result)) {
          $.templates("#classListTmp").link("#classList", result);
          queryUrlList($("#classList .active").attr("id"));
        }
      });
}

// 查询url列表
function queryUrlList(classId) {
  ajaxGet("/api/url/list?classId=" + classId,
      function urlSuccessCallBack(result) {
        if (!isEmpty(result)) {
          urlList = result;
          $.templates("#urlListTmp").link("#urlList", result);
          $.templates("#urlOneTmp").link("#urlOne", result[0]);
          queryParameterList($("#urlList .active").attr("id"));
        }
      });
}

// 查询参数
function queryParameterList(urlId) {
  ajaxGet("/api/parameter/list?urlId=" + urlId + "&type=1&userId=" + userId,
      function successCallBack(result) {
        if (!isEmpty(result)) {
          $.templates("#parameter1TableTmp").link("#parameter1Table", result);
          $('#sendApiParam').html(syntaxHighlight(getSendApiParam()));
          $('#sendApiResult').html("");
        }
      });
  ajaxGet("/api/parameter/list?urlId=" + urlId + "&type=2&userId=" + userId,
      function successCallBack(result) {
        if (!isEmpty(result)) {
          $.templates("#parameter2TableTmp").link("#parameter2Table", result);
        }
      });

}



