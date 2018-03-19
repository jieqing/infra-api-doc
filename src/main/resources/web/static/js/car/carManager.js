$(function () {
    $("#date").val(new Date().format("yyyy-MM-dd"));
    queryData();

    $("#query").click(function () {
        queryData();
    });

    var calendarym = new LCalendar();
    calendarym.init({
        'trigger': '#date',
        'type': 'date',
        'minDate': addDate(new Date(), -7),
        'maxDate': new Date().format("yyyy-MM-dd")
    });

    $("#date").bind('input propertychange', queryData);
    $("#companyName").change(queryData);
});

function queryData() {
    var companyName = $("#companyName").val();
    var date = $("#date").val();
    showLoading();
    $.ajax({
        type: "GET", //提交方式
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: queryUrl + "?companyName=" + companyName + "&date=" + date, //提交的页面，方法名
        success: function (redata) {
            var tmpl = $.templates("#tableTmp");
            tmpl.link("#datatable", redata);
            hideLoading();
        },
        error: function () {
            hideLoading();
        }
    });
}

function addDate(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }
    var val = d.getFullYear()+"-"+month+"-"+day;
    return val;
}

