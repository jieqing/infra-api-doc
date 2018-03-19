$("a[name='loading']").click(function () {
    showLoading();
});

$("button[name='loading']").click(function () {
    showLoading();
});

function showLoading() {
    $('#loading').show();
}
function hideLoading() {
    $('#loading').hide();
}
//js获取url 参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

/**
 * 提示信息
 * @param msg
 */
function notice(msg) {
    new jBox('Modal', {
        content: msg,
        theme: 'ModalBorder',
        overlay: false,
        closeOnClick: true
    }).open();
}

function isEmpty(val) {
    return val === undefined || val == null || val == '' || $.isEmptyObject(val);
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function limit(str, limit) {
    if(str == null){
        return "";
    }
    var result ="";
    var length = str.length;
    for (var i = limit; i < length; i += limit) {
        result += str.substring(i - limit, i) + "\n";
    }
    result += str.substring(i - limit, length);
    return result;
}