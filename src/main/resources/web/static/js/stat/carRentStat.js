$(function () {
    queryCarRentList();
    $("#query").click(onClickQuery);
    $("#typeId").change(typeChange);
    $("#carTypeId").change(typeChange);
});

function onClickQuery(){
    var type = $("#typeId").val();
    if (type == 0) {
        var carType = $("#carTypeId").val();
        queryInsureList(carType);   //保险
    } else {
        queryCarRentList();        //公司
    }
}

function typeChange() {
    var typeId = $('#typeId option:selected').val();
    if (typeId == 1)
        $("#carTypeId").hide();
    else
        $("#carTypeId").show();
    onClickQuery();
}

function queryInsureList(carType) {
    showLoading();
    $.ajax({
        type: "GET", //提交方式
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: "queryCarInsure?carType=" + carType, //提交的页面，方法名
        success: function (redata) {
            var tmpl;
            if (redata == null || redata.length <= 0) {
                tmpl = $.templates("#tableEmptyTmp");
            } else {
                tmpl = $.templates("#tableTmp");
            }
            tmpl.link("#datatable", redata);
            hideLoading();
        },
        error: function () {
            var tmpl = $.templates("#tableEmptyTmp");
            tmpl.link("#datatable");
            hideLoading();
        }
    });
}

function queryCarRentList() {
    showLoading();
    $.ajax({
        type: "GET", //提交方式
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: "queryCarRentInfo", //提交的页面，方法名
        success: function (redata) {
            var tmpl;
            if (redata == null || redata.length <= 0) {
                tmpl = $.templates("#tableEmptyTmp");
            } else {
                tmpl = $.templates("#tableTmp1");
            }
            tmpl.link("#datatable", {data: redata});
            hideLoading();
        },
        error: function () {
            var tmpl = $.templates("#tableEmptyTmp");
            tmpl.link("#datatable");
            hideLoading();
        }
    });
}

