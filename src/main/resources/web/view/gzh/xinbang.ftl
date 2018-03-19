<!DOCTYPE html>
<html>
<head>
    <title>公众号企业信息查询</title>
<#include "../common/head.ftl">
    <style>
        .direBtn {
            width: 20%;
            height: 3rem;
            border-radius: .7rem;
            color: #2faad8;
            font-size: 1.5rem;
            outline: none;
            border: #69ddff solid 1px;
            background-color: #fff;
            top: 1rem;
            position: relative;
            left: 27%;
        }
    </style>
    <script>
        var queryUrl = "query";
        var menuIndex = 0;
    </script>
    <script id="tableTmp" type="text/x-jsrender">
<ul class="VehicleManages" style="display:block;">
<li><span class="list-left">车辆状态</span><span class="list-right">{{:carStatus}}</span></li>
    <li><span class="list-left">车牌号</span><span class="list-right">{{:carPlate}}</span></li>
    <li><span class="list-left">车辆类型</span><span class="list-right">{{:carType}}</span></li>
	 <li><span class="list-left">品牌</span><span class="list-right">{{:carBrand}}</span></li>
<li><span class="list-left">车型代码</span><span class="list-right">{{:carModelNo}}</span></li>
<li><span class="list-left">库存地点</span><span class="list-right">{{:location}}</span></li>
<li><span class="list-left">型号</span><span class="list-right">{{:carModel}}</span></li>
<li><span class="list-left">发动机号</span><span class="list-right">{{:engineNo}}</span></li>
<li><span class="list-left">车架号</span><span class="list-right">{{:chassisNo}}</span></li>
<li><span class="list-left">供应商</span><span class="list-right">{{:vendor}}</span></li>
<li><span class="list-left">出厂日期</span><span class="list-right">{{if mfgDate}}{{:mfgDate.substring(0, 10)}}{{/if}}</span></li>
<li><span class="list-left">购买日期</span><span class="list-right">{{if purchaseDate}}{{:purchaseDate.substring(0, 10)}}{{/if}}</span></li>
<li><span class="list-left">行驶里程数</span><span class="list-right">{{:travelMileage}} Km</span></li>
<li><span class="list-left">里程数更新时间</span><span class="list-right">{{if mileageUpdateTime}}{{:mileageUpdateTime.substring(0, 19)}}{{/if}}</span></li>
<li><span class="list-left">保养周期</span><span class="list-right">{{:maintCycle}}</span></li>
<li><span class="list-left">最近保养日期</span><span class="list-right">{{if recentMaintDate}}{{:recentMaintDate.substring(0, 10)}}{{/if}}</span></li>
<li><span class="list-left">保养里程</span><span class="list-right">{{:maintMileage}} km</span></li>
<li><span class="list-left">最近保养里程</span><span class="list-right">{{:recentMaintMileage}} km</span></li>
</ul>



    </script>
    <script id="tableEmptyTmp" type="text/x-jsrender">
	<div class="noData">
		<h1>暂无数据</h1>
	</div>



    </script>
</head>

<body>

<div>
    <input type="text" class="form-control search col-xs-10" placeholder="Recipient's username">
</div>
<#--<div class="banner"><img src="${ctx}/resources/images/pic1.jpg"></div>-->
<div id="datatable">
</div>
<div class="tabBar_pos"></div>

<#--<#include "../common/footer.ftl">-->

<script>

</script>
</body>
</html>