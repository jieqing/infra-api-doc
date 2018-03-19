jQuery.extend(jQuery.validator.messages, {
	required : "必填项",
	remote : "请修正该字段",
	email : "请输入正确格式的电子邮件",
	url : "请输入合法的网址",
	date : "请输入合法的日期",
	dateISO : "请输入合法的日期 (ISO).",
	number : "请输入合法的数字",
	digits : "只能输入正整数",
	creditcard : "请输入合法的信用卡号",
	equalTo : "请再次输入相同的值",
	accept : "请输入拥有合法后缀名的字符串",
	maxlength : jQuery.validator.format("请输入一个长度最多是{0}的字符串"),
	minlength : jQuery.validator.format("请输入一个长度最少是{0}的字符串"),
	rangelength : jQuery.validator.format("请输入一个长度介于{0}和{1}之间的字符串"),
	range : jQuery.validator.format("请输入一个介于{0}和{1}之间的值"),
	max : jQuery.validator.format("请输入一个最大为{0}的值"),
	min : jQuery.validator.format("请输入一个最小为{0}的值")
});
jQuery.validator.addMethod("isTimeHHmm", function(value, element) {
	var length = value.length;
	var regTime = /^([0-2][0-9]):([0-5][0-9])$/;
	var result = false;
	if (regTime.test(value)) {
		if ((parseInt(RegExp.$1) < 24) && (parseInt(RegExp.$2) < 60)) {
			result = true;
		}
	}
	return this.optional(element) || result;
}, "请填写正确的时间格式如：10:59 ");

jQuery.validator.addMethod("isTimeGroup", function(value, element) {
	var parent = $(element).parent();
	var firstTxt = parent.find("input:first");
	var lastTxt = parent.find("input:last");
	console.log("first:" + firstTxt.val());
	console.log("lastTxt:" + lastTxt.val());

	var regTime = /^([0-2][0-9]):([0-5][0-9])$/;
	var firstH = 0;
	var lastH = 0;
	var firstM = 0;
	var lastM = 0;

	var result = false;
	if (regTime.test(firstTxt.val())) {
		
		firstH = parseInt(RegExp.$1);
		firstM = parseInt(RegExp.$2);
		
		if (firstH < 24 && firstM < 60) {
			result = true;
		} else {
			return this.optional(firstTxt) || result;
		}
	}
	if (regTime.test(lastTxt.val())) {
		lastH = parseInt(RegExp.$1);
		lastM = parseInt(RegExp.$2);
		if (lastH < 24 && lastM < 60) {
			result = true;
		} else {
			return this.optional(lastTxt) || result;
		}
	}
	if(lastH>firstH||lastH==firstH&&lastM>=firstM){
		result=true;
	}else {
	 	return this.optional(parent) || result;	
	}
    return this.optional(element) || result;
}, "请填写正确的时间格式如：10:59 ");

jQuery.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	return this.optional(element) || (length == 11 && mobile.test(value));
}, "手机号码格式错误");

jQuery.validator.addMethod("isEnAndNum", function(value, element) {
	var reg = /^[A-Za-z0-9]+$/;
	return this.optional(element) || (reg.test(value));
}, "只能填写字母和数字");
