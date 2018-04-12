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

        .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
            padding: 3px;
        }
    </style>
    <script>
        var queryUrl = "page";
        var updateUrl = "update";
    </script>
    <script id="tableTmp" type="text/x-jsrender">
        <tr>
            <th scope="row">{{:#index+1}}</th>
            <input name="id" type="hidden" value={{:id}}>
            <td><img style="width: 50px;" src={{:imgUrl}}></td>
             <td><img style="width: 50px;" src={{:codeImageUrl}} onMouseOut='hoverHiddendiv(this)' onMouseOver='hoverShowDiv(this)'>
             <img style='height:250px; position:absolute; display:none' src={{:codeImageUrl}}>
             </td>
            <td><input type="checkbox" name="isCall" {{if isCall==2}}checked{{/if}}></td>
            <td><input type="checkbox" name="isCooperate" {{if isCooperate==2}}checked{{/if}}></td>
            <td>{{:publicName}}</td>
            <#--<td>{{:wxNo}}</td>-->
            <#--<td>{{:introduce}}</td>-->
        <#--<td>{{:type}}</td>-->
        <#--<td>{{:tags}}</td>-->
            <td>{{if hotNum}}{{:hotNum.toFixed(2)}}{{else}}&nbsp;{{/if}}</td>
            <td>{{if avgReadAll}}{{:avgReadAll.toFixed(2)}}{{else}}&nbsp;{{/if}}</td>
        <#--<td>{{:city}}</td>-->
            <td>{{:certifiedCompany}}</td>
            <#--<td>{{if qiChaChaDto.companyName}}{{:qiChaChaDto.companyName}}{{else certifiedCompany}}<a target="_blank" href='https://www.qichacha.com/search?key={{:certifiedCompany}}'>查看公司联系方式</a>{{/if}}</td>-->
            <#--&lt;#&ndash;<td><img style="width: 60px;" src={{:qiChaChaDto.logoUrl}}></td>&ndash;&gt;-->
            <#--<td>{{:qiChaChaDto.legalPerson}}</td>-->
            <#--<td>{{:qiChaChaDto.phone}}</td>-->
            <#--<td>{{:qiChaChaDto.registerMoney}}</td>-->

            <#--<td>{{:qiChaChaDto.createDay}}</td>-->
            <#--<td>{{:qiChaChaDto.email}}</td>-->
            <#--<td>{{:qiChaChaDto.address}}</td>-->
        </tr>
    </script>
    <script id="tableEmptyTmp" type="text/x-jsrender">
        <div class="noData">
            <h1>暂无数据，请稍后再试</h1>
        </div>

    </script>

</head>

<body>
<div style="margin-top: 60px;">
    <div class="nameSearch">
        <div class="input-group">
            <input id="publicName" type="text" class="form-control" placeholder="请输入公众号名称">
            <span class="input-group-btn">
                <button id="query" class="btn btn-default" type="button">查找</button>
            </span>
        </div>
    </div>
</div>

<div style=" margin-top: 25px;margin-left: 20px">
    <table class="table table-hover" style="table-layout:fixed">
        <thead>
        <tr>
            <th style="width: 50px;">序号</th>
            <th style="width: 60px;">logo</th>
            <th style="width: 60px;">二维码</th>
            <th style="width: 70px;">已打电话</th>
            <th style="width: 50px;">已合作</th>
            <th>公众号名</th>
        <#--<th>公众号</th>-->
        <#--<th>介绍</th>-->
        <#--<th>类别</th>-->
        <#--<th>标签</th>-->
            <th style="width: 60px;">热度</th>
            <th >所有文章平均阅读量</th>
        <#--<th>城市</th>-->
            <th>微信认证</th>
            <#--<th>公司名称</th>-->
            <#--<th style="width: 70px;">法人</th>-->
            <#--<th>电话</th>-->
            <#--<th>注册资金</th>-->
        </tr>
        </thead>
        <tbody id="datatable">

        </tbody>
    </table>
</div>

<#include "../common/footer.ftl">
<script src="/js/gzh/wxPublic.js"></script>
<script>

</script>
</body>
</html>