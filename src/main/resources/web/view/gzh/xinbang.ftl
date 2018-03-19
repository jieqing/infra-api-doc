<!DOCTYPE html>
<html>
<head>
    <title>公众号企业信息查询</title>
<#include "../common/head.ftl">
    <style>
        .nameSearch {
            width: 40%;
            margin-left: 30%;
            text-align: center;
        }
        td{
            padding: 1px;
        }
    </style>
    <script>
        var queryUrl = "gzh/xb/search";
    </script>
    <script id="tableTmp" type="text/x-jsrender">
        <tr>
            <th scope="row">{{:#index+1}}</th>
            <td><img style="width: 50px;" src={{:imgUrl}}></td>
            <td>{{:gzhName}}</td>
            <#--<td>{{:wxNo}}</td>-->
            <#--<td>{{:introduce}}</td>-->
        <#--<td>{{:type}}</td>-->
        <#--<td>{{:tags}}</td>-->
            <td>{{if hotNum}}{{:hotNum.toFixed(2)}}{{else}}&nbsp;{{/if}}</td>
            <td>{{if avgReadAll}}{{:avgReadAll.toFixed(2)}}{{else}}&nbsp;{{/if}}</td>
        <#--<td>{{:city}}</td>-->
            <td>{{:certifiedCompany}}</td>
            <td>{{:qiChaChaDto.companyName}}</td>
            <#--<td><img style="width: 60px;" src={{:qiChaChaDto.logoUrl}}></td>-->
            <td>{{:qiChaChaDto.legalPerson}}</td>
            <td>{{:qiChaChaDto.registerMoney}}</td>
            <td>{{:qiChaChaDto.createDay}}</td>
            <td>{{:qiChaChaDto.phone}}</td>
            <td>{{:qiChaChaDto.email}}</td>
            <#--<td>{{:qiChaChaDto.address}}</td>-->
        </tr>
    </script>
    <script id="tableEmptyTmp" type="text/x-jsrender">
        <div class="noData">
            <h1>暂无数据</h1>
        </div>
    </script>

</head>

<body>
<div style="margin-top: 60px;">
    <div class="nameSearch">
        <div class="input-group">
            <input id="gzhName" type="text" class="form-control" placeholder="请输入公众号名称">
            <span class="input-group-btn">
        <button id="query" class="btn btn-default" type="button">查找</button>
      </span>
        </div>
    </div>
</div>

<div style=" margin-top: 25px;">
    <table class="table table-hover" style="table-layout:fixed">
        <thead>
        <tr>
            <th style="width: 50px;">序号</th>
            <th>logo</th>
            <th>公众号名</th>
            <#--<th>公众号</th>-->
            <#--<th>介绍</th>-->
        <#--<th>类别</th>-->
        <#--<th>标签</th>-->
            <th>热度</th>
            <th>平均阅读量</th>
        <#--<th>城市</th>-->
            <th>微信认证</th>
            <th>公司名称</th>
            <#--<th>公司logo</th>-->
            <th>法人</th>
            <th>注册资金</th>
            <th>成立时间</th>
            <th>电话</th>
            <th>邮箱</th>
            <#--<th>地址</th>-->
        </tr>
        </thead>
        <tbody id="datatable">

        </tbody>
    </table>
</div>

<#include "../common/footer.ftl">
<script src="/js/gzh/xinbang.js?v=${VERSION}"></script>
<script>

</script>
</body>
</html>