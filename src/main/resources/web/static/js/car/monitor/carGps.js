var searchCarNo = "";
setInterval(go, 5000);
function go() {
    if (searchCarNo != null && searchCarNo != "") {
        queryUserList(searchCarNo, true);
    }
}

//定位按钮
var needCenter = false;
$("#center").toggle(function () {
    unableRelativeBtn();
    needCenter = true;
    map.setStatus({dragEnable: false});
    map.setCenter(carMarker.getPosition());
    if (!noCar) {
        infoWindow.open(map, carMarker.getPosition());
    }
    $(this).css("background", "linear-gradient(#24aaf1, #0285cb)");
}, function () {
    needCenter = false;
    map.setStatus({dragEnable: true});
    infoWindow.close();
    $(this).css("background", "linear-gradient(#bdbdbd, #bdbdbd)");
});
//相对位置按钮
var needRelative = false;
$("#relative").toggle(function () {
    unableCenterBtn();
    needRelative = true;
    map.setStatus({dragEnable: false});
    map.setFitView();
    if (!noCar) {
        infoWindow.open(map, carMarker.getPosition());
    }
    $(this).css("background", "linear-gradient(#24aaf1, #0285cb)");
}, function () {
    needRelative = false;
    map.setStatus({dragEnable: true});
    infoWindow.close();
    $(this).css("background", "linear-gradient(#bdbdbd, #bdbdbd)");
});

function unableCenterBtn() {
    if (needCenter) {
        $("#center").click();
    }
}

function unableRelativeBtn() {
    if (needRelative) {
        $("#relative").click();
    }
}
//跳转位置按钮
$("#direBtn").click(function () {
    location.href = ctx + "/car/carInfo";
});

function isNewCar(carNo) {
    return searchCarNo != carNo;
}
