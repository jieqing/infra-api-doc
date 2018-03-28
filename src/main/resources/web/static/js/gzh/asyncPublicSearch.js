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
    publicNames = publicNames.trim();
    if (isEmpty(publicNames)) {
        alert("请输入内容");
    }
    var nameList = publicNames.split("，");
    var list = [];
    for (var index in nameList) {
        var publicName = nameList[index];
        var nonce = createNonce();
        var filter = "nickname";
        var order = "NRI";
        var xyz = createXyz("/xdnphb/data/weixinuser/searchWeixinDataByCondition?AppKey=joker&filter=" + filter + "&hasDeal=false&keyName=" + publicName + "&order=" + order + "&nonce=" + nonce);
        list.push({publicName: publicName, nonce: nonce, xyz: xyz, filter: filter, orderBy: order});
    }
    ajaxPost(saveUrl, list);
}

