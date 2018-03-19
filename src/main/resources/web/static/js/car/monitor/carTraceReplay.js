$(function () {
    var carNo = sessionStorage.getItem("carNo");
    if (carNo != null) {
        $("#carNo").val(carNo);
    }
    $("#query").click(function () {
        onClickQuery(true);
    });

    initQueryTime();
});

function initQueryTime() {
    $("#date").val(new Date().format("yyyy-MM-dd"));
    $("#startTime").val(new Date().format("00:00"));
    $("#endTime").val(new Date().format("hh:mm"));
}

function onClickQuery(userClick) {
    if (!userClick) {
        return;
    }
    var carNo = $("#carNo").val();
    $(".gac_m").children("ul").children("li").remove();
    sessionStorage.removeItem("carNo");
    sessionStorage.setItem("carNo", carNo);//保存数据
    if (!isEmpty(carNo)) {
        carNo = $("#carNoPre").val() + carNo;
    }
    queryUserList(carNo);
}

function queryUserList(carNo) {
    if (isEmpty(carNo)) {
        carMarker.hide();
        return;
    }
    var date = $("#date").val();
    if (date == "" || $("#startTime").val() == "" || $("#endTime").val() == "") {
        notice("请填写时间范围");
        return;
    }
    var startTime = date + " " + $("#startTime").val() + ":00";
    var endTime = date + " " + $("#endTime").val() + ":00";
    showLoading();
    $.ajax({
        type: "GET", //提交方式
        //timeout: 3000,// 1秒没响应即报超时
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: queryUrl + "?dataIds=2502,2503&carNo=" + carNo + "&startTime=" + startTime + "&endTime=" + endTime, //提交的页面，方法名
        success: function (redata) {
            hideLoading();
            if ((redata == null || $.isEmptyObject(redata.data.rows))) {
                notice("暂时查询不到该车辆实时位置信息");
            } else {
                //清空之前路线
                lineArr = new Array();
                passedPolyline.setPath(new Array());
                //解析路线
                var isFirstNode = true;
                for (var index in redata.data.rows) {
                    var carLng = redata.data.rows[index][2502];
                    var carLat = redata.data.rows[index][2503];
                    if (carLng == 0 || carLat == 0) {
                        continue;
                    }
                    var transformResult = transform(carLat, carLng);
                    lineArr.push([transformResult[1], transformResult[0]]);
                    //第一个点
                    if (isFirstNode) {
                        isFirstNode = false;
                        carMarker.setPosition([transformResult[1], transformResult[0]]);
                        carMarker.show();
                        startMarker.setPosition([transformResult[1], transformResult[0]]);
                        startMarker.show();
                        //map.setCenter(carMarker.getPosition());
                    }
                    if (index == parseInt(redata.data.total) - 1) {
                        endMarker.setPosition([transformResult[1], transformResult[0]]);
                        endMarker.show();
                    }
                }
                polyline.setPath(lineArr);
                map.setFitView();
            }
        },
        error: function () {
            hideLoading();
            notice("暂时查询不到该车辆实时位置信息");
        }
    });
}

var pi = 3.14159265358979324;
var a = 6378245.0;
var ee = 0.00669342162296594323;
function transform(wgLat, wgLon) {
    var latlng = new Array();
    if (outOfChina(wgLat, wgLon)) {
        latlng[0] = wgLat;
        latlng[1] = wgLon;
        return latlng;
    }
    var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
    var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
    var radLat = wgLat / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    latlng[0] = parseFloat(wgLat) + dLat;
    latlng[1] = parseFloat(wgLon) + dLon;
    return latlng;
}

function outOfChina(lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;
    return false;
}

function transformLat(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLon(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}




