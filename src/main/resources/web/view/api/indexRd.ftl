<style>
    .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
        padding: 3px;
    }
    .nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover{
        background-color: #09bb07;
    }
    .item {
        margin: 4px 0;
    }
</style>
<script id="moduleListTmp" type="text/x-jsrender">
    <li role="presentation" {{if #index==0}}class="active"{{/if}} id={{:id}}><a href="#">{{:name}}</a></li>
</script>
<script id="moduleIpListTmp" type="text/x-jsrender">
    <option {{if defaultIp==true}}selected="selected"{{/if}} value={{:requestIp}}>{{:requestIp}}</option>
</script>
<script id="classListTmp" type="text/x-jsrender">
    <li role="presentation" {{if #index==0}}class="active"{{/if}} id={{:id}}><a href="#">{{:name}}</a></li>
</script>
<script id="urlListTmp" type="text/x-jsrender">
    <li role="presentation" {{if #index==0}}class="active"{{/if}} id={{:id}} data-class-id={{:classId}}><a href="#">{{:methodName}}</a></li>
</script>
<script id="urlOneTmp" type="text/x-jsrender">
    <div class="item"><b>请求Url</b>&nbsp&nbsp&nbsp&nbsp<span id="requestUrl" style="color: rgb(0, 0, 255)">{{:requestUrl}}</span></div>
    <div class="item"><b>请求类型</b>&nbsp&nbsp<span style="color: #09bb07">{{:requestType}}</span></div>
    <div class="item"><b>描述</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{:description}}</div>
</script>
<script id="parameter1TableTmp" type="text/x-jsrender">
    <tr>
        <input name="id" type="hidden" value={{:id}}>
        <td name="paramName">{{if parentId!=0}}--{{/if}}{{:name}}</td>
        <td>{{:dataType}}</td>
        <td>{{:description}}</td>
        <td><input type="text" name="dateValue" class="form-control" value={{:dateValue}}></td>
    </tr>
</script>
<script id="parameter2TableTmp" type="text/x-jsrender">
    <tr>
        <td>{{if parentId!=0}}--{{/if}}{{:name}}</td>
        <td>{{:dataType}}</td>
        <td>{{:description}}</td>
    </tr>
</script>