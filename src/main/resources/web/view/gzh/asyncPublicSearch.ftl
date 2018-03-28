<!DOCTYPE html>
<html>
<head>
    <title>离线查询公众号企业信息</title>
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
        var saveUrl = "gzh/xb/search";
    </script>
    <#--<script id="tableTmp" type="text/x-jsrender">-->
        <#--<tr>-->
            <#--<th scope="row">{{:#index+1}}</th>-->
            <#--<input name="id" type="hidden" value={{:id}}>-->
            <#--<td><img style="width: 50px;" src={{:imgUrl}}></td>-->
             <#--<td><img style="width: 50px;" src={{:codeImageUrl}} onMouseOut='hoverHiddendiv(this)' onMouseOver='hoverShowDiv(this)'>-->
             <#--<img style='height:250px; position:absolute; display:none' src={{:codeImageUrl}}>-->
             <#--</td>-->
            <#--<td><input type="checkbox" name="isCall" {{if isCall==2}}checked{{/if}}></td>-->
            <#--<td><input type="checkbox" name="isCooperate" {{if isCooperate==2}}checked{{/if}}></td>-->
            <#--<td>{{:publicName}}</td>-->
            <#--&lt;#&ndash;<td>{{:wxNo}}</td>&ndash;&gt;-->
            <#--&lt;#&ndash;<td>{{:introduce}}</td>&ndash;&gt;-->
        <#--&lt;#&ndash;<td>{{:type}}</td>&ndash;&gt;-->
        <#--&lt;#&ndash;<td>{{:tags}}</td>&ndash;&gt;-->
            <#--<td>{{if hotNum}}{{:hotNum.toFixed(2)}}{{else}}&nbsp;{{/if}}</td>-->
            <#--<td>{{if avgReadAll}}{{:avgReadAll.toFixed(2)}}{{else}}&nbsp;{{/if}}</td>-->
        <#--&lt;#&ndash;<td>{{:city}}</td>&ndash;&gt;-->
            <#--<td>{{:certifiedCompany}}</td>-->
            <#--<td>{{if qiChaChaDto.companyName}}{{:qiChaChaDto.companyName}}{{else certifiedCompany}}<a target="_blank" href='https://www.qichacha.com/search?key={{:certifiedCompany}}'>查看公司联系方式</a>{{/if}}</td>-->
            <#--&lt;#&ndash;<td><img style="width: 60px;" src={{:qiChaChaDto.logoUrl}}></td>&ndash;&gt;-->
            <#--<td>{{:qiChaChaDto.legalPerson}}</td>-->
            <#--<td>{{:qiChaChaDto.phone}}</td>-->
            <#--<td>{{:qiChaChaDto.registerMoney}}</td>-->
            <#--&lt;#&ndash;<td>{{:qiChaChaDto.createDay}}</td>&ndash;&gt;-->
            <#--&lt;#&ndash;<td>{{:qiChaChaDto.email}}</td>&ndash;&gt;-->
            <#--&lt;#&ndash;<td>{{:qiChaChaDto.address}}</td>&ndash;&gt;-->
        <#--</tr>-->
    <#--</script>-->

</head>

<body style="margin-top: 60px; margin-left: 60px;">
<div>
    <p>请输入需要离线搜索的公众号名关键字，以“,”(英文逗号)分割</p>
    <label>
        <textarea id="publicNames" rows="10" cols="200"></textarea>
    </label>

</div>
<button id="save" class="btn btn-default" type="button">保存</button>
<p>查找状态</p>
<div id="datatable" style="margin-top: 10px; margin-left: 30%;">

</div>

<#include "../common/footer.ftl">
<script src="/js/gzh/asyncPublicSearch.js"></script>
<script>

</script>
</body>
</html>