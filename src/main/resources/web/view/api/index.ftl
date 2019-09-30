<!DOCTYPE html>
<html>
<head>
    <title>接口管理</title>
<#include "../common/head.ftl">
    <style>
        pre {
            border: 0;
            padding: 0;
            margin: 5px;
        }

        .string {
            color: green;
        }

        .number {
            color: darkorange;
        }

        .boolean {
            color: blue;
        }

        .null {
            color: magenta;
        }

        .key {
            color: red;
        }

        .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
            padding: 3px;
        }

        .nav-pills > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
            background-color: #09bb07;
        }

        .item {
            margin: 4px 0;
        }
    </style>
    <script src="/js/api/index.js"></script>
    <script id="moduleListTmp" type="text/x-jsrender">
        <li role="presentation" {{if #index==0}}class="active"{{/if}} id={{:id}}><a href="#">{{:name}}</a></li>
    </script>
    <script id="moduleIpListTmp" type="text/x-jsrender">
        <option {{if defaultIp==true}}selected="selected"{{/if}} value={{:requestIp}}>{{:requestIp}}</option>
    </script>
    <script id="classListTmp" type="text/x-jsrender">
        <li role="presentation" {{if #index==0}}class="active"{{/if}} id={{:id}} name="{{:name}}"><a href="#">{{:description}}</a></li>
    </script>
    <script id="urlListTmp" type="text/x-jsrender">
        <li role="presentation" {{if #index==0}}class="active"{{/if}} id={{:id}} data-class-id={{:classId}}><a href="#">{{:description}}</a></li>
    </script>
    <script id="urlOneTmp" type="text/x-jsrender">
        <div class="item"><h4>{{:description}}</h4></div>
        <div class="item"><b>请求Url</b>&nbsp&nbsp&nbsp&nbsp<span id="requestUrl" style="color: rgb(0, 0, 255)">{{:requestUrl}}</span></div>
        <div class="item"><b>请求类型</b>&nbsp&nbsp<span style="color: #09bb07">{{:requestType}}</span></div>
        <div class="item"><b>后台方法</b>&nbsp&nbsp{{:className}}.{{:methodName}}</div>
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
</head>

<body>
<div class="container-fluid" style="margin: 0.5% 2%;;">
    <div class="row" style="margin-left: 60%;">
        <div class="col-md-12">
            <select id="urlId" class="form-control select2-allow-clear">
            </select>
        </div>
    </div>
    <div class="row" style="padding: 0.5% 0">
        <div class="col-md-12">
            <ul class="nav nav-tabs" id="moduleList">
            </ul>
        </div>
        <div style="position: absolute;margin-left: 83%">
            <select class="form-control" id="moduleIpList">
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2">
            <ul id="classList" class="nav nav-pills nav-stacked">
            </ul>
        </div>
        <div class="col-md-2" style="margin-left: -28px;">
            <ul id="urlList" class="nav nav-pills nav-stacked">
            </ul>
        </div>
        <div class="col-md-4" style="padding-left: 0">
            <div id="urlOne">
            </div>
            <button id="saveParameterValue" class="btn btn-success" type="button"
                    style="position: absolute;margin-left: 86%;margin-top: -13%;">保存
            </button>
            <div class="row" style="margin-top: 30px">
                <h4 class="col-md-11">请求参数列表</h4>

            </div>
            <table class="table table-hover" style="table-layout:fixed">
                <thead>
                <tr>
                    <th style="width: 30%">变量名</th>
                    <th style="width: 10%">类型</th>
                    <th style="width: 35%">含义</th>
                    <th STYLE="width: 25%">值</th>
                </tr>
                </thead>
                <tbody id="parameter1Table">
                </tbody>
            </table>

            <h4>响应参数列表</h4>
            <table class="table table-hover" style="table-layout:fixed">
                <thead>
                <tr>
                    <th style="width: 30%">变量名</th>
                    <th style="width: 10%">类型</th>
                    <th style="width: 60%">含义</th>
                </tr>
                </thead>
                <tbody id="parameter2Table">
                </tbody>
            </table>
        </div>
        <div class="col-md-4">
            <button id="sendApi" class="btn btn-info" type="button"
                    style="margin-left: 90%;">发送
            </button>
            Headers
            <input id="headersId" type="hidden">
            <textarea id="headers" rows="2" class="form-control" placeholder="Authorization:E6s5MB0722JYDQ9QSG
sn:FPAL11931011532TYA12606"></textarea>
            <pre id="sendApiParam"></pre>
            <pre id="sendApiResult"></pre>
        </div>
    </div>
</div>
<#include "../common/footer.ftl">

</body>
</html>