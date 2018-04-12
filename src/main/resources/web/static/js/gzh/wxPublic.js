$(function () {
    $("#query").click(function () {
        onClickQuery();
    });

    $('#publicName').bind('keyup', function (event) {
        if (event.keyCode == "13") {
            //回车执行查询
            onClickQuery();
        }
    });

    $("#datatable").on("change", "input[name='isCall']", function () {
        var id = $(this).parent().prevAll("input[name='id']").val();
        ajaxPost(updateUrl, {id: id, isCall: this.checked ? 2 : 1});
    });
    $("#datatable").on("change", "input[name='isCooperate']", function () {
        var id = $(this).parent().prevAll("input[name='id']").val();
        ajaxPost(updateUrl, {id: id, isCooperate: this.checked ? 2 : 1});
    });
});

function hoverShowDiv(img) {
    $(img).next().css({"display": "block"});
}

function hoverHiddendiv(img) {
    $(img).next().css({"display": "none"});
}

function onClickQuery() {
    var publicName = $("#publicName").val();
    queryList(publicName);
}


function queryList(publicName) {
    if (publicName != "" && publicName != null) {
        // publicName = "n:"+publicName
    } else {
        $.templates("#tableEmptyTmp").link("#datatable");
        return;
    }
    ajaxPost(queryUrl, {publicName: publicName}, successCallBack, defaultErrorCallBack);
}

function successCallBack(result) {
    var tmp;
    if (isEmpty(result)) {
        tmp = $.templates("#tableEmptyTmp");
    } else {
        tmp = $.templates("#tableTmp");
    }
    tmp.link("#datatable", result.data);
}
