$(function () {
    var carNo = sessionStorage.getItem("carNo");
    if (carNo != null) {
        $("#carNo").val(carNo);
    }
    onClickQuery();
    $("#query").click(function () {
        onClickQuery();
    });
});
var searchCarNo = "";
setInterval(go, 3000);
function go() {
    if (searchCarNo != null && searchCarNo != "") {
        queryUserList(searchCarNo, true);
    }
}

function onClickQuery() {
    var carNo = $("#carNo").val();
    $(".gac_m").children("ul").children("li").remove();
    sessionStorage.removeItem("carNo");
    sessionStorage.setItem("carNo", carNo);//保存数据
    if (!isEmpty(carNo)) {
        carNo = $("#carNoPre").val() + carNo;
    }
    queryUserList(carNo, false);
}

function queryUserList(carNo, isTiming) {
    $.ajax({
        type: "GET", //提交方式
        //timeout: 3000,// 1秒没响应即报超时
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: queryUrl + "?dataIds=2615,2202,2201&carNo=" + carNo, //提交的页面，方法名
        success: function (redata) {
            if ((redata == null || $.isEmptyObject(redata.data)) && !isTiming) {
                notice("获取车辆实时信息失败");
            } else if (redata != null && !$.isEmptyObject(redata.data)) {
                for (var data in redata.data) {
                    var dl = redata.data[data][2615];
                    var sd = redata.data[data][2201];
                    var lc = redata.data[data][2202];
                    option.series[0].data[0].value = parseFloat(sd);
                    option.series[1].data[0].value = parseFloat(dl);
                    myChart.setOption(option, true);
                    $("#runLength").text(lc);
                    break;
                }
            }
            searchCarNo = carNo;
        },
        error: function () {
            if (!isTiming) {
                notice("暂无该车辆实时位置信息");
            }
        }
    });
}