var dateStr = GetQueryString("dateStr");
if (dateStr == null) {
    dateStr = "";
}
$(function () {
    queryList();
    //切换菜单
    $('.list-title').click(function () {
        var index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('.list-title div').eq(index).show().siblings().hide();
        if (index == 0) {
            $('#tableHeadImg').css("transform", "rotateY(0deg)");
        } else {
            $('#tableHeadImg').css("transform", "rotateY(180deg)");
        }
        type = index;
        queryList();
    });
    //跳转到详情页
//    $("tr:gt(0)").live("click", function () {
//        var text = $($(this).children("td")[0]).text();
//        var contractNo = text;
//        sessionStorage.setItem("carNo", carPlate);//保存数据
//        sessionStorage.setItem("carNoPre", carPlatePre);//保存数据
//        if(queryUrl == 'queryCarInsureList' && $($(this).children("td")[2]).text()=='交强险') {
//            location.href = ctx + detailUrl + "?insureType=1";
//        }else{
//            location.href = ctx + detailUrl;
//        }
//
//    });
});

//查询列表数据
function queryList() {
    showLoading();
    $.ajax({
        type: "GET", //提交方式
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: queryUrl + "?type=" + type + "&dateStr=" + dateStr, //提交的页面，方法名
        success: function (redata, status) {
            var tmpl;
            if (redata == null || redata.length <= 0 || $.isEmptyObject(redata)) {
                tmpl = $.templates("#tableEmptyTmp");
                $('#tableHeadImg').hide();
            } else {
                hideLoading();
                if (hasTwoStyle) {
                    tmpl = $.templates("#tableTmp" + type);
                } else {
                    tmpl = $.templates("#tableTmp");
                }
                $('#tableHeadImg').show();
            }
            tmpl.link("#datatable", {date: redata});
            hideLoading();
        },
        error: function () {
            var tmpl = $.templates("#tableEmptyTmp");
            tmpl.link("#datatable");
            $('#tableHeadImg').hide();
            hideLoading();
        }
    });
}


