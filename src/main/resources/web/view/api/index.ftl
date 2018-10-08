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
    </style>
    <script>
        var userId = 1;
    </script>
    <#include "indexRd.ftl">
</head>

<body>
<div class="container-fluid" style="margin: 0.5% 2%;;">
    <div class="row">
        <form class="form-inline col-md-6 ">
                <div class="input-group col-md-3">
                    <select id="className" class="form-control select2-allow-clear">
                    </select>
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" data-select2-open="className">
                          <span class="glyphicon glyphicon-search"></span>
                        </button>
                      </span>
                </div>
            <div class="input-group">
                <input id="urlName" type="search" class="form-control" placeholder="请输入接口名或接口url">
                <div class="input-group-addon glyphicon glyphicon-search" style="top: 0"></div>
                </span>
            </div>
        </form>
        <div class="col-md-2">

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
            <button id="sendApi" class="btn btn-info" type="button"
                    style="position: absolute;margin-left: 86%;margin-top: -13%;">发送
            </button>
            <div class="row" style="margin-top: 30px">
                <h4 class="col-md-11">请求参数列表</h4>
                <button id="saveParameterValue" class="btn btn-success" type="button"
                        style="position: absolute;margin-left: -5%;">保存
                </button>
            </div>
            <table class="table table-hover" style="table-layout:fixed">
                <thead>
                <tr>
                    <th style="width: 100px">变量名</th>
                    <th style="width: 50px">类型</th>
                    <th style="width: 150px">含义</th>
                    <th>值</th>
                </tr>
                </thead>
                <tbody id="parameter1Table">
                </tbody>
            </table>

            <h4>响应参数列表</h4>
            <table class="table table-hover" style="table-layout:fixed">
                <thead>
                <tr>
                    <th>变量名</th>
                    <th>类型</th>
                    <th>含义</th>
                </tr>
                </thead>
                <tbody id="parameter2Table">
                </tbody>
            </table>
        </div>
        <div class="col-md-4">
            <pre id="sendApiParam"></pre>
            <pre id="sendApiResult"></pre>
        </div>
    </div>
</div>
<#include "../common/footer.ftl">
<script src="/js/api/class.js"></script>
<script>

</script>
</body>
</html>