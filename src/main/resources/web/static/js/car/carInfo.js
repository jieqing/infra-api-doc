$(function () {
    var carNo = sessionStorage.getItem("carNo");
    var carNoPre = sessionStorage.getItem("carNoPre");
    if (carNo != null) {
        $("#carNo").val(carNo);
        $("#carNoPre").val(carNoPre);
    }
    queryUserList(carNo);

    $("#query").click(function () {
        onClickQuery();
    });
});

function onClickQuery() {
    var carNo = $("#carNo").val();
    var carNoPre = $("#carNoPre").val();
    $(".gac_m").children("ul").children("li").remove();
    sessionStorage.removeItem("carNo");
    sessionStorage.removeItem("carNoPre");
    sessionStorage.setItem("carNo", carNo);//保存数据
    sessionStorage.setItem("carNoPre", carNoPre);//保存数据
    queryUserList(carNo);
}

function queryUserList(carNo) {
    if (carNo != "" && carNo != null) {
        carNo = $("#carNoPre").val() + carNo;
    } else {
        $.templates("#tableEmptyTmp").link("#datatable");
        return;
    }
    showLoading();
    var url = queryUrl + "?carNo=" + carNo;
    $.ajax({
        type: "GET", //提交方式
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: url, //提交的页面，方法名
        success: function (redata) {
            var tmpl;
            if (redata == null || redata.length <= 0 || $.isEmptyObject(redata)) {
                tmpl = $.templates("#tableEmptyTmp");
            } else {
                tmpl = $.templates("#tableTmp");
                redata.carNo = carNo;
            }
            tmpl.link("#datatable", redata);
            hideLoading();

            if (window.queryCallBack) {
                queryCallBack();
            }
        },
        error: function () {
            var tmpl = $.templates("#tableEmptyTmp");
            tmpl.link("#datatable");
            hideLoading();
        }
    });
}


