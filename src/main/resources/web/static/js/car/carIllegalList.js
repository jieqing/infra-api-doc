var dateStr = GetQueryString("dateStr");
if (dateStr == null) {
    dateStr = "";
}
$(function () {
    //切换菜单
    $('.tab_nav li').click(function () {
        $(".tab_nav li").removeClass("current");
        $(this).addClass("current");
        //
        var $imgList = $('.tab_nav li div img');
        for (var i = 0; i < $imgList.length; i++) {
            var $img = $($imgList[i]);
            var attr = $img.attr("src");
            $img.attr("src", attr.replace("_pre.png", ".png"));
        }
        var $menuImg = $(this).children("div").children("img");
        $menuImg.attr("src", $menuImg.attr("src").replace(".png", "_pre.png"));
        menuIndex = $(this).index();
        sessionStorage.setItem("menuIndex", menuIndex);
        queryList();
    });

    var miItem = sessionStorage.getItem("menuIndex");
    if (miItem != null) {
        menuIndex = miItem;
    }
    $('.tab_nav li:eq(' + menuIndex + ')').click();
    $("#datatable").css("height", $(window).height() - 125 + "px");

    //跳转到详情页
    $("tr:gt(0)").live("click", function () {
        var text = $($(this).children("td")[0]).text();
        var carPlatePre = text.substring(0, 2);
        var carPlate = text.substring(2);
        sessionStorage.setItem("carNo", carPlate);//保存数据
        sessionStorage.setItem("carNoPre", carPlatePre);
        location.href = ctx + detailUrl;
    });

    $("#query").click(function () {
        queryList();
    });
    $("#companyName").change(queryList);
});

//查询列表数据
function queryList() {

    if (menuIndex == 3) {
        $("header").hide();
    } else {
        $("header").show();
    }
    var companyName = $("#companyName").val();
    showLoading();
    $.ajax({
        type: "GET", //提交方式
        contentType: "application/json; charset=utf-8", //内容类型
        dataType: "json", //类型
        url: queryUrl + "?menuIndex=" + menuIndex + "&dateStr=" + dateStr + "&companyName=" + companyName, //提交的页面，方法名
        success: function (redata, status) {
            var tmpl;
            if (redata == null || redata.length <= 0 || $.isEmptyObject(redata)) {
                tmpl = $.templates("#tableEmptyTmp");
            } else {
                tmpl = $.templates("#tableTmp" + menuIndex);
            }
            if (menuIndex == 3) {
                myChart = echarts.init(document.getElementById('datatable'), "macarons");
                option.yAxis[0].data = [];
                for (var i = 0; i < 5; i++) {
                    option.series[i].data = [];
                }
                for (var i in redata) {
                    option.yAxis[0].data.push(limit(redata[i].companyName, 4));
                    option.series[0].data.push(redata[i].carNum);
                    option.series[1].data.push(redata[i].bigIllCarNum);
                    option.series[2].data.push(redata[i].illegalNum);
                    option.series[3].data.push(redata[i].thisWeekIllNum);
                    option.series[4].data.push(redata[i].thisWeekProcessNum);
                }
                myChart.setOption(option, true);
            } else {
                tmpl.link("#datatable", {date: redata});
            }
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
$(function () {
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['未处理违章车辆', '未处理超9分车辆', '剩余未处理违章次数', '本周新增违章数', '本周已处理违章数']
            //x: 'right',
            //y: 60,
            //orient: 'vertical'
        },
        xAxis: [
            {
                type: 'value',
                boundaryGap: [0, 0.01]
            }
        ],
        yAxis: [
            {
                axisLabel: {
                    interval: 0
                },
                type: 'category',
                data: []
            }
        ],
        series: [
            {
                name: '未处理违章车辆',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#52a7ef',
                        label: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
                data: []
            },
            {
                name: '未处理超9分车辆',
                type: 'bar',
                barGap: 0,
                itemStyle: {
                    normal: {
                        color: '#ff7a7a',
                        label: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
                data: []
            },
            {
                name: '剩余未处理违章次数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#8fe2e9',
                        label: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
                data: []
            },
            {
                name: '本周新增违章数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#ab88d5',
                        label: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
                data: []
            },
            {
                name: '本周已处理违章数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#fc9f54',
                        label: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
                data: []
            }
        ]
    };
});