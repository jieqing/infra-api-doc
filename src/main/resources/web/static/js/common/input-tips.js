function getTipsInfo(value) {
    var carNoPre = $("#carNoPre").val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: ctx + "/car/queryCarNo?carNo=" + carNoPre + "%25" + value + "%25",
        success: onUpdateTipsList
    });
}
function onUpdateTipsList(data) {
    var textDes = getTextDes();

    if (data == null) {
        //请求失败，清除查询结果
        return;
    }
    $(".gac_m").children("ul").children("li").remove();
    $.each(data, function (index, item) {
        var carPlate = item.carPlate.substring(2);
        var li = $(document)[0].createElement("li");
        var title = $(document)[0].createElement("p");
        title.innerHTML = carPlate;
        title.className = "title";

        $(li).bind("click", function () {
            onSetSelectedValue(carPlate);
            textDes.children().remove();
            $('.gac_m').show();
        });

        $(li).hover(function () {
            $(li).addClass("bg_color");
        }, function () {
            $(li).removeClass("bg_color");
        });

        li.appendChild(title);
        textDes.append(li);
    });
    $('.gac_m').show();
}

function getTextDes() {
    return input.parent().parent().siblings(".gac_m").children("ul");
}

//第三种种方案，监听input 及propertychange事件
$('#carNo').live('input propertychange', inputChange);

var input;
var timer;
function inputChange() {
    input = $(this);
    $(".gac_m").children("ul").children("li").remove();
    clearTimeout(timer);
    timer = setTimeout(function () {
        var inputVal = input.val();
        if (inputVal != "") {
            getTipsInfo(inputVal);
        }
    }, 500);
}

//更新输入控件
function onSetSelectedValue(value) {
    var input = getTextDes().parent().prev();
    input.children("div").children("#carNo").val(value);
    onQueryClick();
}