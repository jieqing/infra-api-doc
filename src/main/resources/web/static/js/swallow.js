/**
 * swallow基础JS方法
 */

/**
 * 对表单数据调用验证工具进行验证
 * @param form 要验证的form对象
 * 如果成功返回true
 */
function validForm(form) {

	var re = $(form).bootstrapValidator({
		message : '输入值不合法！',
		excluded : [ ':disabled' ],
		feedbackIcons : {
			/*input状态样式图片*/
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		}
	}).bootstrapValidator('validate');

	var isValid = $(form).data('bootstrapValidator').isValid();

	return isValid;
}

/**
 * 取得表单数据并生成Object对象
 * @param form
 * @returns form中所有带有data-json='true'的input对象的值组成的对象
 */
function getFormJson(form) {
	var inputs = $(form).find("[data-json='true']").filter("[name]");

	var re = {};
	inputs.each(function() {
		re[$(this).attr("name")] = $(this).val();
	});
	console.log("form data:" + re.toString());
	return re;
}

// ******************分页控件处理*********************************************

/**
 * 取得页面信息
 * @returns {{curr: (*|jQuery), size: (*|jQuery)}}
 */
function getPageInfo(pager) {
	var pageCurr = parseInt($(pager).find("#currentPage").first().val());
	var pageSize = parseInt($(pager).find("input#pageSize").first().val());

	return {
		currentPage : pageCurr,
		pageSize : pageSize
	};
}

/**
 * 设置页面数据
 * @param pagerData
 * @param pager
 */
function setPageInfo(pagerCtrl, pager) {

	$(pagerCtrl).find("#currentPage").first().val(pager.currentPage);
	$(pagerCtrl).find("input#pageSize").first().val(pager.pageSize);
	$(pagerCtrl).find("#pageCount").first().val(pager.pageCount);
	$(pagerCtrl).find("#btncurrentPage").first().html(
			"第" + pager.currentPage + "页");
	$(pagerCtrl).find("#btnRowInfo").first().html(
			"共" + pager.pageCount + "页，" + pager.totalRow + "条记录");
}

function regPagerEvent(pager) {
	// 跳转到第一页
	$(pager).find("#pageFirst").first().click(function() {
		var pageS = parseInt($(pager).find("input#pageSize").first().val());

		queryUserList(JSON.stringify({
			data : getFormJson("#seachForm"),
			pager : {
				currentPage : 1,
				pageSize : pageS
			}
		}));
	});
	// 跳转到前一页
	$(pager).find("#pagePre").first().click(function() {
		var pageCurr = parseInt($(pager).find("#currentPage").first().val());
		var pageS = parseInt($(pager).find("input#pageSize").first().val());
		pageCurr = pageCurr - 1;
		pageCurr = pageCurr < 1 ? 1 : pageCurr;

		var data = JSON.stringify({
			data : getFormJson("#seachForm"),
			pager : {
				currentPage : pageCurr,
				pageSize : pageS
			}
		});
		console.log(data);

		queryUserList(data);
	});

	// 跳转到后一页
	$(pager).find("#pageNext").first().click(
			function() {
				var pageCurr = parseInt($(pager).find("#currentPage").first()
						.val());
				var pageS = parseInt($(pager).find("input#pageSize").first()
						.val());
				var pageCount = parseInt($(pager).find("input#pageCount")
						.first().val())
				pageCurr = pageCurr + 1;
				pageCurr = pageCurr < 1 ? 1 : pageCurr;
				pageCurr = pageCurr > pageCount ? pageCount : pageCurr;

				var data = JSON.stringify({
					data : getFormJson("#seachForm"),
					pager : {
						currentPage : pageCurr,
						pageSize : pageS
					}
				});
				console.log(data);

				queryUserList(data);
			});
	// 跳转到最后页
	$(pager).find("#pageLast").first().click(function() {
		var pageCurr = parseInt($(pager).find("#pageCount").first().val());
		var pageS = parseInt($(pager).find("input#pageSize").first().val());

		pageCurr = pageCurr < 1 ? 1 : pageCurr;

		var data = JSON.stringify({
			data : getFormJson("#seachForm"),
			pager : {
				currentPage : pageCurr,
				pageSize : pageS
			}
		});
		console.log(data);

		queryUserList(data);
	});

	//更改页面大小选择事件
	$(pager).find("ul#pageSize").first().find("a").each(
			function() {
				$(this).click(
						function() {
							var pageCurr = parseInt($(pager).find(
									"#currentPage").first().val());
							var pageS = parseInt($(this).parent().val());

							$(pager).find("input#pageSize").first().val(pageS);
							$(pager).find("button#pageSize").first().html(
									pageS + "条记录<span class=\"glyphicon glyphicon-chevron-down\"></span>");

							var data = JSON.stringify({
								data : getFormJson("#seachForm"),
								pager : {
									currentPage : pageCurr,
									pageSize : pageS
								}
							});
							console.log(data);

							queryUserList(data);
						})
			})
}

// 注册选择组事件
function regCheckGroup(groupName) {
	$("[data-chkgroup='" + groupName + "']").change(function() {
		var isChecked = $(this).is(":checked");

		var groupName = $(this).data("chkgroup");

		$("[data-chkgroup-item='" + groupName + "']:checkbox").each(function() {
			$(this).prop("checked", isChecked);
		});

	});
}
// 取得选择组的值列表
function getCheckGroup(groupName) {
	var data = new Array();
	$("[data-chkgroup-item='" + groupName + "']:checked").each(function() {
		data.push($(this).val());
	});
	return data;
}
//------------------------对话框组件----------------------------
//注册对话框组件
	function regMessageBox(url) {
        $.get(url, function (response, status, xhr) {
        	        	
            if (status != "success") {
                alert("注册MessageBox失败!");
                return;
            }          
            $("head").append(response);           
        });
    }
	
    //弹出对话框
	function showMessageBox(Title,Message,doOkfunction){
				
		$("#messageBox").each(function (){
			$(this).remove();
		})
		
		var tmpl=$.templates("#modalBox");
		var modal=tmpl.render({title:Title,message:Message});
			
		$("body").append(modal)				
		$("#messageBox").modal({backdrop:"static"});		
		
		//注册确定事件
		$("#messageBox #ok").click(function(){
			$("#messageBox").modal("hide");
			
			if(doOkfunction!=null)	doOkfunction(); //调用定义的确定动作
		});

	}
	
	
	//弹出对话框
	function showDataBox(data,doOkfunction){
		//div根元素的ID
		$("#userDialogContent").each(function (){
			$(this).remove();
		});
		
		//jsRender script的ID
		var tmpl=$.templates("#userDialog");
		var modal=tmpl.render(data);
	
		$("body").append(modal);
		$("#userDialogContent").modal({backdrop:"static"});
		
		function callback() {
			$("#userDialogContent").modal("hide");
		}
		//注册确定事件
		
		$("#userDialogContent #editFormOK").click(function(){
			var form=$("#userDialogContent form")[0];
			var valid=validForm(form);
			if(!valid) return;
			var jsonData=getFormJson(form);
			if(doOkfunction!=null) {
				doOkfunction(jsonData,callback);
			} else {
				$("#userDialogContent").modal("hide");
			}
		});

	}

