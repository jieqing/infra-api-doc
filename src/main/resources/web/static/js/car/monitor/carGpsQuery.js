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

var lastLat = 0;
var lastLng = 0;
var lineArr;

function queryUserList(carNo, isTiming) {
    if (isEmpty(carNo)) {
        carMarker.hide();
        return;
    }
    $.ajax({
        type: "GET", //提交方式
        //timeout: 3000,// 1秒没响应即报超时
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: queryUrl + "?dataIds=2202,2502,2503&carNo=" + carNo, //提交的页面，方法名
        success: function (redata) {
            if ((redata == null || $.isEmptyObject(redata.data)) && !isTiming) {
                notice("获取车辆实时位置信息失败");
                lineArr = new Array();
                startMarker.hide();
                carMarker.hide();
                infoWindow.close();
                carline.setPath(new Array());
                noCar = true;
            } else if (redata != null && !$.isEmptyObject(redata.data)) {
                noCar = false;
                if (isNewCar(carNo)) {
                    lineArr = new Array();
                }
                for (var data in redata.data) {
                    var carLng = redata.data[data][2502];
                    var carLat = redata.data[data][2503];
                    var transformResult = transform(carLat, carLng);
                    carLng = transformResult[1];
                    carLat = transformResult[0];
                    if (lastLng != 0 && lastLat != 0 && (carLng != lastLng || carLat != lastLat)) {
                        var number = gps2d(carLat, carLng, lastLat, lastLng);
                        carMarker.setAngle(number + 90);
                    }
                    carMarker.setPosition([carLng, carLat]);
                    carMarker.show();

                    if (lastLng != 0 && lastLat != 0 && (carLng != lastLng || carLat != lastLat)) {
                        lineArr.push([carLng, carLat]);
                    }
                    if (lineArr.length > 0) {
                        carline.setPath(lineArr);
                    }
                    lastLng = carLng;
                    lastLat = carLat;

                    infoWindow.setPosition([carLng, carLat]);
                    infoWindow.setContent("<div>" + carNo + "<br/>总里程   " + redata.data[data][2202] + "KM</div>");

                    //carline.show();
                    //起点图标
                    if (isNewCar(carNo)) {
                        startMarker.setPosition(carMarker.getPosition());
                        startMarker.show();
                        carline.setPath(new Array());
                    }
                    break;
                }
            }
            //微信
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    myMarker.setPosition([res.longitude, res.latitude]);
                    myMarker.show();
                }
            });
            if (!isTiming || needRelative) {
                map.setFitView();
            } else if (needCenter) {
                map.setCenter(carMarker.getPosition());
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

function gps2d(lat_a, lng_a, lat_b, lng_b) {
    var d = 0;
    if (lat_a == lat_b && lng_a == lng_b) {
        lng_b = Number(lng_b) + 0.0001;
    }

    lat_a = lat_a * Math.PI / 180;
    lng_a = lng_a * Math.PI / 180;
    lat_b = lat_b * Math.PI / 180;
    lng_b = lng_b * Math.PI / 180;

    d = Math.sin(lat_a) * Math.sin(lat_b) + Math.cos(lat_a) * Math.cos(lat_b) * Math.cos(lng_b - lng_a);
    d = Math.sqrt(1 - d * d);
    d = Math.cos(lat_b) * Math.sin(lng_b - lng_a) / d;
    d = Math.asin(d) * 180 / Math.PI;

    return d;
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


