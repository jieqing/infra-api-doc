$(function () {
    $("#save").click(function () {
        onClickQuery();
    });
});

function onClickQuery() {
    var publicNames = $("#publicNames").val();
    saveList(publicNames);
}


function saveList(publicNames) {
    if (publicNames != "" && publicNames != null) {
        // publicName = "n:"+publicName
    } else {
        $.templates("#tableEmptyTmp").link("#datatable");
        return;
    }

    ajaxGet(saveUrl, defaultSuccessCallBack, defaultErrorCallBack);
}

