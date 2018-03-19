$(function () {
    onClickQuery();
    $("#query").click(onClickQuery);

    $("#companyName").change(onClickQuery);
    $("#carType").change(onClickQuery);
});

function onClickQuery(){
    var company = $("#companyName").val();
    var carType = $("#carType").val();
    queryInventoryList(company,carType);
}

function queryInventoryList(comp,carType) {
    showLoading();
    $.ajax({
        type: "GET", //提交方式
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: queryUrl + "?orgName=" + comp +"&carType=" + carType, //提交的页面，方法名
        success: function (redata,status) {

            var tmpl;
            if (redata == null || redata.length <= 0 || $.isEmptyObject(redata)) {
                tmpl = $.templates("#tableEmptyTmp");
            }else{
                tmpl = $.templates("#tableTmp");
            }
            tmpl.link("#datatable", {date:redata});
            //var renderHtml = tmpl.render({date:redata});
            //$("#datatable").append(renderHtml);
            hideLoading();
        },
        error: function () {
            var tmpl = $.templates("#tableEmptyTmp");
            tmpl.link("#datatable");
            hideLoading();
        }
    });
}


