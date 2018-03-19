/*! xdnphb 2018-03-15 */
define(["../../common/invite", "jquery", "api-common", "memory", "nav", "./api-search", "dialog", "cookie", "common", "echarts", "../../plugins/moment/moment", "login-dialog", "datepicker", "autocomplete", "code"],
    function (require, exports, module) {
        var PageInfo = {},
            system = {
                win: !1,
                mac: !1,
                xll: !1
            },
            p = navigator.platform;
        system.win = 0 == p.indexOf("Win"),
            system.mac = 0 == p.indexOf("Mac"),
            system.x11 = "X11" == p || 0 == p.indexOf("Linux"),
            PageInfo.init = function () {
                var FunUtil = {},
                    HtmUtil = {},
                    PageObj = {};
                HtmUtil.searchBox4list = function (a) {
                    for (var b = new StringBuffer,
                             c = a.length,
                             d = 0; d < c; d++) {
                        var e = a[d],
                            f = e.type,
                            g = "",
                            h = [],
                            i = String.changeUrl(e.wxId || e.account),
                            j = !1;
                        remote.memory.rankNameMap[f] && (f = remote.memory.rankNameMap[f]),
                            g = e.description,
                        void 0 != e.advice && (e.advice.length > 100 ? e.advice.substr(0, 100) + "..." : e.advice),
                        void 0 != e.avg_read_all && (e.avg_read_all > 1e5 ? "10w+" : parseFloat(e.avg_read_all).toFixed(1)),
                        e.tags && (h = e.tags),
                            e.commit_price ? JSON.parse(e.commit_price) : {
                                info: [0, 0, 0, 0]
                            },
                            b.append('<li style="overflow:inherit;" class="clear" id="avg_' + e.uuid + '" is20W="' + (e.inGetDb && parseInt(e.inGetDb) > 0) + '" data-account="' + e.account + '"  data-wxid="' + e.wxId + '" data-name="' + escape(e.name) + '" data-status="' + e.status + '"> '),
                            b.append('<div class="clear">'),
                            b.append('<div class="new_wx_left">'),
                            b.append('<div class="wx_lp">'),
                            b.append('<div class="wx_logo">'),
                            b.append('<a style="background:' + i + '"></a>'),
                            b.append("</div>"),
                            b.append('<div class="searchImg swx_bg"></div>'),
                            b.append("</div>"),
                            b.append("</div>"),
                            b.append('<div class="wx_detail ">'),
                            b.append('<h3 id="shopcar_' + e.id + '">' + FunUtil.checkCode(e.name));
                        var k = [{
                            name: "500强",
                            type: (String.HasText(e.monthTopTimes) ? parseInt(e.monthTopTimes) : 0) > 0,
                            tips: e.monthTopTimes + "次进入中国微信月榜500强"
                        },
                            {
                                name: "原创",
                                type: 1 == e.isOriUser,
                                tips: "近期发布过原创内容的公众号"
                            }];
                        if ((String.HasText(e.monthTopTimes) ? parseInt(e.monthTopTimes) : 0) > 0 && b.append('<div class="wubai fivehundred" data-src="' + memory.rootUrl.main + "public/auth/fivehundred.html?uuid=" + e.uuid + '">500强<div class="newrank-500-tips hover-chunk">' + k[0].tips + "</div></div>"), b.append('<div class="wx-code" style=""><div class="hover-chunk wx-code-pic"><img src="' + (String.HasText(e.wxId) ? String.changeUrl(e.wxId, "code") : String.changeUrl(e.account, "code")) + '"/><p>微信扫一扫关注</p></div></div>'), b.append('<div class="cursor-p collect no-collect">                                            <div class="collect-btn" data="' + e.id + '" style="width:17px;height:15px;"><div class="hover-chunk collect-triangle"><p>点击即可<i style="font-style: normal;" class="collect-text">收藏</i>此公众号<br>可以去个人中心建立<a href="javascript:" class="define-rank">自定义榜单</a></p></div></div>                                        </div>'), String.HasText(e.collectCount) && b.append('<div class="collect-remind">' + e.collectCount + "人收藏</div>"), b.append(e.brand && 1 == e.brand.status ? '<div class="brand-a">品牌<div class="newrank-brand-tips hover-chunk">已通过新榜认证，并获得品牌置顶保护</div></div>' : ""), b.append(openAd && "true" == isBind && String.HasText(e.inGetDb) ? '<div class="invite-to-charge" data="' + e.name + "," + e.uuid + "," + e.account + '" style="display:none;">询购</div>' : ""), b.append("</h3>"), b.append('<div class="wxh clear" style="padding:4px 0 2px;">'), b.append("\t<div>微信号：" + (e.account ? e.account : e.wxId) + "</div>"), b.append(1 == e.isOriUser ? '<div class="newrank-serivce">原创<div class="newrank-serivce-tips hover-chunk">' + k[1].tips + "</div></div>" : ""), b.append(1 == e.accountType ? '<div class="vertical-bar services-btn" style="font-size:12px;color:#ff8c00;" title="点击查看服务号标签的提交与纠错">服务号</div>' : ""), String.HasText(e.copyright) && !$.isEmptyObject(e.copyright) && b.append('<div class="vertical-bar rank-copyright" data-src="' + memory.rootUrl.copyright + "author-detail.html?uuid=" + e.copyright.uuid + '">已加入新榜版权<div class="newrank-copyright-tips hover-chunk">点击查看版权信息</div></div>'), b.append("</div>"), b.append('<div class="auth-chunk-parent">'), String.HasText(f)) {
                            var l = h.length > 5 ? 5 : h.length;
                            b.append('<div id="show_' + e.uuid + '" class="s_key">'),
                                b.append('<span class="new-type-span">' + f + "</span>"),
                                b.append(l > 0 ? '<span class="new-type-span-line" ></span>' : ""),
                                b.append('<div id="tags_list_' + e.account + '" class="tags-list-p">');
                            for (var m = 0; m < l; m++) b.append('            <div class="tag-span border-none">'),
                                b.append('            \t<div class="tag-span-hover" title="点击可搜索相关标签">'),
                                b.append('            \t\t<div class="tag-span-back"></div>'),
                                b.append("            \t</div>"),
                                b.append('            \t<span class="tag-span-text">' + FunUtil.checkCode(h[m]) + "</span>"),
                                b.append("            </div>");
                            b.append("</div>"),
                                b.append("</div>")
                        }
                        if (b.append("</div>"), b.append('<div class="wx-detail-nri" style="right:0; left: initial;" title="上周微信新榜指数">'), String.HasText(e.inGetDb)) {
                            String.HasText(e.weekLog1pmark) && parseFloat(e.weekLog1pmark) >= 0 && parseFloat(e.weekLog1pmark).toFixed(1);
                            b.append("<p>" + (String.HasText(e.weekLog1pmark) && parseFloat(e.weekLog1pmark) >= 0 ? "<span>" + parseFloat(e.weekLog1pmark).toFixed(1) + "</span>" : "<span>--/-</span>") + '<i class="public-pic help" title="上周微信新榜指数"></i></p>')
                        } else b.append('<p style="width: 350px;"> <div style="float: left;margin-right: 7px; margin-top: 8px;"></div> <div class="btn search-btn-once"  ><div class="in-library">尚未入库</div><div class="hover-chunk in-library-tip"><p style="width:174px;font-size:12px;line-height:22px;padding:10px;text-align:left;">当前无数据。<br>点击冲榜后公众号一旦推送，<br>我们将开始自动记录数据。</p></div></div></p>');
                        if (b.append("</div>"), b.append("</div>"), b.append("</div>"), b.append('<div class="wx-description">'), b.append('<div class="description clear"><p class="wx-description-name">功能介绍：</p><p class="wx-description-info">' + (g ? FunUtil.checkCode(g) : "暂无介绍") + "</p></div>"), String.HasText(e.certifiedText) && 0 == e.certifiedText.indexOf("微信认证") && b.append(String.HasText(e.certifiedText) ? '<div class="description certified-text clear" style="height:20px"><p class="wx-description-name">微信认证：</p><p class="wx-description-info"><span class="auth-span" data-text="' + e.certifiedText.split("：")[1] + '">' + e.certifiedText.split("：")[1].getSubStr(60) + '</span><span class="gg_icon"></span>' + (String.HasText(e.certifiedTextNum) && parseInt(e.certifiedTextNum) > 1 ? '<div class="certified-num">' + e.certifiedTextNum + '个同主体公众号<div class="newrank-certified-tips hover-chunk">点击搜索同主体账号</div></div>' : "") + "</p></div>" : ""), String.HasText(e.miniProgram)) {
                            var n = e.miniProgram;
                            if (n.length > 0) {
                                b.append("<div class='description routine-platform clear'>"),
                                    b.append("<p class='wx-description-name'>关联小程序：</p>"),
                                    b.append("<div class='wx-description-info-spe'>");
                                for (var o = 0; o < n.length; o++) {
                                    var p = n[o];
                                    b.append("<div class='routine-item-platform'>"),
                                        b.append("<div class='routine-item-image' style='background-image:url(" + p.headimg_url + ")'></div>"),
                                        b.append("<div class='routine-item-information'>"),
                                        b.append("<div class='routine-item-information-header'><i class='routine-icon'></i>小程序</div>"),
                                        b.append("<div class='routine-item-information-content'>"),
                                        b.append("<p class='name'>" + p.nickname + "</p><p class='desc'>" + p.desc.getSubStr(120) + "</p>"),
                                        b.append("<div data-url='" + (p.short_url ? p.short_url : p.url) + "' class='routine-information-url'><div class='code-image' style='background-image:url(" + p.headimg_url + ")'></div></div>"),
                                        b.append("<p style='color:#d4d4d4;'>查看使用场景</p>"),
                                        b.append("</div>"),
                                        b.append("<div class='bottom-info clear'><div style='border-right:1px solid #eee'><p>涉及公众号数</p><p><span>" + p.total + "</span></p></div><div><p>上周曝光量</p><p><span>" + FunUtil.format1wNum(p.total_clicks_count) + "</span></p></div></div>"),
                                        b.append("</div>"),
                                        b.append("</div>")
                                }
                                b.append("</div>"),
                                    b.append("</div>")
                            }
                        }
                        if (String.HasText(e.platform)) {
                            var q = e.platform.length;
                            if (e.platform = e.platform.sort(function (a, b) {
                                    return a.mediaType - b.mediaType
                                }), q > 0) {
                                for (var r = !0,
                                         s = 0; s < q; s++) 0 != e.platform[s].mediaType && 1 != e.platform[s].mediaType || (r = !1);
                                if (!r) {
                                    b.append('<div class="description media-platform clear">'),
                                        b.append('<p class="wx-description-name">全平台账号：</p>'),
                                        b.append('<div class="wx-description-info">');
                                    for (var m = 0; m < q; m++) {
                                        var p = e.platform[m];
                                        1 != p.mediaType && 0 != p.mediaType || (b.append(' <div class="tag-item-platform " sc="' + p.indexUrl + '" title="' + p.nickName + '">'), b.append('<i class="' + (0 == p.mediaType ? "search-icon-webo" : "search-icon-toutiao") + '"></i>'), b.append('<div class="tag-span-text"  >' + p.nickName + "</div>"), b.append("</div>"))
                                    }
                                    b.append("</div>"),
                                        b.append("</div>")
                                }
                            }
                        }
                        if (b.append("</div>"), String.HasText(e.newrankAuth) && (1 == e.newrankAuth.status || 2 == e.newrankAuth.status)) {
                            j = !0;
                            var t = FunUtil.common4Auth({
                                stime: e.newrankAuth.authTime
                            })
                        }
                        if (j) {
                            var u = e.newrankAuth;
                            b.append('<div class="clear margin-top-md search-item-auth">'),
                                b.append('<div class="float-left search-icon-auth newrank-auth ' + t + '" data-src="' + memory.rootUrl.main + "public/auth/account.html?uuid=" + e.uuid + '">新榜认证<div class="newrank-auth-tips hover-chunk">点击查看认证详情</div></div>'),
                                b.append('<div class="float-left"><span style="margin-right:10px;color:#646464;">详情:</span>' + u.authTime.substring(0, 10) + "《" + (u.title.length > 10 ? u.title.substring(0, 10) + "..." : u.title) + "》经过自然传播后获得阅读：" + (u.clickCount > 1e5 ? "10w+" : u.clickCount) + "  点赞：" + (u.likeCount > 1e5 ? "10w+" : u.likeCount) + "</div>"),
                                b.append("</div>")
                        }
                        var v = FunUtil.searchBox4hasListNull([e.financeRoundinfo, e.financeMoney, e.financeDate, e.financeLeader]),
                            w = "未透露";
                        if (v) {
                            var x = String.HasText(e.financeUrl),
                                y = e.financeLeader;
                            b.append('    <div class="clear margin-top-md search-item-rong ' + (x ? "" : "cursor-d") + '"  title="' + (x ? "点击查看融资详情" : "") + '" >'),
                                b.append('    \t  \t<div class="float-left margin-right-md " style="margin-left: -14px;"><div class="float-left  search-icon-rong"></div><span class="float-left">融资信息</span></div>'),
                                b.append('    \t  \t<div class="float-left margin-right-md">轮次：\t' + (String.HasText(e.financeRoundinfo) ? e.financeRoundinfo : w) + "</div>"),
                                b.append('    \t  \t<div class="float-left margin-right-md">金额：\t' + (String.HasText(e.financeMoney) ? e.financeMoney : w) + "</div>"),
                                b.append('    \t  \t<div class="float-left margin-right-md">时间：\t' + (String.HasText(e.financeDate) ? e.financeDate.substr(0, 7) : w) + "</div>"),
                                b.append('    \t  \t<div class="float-left margin-right-md">投资者名称：\t' + (String.HasText(y) ? y.length > 8 ? y.substr(0, 8) + "..." : y : w) + "</div>"),
                                b.append('    \t  \t<div class="float-right margin-right-md">' + (x ? '<a href="' + e.financeUrl + '" ><span class="search-icon-more"></span></a>' : "") + "</div>"),
                                b.append("    </div>")
                        }
                        String.HasText(e.h5_url) && b.append('<div class="annually-review"><div class="annually-review-code" data-url="' + e.h5_url + '"></div><p>2017年度回顾</p></div>'),
                            b.append('<div class="search-index-number">' + (d + 1) + "</div>"),
                            b.append("</li>")
                    }
                    return b.toString()
                },
                    HtmUtil.searchBox4relationTags = function (a) {
                        for (var b = new StringBuffer,
                                 c = a.length,
                                 d = 0; d < c; d++) b.append("<li>" + a[d] + "</li>");
                        return b.toString()
                    },
                    HtmUtil.dialog4chongBang = function (a) {
                        var b = new StringBuffer;
                        return b.append('<div class="search-prop-add" >                           '),
                            b.append('\t<div class="row text-center search-prop-add-name">' + a.name + "</div>        "),
                            b.append('\t<div class="row text-center search-prop-add-account">微信号：' + a.account + "</div>     "),
                            b.append('\t<p style="padding-top: 10px;margin-bottom: 10px;"><b>请选择分类</b></p>                                             '),
                            b.append('\t<div class="search-prop-add-type" id="search-prop-add-type"></div>            '),
                            b.append('\t<p style="padding-bottom: 10px;  padding-top: 10px;"><b>请填写标签</b></p>                                             '),
                            b.append('\t<div class="search-prop-add-tags" id="search-prop-add-tags">            '),
                            b.append('\t    <div class="float-left search-prop-add-tags-item" id="search-prop-add-tags-item"><input type="text" style="width:60px;height: 25px;" ></div>            '),
                            b.append('\t    <div class="float-left cursor-p search-prop-add-tags-btn" id="search-prop-add-tags-btn" > <span><i>+</i>添加</span></div>            '),
                            b.append("\t</div>"),
                            b.append('\t<div class="clear"></div>'),
                            b.append('\t<div class="search-prop-add-foot">                  '),
                            b.append('\t   <div class="clear">                                                  '),
                            b.append('\t\t<div class="float-left search-prop-add-foot-img " style=" margin-left: 16px; margin-right: 16px;"><img   id="search-prop-add-foot-img" height="23px"/></div>    '),
                            b.append('\t\t<div class="search-prop-add-foot-value float-left"><input class="form-control text-input" placeholder="请输入验证码" id="search-prop-add-foot-value"></div>  '),
                            b.append('\t\t<div class="search-prop-add-foot-btn" id="search-prop-add-foot-btn"><span class="btn search-prop-btn " style="height:24px;"> 下一步</span></div>    '),
                            b.append("\t   </div>                                              "),
                            b.append("</div>                                                  "),
                            b.append("</div>                                                  "),
                            b.toString()
                    },
                    HtmUtil.dialog4chongBang2Input = function () {
                        var a = new StringBuffer;
                        return a.append('\t<input type="text" style="width:60px;height: 25px;" maxlength="10">'),
                            a.toString()
                    },
                    HtmUtil.dialog4chongBang2Tags = function (a) {
                        for (var b = a.length,
                                 c = new StringBuffer,
                                 d = 0; d < b; d++) c.append('<div class="tag-span">'),
                            c.append('\t<div class="tag-span-hover" title="点击可搜索相关标签">         \t'),
                            c.append('\t\t<div class="tag-span-back"></div>         '),
                            c.append("\t</div> "),
                            c.append('\t<div class="tag-span-text">' + a[d] + "</div>"),
                            c.append("</div>");
                        return c.toString()
                    },
                    HtmUtil.dialog4chongBang2Success = function (a) {
                        var b = new StringBuffer;
                        return b.append("<div>"),
                            b.append('\t<div class="search-icon-hasadd  row "></div>'),
                            b.append('\t<div class="row text-center" style="font-size: 20px;"><p><span id="add-success-info">' + a.name + "</span></p><p>(" + a.account + ")<span>已入库</span>，明日可查</p></div>"),
                            b.append('\t<div class="row text-center" style=" margin:25px 20px 3px;">'),
                            b.append('\t\t如果你是该公众号的管理者，请<a href="/account/user/user.html" target="_blank" style="color:#00b0f0;">认领绑定</a>这个公众号可以享受接单和版权授予、保护等多项权益'),
                            b.append("\t</div>"),
                            b.append('\t <div class="search-prop-foot"><span class="btn search-prop-btn-spe" id="search-prop-btn">知道了</span> </div>'),
                            b.append("</div>"),
                            b.toString()
                    },
                    HtmUtil.setTouTiaoDatas = function (a, b) {
                        var c = new StringBuffer;
                        return c.append('<li class="normal" data-link="' + a.link + '">'),
                            c.append('<div class="toutiao-datas-header">'),
                            c.append('<div class="toutiao-datas-icon" style="background-image:url(' + a.icon + ')"></div>'),
                            c.append('<div class="toutiao-datas-info">'),
                            c.append('<p class="normal" title="' + a.media_name + '">' + FunUtil.setRedSpan(a.media_name.getSubStrFixedlength(16), b) + "</p>"),
                            c.append("</div></div></div>"),
                            c.append("</li>"),
                            c.toString()
                    },
                    HtmUtil.setTouTiaoDatasSpe = function (a, b) {
                        var c = new StringBuffer;
                        return c.append('<li class="spe" data-link="' + a.link + '">'),
                            c.append('<div class="toutiao-datas-header clear">'),
                            c.append('<div class="float-left toutiao-datas-icon" style="background-image:url(' + a.icon + ')"></div>'),
                            c.append('<div class="float-left toutiao-datas-info">'),
                            c.append('<p class="spe">' + FunUtil.setRedSpan(a.media_name.getSubStr(20), b) + "</p>"),
                            c.append("</div></div></div>"),
                            c.append('<div class="toutiao-datas-description-spe" title="' + a.description + '">' + FunUtil.setRedSpan(a.description, b) + "</div>"),
                            c.append("</li>"),
                            c.toString()
                    },
                    HtmUtil.setWeiboDatas = function (a, b) {
                        var c = new StringBuffer;
                        return c.append('<li class="normal" data-link="' + a.index_url + '">'),
                            c.append('<div class="toutiao-datas-header">'),
                            c.append('<div class="toutiao-datas-icon" style="background-image:url(' + a.image_url + ')"></div>'),
                            c.append('<div class="toutiao-datas-info">'),
                            c.append('<p class="normal" style="font-size:12px" title="' + a.nick_name + '">' + FunUtil.setRedSpan(a.nick_name.getSubStrFixedlength(16), b) + "</p>"),
                            c.append("</div></div></div>"),
                            c.append("</li>"),
                            c.toString()
                    },
                    HtmUtil.setWeiboDatasSpe = function (a, b) {
                        var c = new StringBuffer;
                        return c.append('<li class="spe" data-link="' + a.index_url + '">'),
                            c.append('<div class="toutiao-datas-header clear">'),
                            c.append('<div class="float-left toutiao-datas-icon" style="background-image:url(' + a.image_url + ')"></div>'),
                            c.append('<div class="float-left toutiao-datas-info">'),
                            c.append('<p class="spe">' + FunUtil.setRedSpan(a.nick_name.getSubStr(20), b) + "</p>"),
                            c.append("</div></div></div>"),
                            c.append('<div class="toutiao-datas-description-spe" title="' + a.certified_name + '">' + FunUtil.setRedSpan(a.certified_name, b) + "</div>"),
                            c.append("</li>"),
                            c.toString()
                    },
                    HtmUtil.setZixunDatas = function (a, b) {
                        var c = new StringBuffer;
                        return c.append('<li class="clear" data-link="' + a.url + '" title="' + a.title + '"><span class="circle"></span>' + FunUtil.setRedSpan(a.title.getSubStrFixedlength(42), b) + "</li>"),
                            c.toString()
                    },
                    HtmUtil.setMiniInfo = function (a, b) {
                        var c = new StringBuffer;
                        return c.append("<div class='mini-info-box'>"),
                            c.append("<p class='header'>" + FunUtil.setRedSpan(a.nickname, b) + "</p>"),
                            c.append("<p class='desc'>" + FunUtil.setRedSpan(a.desc.getSubStrFixedlength(120), b) + "</p>"),
                            c.append("<div class='clear' style='margin-top:10px;'>"),
                            c.append("<div class='float-left'>"),
                            c.append("<div id='mini_code' class='mini-code' data-url='" + (a.short_url ? a.short_url : a.url) + "'>"),
                            c.append("<div class='header-image' style='background-image:url(" + a.headimg_url + ")'></div>"),
                            c.append("</div>"),
                            c.append("<p class='place'>查看使用场景</p>"),
                            c.append("</div>"),
                            c.append("<div class='float-left' style='margin-left:30px;'>"),
                            c.append("<p class='info'>" + (a.service_type ? a.service_type.split(",")[0].getSubStrFixedlength(24) : "") + "</p>"),
                            c.append("<p class='info'>涉及公众号数：<span>" + a.total + "</span></p>"),
                            c.append("<p class='info'>上周曝光量：<span>" + FunUtil.format1wNum(common.doNull(a.total_clicks_count)) + "</span></p>"),
                            c.append("</div>"),
                            c.append("</div>"),
                            c.append("</div>"),
                            c.append("<div class='mini_bottom'><i></i>小程序名片</div>"),
                            c.toString()
                    },
                    HtmUtil.setMiniInfoSpe = function (a, b) {
                        var c = new StringBuffer;
                        return c.append("<div class='mini-info-box'>"),
                            c.append("<div class='clear'>"),
                            c.append("<div class='float-left one-header' style='background-image:url(" + a.headimg_url + ");'></div>"),
                            c.append("<p class='float-left header-spe'>" + FunUtil.setRedSpan(a.nickname, b) + "</p>"),
                            c.append("</div>"),
                            c.append("<p class='desc'>" + FunUtil.setRedSpan(a.desc.getSubStrFixedlength(120), b) + "</p>"),
                            c.append("<div class='clear' style='margin-top:10px;'>"),
                            c.append("<div class='float-left'>"),
                            c.append("<div id='mini_code' class='mini-code' data-url='" + (a.short_url ? a.short_url : a.url) + "'>"),
                            c.append("<div class='header-image' style='background-image:url(" + a.headimg_url + ")'></div>"),
                            c.append("</div>"),
                            c.append("<p class='place'>查看使用场景</p>"),
                            c.append("</div>"),
                            c.append("<div class='float-left' style='margin-left:30px;'>"),
                            c.append("<p class='info'>" + (a.service_type ? a.service_type.split(",")[0].getSubStrFixedlength(24) : "") + "</p>"),
                            c.append("<p class='info'>涉及公众号数：<span>" + a.total + "</span></p>"),
                            c.append("<p class='info'>上周曝光量：<span>" + FunUtil.format1wNum(a.total_clicks_count) + "</span></p>"),
                            c.append("</div>"),
                            c.append("</div>"),
                            c.append("</div>"),
                            c.append("<div class='mini_bottom'><i></i>小程序名片</div>"),
                            c.toString()
                    },
                    FunUtil.Global = function () {
                        var a = require("../../common/invite"),
                            b = require("jquery"),
                            c = require("api-common"),
                            d = require("memory"),
                            e = require("nav"),
                            f = require("./api-search"),
                            g = require("dialog"),
                            h = require("cookie"),
                            i = require("common"),
                            j = (require("echarts"), require("../../plugins/moment/moment"), require("login-dialog"));
                        require("datepicker"),
                            require("autocomplete"),
                            require("code");
                        var k = i.StringBuffer,
                            l = i.getRequest(),
                            m = f.search,
                            n = l.value,
                            o = l.isBind,
                            p = {},
                            q = "result_list",
                            r = "toutiao_list",
                            s = "search-condition",
                            t = "result_count";
                        return {
                            canSearch: !0,
                            invite: a,
                            $: b,
                            api: c,
                            memory: d,
                            wrapper: e,
                            remote: f,
                            dialog: g,
                            cookie: h,
                            common: i,
                            newlogin: j,
                            StringBuffer: k,
                            request: l,
                            remoteSearch: m,
                            val: n,
                            isBind: o,
                            searchResult: p,
                            openAd: !0,
                            currentUser: "false",
                            hasDeal: "false",
                            isHost: !1,
                            isTag: "true",
                            isAuth: "true",
                            isPost: !1,
                            defaultText: "请输入微信公众号ID、名称",
                            defaultTextAde: "输入投放关键词",
                            flag: "",
                            id4ResultList: q,
                            id4TouTiao: r,
                            id4TxtAccount: "txt_account",
                            id4SimpleSearch: "simple_search",
                            id4Condition: s,
                            id4ResultCount: t,
                            $resultList: b("#" + q),
                            $touTiaoBox: b("#toutiao_box"),
                            $touTiaoList: b("#" + r),
                            $ziXunBox: b("#zixun_box"),
                            $ziXunList: b("#zixun_list"),
                            $weiBoBox: b("#weibo_box"),
                            $weiBoList: b("#weibo_list"),
                            $miniBox: b("#mini_box"),
                            $resultCount: b("#" + t),
                            $resultKeyWord: b("#result_keyword"),
                            $resultFilter: b("#result_filter"),
                            $condition: b("#" + s),
                            sortBy: "relation"
                        }
                    },
                    FunUtil.common4Auth = function (a) {
                        var b = {},
                            c = "";
                        return b.pub = function () {
                            var b = Date.parse(a.stime.replace(/-/g, "/").replace(".0", "")),
                                d = (new Date).getTime();
                            c = d - b < 80352e5 ? "" : "overdue"
                        },
                            b.pub(),
                            c
                    },
                    FunUtil.common4time = function (a) {
                        var b = Date.parse(a.stime.replace(/-/g, "/").replace(".0", "")),
                            c = (new Date).getTime(),
                            d = (c - b) / 864e5;
                        return parseInt(d)
                    },
                    FunUtil.common4Global = function () {
                        var a = [];
                        for (var b in FunUtil.Global()) a.push("var " + b + "=FunUtil.Global()." + b + ";");
                        return a.join("")
                    },
                    FunUtil.common4searchAccount = function (a, b) {
                        if (!isPost) {
                            "请输入微信公众号ID、名称" == unescape(a) && (a = ""),
                                searchResult = {},
                                canSearch = !1,
                                FunUtil.checkRange();
                            var c = PageObj.init4searchBox().searchAccount,
                                d = PageObj.initToutiao().searchTouTiao,
                                e = PageObj.initWeiBo().searchWeiBo,
                                f = PageObj.initZixun().searchZixun,
                                g = PageObj.initMini().searchMini;
                            c(a, b),
                                d(a),
                                e(a),
                                f(a),
                                g(a);
                            var h = setInterval(function () {
                                    searchResult.wxResult && searchResult.ttResult && searchResult.wbResult && searchResult.zxResult && searchResult.miResult && (PageObj.initAll(searchResult, a), canSearch = !0, clearInterval(h))
                                },
                                100)
                        }
                    },
                    FunUtil.commonHistory = function () {
                        window.addEventListener("popstate",
                            function () {
                                var a = window.history.state;
                                FunUtil.initHistoryState(a)
                            })
                    },
                    FunUtil.checkCode = function (a) {
                        var b = document.createElement("span");
                        b.appendChild(document.createTextNode(a));
                        var c = b.innerHTML;
                        return c = c.replace(/@font/g, "<font color=red>"),
                            c = c.replace(/#font/g, "</font>")
                    },
                    FunUtil.initHistoryState = function (a) {
                        var b = $condition.find("span.search-icon-checkbox");
                        if (b.removeClass("search-icon-checkright"), b.parent().removeClass("label-chose"), $condition.find("label.search-range-items").removeClass("range-confirm"), a.filter) {
                            var c = a.filter.split("|"),
                                d = !1;
                            if ($(c).each(function () {
                                    var a;
                                    "top500" == this || "ori" == this || "server" == this || "certified" == this ? (a = $("span.search-icon-checkbox[sv='" + this + "']"), a.addClass("search-icon-checkright"), a.parent().addClass("label-chose")) : "tags" != this && "nickname" != this && "auth" != this || (a = $("label.search-range-items[sv='" + this + "']"), a.addClass("range-confirm"), d = !0)
                                }), d) return;
                            $("label.search-range-items[sc='all']").addClass("range-confirm")
                        } else $("label.search-range-items[sc='all']").addClass("range-confirm");
                        a.order && ($condition.find("span.sort-chosen").removeClass("active"), $condition.find("span.sort-chosen[sc='" + a.order + "']").addClass("active")),
                            val = a.value,
                            $("#" + id4TxtAccount).val(val),
                            $("#" + id4TxtAccount).css("color", "#333"),
                            $("#" + id4SimpleSearch).val(val),
                            $("#" + id4SimpleSearch).css("color", "#333"),
                            FunUtil.common4searchAccount(val, !0)
                    },
                    FunUtil.common4updateAccount = function (a) {
                        var b = function (b) {
                            currentUser = b,
                                a(b)
                        };
                        wrapper.initAccount(b)
                    },
                    FunUtil.common4openUrl = function (a, b) {
                        if (String.HasText(a)) {
                            var c = "until-open-url",
                                d = $("#" + c);
                            b = String.HasText(b) ? b : "_blank",
                            d.length <= 0 && $("body").append('<a><span id="' + c + '" style="color: white;">asdasdasdasd</span></a>'),
                                d = $("#" + c);
                            d.closest("a").attr("href", a).attr("target", b),
                                d.click()
                        }
                    },
                    FunUtil.common4chongBang = function (a, b) {
                        if (currentUser == -999) return void dialog.showLoginTip("冲榜");
                        var c = function () {
                                var b = {
                                        title: "冲榜提示",
                                        content: HtmUtil.dialog4chongBang2Success(a),
                                        height: 450
                                    },
                                    c = function () {
                                        var a = $("#search-prop-btn");
                                        a.click(function () {
                                            a.closest("div.dialog-box").hide(),
                                                $("div.dialog-mask").hide()
                                        })
                                    };
                                dialog.showProp(b, c)
                            },
                            d = function (b) {
                                if (b <= 0) {
                                    var d = {
                                            title: "冲榜提示",
                                            content: HtmUtil.dialog4chongBang(a),
                                            height: 450,
                                            width: 400
                                        },
                                        e = function () {
                                            var b = $("#search-prop-add-type"),
                                                d = $("#search-prop-add-tags-btn"),
                                                e = $("#search-prop-add-tags-item"),
                                                f = $("#search-prop-add-foot-btn"),
                                                g = $("#search-prop-add-foot-value"),
                                                h = memory.weixinTypes.getArray();
                                            $("#search-prop-add-type").html(HtmUtil.dialog4chongBang2Tags(h)),
                                                FunUtil.searchBox4createNewCode(),
                                                d.on("click",
                                                    function () {
                                                        e.append(HtmUtil.dialog4chongBang2Input()),
                                                        5 == e.find("input").length && d.hide()
                                                    }),
                                                b.find("div.tag-span").on("click",
                                                    function () {
                                                        b.find("div.active").removeClass("active"),
                                                            $(this).addClass("active")
                                                    });
                                            var i = !1;
                                            f.on("click",
                                                function () {
                                                    if (!i) {
                                                        var d = b.find("div.active").find("div.tag-span-text").html(),
                                                            f = g.val(),
                                                            h = [],
                                                            j = !0;
                                                        if (e.find("input").each(function () {
                                                                String.HasText(this.value) && h.push(String.Trim(this.value)),
                                                                this.value.getActualLength() > 10 && (j = !1)
                                                            }), !String.HasText(d)) return void dialog.showTopTip("请选择分类");
                                                        if (0 == h.length) return void dialog.showTopTip("至少输入一个标签");
                                                        if (!FunUtil.searchBox4checkTags(h)) return void dialog.showTopTip("标签名重复");
                                                        if (!j) return void dialog.showTopTip("每个标签最多输入10个字节");
                                                        if (!String.HasText(f)) return void dialog.showTopTip("请输入验证码");
                                                        i = !0,
                                                            $("div.k-loading").show();
                                                        var k = function (a) {
                                                                $("div.k-loading").hide(),
                                                                    1 == a || a == -6 ? c() : a == -5 ? (dialog.showTopTip("验证码错误"), FunUtil.searchBox4createNewCode()) : (dialog.showTopTip("操作失败"), FunUtil.searchBox4createNewCode()),
                                                                    i = !1
                                                            },
                                                            l = {
                                                                wxid: unescape(a.wxid),
                                                                type: d,
                                                                imageFlag: flag,
                                                                imageCode: f,
                                                                tags: JSON.stringify(h)
                                                            };
                                                        remoteSearch.chongBangByWxid(l, k)
                                                    }
                                                })
                                        };
                                    dialog.showProp(d, e)
                                } else c()
                            };
                        remoteSearch.isChongBang(a.account, d)
                    },
                    FunUtil.common4addShopCarEvent = function (a, b) {
                        var c = a.result;
                        $("div.k-loading").hide(),
                            molHover(".tender-pop-btn", "", "", "#fd8c25"),
                            $("#btn_search").removeAttr("disabled"),
                            $("ul.result li").hover(function () {
                                    var a = $(this);
                                    FunUtil.searchBox4isImgUrl("" + String.changeUrl(a.attr("data-wxid")));
                                    a.find(".swx_bg").addClass("hover_bg"),
                                        a.find(".help").show(),
                                        a.find(".invite-to-charge").show(),
                                        a.find(".s_codes").hide(),
                                        a.find(".s_codeb").show(),
                                        a.find(".annually-review").show(),
                                        a.find("span.search-icon-more").css("display", "block")
                                },
                                function () {
                                    var a = $(this);
                                    a.find(".swx_bg").removeClass("hover_bg"),
                                        a.find(".help").hide(),
                                        a.find(".invite-to-charge").hide(),
                                        a.find(".s_codes").show(),
                                        a.find(".s_codeb").hide(),
                                        a.find(".annually-review").hide(),
                                        a.find("span.search-icon-more").css("display", "none")
                                }),
                            molHover(".invite-to-charge", "", "", "#fd8c25"),
                            $resultList.find(".services-btn").unbind("click").click(function (a) {
                                return FunUtil.common4openUrl(memory.rootUrl.edit + "detail.html?uuid=C2C316323B2B5009A24E5C77A42D3957"),
                                    !1
                            }),
                            $resultList.find("div.search-item-rong").unbind("click").click(function (a) {
                                var b = $(this).find("a").attr("href");
                                return FunUtil.common4openUrl(b),
                                    !1
                            }),
                            $resultList.find("div.tag-item-platform").unbind("click").click(function () {
                                return FunUtil.common4openUrl($(this).attr("sc")),
                                    !1
                            }),
                            $resultList.find("div.newrank-auth").unbind("click").bind("click",
                                function () {
                                    var a = $(this).attr("data-src");
                                    return FunUtil.common4openUrl(a),
                                        !1
                                }).hover(function () {
                                    $(this).find("div.newrank-auth-tips").show()
                                },
                                function () {
                                    $(this).find("div.newrank-auth-tips").hide()
                                }),
                            $resultList.find("div.newrank-serivce").unbind("click").bind("click",
                                function () {
                                    return !1
                                }).hover(function () {
                                    $(this).find("div.newrank-serivce-tips").show()
                                },
                                function () {
                                    $(this).find("div.newrank-serivce-tips").hide()
                                }),
                            $resultList.find("div.newrank-auth-tips").unbind("click").bind("click",
                                function () {
                                    var a = $(this).attr("data-src");
                                    return FunUtil.common4openUrl(a),
                                        !1
                                }),
                            $resultList.find(".rank-copyright").unbind("click").bind("click",
                                function () {
                                    var a = $(this).attr("data-src");
                                    return FunUtil.common4openUrl(a),
                                        !1
                                }).hover(function () {
                                    $(this).find("div.newrank-copyright-tips").show()
                                },
                                function () {
                                    $(this).find("div.newrank-copyright-tips").hide()
                                }),
                            $resultList.find(".fivehundred").unbind("click").bind("click",
                                function () {
                                    var a = $(this).attr("data-src");
                                    return FunUtil.common4openUrl(a),
                                        !1
                                }).hover(function () {
                                    $(this).find("div.newrank-500-tips").show()
                                },
                                function () {
                                    $(this).find("div.newrank-500-tips").hide()
                                }),
                            $resultList.find("div.certified-num").unbind("click").click(function (a) {
                                val = "v:" + $(this).closest("div.certified-text").find("span.auth-span").attr("data-text"),
                                    $("#" + id4TxtAccount).val(val),
                                    $("#" + id4SimpleSearch).val(val),
                                    FunUtil.common4searchAccount(val),
                                    a.stopImmediatePropagation()
                            }).hover(function () {
                                    $(this).find("div.hover-chunk").show()
                                },
                                function () {
                                    $(this).find("div.hover-chunk").hide()
                                }),
                            $resultList.find("div.routine-item-platform").hover(function () {
                                    $(this).find("div.routine-item-information").show(),
                                        $(this).find("div.routine-item-image").addClass("platform-scale")
                                },
                                function () {
                                    $(this).find("div.routine-item-information").hide(),
                                        $(this).find("div.routine-item-image").removeClass("platform-scale")
                                }),
                            $resultList.find(".define-rank").unbind("click").bind("click",
                                function () {
                                    return FunUtil.common4openUrl("/account/user/ranklist.html"),
                                        !1
                                }),
                            $resultList.find("div.search-btn-once").hover(function () {
                                    $(this).find(".in-library").html("立即冲榜")
                                },
                                function () {
                                    $(this).find(".in-library").html("尚未入库")
                                }),
                            $resultList.find("div.search-btn-once").unbind("click").click(function () {
                                var a = $(this).closest("li"),
                                    b = a.attr("data-wxid"),
                                    c = a.attr("data-account"),
                                    d = String.HasText(c) ? c : b,
                                    e = a.attr("data-name");
                                if (e = unescape(e), !FunUtil.searchBox4hasDetail(a)) return !1;
                                var f = function (a) {
                                    var d = "public/about/add.html?show=true&account4id=" + escape(c) + "&account4wxId=" + escape(b) + "&account4name=" + escape(e);
                                    window.location.href = window.relativeUrl + d
                                };
                                return FunUtil.common4chongBang({
                                        name: e,
                                        account: d,
                                        wxid: b
                                    },
                                    f),
                                    !1
                            }),
                            $resultList.find("div.brand-a").unbind("click").click(function (a) {
                                return a.stopImmediatePropagation(),
                                    window.open(memory.rootUrl.main + "public/brand/brand_zone.html"),
                                    !1
                            }).hover(function () {
                                    $(this).find("div.hover-chunk").show()
                                },
                                function () {
                                    $(this).find("div.hover-chunk").hide()
                                });
                        var d = function () {
                                $resultList.find("div.tags-list-p  div.tag-span").unbind("click").click(function (a) {
                                    return a.stopPropagation(),
                                        val = "tag:" + $(this).find("span.tag-span-text").text(),
                                        $("#" + id4TxtAccount).val(val),
                                        $("#" + id4SimpleSearch).val(val),
                                        FunUtil.common4searchAccount(val),
                                        !1
                                }),
                                    $resultList.find(".collect-btn").unbind("click").click(function (a) {
                                        return dialog.showLoginTip("收藏公众号"),
                                            !1
                                    })
                            },
                            e = function () {
                                var a = {};
                                $(b).each(function () {
                                    a[this.id] = this
                                }),
                                    $(c).each(function () {
                                        var b = this.id;
                                        a[b] && $("#shopcar_" + b).find(".collect").addClass("yes-collect").removeClass("no-collect").attr("data", b).find(".collect-text").text("取消收藏")
                                    }),
                                    $resultList.find(".collect-btn").unbind("click").click(function () {
                                        var a = $(this),
                                            b = function () {
                                                var b = a.attr("data"),
                                                    c = function (b) {
                                                        b > 0 ? FunUtil.common4updateAccount(function () {
                                                            a.parent().removeClass("yes-collect").addClass("no-collect").find(".collect-text").text("收藏"),
                                                                dialog.showTopTip("已取消收藏")
                                                        }) : b == -1 && dialog.showTip("操作失败")
                                                    };
                                                remoteSearch.delBox(b, c)
                                            },
                                            c = function () {
                                                if (wrapper.boxCount.canAdd()) {
                                                    var b = a.attr("data"),
                                                        c = function (b) {
                                                            var c = "该公众号已经在选号车中";
                                                            b > 0 ? (c = "收藏成功，您可前往个人中心操作更多", FunUtil.common4updateAccount(function () {
                                                                a.parent().removeClass("no-collect").addClass("yes-collect").find(".collect-text").text("取消收藏")
                                                            })) : b == -1 ? c = "请先冲榜再收藏" : b == -111 && (c = "最多只能收藏500个账号"),
                                                                dialog.showTip(c)
                                                        };
                                                    remoteSearch.postIds(b, c)
                                                }
                                            };
                                        return a.parent().hasClass("no-collect") ? c() : b(),
                                            !1
                                    }),
                                    $resultList.find("div.tags-list-p  div.tag-span").unbind("click").click(function (a) {
                                        return a.stopImmediatePropagation(),
                                            val = "tag:" + $(this).find("span.tag-span-text").text(),
                                            $("#" + id4TxtAccount).val(val),
                                            $("#" + id4SimpleSearch).val(val),
                                            FunUtil.common4searchAccount(val),
                                            !1
                                    }),
                                    $resultList.find("span.auth-span").unbind("click").click(function (a) {
                                        return a.stopImmediatePropagation(),
                                            val = "v:" + $(this).text().replace("：", ":"),
                                            $("#" + id4TxtAccount).val(val),
                                            $("#" + id4SimpleSearch).val(val),
                                            FunUtil.common4searchAccount(val),
                                            !1
                                    })
                            };
                        b == -999 ? d() : e(),
                            function () {
                                $(".collect").hover(function () {
                                        var a = $(this);
                                        clearTimeout(this.timer),
                                            a.find(".collect-triangle").show(),
                                            a.addClass("hover-collect")
                                    },
                                    function () {
                                        var a = $(this);
                                        a.removeClass("hover-collect"),
                                            this.timer = setTimeout(function () {
                                                    a.find(".collect-triangle").hide()
                                                },
                                                200)
                                    })
                            }(),
                            $(".wx-code").hover(function () {
                                    $(this).find(".wx-code-pic").show()
                                },
                                function () {
                                    $(this).find(".wx-code-pic").hide()
                                }),
                            $(".review16").hover(function () {
                                    var a = $(this);
                                    a.find(".review-code").empty(),
                                        a.find(".review-code").qrcode({
                                            render: "table",
                                            width: 111,
                                            height: 111,
                                            text: a.data("url").codeText()
                                        }),
                                        a.find(".review-pic").show()
                                },
                                function () {
                                    $(this).find(".review-pic").hide()
                                }),
                            function () {
                                $(".auth-chunk-parent").each(function () {
                                    ($(this).height() - 70) / 2 > 0 && $(this).find(".auth-chunk").css("margin-top", ($(this).height() - 70) / 2)
                                })
                            }()
                    },
                    FunUtil.searchBox4isImgUrl = function (a) {
                        var b = !1,
                            c = new Image;
                        return c.src = a,
                        (c.fileSize > 0 || c.width > 0 && c.height > 0) && (b = !0),
                            b
                    },
                    FunUtil.fixServiceName = function (a) {
                        var b = a.split(","),
                            c = [];
                        return $.each(b,
                            function (a) {
                                0 == a && c.push(this.getSubStr(16))
                            }),
                            c
                    },
                    FunUtil.format1wNum = function (a) {
                        a = "" == a ? "0" : a;
                        var b = parseInt(a);
                        return b >= 1e5 ? Math.floor(b / 1e4) + "万+" : b = "0" == b ? "-" : b
                    },
                    FunUtil.searchBoxRoutineUrl = function () {
                        $("div.routine-information-url").each(function () {
                            var a = $(this).attr("data-url");
                            $(this).qrcode({
                                render: "canvas",
                                width: 100,
                                height: 100,
                                text: a
                            })
                        })
                    },
                    FunUtil.searchBox4fillResultList = function (a, b) {
                        if ("string" == typeof a && /^-2000(,|，)/.test(a)) return FunUtil.noResultShow("show", b),
                            $("#result_tag").hide(),
                            $("div.k-loading").hide(),
                            $resultCount.hide(),
                            void $resultList.hide();
                        var c = a,
                            d = FunUtil.common4addShopCarEvent;
                        if (0 == c.result.length ? (FunUtil.noResultShow("show", b), $("#result_tag").hide()) : ($("#has_result").show(), FunUtil.noResultShow("hide")), 0 != c.aggs.length && "true" != isAuth || $("#result_tag").hide(), $resultList.html(HtmUtil.searchBox4list(c.result)), FunUtil.searchBoxRoutineUrl(), FunUtil.h5Code(), void 0 != currentUser) {
                            var e = currentUser == -999 ? currentUser : currentUser.box;
                            d(c, e)
                        } else remoteSearch.searchBox(function (a) {
                            d(c, a)
                        });
                        c.total >= 50 ? $("p.s_more").show() : $("p.s_more").hide()
                    },
                    FunUtil.h5Code = function () {
                        $("#result_list").find(".annually-review-code").each(function () {
                            var a = $(this).attr("data-url");
                            $(this).qrcode({
                                render: "canvas",
                                width: 80,
                                height: 80,
                                text: "https://cu2017.newrank.cn/" + a + ".html"
                            })
                        })
                    },
                    FunUtil.searchTtResultList = function (a, b) {
                        $touTiaoList.html(""),
                            $touTiaoBox.attr("style", "");
                        var c = a.toutiao.list;
                        if ($("#toutiao_display").html('<span id="toutiao_info"><span style="margin:0 4px 0;">' + (a.toutiao.total ? a.toutiao.total : 0) + "</span>条结果</span>"), c) {
                            if (c.length > 1) {
                                for (var d = 0; d < c.length; d++) $touTiaoList.append(HtmUtil.setTouTiaoDatas(c[d], b));
                                $touTiaoBox.height(90)
                            } else $touTiaoList.append(HtmUtil.setTouTiaoDatasSpe(c[0], b));
                            $touTiaoList.find("li").unbind("click").bind("click",
                                function () {
                                    var a = $(this).attr("data-link");
                                    window.open(a)
                                })
                        }
                        if (a.toutiao.total && a.toutiao.total > 4) {
                            $("#toutiao_display").append('<i class="toutiao-display-icon"></i>'),
                                $("#toutiao_display").css("cursor", "pointer");
                            $("#toutiao_display").unbind("click").bind("click",
                                function () {
                                    if (c.length > 4) {
                                        clearTimeout("");
                                        var b = $touTiaoList.height(),
                                            d = $(this).find("i");
                                        d.hasClass("toutiao-display-icon-transform") ? (d.removeClass("toutiao-display-icon-transform"), $touTiaoBox.height(90), $("#toutiao_info").html('<span style="margin:0 4px 0;">' + (a.toutiao.total ? a.toutiao.total : 0) + "</span>条结果")) : (d.addClass("toutiao-display-icon-transform"), $touTiaoBox.height(b), a.toutiao.total > 20 && $("#toutiao_info").html('仅展示<span style="margin:0 4px 0;">20</span>条结果'))
                                    }
                                })
                        }
                    },
                    FunUtil.searchWbResultList = function (a, b) {
                        $weiBoList.html(""),
                            $weiBoBox.attr("style", "");
                        var c = a.weibo.datas;
                        if ($("#weibo_display").html('<span id="weibo_info"><span style="margin:0 4px 0;">' + (a.weibo.total ? a.weibo.total : 0) + "</span>条结果</span>"), c) {
                            if (c.length > 1) {
                                for (var d = 0; d < c.length; d++) $weiBoList.append(HtmUtil.setWeiboDatas(c[d], b));
                                $weiBoBox.height(90)
                            } else $weiBoList.append(HtmUtil.setWeiboDatasSpe(c[0], b));
                            $weiBoList.find("li").unbind("click").bind("click",
                                function () {
                                    var a = $(this).attr("data-link");
                                    window.open(a)
                                })
                        }
                        if (a.weibo.total && a.weibo.total > 4) {
                            $("#weibo_display").append('<i class="toutiao-display-icon"></i>'),
                                $("#weibo_display").css("cursor", "pointer");
                            $("#weibo_display").unbind("click").bind("click",
                                function () {
                                    if (c.length > 4) {
                                        clearTimeout("");
                                        var b = $weiBoList.height(),
                                            d = $(this).find("i");
                                        d.hasClass("toutiao-display-icon-transform") ? (d.removeClass("toutiao-display-icon-transform"), $weiBoBox.height(90), $("#weibo_info").html('<span style="margin:0 4px 0;">' + (a.weibo.total ? a.weibo.total : 0) + "</span>条结果")) : (d.addClass("toutiao-display-icon-transform"), $weiBoBox.height(b), a.weibo.total > 20 && $("#weibo_info").html('仅展示<span style="margin:0 4px 0;">20</span>条结果'))
                                    }
                                })
                        }
                    },
                    FunUtil.searchZxResultList = function (a, b) {
                        $ziXunList.html("");
                        var c = a.datas;
                        if ($("#zixun_display").html('<span id="zixun_info"><span style="margin:0 4px 0;">' + (a.total ? a.total : 0) + "</span>条结果</span>"), c) {
                            for (var d = 0; d < c.length; d++) $ziXunList.append(HtmUtil.setZixunDatas(c[d], b));
                            $ziXunList.find("li").unbind("click").bind("click",
                                function () {
                                    var a = $(this).attr("data-link");
                                    window.open(a)
                                })
                        }
                        if (a.total && a.total > 4) {
                            $("#zixun_display").append('<i class="toutiao-display-icon"></i>'),
                                $("#zixun_display").css("cursor", "pointer"),
                                $ziXunBox.height(120);
                            $("#zixun_display").unbind("click").bind("click",
                                function () {
                                    if (c.length > 4) {
                                        clearTimeout("");
                                        var b = $ziXunList.height(),
                                            d = $(this).find("i");
                                        d.hasClass("toutiao-display-icon-transform") ? (d.removeClass("toutiao-display-icon-transform"), $ziXunBox.height(120), $("#zixun_info").html('<span style="margin:0 4px 0;">' + (a.total ? a.total : 0) + "</span>条结果")) : (d.addClass("toutiao-display-icon-transform"), $ziXunBox.height(b), a.total > 10 && $("#zixun_info").html('仅展示<span style="margin:0 4px 0;">10</span>条结果'))
                                    }
                                })
                        }
                    },
                    FunUtil.sliceArray = function (a, b) {
                        for (var c = [], d = 0; d < Math.ceil(a.length / b); d++) {
                            var e = d * b,
                                f = e + b;
                            c.push(a.slice(e, f))
                        }
                        return c
                    };
                var miniPageList = [],
                    currentIndex = 0;
                FunUtil.searchMiResultList = function (a) {
                    var b = a.miniProgram.datas;
                    b.length > 4 ? (miniPageList = FunUtil.sliceArray(b, 4), $(".mini-page").show()) : (miniPageList = [b], $(".mini-page").hide()),
                        $("#mini_display").html('<span id="routine_info"><span style="margin:0 4px 0;">' + (a.miniProgram.total ? a.miniProgram.total : 0) + "</span>条结果</span>"),
                        FunUtil.miResultListInit()
                },
                    FunUtil.miResultListInit = function () {
                        $miniBox.html(""),
                            $("#mini_page").html(""),
                            $(miniPageList).each(function (a) {
                                $("#mini_page").append("<li class='" + (a == currentIndex ? "current" : "") + "'></li>")
                            }),
                            $(".mini-page").find("i[derection='right']").addClass("right-active"),
                            $(".mini-page").find("i[derection='left']").addClass("left-active"),
                            0 == currentIndex ? $(".mini-page").find("i[derection='left']").removeClass("left-active") : currentIndex == miniPageList.length - 1 && $(".mini-page").find("i[derection='right']").removeClass("right-active");
                        var a = miniPageList[currentIndex];
                        if (a.length > 1) {
                            $miniBox.html('<ul id="mini_list" class="mini-list"></ul><div id="mini_info" class="mini-info"></div>');
                            for (var b = 0; b < a.length; b++) $("#mini_list").append("<li class='" + (0 == b ? "chosen" : "") + "' data-index='" + b + "'><div style='background-image:url(" + a[b].headimg_url + ")'></div></li>");
                            FunUtil.setMiniInfo(0, !0),
                                $("#mini_list").find("li").unbind("hover").hover(function () {
                                        var a = $(this);
                                        $("#mini_info").attr("data-index") != a.attr("data-index") && ($("#mini_list").find("li").removeClass("chosen"), a.addClass("chosen"), FunUtil.setMiniInfo(a.attr("data-index"), !0))
                                    },
                                    function () {
                                        return !1
                                    })
                        } else $miniBox.html('<div id="mini_info" class="mini-info" style="margin-top:0px;"></div>'),
                            FunUtil.setMiniInfo(0, !1)
                    },
                    FunUtil.setMiniInfo = function (a, b) {
                        $("#mini_info").attr("data-index", a);
                        var c = miniPageList[currentIndex][a];
                        b ? $("#mini_info").html(HtmUtil.setMiniInfo(c, val)) : $("#mini_info").html(HtmUtil.setMiniInfoSpe(c, val));
                        var d = $("#mini_code").attr("data-url");
                        $("#mini_code").qrcode({
                            render: "canvas",
                            width: 80,
                            height: 80,
                            text: d
                        })
                    },
                    FunUtil.clearAll = function () {
                        $resultList.html(""),
                            $(".brand-search-result-one,.brand-search-result2").html(""),
                            $(".s_more").hide()
                    },
                    FunUtil.noResultShow = function (a, b) {
                        "show" == a ? ($("#no_result").show(), $("#no_result_name").text(b)) : $("#no_result").hide()
                    },
                    FunUtil.common4num = function (a) {
                        return {
                            0: "头条",
                            1: "2条",
                            2: "3条",
                            3: "4条",
                            4: "5条",
                            5: "6条",
                            6: "7条",
                            7: "8条"
                        } [a.state]
                    },
                    FunUtil.searchBox4hasListNull = function (a) {
                        for (var b = !1,
                                 c = a.length,
                                 d = 0; d < c; d++) String.HasText(a[d]) && (b = !0);
                        return b
                    },
                    FunUtil.searchBox4checkTags = function (a) {
                        a = a.sort();
                        for (var b = [a[0]], c = a.length, d = "true", e = 1; e < c; e++) if (a[e] !== b[b.length - 1]) {
                            var f = a[e];
                            String.HasText(f) && b.push(f)
                        }
                        return c > b.length && (d = !1),
                            d
                    },
                    FunUtil.searchBox4createNewCode = function () {
                        flag = (new Date).getTime() + "" + Math.random(),
                            $("#search-prop-add-foot-img").attr("src", memory.urlBase + "sys/account/weixin/getIdentifyCode?flag=" + flag)
                    },
                    FunUtil.searchBox4hasDetail = function (a) {
                        var b = a.attr("data-status"),
                            c = a.attr("data-wxid"),
                            d = a.attr("data-account");
                        return b == -1 || 0 == b ? (FunUtil.common4openUrl("account_state.html?account=" + escape(d) + "&wxid=" + escape(c)), !1) : (a.attr("is20W"), !0)
                    },
                    FunUtil.submitToutiaoBangDatas = function (a) {
                        if (currentUser == -999) return void dialog.showLoginTip("冲榜");
                        var b = function (b) {
                            b ? ($(".dialog-mask").length <= 0 && $("body").append('<div class="dialog-mask"></div>'), $(".confirm-submit").length <= 0 && $("body").append(HtmUtil.dialog4TouTiao(a)), $("#toutiao_add_info").html(a.media_name), $("#toutiao_category_info").html(b + "类"), $(".dialog-mask").show(), $(".toutiao-close").unbind("click").bind("click",
                                function () {
                                    $(".confirm-submit").css("top", -2e3),
                                        $(".dialog-mask").hide()
                                }), $(".confirm-submit").css("left", (window.innerWidth - 400) / 2), $(".confirm-submit").css("top", $(window).scrollTop() + 200)) : dialog.showTopTip("该账号已入库，明日可查")
                        };
                        remoteSearch.updateTouTiaoStatus(a.media_id, b)
                    },
                    FunUtil.setRedSpan = function (a, b) {
                        var c = a;
                        if (a) {
                            var d = new RegExp("(" + b + ")", "g");
                            c = a.replace(d, "<font color=red>$1</font>")
                        }
                        return c
                    },
                    FunUtil.setListHeight = function (a) {
                        var b = 0;
                        return $(a).each(function () {
                            b += parseInt($(this).outerHeight()),
                                b += 10
                        }),
                            b
                    },
                    FunUtil.checkSort = function () {
                        switch (sortBy) {
                            case "NRI":
                                $('span.sort-chosen[sc="NRI"]').addClass("active");
                                break;
                            case "collect":
                                $('span.sort-chosen[sc="collect"]').addClass("active");
                                break;
                            case "relation":
                                $('span.sort-chosen[sc="relation"]').addClass("active")
                        }
                    },
                    FunUtil.checkRange = function () {
                        var a = "";
                        a = val.indexOf(":") > -1 ? val.split(":")[0] : "all",
                            $("#" + id4TxtAccount).val(val),
                            $("#" + id4SimpleSearch).val(val),
                            $condition.find("label.search-range-items").removeClass("range-confirm"),
                            $condition.find("label.search-range-items[sc=" + a + "]").addClass("range-confirm")
                    },
                    FunUtil.format1wNum = function (a) {
                        a = "" == a ? "0" : a;
                        var b = parseInt(a);
                        return b >= 1e5 ? Math.floor(b / 1e4) + "万+" : b = "0" == b ? "-" : b
                    },
                    PageObj.init4searchBox = function () {
                        var a = {};
                        return a.searchAccount = function (a, b) {
                            if (a) {
                                var c, d = "",
                                    e = 0 == a.indexOf("tag:") || 0 == a.indexOf("TAG:"),
                                    f = 0 == a.indexOf("v:") || 0 == a.indexOf("V:"),
                                    g = 0 == a.indexOf("n:") || 0 == a.indexOf("N:"),
                                    h = a;
                                isTag = "false",
                                    isPost = !0,
                                    isAuth = "false",
                                    isName = "false",
                                    $("#btn_search").attr("disabled", "true"),
                                    $("div.k-loading").show(),
                                e && (isTag = "true", d += "tags", h = a.split(":")[1]),
                                f && (isAuth = "true", d += "auth", h = a.split(":")[1]),
                                g && (isName = "true", d += "nickname", h = a.split(":")[1]);
                                var i = function (a) {
                                    searchResult.wxResult = a;
                                    var b = "";
                                    b = "true" == isTag ? "标签" : "true" == isAuth ? "微信认证" : "true" == isName ? "名称" : "关键词",
                                        $resultKeyWord.html(b + '&nbsp;&nbsp;"' + h + '"'),
                                        $resultCount.html(a.total + "条结果")
                                };
                                c = $condition.find("div.search-condition-sort span.active").attr("sc"),
                                (d.indexOf("tags") > -1 || d.indexOf("auth") > -1) && "relation" == c && (c = "NRI"),
                                    $resultFilter.html(""),
                                    $condition.find("span.search-icon-checkright").each(function (a) {
                                        d += "" != d ? "|" + $(this).attr("sv") : $(this).attr("sv"),
                                        0 == a && $resultFilter.text("："),
                                            $resultFilter.append("<span>" + $(this).parent().text() + "<b class='remove-filter' sv=" + $(this).attr("sv") + ">x</b></span>")
                                    }),
                                    $resultFilter.find("b.remove-filter").unbind("click").bind("click",
                                        function () {
                                            $(this).parent().remove();
                                            var a = $(this).attr("sv");
                                            $condition.find("span.search-icon-checkbox[sv=" + a + "]").removeClass("search-icon-checkright"),
                                                $condition.find("span.search-icon-checkbox[sv=" + a + "]").parent().removeClass("label-chose"),
                                                FunUtil.common4searchAccount(val)
                                        }),
                                    remoteSearch.searchWeixinDataByCondition(h, c, d, hasDeal, i),
                                b || window.history.pushState({
                                        value: a,
                                        filter: d,
                                        order: c
                                    },
                                    "title", "search.html?value=" + escape(a) + "&isBind=" + isBind)
                            }
                        },
                            a.pub = function () {
                                $condition.find("span.sort-chosen").on("click",
                                    function () {
                                        if (canSearch) {
                                            var a = $(this);
                                            if (a.hasClass("active")) return;
                                            a.closest("div.search-condition-sort").find("span.active").removeClass("active"),
                                                a.addClass("active"),
                                                sortBy = a.attr("sc"),
                                                FunUtil.common4searchAccount(val)
                                        }
                                    }),
                                    $condition.find("label.search-condition-items").unbind("click").click(function () {
                                        return canSearch && ($(this).toggleClass("label-chose"), $(this).find("span").toggleClass("search-icon-checkright"), FunUtil.common4searchAccount(val)),
                                            !1
                                    }),
                                    $condition.find("label.search-range-items").unbind("click").click(function () {
                                        if (canSearch) {
                                            var a = $(this).attr("sc");
                                            "all" != a ? val.indexOf(":") > -1 ? val = a + ":" + val.split(":")[1] : val = a + ":" + val : val.indexOf(":") > -1 && (val = val.split(":")[1]),
                                                FunUtil.common4searchAccount(val, !1)
                                        }
                                        return !1
                                    }),
                                    $(".mini-page").find("i").unbind("click").bind("click",
                                        function () {
                                            var a = $(this);
                                            a.hasClass("left-active") ? currentIndex -= 1 : a.hasClass("right-active") && (currentIndex += 1),
                                                currentIndex == miniPageList.length - 1 && searchResult.miResult.miniProgram.total > 20 ? $("#routine_info").html('仅展示<span style="margin:0 4px 0;">20</span>条结果') : $("#routine_info").html('<span style="margin:0 4px 0;">' + searchResult.miResult.miniProgram.total + "</span>条结果"),
                                                FunUtil.miResultListInit()
                                        })
                            },
                            a.pub(),
                            a
                    },
                    PageObj.init4pub = function () {
                        $("div.header-search-logo").click(function () {
                            window.location.href = "/"
                        }),
                            $resultList.delegate("li", "click",
                                function (a) {
                                    var b = $(this),
                                        c = b.attr("data-account"),
                                        d = b.attr("data-wxid"),
                                        e = b.attr("data-name"),
                                        f = String.HasText(c) ? c : d;
                                    return e = unescape(e),
                                    !!FunUtil.searchBox4hasDetail(b) && (b.find("div.search-btn-once").length > 0 ? (FunUtil.common4chongBang({
                                        name: e,
                                        account: f,
                                        wxid: d
                                    }), !1) : void api.showDetail(c))
                                }),
                            FunUtil.commonHistory(),
                            FunUtil.checkSort(),
                            wrapper.setNew();
                        var a = function (a) {
                            var b = FunUtil.common4searchAccount,
                                c = void 0 != val && "" != val && val != defaultText && val != defaultTextAde,
                                d = "公众号";
                            a != -999 ? (isHost = a.isHost, FunUtil.checkToken(), isHost && invite.init(a)) : newlogin.shownewLogin(),
                                wrapper.initSearch4pub({
                                        isHost: isHost,
                                        hasAuto: !0,
                                        title: d
                                    },
                                    function (a) {
                                        val != a && (val = a, $("#" + id4TxtAccount).val(a), $("#" + id4TxtAccount).css("color", "#333"), $("#" + id4SimpleSearch).val(a), $("#" + id4SimpleSearch).css("color", "#333"), $condition.find("label.search-condition-items").removeClass("label-chose"), $(".search-condition-items").find("span").removeClass("search-icon-checkright"), $resultFilter.html(""), $("div.search-condition-sort").find("span.active").removeClass("active"), $("div.search-condition-sort").find("span[sc='relation']").addClass("active"), b(a))
                                    }),
                                wrapper.initSimpleSearch({
                                        isHost: isHost,
                                        hasAuto: !0,
                                        title: d,
                                        user: currentUser
                                    },
                                    function (a) {
                                        val != a && (val = a, $("#" + id4SimpleSearch).val(a), $("#" + id4SimpleSearch).css("color", "#333"), $condition.find("label.search-condition-items").removeClass("label-chose"), $(".search-condition-items").find("span").removeClass("search-icon-checkright"), $resultFilter.html(""), $("div.search-condition-sort").find("span.active").removeClass("active"), $("div.search-condition-sort").find("span[sc='relation']").addClass("active"), b(a))
                                    }),
                                c ? ($("#" + id4TxtAccount).val(val), $("#" + id4TxtAccount).css("color", "#333"), $("#" + id4SimpleSearch).val(val), $("#" + id4SimpleSearch).css("color", "#333"), b(val)) : b(""),
                                "true" == isBind ? c || b("") : c || ($("#" + id4TxtAccount).val(defaultText), $("#" + id4SimpleSearch).val(defaultText))
                        };
                        FunUtil.common4updateAccount(a)
                    },
                    eval(FunUtil.common4Global()),
                    PageObj.init4pub(),
                    FunUtil.checkToken = function () {
                        (system.win || system.mac || system.xll) && (cookie.getCookie("tt_token") || ($("body").append('<iframe id="tt_iframe" src="https://www.toutiao.com" style="display:none"></iframe>'), cookie.setCookie("tt_token", !0)))
                    },
                    PageObj.brandSearchModuleOne = function (a) {
                        if ("string" != typeof a || !/^-2000(,|，)/.test(a)) {
                            var b = a.brand,
                                c = b.brandMap;
                            if (!c) return void $(".brand-search-result-one,.brand-search-result2").html("");
                            if (!c || 2 != c.template) {
                                var d = b.articleList ? b.articleList : "",
                                    e = c.tags ? JSON.parse(c.tags) : "",
                                    f = "",
                                    g = "",
                                    h = "";
                                d && (f = d[0] && d[0].title ? d[0].title : "", g = d[0] && d[0].url ? d[0].url : "", h = d[0] && d[0].public_time ? d[0].public_time : "");
                                var i = "" + (String.HasText(c.account) ? String.changeUrl(c.account) : ""),
                                    j = c.certified_text ? '<i class="auth-icon"></i>' : "",
                                    k = ['<div class="brand-search">', '<div class="result-one-box clear">', '<div class="brand-wx-left">', '<div class="brand-wx-lp">', '<div class="brand-wx-logo">', '<a style="background:' + i + '"></a>', "</div>", '<div class="searchImg brand-swx-bg">', j, "</div>", "</div>", "</div>", '<div class="brand-wx-right">', '<div class="name-top">', '<a class="brand-name" href="/public/info/detail.html?account=' + c.account + '" target="_blank">' + (c.weixin_name ? c.weixin_name : "") + "（" + c.account + "）—官方账号</a>", '<a class="brand-link" href="' + memory.rootUrl.main + 'public/brand/brand_zone.html" target="_blank" title="已通过新榜认证，并获得品牌置顶保护">品牌</a>', '<div class="brand-qcode">', '<div class="hover-chunk wx-code-pic"><img src="' + String.changeUrl(c.account, "code") + '" style="max-width:100%;"><p>微信扫一扫关注</p></div>', "</div>", "</div>", c.certified_text ? '<div class="wx-certificate rcolor">微信认证：<span class="brand-auth-span" data-text="' + c.certified_text.split(":")[1] + '">' + c.certified_text.split("：")[1].getSubStr(60) + "</span></div>" : "", c.description ? '<div class="function-introduction rcolor">功能介绍：<span>' + c.description.getSubStr(100) + "</span></div>" : "", "" == d ? "" : '<div class="latest-article rcolor">最新文章：<a class="article-span " href="' + g + '" target="_blank" title="' + f + '">' + f.getSubStr(70) + "</a>", "" == d ? "" : '<div class="ltime"><i></i><span>' + h.pastTime() + "</span></div></div>", '<div class="wx-type">', '<span class="new-type-span" title="新榜分类" data=' + c.account + ">" + (c.type ? c.type : "") + "</span>", e ? '<span class="new-type-span-line"></span>' : "", '<div class="tags-list-p tags-list"></div>', "</div>", "</div>", "</div>", "</div>"];
                                $(".brand-search-result2").html("").hide(),
                                    $(".brand-search-result-one").html("").append(k.join("")).show();
                                (function (a) {
                                    for (var b = a.length > 5 ? 5 : a.length, c = 0; c < b; c++) {
                                        var d = ['<div class="tag-span border-none">', '<div class="tag-span-hover" title="点击可搜索相关标签">', '<div class="tag-span-back"></div> ', "</div> ", '<span class="tag-span-text">' + a[c] + "</span>", "</div>"];
                                        $(".tags-list").append(d.join(""))
                                    }
                                })(e),
                                    $(".new-type-span").click(function () {
                                        window.open(memory.rootUrl.main + "public/info/detail.html?account=" + $(this).attr("data"))
                                    }),
                                    $(".wx-type").find("div.tags-list-p  div.tag-span").unbind("click").click(function () {
                                        return val = "tag:" + $(this).find("span.tag-span-text").text(),
                                            $("#" + id4TxtAccount).val(val),
                                            $("#" + id4SimpleSearch).val(val),
                                            FunUtil.common4searchAccount(val),
                                            !1
                                    }),
                                    $(".brand-qcode").hover(function () {
                                            $(this).children("div.hover-chunk").show()
                                        },
                                        function () {
                                            $(this).children("div.hover-chunk").hide()
                                        }),
                                    $(".brand-search").find("span.brand-auth-span").unbind("click").click(function () {
                                        return val = "v:" + $(this).attr("data-text").replace("：", ":"),
                                            $("#" + id4TxtAccount).val(val),
                                            $("#" + id4SimpleSearch).val(val),
                                            FunUtil.common4searchAccount(val),
                                            !1
                                    })
                            }
                        }
                    },
                    PageObj.brandSearchModuleTwo = function (a, b) {
                        if ("string" != typeof a || !/^-2000(,|，)/.test(a)) {
                            var c = a.brand,
                                d = c.brandMap;
                            if (!d) return void $(".brand-search-result-one,.brand-search-result2").html("");
                            if (!d || 1 != d.template) {
                                var e = JSON.parse(d.first),
                                    f = JSON.parse(d.second),
                                    g = JSON.parse(d.third),
                                    h = c.articleList,
                                    i = e && e.first_description ? e.first_description : "",
                                    j = d.certified_text ? '<i class="auth-icon"></i>' : "",
                                    k = [],
                                    l = [],
                                    m = [],
                                    n = "";
                                if (h) {
                                    for (var o = 0; o < h.length; o++) h[o] && (k[o] = h[o].img_url ? h[o].img_url : "", l[o] = h[o].title ? h[o].title : "", m[o] = h[o].url ? h[o].url : "");
                                    n = h[0].public_time ? h[0].public_time : ""
                                }
                                var p = e.first_logo ? '<img src="' + e.first_logo + '" >' : "",
                                    q = e.first_logo ? "" : "background:" + String.changeUrl(d.account),
                                    r = ['<div class="brand-search brand-search-module-two">', '<div class="clear">', '<div class="brand-left clear">', '<div class="brand-left-top clear">', '<div class="brand-logo-div clear brand-logo-div-module-two">', '<div class="brand-logo brand-logo-module-two"  style="' + q + '">', p, "</div>", j, "</div>", '<div class="brand-name-div clear brand-name-div-module-two">', '<div class="name-top">', '<a class="brand-name" href="/public/info/detail.html?account=' + d.account + '" target="_blank">' + d.weixin_name + "（" + d.account + "）—官方账号</a>", '<a class="brand-link" href="' + memory.rootUrl.main + 'public/brand/brand_zone.html" target="_blank" title="已通过新榜认证，并获得品牌置顶保护">品牌</a>', "</div>", '<div class="middle-top-profile" title="' + i + '">' + i.getSubStr(200) + "</div>", "</div>", '<div class="top-right-ercode">', '<div class="hover-chunk wx-code-pic">', '<img src="' + String.changeUrl(d.account, "code") + '" style="max-width:100%;">', "<p>微信扫一扫关注</p>", "</div>", "</div>", "</div>", "</div>", '<div class="brand-middle-module-two clear">', '<div class="middle-left clear">', '<div class="brand-business">', '<div class="business-list clear"></div>', '<div class="business-detail clear"></div>', "</div>", "</div>", '<div class="middle-right clear"></div>', "</div>", "</div>", '<div class="brand-bottom clear brand-bottom-module-two">', '<ul class="brand-about-service clear"></ul>', "</div>", "</div>"];
                                $(".brand-search-result-one").html("").hide(),
                                    $(".brand-search-result2").html("").append(r.join("")).show(),
                                f && $(f).each(function (a) {
                                    if (!(f.length <= 1)) {
                                        var b = $(".business-list").width() / f.length + "px",
                                            c = "";
                                        "数据产品" == this.second_name && ($(".business-list a").removeClass("selected"), c = "selected"),
                                        0 == a && ($(".business-list a").removeClass("selected"), c = 0 == a ? "selected" : "");
                                        var d = ['<a style="width:' + b + '" class="' + c + '" data="' + a + '" href="' + this.second_main_url + '" target="_blank">' + this.second_name + "</a>"];
                                        $(".business-list").append(d.join(""))
                                    }
                                });
                                var s = function (a) {
                                    var b = f[a],
                                        c = b.second_logo ? "block" : "none",
                                        d = ['<div class="left-logo-img clear" style="display: ' + c + ';">', '<img src="' + (b.second_logo ? b.second_logo : "") + '" alt=""/>', "</div>", '<div class="right-text clear">', '<div class="right-text-p">', '<span title="' + (b.second_description ? b.second_description : "") + '">' + (b.second_description ? b.second_description.getSubStr(130) : "") + "</span>", "</div>", '<div class="business-about-link"></div>', "</div>"];
                                    $(".business-detail").html("").append(d.join(""));
                                    for (var e = b.second_list ? b.second_list : "", g = 1; g <= 8; g++) {
                                        var h = "second_" + g + "_name",
                                            i = "second_" + g + "_url";
                                        e[h] && $(".business-about-link").append('<a href="' + e[i] + '" target="_blank" title="' + e[h] + '">' + e[h].getSubStr(12) + "</a>")
                                    }
                                };
                                if (s("数据产品" == $(".business-list a.selected").text() ? $(".business-list a.selected").attr("data") : 0), g.length > 0 ? $(g).each(function (a) {
                                        var b = a == g.length - 1 ? "border-none" : "",
                                            c = 100 / g.length + "%",
                                            d = ['<li style="width: ' + c + '"><a href="' + this.third_url + '"  target="_blank"  title="' + this.third_name + '" class=' + b + " >" + (this.third_name ? this.third_name.getSubStr(20) : "") + "</a></li>"];
                                        $(".brand-about-service").append(d.join(""))
                                    }) : $(".brand-bottom").hide(), "" != h) {
                                    for (var t = "",
                                             o = 1; o < l.length; o++) t += '<a href="' + m[o] + '" target="_blank" title="' + l[o] + '"><li><i class="dot"></i>' + l[o] + "</li></a>";
                                    var u = ['<div class="middle-right-img clear">', '<div class="new-icon"><i></i><span>' + n.pastTime() + "</span></div>", '<img src="' + k[0] + '" alt=""/>', '<div class="article-div">', '\t<div class="article-bg"></div>', '<p class="bottom-article" title="' + l[0] + '"><a href="' + m[0] + '" target="_blank" class="title">' + l[0].getSubStr(28) + "</a></p>", "</div>", "</div>", '<div class="middle-right-article clear">', '<ul class="right-article-ul" style="margin-left:-10px">', t, "</ul>", "</div>"];
                                    $(".middle-right").append(u.join(""))
                                }
                                $(".business-list a").mouseover(function () {
                                    $(".business-list a").removeClass("selected"),
                                        $(this).addClass("selected"),
                                        s($(this).attr("data"))
                                }),
                                    $(".top-right-ercode").hover(function () {
                                            $(this).children("div.hover-chunk").show()
                                        },
                                        function () {
                                            $(this).children("div.hover-chunk").hide()
                                        })
                            }
                        }
                    },
                    PageObj.initToutiao = function () {
                        return {
                            searchTouTiao: function (a) {
                                remoteSearch.searchTouTiaoDataByCondition(a,
                                    function (a) {
                                        searchResult.ttResult = a
                                    })
                            }
                        }
                    },
                    PageObj.initWeiBo = function () {
                        return {
                            searchWeiBo: function (a) {
                                remoteSearch.searchWeiBoDataCondition(a,
                                    function (a) {
                                        searchResult.wbResult = a
                                    })
                            }
                        }
                    },
                    PageObj.initZixun = function () {
                        return {
                            searchZixun: function (a) {
                                remoteSearch.searchCmsCondition(a,
                                    function (a) {
                                        searchResult.zxResult = a
                                    })
                            }
                        }
                    },
                    PageObj.initMini = function () {
                        return {
                            searchMini: function (a) {
                                remoteSearch.searchMiniProgramCondition(a,
                                    function (a) {
                                        searchResult.miResult = a
                                    })
                            }
                        }
                    },
                    PageObj.initAll = function (a, b) {
                        $("div.k-loading").hide(),
                            FunUtil.clearAll(),
                            isPost = !1;
                        var c = FunUtil.searchBox4fillResultList,
                            d = PageObj.brandSearchModuleOne,
                            e = PageObj.brandSearchModuleTwo,
                            f = FunUtil.searchTtResultList,
                            g = FunUtil.searchWbResultList,
                            h = FunUtil.searchZxResultList,
                            i = FunUtil.searchMiResultList;
                        a.wxResult.result && a.wxResult.result.length > 0 ? (FunUtil.noResultShow("hide"), c(a.wxResult, b), d(a.wxResult), e(a.wxResult)) : FunUtil.noResultShow("show", b),
                            a.ttResult.toutiao.list && a.ttResult.toutiao.list.length > 0 ? (f(a.ttResult, b), $("#toutiao").show()) : $("#toutiao").hide(),
                            a.wbResult.weibo.datas && a.wbResult.weibo.datas.length > 0 ? (g(a.wbResult, b), $("#weibo").show()) : $("#weibo").hide(),
                            a.zxResult.datas && a.zxResult.datas.length > 0 ? (h(a.zxResult, b), $("#zixun").show()) : $("#zixun").hide(),
                            a.miResult.miniProgram.datas && a.miResult.miniProgram.datas.length > 0 ? (i(a.miResult, b), $("#mini").show()) : $("#mini").hide(),
                            $(window).scrollTop(0)
                    }
            },
            PageInfo.init()
    }),
    define("static/common/invite", ["jquery", "../public/info/api-search", "./ade-common"],
        function (a) {
            var b, c, d, e = a("jquery"),
                f = a("dialog"),
                g = a("../public/info/api-search"),
                h = a("api-common"),
                i = a("memory"),
                j = a("./ade-common"),
                k = (a("nav"), f.GetRequest()),
                l = (k.hasCa, g.search.host),
                m = {},
                n = [],
                o = 0,
                p = {},
                q = [],
                r = 0,
                s = {},
                t = "",
                u = !1,
                v = h.getNeedLoginData,
                w = 1,
                x = 8,
                y = function () {
                    var a = i.urlBase + "account/ade/";
                    return {
                        host: {
                            getAllFodder: function (b, c, d) {
                                v(a + "getAllFodder", {
                                        pageNumber: b,
                                        pageSize: c
                                    },
                                    d)
                            }
                        },
                        document: {
                            getDocument: function (b, c) {
                                v(a + "getDocument", {
                                        fake_id: b
                                    },
                                    c)
                            }
                        }
                    }
                }(),
                z = function () {
                    e(".tender-pop-box").html("");
                    var a = ['<div class="tender-pop-header pop-type-charge modal-header">', "询购单</div>", '<div class="tender-pop-body modal-body">', '<ul class="pop-result-list">', '<li class="clear">', "<span>项目名称</span>", '<select id="case_inp" class="pop-input form-control"></select>', "</li>", '<li class="clear">', "<span>公众号</span>", '<span id="chosen_account" class="pop-info-line" data-account=""></span>', '<span class="pop-fresh-span pop-preview-btn"><a class="pop-to-detail" href="###">广告价值</a></span>', "</li>", '<li class="clear">', "<span>投放位置</span>", '<select id="tender_position" class="pop-input form-control"></select>', "</li>", '<li class="clear">', "<span>投放时间</span>", '<input id="datepicker" data-provide="datepicker" class="pop-input text form-control" type="text"/>', "</li>", '<li class="clear">', "<span>文案</span>", '<select id="document" class="pop-input form-control" onmousedown="javascript:return false;">', '<option value="0">原文案</option>', "</select>", '<span class="pop-fresh-span pop-preview-btn"><a class="pop-to-preview" href="###">查看</a></span>', "</li>", '<li class="clear"><span>预期阅读</span><span class="avg-thousand-read pop-info-line"></span></li>', "</ul>", '<div class="document-list-result form-control">', '<div class="document-list-result-div" ></div>', "</div>", '<p class="pop-money-line clear"><span class="price-math-btn price-minus-btn">-</span><input id="p_price" type="text" class="form-control money-input text-input" value="我的出价" tip="我的出价" maxlength="7"/><span class="price-math-btn price-add-btn">+</span></p>', '<p class="pop-money-remind">', '<span title="估算价是新榜根据该媒体主在该投放位置的平均预期阅读数，结合同类别媒体主平均千次阅读价，得出的估算价格，供参考。">估算价<span class="important">*</span></span>:<span id="math_price">0</span>|&nbsp;&nbsp;他的报价:<span id="user_price">0</span>&nbsp;&nbsp;|&nbsp;&nbsp;最近成交价:<span id="last_price">0</span>', "</p>", "</div>", '<div class="tender-pop-footer modal-footer">', '<div class="pop-result-head-spe clear">', '<div class="pop-result-head-left">', '<textarea id="tender_my_message" class="form-control" maxlength="200" placeholder="我的备注（选填）"></textarea>', "</div>", '<div class="pop-result-head-right-spe">', '<p class="pop-money-line-info">￥<span class="pop-commit-price">0</span></p>', '<p class="pop-money-line-spe">千阅价:<span class="pop-thousand-read">0.00</span>元</p>', '<p class="clear"><span id="charge_confirm" class="pop-tender-btn pop-tender-btn-c">发起询购</span></p>', "</div>", "</div>", "</div>"];
                    e(".tender-pop-box").append(a.join("")),
                    u && e(".pop-result-list").append('<li class="clear"><span>对外报价</span><input class="foreign-quotation pop-input form-control" type="text"/></li>'),
                        e("#document").click(function () {
                            e(".document-list-result").toggle()
                        }),
                        e(".document-list-result-div").scroll(function () {
                            if (e(this).scrollTop() + e(this).height() >= e(this)[0].scrollHeight) {
                                if (Math.ceil(parseInt(e(".document-list-result-div").attr("data")) / x) <= w) return;
                                I(++w, x)
                            }
                        })
                },
                A = function (a) {
                    return e.isNumeric(a) ? parseFloat(a) : 0
                },
                B = function (a) {
                    return void 0 === a ? "0" : 0 === a.trim().length ? "0" : a.trim()
                },
                C = function (a, c) {
                    var g = e.trim(e("#datepicker").val());
                    if (g.match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) {
                        var h = m.publish_time_end;
                        if (f.getTime(g) >= f.getTime(a) && f.getTime(g) <= f.getTime(h)) {
                            var i = e("#case_inp").val().split(",")[1],
                                j = e("#case_inp").val().split(",")[2],
                                k = e.trim(e("#tender_position").find("option:selected").text()),
                                n = parseInt(e.trim(e("#p_price").val()));
                            if (n > parseInt(j)) return f.showTopTip("超出广告主预算金额！"),
                                void e("#charge_confirm").addClass("pop-tender-btn-c");
                            var p = {
                                account_id: e.trim(b),
                                fake_id: e.trim(i),
                                plan_readed: e.trim(e("#document").val()),
                                publish_time: e.trim(e("#datepicker").val()),
                                outer_price: e.trim(e(".foreign-quotation").val()) || n,
                                position: k,
                                price: n,
                                thousand_read: parseFloat(o),
                                host_memo: e("#tender_my_message").val()
                            };
                            if ("" == p.fake_id || "" == p.publish_time || "" == p.position || "" == p.price || "" == p.outer_price) return f.showTopTip("询购必须填满所有内容"),
                                void e("#charge_confirm").addClass("pop-tender-btn-c");
                            l.askForTender(p,
                                function (a) {
                                    1 == a ? (d.hide(), f.showTip("询购成功！")) : 0 == a ? f.showTopTip("询购失败！") : a == -1 ? f.showTopTip("该公众号尚未被绑定！") : a == -100 ? f.showTopTip("可邀请的次数已到上限") : a == -101 ? f.showTopTip("可邀请的金额已达上限") : a == -102 ? f.showTopTip("询价不在正确时间范围内") : a == -104 && f.showTopTip("投放未审核通过"),
                                        e("#charge_confirm").addClass("pop-tender-btn-c")
                                })
                        } else f.showTopTip("超出需求设置投放范围"),
                            e("#charge_confirm").addClass("pop-tender-btn-c")
                    } else f.showTopTip("日期格式有误！请重新输入"),
                        e("#charge_confirm").addClass("pop-tender-btn-c")
                },
                D = function (a) {
                    e("#tender_position").html(""),
                        e(a).each(function (a) {
                            var b, c;
                            switch (this + "") {
                                case "单图文":
                                    b = "a",
                                        c = 0;
                                    break;
                                case "多图文头条":
                                    b = "b",
                                        c = 1;
                                    break;
                                case "多图文2":
                                    b = "c",
                                        c = 2;
                                    break;
                                case "多图文3-N":
                                    b = "d",
                                        c = 3
                            }
                            var d = A(B(p[b]));
                            0 == a && (o = d > 0 ? d : 0, o > 1e5 ? e(".avg-thousand-read").html("10w+") : e(".avg-thousand-read").html(parseInt(o)), r = c, j.mathCost(o)),
                                e("#tender_position").append('<option value="' + (d > 0 ? d : 0) + "," + c + '">' + this + "</option>")
                        })
                },
                E = [],
                F = [],
                G = function () {
                    var a = parseFloat(m.thousand_price) * o / 1e3;
                    e("#math_price").html(parseInt(a) || 0),
                    s.commit_price && F.length < 1 && (F = e.parseJSON(s.commit_price).info),
                        e("#user_price").html(F[r] || 0),
                        e("#last_price").html(E[r])
                },
                H = function (a) {
                    if (1 == w) {
                        var b = e("#case_inp").val().split(",")[1];
                        y.document.getDocument(b,
                            function (b) {
                                var c = b,
                                    d = "";
                                d = 0 == c.cover.indexOf("http") ? c.cover : c.cover ? i.uploadBase + c.cover : "https://static.newrank.cn/edit/assets/img/default.png";
                                var f = ['<div class="document-list-result-one">', '<div class="document-list-result-one-img">', '<img src="' + d + '" />', "</div>", '<div class="document-list-result-one-content">', '<p class="document-list-result-one-content-title">原文案</p>', '<p class="document-list-result-one-content-memo">备注：' + ("" == c.memo || null == c.memo ? "" : c.memo) + "</p>", "</div>", "</div>"];
                                e(".document-list-result-div").html(f.join("")),
                                    e("#document").empty().append("<option value=0>原文案</option>"),
                                    a(1)
                            })
                    } else a(1)
                },
                I = function (a, b) {
                    H(function (c) {
                        1 == c && y.host.getAllFodder(a, b,
                            function (b) {
                                1 == a && e(".document-list-result-div").attr("data", b.count),
                                    e(b.result).each(function () {
                                        var a = this,
                                            b = "";
                                        b = 0 == a.image_url.indexOf("http") ? a.image_url : a.image_url ? i.uploadBase + a.image_url : "https://static.newrank.cn/edit/assets/img/default.png";
                                        var c = ['<div class="document-list-result-one">', '<div class="document-list-result-one-img">', '<img src="' + b + '" />', "</div>", '<div class="document-list-result-one-content">', '<p class="document-list-result-one-content-title">' + a.title + "</p>", '<p class="document-list-result-one-content-memo" data="' + a.article_uuid + '">备注：' + ("" == a.memo || null == a.memo ? "" : a.memo) + "</p>", "</div>", "</div>"];
                                        e(".document-list-result-div").append(c.join(""))
                                    })
                            })
                    })
                };
            return e(document).delegate(".document-list-result-one", "click",
                function () {
                    var a = e(this).find(e(".document-list-result-one-content-title")).html(),
                        b = e(this).find(e(".document-list-result-one-content-memo")).attr("data");
                    "原文案" == a ? e("#document").empty().append("<option value=0>原文案</option>") : e("#document").empty().append("<option value=" + b + ">" + a + "</option>"),
                        e(".document-list-result").toggle()
                }),
                e(document).delegate("#case_inp", "change",
                    function () {
                        e("#tender_position").html("");
                        var a = e(this).val(),
                            b = a.split(",");
                        q = "不限" == n[b[0]].position ? ["单图文", "多图文头条", "多图文2", "多图文3-N"] : n[b[0]].position.split(","),
                            m = n[b[0]],
                            D(q),
                            G(),
                            w = 1,
                            I(w, x)
                    }),
                e(document).delegate("#tender_position", "change",
                    function () {
                        o = e(this).val().split(",")[0],
                            r = e(this).val().split(",")[1],
                            o > 1e5 ? e(".avg-thousand-read").html("10w+") : e(".avg-thousand-read").html(parseInt(o)),
                            j.mathCost(o),
                            G()
                    }),
                e(document).delegate("#p_price", "keyup",
                    function () {
                        j.mathCost(o)
                    }),
                e(document).delegate(".price-math-btn", "click",
                    function () {
                        j.mathCost(o),
                            e(".pop-commit-price").html(parseInt(e("#p_price").val()))
                    }),
                e(document).delegate(".pop-tender-btn-c", "click",
                    function () {
                        var a = /^(([1-9]{1})+([0-9]{0,}))$/,
                            b = e(".foreign-quotation").val();
                        if (u) {
                            if (!a.test(b) && b != parseInt(b)) return void f.showTopTip("对外报价只可输入有效整数");
                            if (parseFloat(e("#p_price").val()).toFixed(2) - parseFloat(1.15 * b).toFixed(2) > 0) return void f.showTopTip("我的出价不得超过对外报价的115%")
                        }
                        if (!parseInt(e("#p_price").val())) return void f.showTopTip("价格只可输入有效整数");
                        e(this).removeClass("pop-tender-btn-c"),
                            C(t)
                    }),
                e(document).delegate(".pop-to-preview", "click",
                    function () {
                        var a = e("#document").val();
                        if (0 == a) {
                            var b = e("#case_inp").val();
                            window.open("../../account/ade/document_new.html?id=" + b.split(",")[1])
                        } else window.open(i.rootUrl.edit + "detail.html?uuid=" + a)
                    }),
                e(document).delegate(".pop-to-detail", "click",
                    function () {
                        var a = e("#chosen_account").attr("data-account");
                        h.showDetail(a)
                    }),
                e(document).delegate(".dialog-box-close", "click",
                    function () {
                        d.hide(".tender-pop-box")
                    }),
                e(".invite-box").undelegate().delegate(".invite-to-charge", "click",
                    function (a) {
                        var b = e(this).attr("data").split(",")[2];
                        return window.open(i.rootUrl.ade + "enquire/select.html?account=" + b),
                            !1
                    }),
                {
                    init: function (a) {
                        t = a.datetime,
                            c = a.user.user_type,
                            u = !!a.user.roles.contain("550"),
                            z(),
                            d = f.makeDialog(e(".tender-pop-box"), 500, 648, "true")
                    }
                }
        }),
    define("static/common/ade-common", ["jquery"],
        function (a, b, c) {
            var d = a("jquery"),
                e = a("dialog"),
                f = a("memory"),
                g = [];
            return d(document).delegate(".personal-letter", "click",
                function (a) {
                    window.open("/account/user/user.html"),
                        a.stopImmediatePropagation(),
                        a.stopPropagation()
                }),
                d(document).delegate("#pay_no,#pay_yes", "click",
                    function () {
                        window.location.reload()
                    }),
                d(document).delegate(".money-input,.number-count", "keyup afterpaste",
                    function () {
                        return d(this).css({
                            "font-size": "24px",
                            "line-height": "30px"
                        }),
                            parseInt(d(this).val()) ? parseInt(this.value) <= 0 ? void(this.value = 0) : void d(".pop-commit-price").html(parseInt(d(this).val())) : void e.showTopTip("价格只可输入有效整数")
                    }),
                d(document).delegate(".money-input", "focus blur",
                    function () {
                        "我的出价" !== this.value && "" !== this.value ? d(this).css({
                            "font-size": "24px",
                            "line-height": "30px"
                        }) : d(this).css({
                            "font-size": "16px",
                            "line-height": "14px"
                        })
                    }),
                d(document).delegate(".document-remove", "click",
                    function () {
                        d(this).parent().hide(),
                            d(".mask").hide()
                    }),
                d(document).delegate(".pop-remove", "click",
                    function () {
                        d(".tender-pop-box").hide(),
                            d(".mask").hide()
                    }),
                d(document).delegate(".price-minus-btn", "click",
                    function () {
                        var a = d(".money-input").val();
                        !parseInt(a) || 0 == a || a < 10 || (a = parseInt(a) - 10, d(".money-input").val(a).css({
                            "font-size": "24px",
                            "line-height": "30px",
                            color: "#333"
                        }))
                    }),
                d(document).delegate(".price-add-btn", "click",
                    function () {
                        var a = d(".money-input").val();
                        parseInt(a) || (a = 0),
                            a = parseInt(a) + 10,
                            d(".money-input").val(a).css({
                                "font-size": "24px",
                                "line-height": "30px",
                                color: "#333"
                            })
                    }),
                d(document).delegate("#search_txt", "keyup",
                    function (a) {
                        var b = a.which,
                            c = d.trim(d(this).val());
                        13 == b && (window.location.href = "search.html?value=" + escape(c))
                    }),
                {
                    getCountdown: function (a, b, c, f) {
                        var g = e.getTime(c),
                            h = e.getTime(c.substring(0, 10)),
                            i = 0,
                            j = 0,
                            k = 0,
                            l = 0;
                        if (h <= e.getTime(a.publish_time_end)) if (a.tender_time_start && a.tender_time_end) {
                            var m = e.getTime(a.tender_time_start),
                                n = e.getTime(a.tender_time_end),
                                o = n - m,
                                p = setInterval(function () {
                                        if ((g += 1e3) > m) if (g > n) clearInterval(q),
                                            clearInterval(p),
                                            f ? (d(".push_time_" + b).html("竞标已经结束"), d(".push_pointer_" + b).css("width", "100%"), d(".ms").hide()) : (d(".push_time_t_" + b).html("竞标已经结束"), d(".push_price_" + a.fake_id).css({
                                                color: "#a8a8a8",
                                                "text-decoration": "line-through"
                                            }), d(".push_price_" + a.fake_id).siblings().css({
                                                color: "#a8a8a8"
                                            }), d(".push_pointer_t_" + b).css("width", "100%"));
                                        else {
                                            var c = n - g,
                                                e = g - m,
                                                h = e / o * 100;
                                            f ? d(".push_pointer_" + b).css("width", h + "%") : d(".push_pointer_t_" + b).css("width", h + "%"),
                                                i = Math.floor(c / 864e5),
                                                j = Math.floor((c - 864e5 * i) / 36e5),
                                                k = Math.floor((c - 864e5 * i - 36e5 * j) / 6e4),
                                                l = Math.floor((c - 864e5 * i - 36e5 * j - 6e4 * k) / 1e3),
                                            "0" == l && k > 0 && (k -= 1, l = 60),
                                                f ? d(".push_time_" + b).html("竞标剩余时间:" + (0 != i ? i + "天" : "") + (0 != j ? j + "时" : "") + (k >= 0 ? k + "分" : "") + (0 != l ? l + "秒" : "") + '<span class="ms">' + f + "</span>") : d(".push_time_t_" + b).html("竞标剩余时间:" + (0 != i ? i + "天" : "") + (0 != j ? j + "时" : "") + (k >= 0 ? k + "分" : "") + (0 != l ? l + "秒" : ""))
                                        } else {
                                            g == m && window.location.reload();
                                            var c = m - g;
                                            j = Math.floor(c / 36e5),
                                                k = Math.floor((c - 36e5 * j) / 6e4),
                                                j > 24 ? (i = parseInt(j / 24), f ? d(".push_time_" + b).html("竞标将于" + i + "天后开始") : d(".push_time_t_" + b).html("竞标将于" + i + "天后开始")) : 0 == j ? f ? d(".push_time_" + b).html("竞标将于" + k + "分钟后开始") : d(".push_time_t_" + b).html("竞标将于" + k + "分钟后开始") : f ? d(".push_time_" + b).html("竞标将于" + j + "时" + k + "分后开始") : d(".push_time_t_" + b).html("竞标将于" + j + "时" + k + "分后开始")
                                        }
                                    },
                                    1e3);
                            if (f) var q = setInterval(function () {
                                    d(".ms").html(f),
                                    0 == f && (f = 99),
                                        f -= 1
                                },
                                9)
                        } else d(".push_time_" + b).html("竞标尚未开始"),
                            d(".push_time_t_" + b).html("竞标尚未开始");
                        else d(".push_time_" + b).html("竞标已经过期"),
                            d(".push_time_t_" + b).html("竞标已经过期"),
                            d(".push_price_" + a.fake_id).css({
                                color: "#a8a8a8",
                                "text-decoration": "line-through"
                            }),
                            d(".push_price_" + a.fake_id).siblings().css({
                                color: "#a8a8a8"
                            })
                    },
                    makeHotPush: function (a, b) {
                        if (a.keywords) var c = a.keywords.split(",");
                        else var c = [];
                        if (a.position) var g = a.position.split(",");
                        else var g = [];
                        if (a.publish_time_start && a.publish_time_end) var h = a.publish_time_start,
                            i = a.publish_time_end;
                        else var h = null,
                            i = null;
                        for (var j, k = d.trim(parseFloat(a.thousand_price).toFixed(1)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"), l = d.trim(parseFloat(a.expect_reads).toFixed(1)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"), m = d.trim(parseFloat(a.price).toFixed(1)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"), n = a.user_type - 100, o = [], p = 0; p < 5; p++) {
                            switch (n) {
                                case 0:
                                    j = "0钻用户，即该广告主在新榜平台累计成交额度小于5千元";
                                    break;
                                case 1:
                                    j = "1钻用户，即该广告主在新榜平台累计成交额度大于5千元";
                                    break;
                                case 2:
                                    j = "2钻用户，即该广告主在新榜平台累计成交额度大于2万元";
                                    break;
                                case 3:
                                    j = "3钻用户，即该广告主在新榜平台累计成交额度大于5万元";
                                    break;
                                case 4:
                                    j = "4钻用户，即该广告主在新榜平台累计成交额度大于20万元";
                                    break;
                                case 5:
                                    j = "5钻用户，即该广告主在新榜平台累计成交额度大于50万元"
                            }
                            p < n ? o.push('<i class="ade-pic level-up" title="' + j + '"></i></p>') : o.push('<i class="ade-pic level" title="' + j + '"></i>')
                        }
                        var q = "";
                        q = 0 == a.cover.indexOf("http") ? a.cover : f.uploadBase + a.cover;
                        var r = ['<div id="carousel_' + b + '" class="carousel" style="display:' + (0 == b ? "block" : "none") + '" data="' + a.fake_id + '">', '<div class="hot-push-header clear">', '<div class="hot-push-header-left"><img class="case-img" src="' + q + '" alt=""/></div>', '<div class="hot-push-header-left">', '<h3 class="push-info-title">' + a.title + "</h3>", '<p class="sign-ul"><i class="ade-pic sign"></i><span>投放分类:</span>' + (c[0] ? '<span class="push-span">' + c[0] + "</span>" : '<span class="push-span">无</span>') + (c[1] ? '<span class="push-span">' + c[1] + "</span>" : "") + (c[2] ? '<span class="push-span">' + c[2] + "</span>" : "") + "</p>", '<p class="hot-push-content">' + a.content + "</p>", "1" == a.status_has_charge ? '<i class="ade-pic under-charge-big"></i>' : "", "</div>", "</div>", '<div class="hot-push-body clear">', '<div class="push-info-left">', '<div class="clear">', '<div class="push-price">', "<p>整体预算</p>", '<p class="push-obj push-obj-one"><strong class="push-strong-spe">￥</strong><span class="price-num-spe push_price_' + a.fake_id + '">' + m + "</span></p>", "</div>", '<div class="push-price">', "<p>预期阅读</p>", '<p class="push-obj push-obj-two">' + l + "</p>", "</div>", '<div class="push-price">', "<p>千阅价</p>", '<p class="push-obj push-obj-three">' + k + "</p>", "</div>", "</div>", '<div class="clear">', '<div class="push-price"><i class="ade-pic clock"></i></div>', '<div class="push-price-num">', '<div><span class="tendering-time push_time_' + a.fake_id + '">时间读取中..</span></div>', '<div class="progress-spe">', '<div class="progress-bar push_pointer_' + a.fake_id + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:0%"></div>', "</div></div></div>", '<div class="clear" style="margin-top:10px"><p style="float:left;margin:0 15px 0">广告主等级<span style="margin-left:10px;color:#333333">LV ' + n + "</span></p>" + o[0] + o[1] + o[2] + o[3] + o[4] + "</div>", "</div>", '<div class="push-info-left">', '<div class="p-right-div clear">', '<p class="sign-ul"><i class="ade-pic publish"></i><span>投放时间：</span>' + (h ? '<span class="push-span">' + h + "</span>" : "无") + (i ? '至<span class="push-span">' + i : "") + "</span></p>", "</div>", '<div class="p-right-div clear">', '<p class="sign-ul"><i class="ade-pic position"></i><span>投放位置：</span>' + (g[0] ? '<span class="push-span">' + g[0] + "</span>" : '<span class="push-span">无</span>') + (g[1] ? '<span class="push-span">' + g[1] + "</span>" : "") + (g[2] ? '<span class="push-span">' + g[2] + "</span>" : "") + "</p>", "</div>", '<div class="p-right-div clear">', '<p class="sign-ul"><a id="check_info" href="javascript:void(0)"><i class="ade-pic document"></i>文案</a><span class="document-span">请阅读后进行竞标</span></p>', "</div>", 0 != a.tenderNum ? '<div id="tender_count_' + a.fake_id + '" class="tender-count">' + a.tenderNum + "人次已竞标</div>" : "", "</div>", "</div>", "</div>"];
                        if (d("#makeHotPush").append(r.join("")), d("#makeHotPush_spe")) {
                            var q = "";
                            q = 0 == a.cover.indexOf("http") ? a.cover : f.uploadBase + a.cover;
                            var s = ['<div class="hot-push-header clear">', '<div class="hot-push-header-left"><img class="case-img" src="' + q + '" alt=""/></div>', '<div class="hot-push-header-left">', '<h3 class="push-info-title">' + a.title + "</h3>", '<p class="sign-ul"><i class="ade-pic sign"></i><span>投放分类:</span>' + (c[0] ? '<span class="push-span">' + c[0] + "</span>" : '<span class="push-span">无</span>') + (c[1] ? '<span class="push-span">' + c[1] + "</span>" : "") + (c[2] ? '<span class="push-span">' + c[2] + "</span>" : "") + "</p>", '<p class="hot-push-content">' + a.content + "</p>", "</div>", "</div>", '<div class="hot-push-body clear">', '<div class="push-info-left">', '<div class="clear">', '<div class="push-price">', "<p>整体预算</p>", '<p class="push-obj push-obj-one"><strong class="push-strong-spe">￥</strong><span class="price-num-spe push_price_' + a.fake_id + '">' + m + "</span></p>", "</div>", '<div class="push-price">', "<p>预期阅读</p>", '<p class="push-obj push-obj-two">' + l + "</p>", "</div>", '<div class="push-price">', "<p>千阅价</p>", '<p class="push-obj push-obj-three">' + k + "</p>", "</div>", "</div>", '<div class="clear" style="margin-top:20px">', '<div class="push-price"><i class="ade-pic clock"></i></div>', '<div class="push-price-num">', '<div><span class="tendering-time push_time_' + a.fake_id + '">时间读取中..</span></div>', '<div class="progress-spe">', '<div class="progress-bar push_pointer_' + a.fake_id + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:0%"></div>', "</div>", "</div>", "</div>", "</div>", '<div class="push-info-left">', '<div class="p-right-div clear">', '<p class="sign-ul"><i class="ade-pic publish"></i><span>投放时间：</span>' + (h ? '<span class="push-span">' + h + "</span>" : "无") + (i ? '至<span class="push-span">' + i : "") + "</span></p>", "</div>", '<div class="p-right-div clear">', '<p class="sign-ul"><i class="ade-pic position"></i><span>投放位置：</span>' + (g[0] ? '<span class="push-span">' + g[0] + "</span>" : '<span class="push-span">无</span>') + (g[1] ? '<span class="push-span">' + g[1] + "</span>" : "") + (g[2] ? '<span class="push-span">' + g[2] + "</span>" : "") + "</p>", "</div>", '<div class="p-right-div clear">', '<p class="sign-ul"><a id="check_info" href="javascript:void(0)"><i class="ade-pic document"></i>文案</a><span class="document-span">请阅读后进行竞标</span></p>', "</div>", "</div>", "</div>"];
                            d("#makeHotPush_spe").append(s.join(""))
                        }
                        e.molHover(".tender-btn-detail", "", "", "#fd8c25")
                    },
                    makeHotTender: function (a, b) {
                        var c = a.keywords.split(","),
                            e = a.publish_time_start,
                            g = a.publish_time_end,
                            h = d.trim(a.price).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
                            i = "";
                        i = 0 == a.cover.indexOf("http") ? a.cover : f.uploadBase + a.cover;
                        var j = ['<div class="hot-sell-parts">', "1" == a.status_has_charge ? '<i class="ade-pic under-charge-little"></i>' : "", '<div class="caption-box">', '<div id="' + b + "_" + a.fake_id + '">', '<div class="caption-head"><img class="caption-img" src="' + i + '"/><p class="font-center caption-title"><a href="detail.html?id=' + a.fake_id + '">' + a.title + "</a></p></div>", '<div class="tender-clip-spe">' + (c[0] ? '<span class="push-span">' + c[0] + "</span>" : "--") + (c[1] ? '<span class="push-span">' + c[1] + "</span>" : "") + (c[2] ? '<span class="push-span">' + c[2] + "</span>" : ""), "</div>", '<div class="tender-clip">', '<span class="tender-push-time dark">投放时间</span><strong class="time-strong">' + e.split("-")[1] + "." + e.split("-")[2] + '</strong><span class="tender-push-time">至</span></strong><strong class="time-strong">' + g.split("-")[1] + "." + g.split("-")[2] + "</strong>", "</div>", '<div class="tender-clip row-main">', '<p><strong class="push-strong">￥</strong><span class="price-num push_price_' + a.fake_id + '">' + h + "</span></p>", '<p><span class="tendering-time-spe push_time_t_' + a.fake_id + '">时间读取中..</span></p>', "</div>", '<div class="progress">', '<div class="progress-bar push_pointer_t_' + a.fake_id + '" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:0%"></div>', "</div>", "</div>", "</div>", "</div>"];
                        d("#" + b).append(j.join("")),
                            d(".hot-sell-parts").on("mouseover",
                                function () {
                                    d(this).find(".row-main").addClass("tender-hover")
                                }),
                            d(".hot-sell-parts").on("mouseout",
                                function () {
                                    d(this).find(".row-main").removeClass("tender-hover")
                                }),
                            d("#" + b + "_" + a.fake_id).on("click",
                                function () {
                                    window.open("detail.html?id=" + a.fake_id)
                                })
                    },
                    sortFunction: function (a, b, c) {
                        switch (b) {
                            case "":
                                return a;
                            case "time":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: e.getTime(this.intime)
                                        })
                                    });
                                break;
                            case "done_price":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: this.done_price
                                        })
                                    });
                                break;
                            case "price":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: this.price
                                        })
                                    });
                                break;
                            case "fade_time":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: e.getTime(this.fade_time.split(".")[0])
                                        })
                                    });
                                break;
                            case "order":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: this.done_count
                                        })
                                    });
                                break;
                            case "reads":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: this.expect_reads ? this.expect_reads : 0
                                        })
                                    });
                                break;
                            case "publish_time":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: e.getTime(this.publish_time)
                                        })
                                    });
                                break;
                            case "thousand_price":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: this.thousand_read && 0 != this.thousand_read && this.price ? parseFloat(1e3 * this.price / this.thousand_read).toFixed(1) : 0
                                        })
                                    });
                                break;
                            case "thousand_read":
                                g = [],
                                    d(a).each(function (a) {
                                        g.push({
                                            num: a,
                                            value: this.thousand_read ? this.thousand_read : 0
                                        })
                                    })
                        }
                        d(g).each(function () {
                            for (var a = 0; a < g.length; a++) if (a + 1 < g.length && ("dsc" == c ? parseFloat(g[a].value) < parseFloat(g[a + 1].value) : parseFloat(g[a].value) > parseFloat(g[a + 1].value))) {
                                var b = g[a + 1];
                                g[a + 1] = g[a],
                                    g[a] = b
                            }
                        });
                        for (var f = [], h = 0; h < a.length; h++) f.push(a[g[h].num]);
                        return f
                    },
                    mathCost: function (a) {
                        var b = e.formatMoney(d("#p_price").val());
                        if (a < 1 && e.showTopTip("所选位置未发布过内容或无相关记录"), 0 != a) if (parseInt(b)) {
                            var c = parseFloat(1e3 * parseInt(b) / a);
                            d(".pop-thousand-read").html(c.toFixed(1))
                        } else d(".pop-thousand-read").html("0.00");
                        else d(".pop-thousand-read").html("0.00")
                    }
                }
        }),
    define("static/public/info/api-search", ["jquery"],
        function (a) {
            var b = a("api-common"),
                c = a("jquery"),
                d = a("memory");
            c.ajaxSetup({
                type: "POST",
                dataType: "json"
            });
            var e = b.getCommonData,
                f = b.getNeedLoginData,
                g = d.urlBase,
                h = g,
                i = {
                    "视觉": "乐活"
                };
            return {
                search: function () {
                    var a = h + "account/ade/",
                        b = h + "sys/account/box/",
                        c = h + "data/weixinuser/",
                        d = h + "sys/account/weixin/";
                    return {
                        host: {
                            askForTender: function (b, c) {
                                f(a + "askForTender", {
                                        item: JSON.stringify(b)
                                    },
                                    c)
                            },
                            getInvite: function (a, b) {
                                e(c + "getInvite", {
                                        uuid: a
                                    },
                                    b)
                            }
                        },
                        postIds: function (a, c) {
                            f(b + "postIds", {
                                    ids: a
                                },
                                c)
                        },
                        delBox: function (a, c) {
                            f(b + "delete", {
                                    ids: a
                                },
                                c)
                        },
                        searchBox: function (a) {
                            f(b + "search", {},
                                a)
                        },
                        search: function (a, b, d, f) {
                            e(c + "search", {
                                    name: a,
                                    type: b,
                                    isBind: d
                                },
                                f)
                        },
                        count: function (a, b, d, f) {
                            e(c + "count", {
                                    name: a,
                                    type: b,
                                    isBind: d
                                },
                                f)
                        },
                        getHotTag: function (a) {
                            e(c + "getHotTag", {},
                                a)
                        },
                        getHotSearch: function (a) {
                            e(c + "getHotSearch", {},
                                a)
                        },
                        searchWeixinData: function (a, b, d, f, g, h) {
                            e(c + "searchWeixinData", {
                                    keyName: a,
                                    isNewRank: b,
                                    isTag: d,
                                    isBind: f,
                                    hasDeal: g
                                },
                                h)
                        },
                        searchWeixinDataByCondition: function (a, b, d, f, g) {
                            e(c + "searchWeixinDataByCondition", {
                                    keyName: a,
                                    order: b,
                                    filter: d,
                                    hasDeal: f
                                },
                                g)
                        },
                        searchTouTiaoDataByCondition: function (a, b) {
                            e(c + "searchTouTiaoDataByCondition", {
                                    keyName: a
                                },
                                b)
                        },
                        searchWeiBoDataCondition: function (a, b) {
                            e(c + "searchWeiBoDataCondition", {
                                    keyName: a
                                },
                                b)
                        },
                        searchMiniProgramCondition: function (a, b) {
                            e(c + "searchMiniProgramCondition", {
                                    keyName: a
                                },
                                b)
                        },
                        searchCmsCondition: function (a, b) {
                            e(c + "searchCmsCondition", {
                                    keyName: a
                                },
                                b)
                        },
                        isChongBang: function (a, b) {
                            e(d + "isChongbang", {
                                    account: a
                                },
                                b)
                        },
                        chongBangByWxid: function (a, b) {
                            e(d + "chongBangByWxid", {
                                    item: JSON.stringify(a)
                                },
                                b)
                        },
                        getWeixinInfoByAccount: function (a, b, d) {
                            e(c + "getWeixinInfoByAccount", {
                                    account: a,
                                    wxid: b
                                },
                                d)
                        },
                        updateTouTiaoStatus: function (a, b) {
                            e(c + "updateTouTiaoStatus", {
                                    media_id: a
                                },
                                b)
                        }
                    }
                }(),
                memory: {
                    rankNameMap: i
                },
                account: function () {
                    var a = d.urlBase,
                        c = a + "index/",
                        f = a + "user/profile/",
                        g = b.getCommonDataSync;
                    return {
                        getAutocompleteAccount: function (a, b) {
                            g(c + "getAutocompleteAccount", {
                                    keyword: a
                                },
                                !1, b)
                        },
                        searchRelevance: function (a) {
                            e(f + "weixin/search", {},
                                a)
                        }
                    }
                }(),
                wxChart: function () {
                    var a = d.urlBase;
                    return {
                        getIndexByWords: function (b, c, d) {
                            e(a + "wxindex/v1/getIndexByWords", {
                                    words: b
                                },
                                c, d)
                        }
                    }
                }()
            }
        }),
    define("static/plugins/moment/moment", [],
        function (a, b, c) {
            var d = {};
            return function (a, d) {
                "object" == typeof b && void 0 !== c ? c.exports = d() : "function" == typeof define && define.amd ? define(d) : a.moment = d()
            }(this,
                function () {
                    "use strict";
                    function b() {
                        return id.apply(null, arguments)
                    }

                    function e(a) {
                        id = a
                    }

                    function f(a) {
                        return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a)
                    }

                    function g(a) {
                        return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
                    }

                    function h(a, b) {
                        var c, d = [];
                        for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
                        return d
                    }

                    function i(a, b) {
                        return Object.prototype.hasOwnProperty.call(a, b)
                    }

                    function j(a, b) {
                        for (var c in b) i(b, c) && (a[c] = b[c]);
                        return i(b, "toString") && (a.toString = b.toString),
                        i(b, "valueOf") && (a.valueOf = b.valueOf),
                            a
                    }

                    function k(a, b, c, d) {
                        return Ma(a, b, c, d, !0).utc()
                    }

                    function l() {
                        return {
                            empty: !1,
                            unusedTokens: [],
                            unusedInput: [],
                            overflow: -2,
                            charsLeftOver: 0,
                            nullInput: !1,
                            invalidMonth: null,
                            invalidFormat: !1,
                            userInvalidated: !1,
                            iso: !1,
                            parsedDateParts: [],
                            meridiem: null
                        }
                    }

                    function m(a) {
                        return null == a._pf && (a._pf = l()),
                            a._pf
                    }

                    function n(a) {
                        if (null == a._isValid) {
                            var b = m(a),
                                c = jd.call(b.parsedDateParts,
                                    function (a) {
                                        return null != a
                                    });
                            a._isValid = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c),
                            a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour)
                        }
                        return a._isValid
                    }

                    function o(a) {
                        var b = k(NaN);
                        return null != a ? j(m(b), a) : m(b).userInvalidated = !0,
                            b
                    }

                    function p(a) {
                        return void 0 === a
                    }

                    function q(a, b) {
                        var c, d, e;
                        if (p(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), p(b._i) || (a._i = b._i), p(b._f) || (a._f = b._f), p(b._l) || (a._l = b._l), p(b._strict) || (a._strict = b._strict), p(b._tzm) || (a._tzm = b._tzm), p(b._isUTC) || (a._isUTC = b._isUTC), p(b._offset) || (a._offset = b._offset), p(b._pf) || (a._pf = m(b)), p(b._locale) || (a._locale = b._locale), kd.length > 0) for (c in kd) d = kd[c],
                            e = b[d],
                        p(e) || (a[d] = e);
                        return a
                    }

                    function r(a) {
                        q(this, a),
                            this._d = new Date(null != a._d ? a._d.getTime() : NaN),
                        ld === !1 && (ld = !0, b.updateOffset(this), ld = !1)
                    }

                    function s(a) {
                        return a instanceof r || null != a && null != a._isAMomentObject
                    }

                    function t(a) {
                        return a < 0 ? Math.ceil(a) : Math.floor(a)
                    }

                    function u(a) {
                        var b = +a,
                            c = 0;
                        return 0 !== b && isFinite(b) && (c = t(b)),
                            c
                    }

                    function v(a, b, c) {
                        var d, e = Math.min(a.length, b.length),
                            f = Math.abs(a.length - b.length),
                            g = 0;
                        for (d = 0; d < e; d++)(c && a[d] !== b[d] || !c && u(a[d]) !== u(b[d])) && g++;
                        return g + f
                    }

                    function w(a) {
                        b.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
                    }

                    function x(a, c) {
                        var d = !0;
                        return j(function () {
                                return null != b.deprecationHandler && b.deprecationHandler(null, a),
                                d && (w(a + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), d = !1),
                                    c.apply(this, arguments)
                            },
                            c)
                    }

                    function y(a, c) {
                        null != b.deprecationHandler && b.deprecationHandler(a, c),
                        md[a] || (w(c), md[a] = !0)
                    }

                    function z(a) {
                        return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a)
                    }

                    function A(a) {
                        return "[object Object]" === Object.prototype.toString.call(a)
                    }

                    function B(a) {
                        var b, c;
                        for (c in a) b = a[c],
                            z(b) ? this[c] = b : this["_" + c] = b;
                        this._config = a,
                            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
                    }

                    function C(a, b) {
                        var c, d = j({},
                            a);
                        for (c in b) i(b, c) && (A(a[c]) && A(b[c]) ? (d[c] = {},
                            j(d[c], a[c]), j(d[c], b[c])) : null != b[c] ? d[c] = b[c] : delete d[c]);
                        return d
                    }

                    function D(a) {
                        null != a && this.set(a)
                    }

                    function E(a) {
                        return a ? a.toLowerCase().replace("_", "-") : a
                    }

                    function F(a) {
                        for (var b, c, d, e, f = 0; f < a.length;) {
                            for (e = E(a[f]).split("-"), b = e.length, c = E(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                                if (d = G(e.slice(0, b).join("-"))) return d;
                                if (c && c.length >= b && v(e, c, !0) >= b - 1) break;
                                b--
                            }
                            f++
                        }
                        return null
                    }

                    function G(b) {
                        var d = null;
                        if (!qd[b] && void 0 !== c && c && c.exports) try {
                            d = od._abbr,
                                a("./locale/" + b),
                                H(d)
                        } catch (e) {
                        }
                        return qd[b]
                    }

                    function H(a, b) {
                        var c;
                        return a && (c = p(b) ? K(a) : I(a, b)) && (od = c),
                            od._abbr
                    }

                    function I(a, b) {
                        return null !== b ? (b.abbr = a, null != qd[a] ? (y("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"), b = C(qd[a]._config, b)) : null != b.parentLocale && (null != qd[b.parentLocale] ? b = C(qd[b.parentLocale]._config, b) : y("parentLocaleUndefined", "specified parentLocale is not defined yet")), qd[a] = new D(b), H(a), qd[a]) : (delete qd[a], null)
                    }

                    function J(a, b) {
                        if (null != b) {
                            var c;
                            null != qd[a] && (b = C(qd[a]._config, b)),
                                c = new D(b),
                                c.parentLocale = qd[a],
                                qd[a] = c,
                                H(a)
                        } else null != qd[a] && (null != qd[a].parentLocale ? qd[a] = qd[a].parentLocale : null != qd[a] && delete qd[a]);
                        return qd[a]
                    }

                    function K(a) {
                        var b;
                        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return od;
                        if (!f(a)) {
                            if (b = G(a)) return b;
                            a = [a]
                        }
                        return F(a)
                    }

                    function L() {
                        return nd(qd)
                    }

                    function M(a, b) {
                        var c = a.toLowerCase();
                        rd[c] = rd[c + "s"] = rd[b] = a
                    }

                    function N(a) {
                        return "string" == typeof a ? rd[a] || rd[a.toLowerCase()] : void 0
                    }

                    function O(a) {
                        var b, c, d = {};
                        for (c in a) i(a, c) && (b = N(c)) && (d[b] = a[c]);
                        return d
                    }

                    function P(a, c) {
                        return function (d) {
                            return null != d ? (R(this, a, d), b.updateOffset(this, c), this) : Q(this, a)
                        }
                    }

                    function Q(a, b) {
                        return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN
                    }

                    function R(a, b, c) {
                        a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
                    }

                    function S(a, b) {
                        var c;
                        if ("object" == typeof a) for (c in a) this.set(c, a[c]);
                        else if (a = N(a), z(this[a])) return this[a](b);
                        return this
                    }

                    function T(a, b, c) {
                        var d = "" + Math.abs(a),
                            e = b - d.length;
                        return (a >= 0 ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
                    }

                    function U(a, b, c, d) {
                        var e = d;
                        "string" == typeof d && (e = function () {
                            return this[d]()
                        }),
                        a && (vd[a] = e),
                        b && (vd[b[0]] = function () {
                            return T(e.apply(this, arguments), b[1], b[2])
                        }),
                        c && (vd[c] = function () {
                            return this.localeData().ordinal(e.apply(this, arguments), a)
                        })
                    }

                    function V(a) {
                        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
                    }

                    function W(a) {
                        var b, c, d = a.match(sd);
                        for (b = 0, c = d.length; b < c; b++) vd[d[b]] ? d[b] = vd[d[b]] : d[b] = V(d[b]);
                        return function (b) {
                            var e, f = "";
                            for (e = 0; e < c; e++) f += d[e] instanceof Function ? d[e].call(b, a) : d[e];
                            return f
                        }
                    }

                    function X(a, b) {
                        return a.isValid() ? (b = Y(b, a.localeData()), ud[b] = ud[b] || W(b), ud[b](a)) : a.localeData().invalidDate()
                    }

                    function Y(a, b) {
                        function c(a) {
                            return b.longDateFormat(a) || a
                        }

                        var d = 5;
                        for (td.lastIndex = 0; d >= 0 && td.test(a);) a = a.replace(td, c),
                            td.lastIndex = 0,
                            d -= 1;
                        return a
                    }

                    function Z(a, b, c) {
                        Nd[a] = z(b) ? b : function (a, d) {
                            return a && c ? c : b
                        }
                    }

                    function $(a, b) {
                        return i(Nd, a) ? Nd[a](b._strict, b._locale) : new RegExp(_(a))
                    }

                    function _(a) {
                        return aa(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                            function (a, b, c, d, e) {
                                return b || c || d || e
                            }))
                    }

                    function aa(a) {
                        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                    }

                    function ba(a, b) {
                        var c, d = b;
                        for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function (a, c) {
                            c[b] = u(a)
                        }), c = 0; c < a.length; c++) Od[a[c]] = d
                    }

                    function ca(a, b) {
                        ba(a,
                            function (a, c, d, e) {
                                d._w = d._w || {},
                                    b(a, d._w, d, e)
                            })
                    }

                    function da(a, b, c) {
                        null != b && i(Od, a) && Od[a](b, c._a, c, a)
                    }

                    function ea(a, b) {
                        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
                    }

                    function fa(a, b) {
                        return f(this._months) ? this._months[a.month()] : this._months[Yd.test(b) ? "format" : "standalone"][a.month()]
                    }

                    function ga(a, b) {
                        return f(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[Yd.test(b) ? "format" : "standalone"][a.month()]
                    }

                    function ha(a, b, c) {
                        var d, e, f, g = a.toLocaleLowerCase();
                        if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; d < 12; ++d) f = k([2e3, d]),
                            this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(),
                            this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
                        return c ? "MMM" === b ? (e = pd.call(this._shortMonthsParse, g), e !== -1 ? e : null) : (e = pd.call(this._longMonthsParse, g), e !== -1 ? e : null) : "MMM" === b ? (e = pd.call(this._shortMonthsParse, g)) !== -1 ? e : (e = pd.call(this._longMonthsParse, g), e !== -1 ? e : null) : (e = pd.call(this._longMonthsParse, g)) !== -1 ? e : (e = pd.call(this._shortMonthsParse, g), e !== -1 ? e : null)
                    }

                    function ia(a, b, c) {
                        var d, e, f;
                        if (this._monthsParseExact) return ha.call(this, a, b, c);
                        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; d < 12; d++) {
                            if (e = k([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
                            if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
                            if (!c && this._monthsParse[d].test(a)) return d
                        }
                    }

                    function ja(a, b) {
                        var c;
                        if (!a.isValid()) return a;
                        if ("string" == typeof b) if (/^\d+$/.test(b)) b = u(b);
                        else if ("number" != typeof(b = a.localeData().monthsParse(b))) return a;
                        return c = Math.min(a.date(), ea(a.year(), b)),
                            a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c),
                            a
                    }

                    function ka(a) {
                        return null != a ? (ja(this, a), b.updateOffset(this, !0), this) : Q(this, "Month")
                    }

                    function la() {
                        return ea(this.year(), this.month())
                    }

                    function ma(a) {
                        return this._monthsParseExact ? (i(this, "_monthsRegex") || oa.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex
                    }

                    function na(a) {
                        return this._monthsParseExact ? (i(this, "_monthsRegex") || oa.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex
                    }

                    function oa() {
                        function a(a, b) {
                            return b.length - a.length
                        }

                        var b, c, d = [],
                            e = [],
                            f = [];
                        for (b = 0; b < 12; b++) c = k([2e3, b]),
                            d.push(this.monthsShort(c, "")),
                            e.push(this.months(c, "")),
                            f.push(this.months(c, "")),
                            f.push(this.monthsShort(c, ""));
                        for (d.sort(a), e.sort(a), f.sort(a), b = 0; b < 12; b++) d[b] = aa(d[b]),
                            e[b] = aa(e[b]),
                            f[b] = aa(f[b]);
                        this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"),
                            this._monthsShortRegex = this._monthsRegex,
                            this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"),
                            this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i")
                    }

                    function pa(a) {
                        var b, c = a._a;
                        return c && m(a).overflow === -2 && (b = c[Qd] < 0 || c[Qd] > 11 ? Qd : c[Rd] < 1 || c[Rd] > ea(c[Pd], c[Qd]) ? Rd : c[Sd] < 0 || c[Sd] > 24 || 24 === c[Sd] && (0 !== c[Td] || 0 !== c[Ud] || 0 !== c[Vd]) ? Sd : c[Td] < 0 || c[Td] > 59 ? Td : c[Ud] < 0 || c[Ud] > 59 ? Ud : c[Vd] < 0 || c[Vd] > 999 ? Vd : -1, m(a)._overflowDayOfYear && (b < Pd || b > Rd) && (b = Rd), m(a)._overflowWeeks && b === -1 && (b = Wd), m(a)._overflowWeekday && b === -1 && (b = Xd), m(a).overflow = b),
                            a
                    }

                    function qa(a) {
                        var b, c, d, e, f, g, h = a._i,
                            i = be.exec(h) || ce.exec(h);
                        if (i) {
                            for (m(a).iso = !0, b = 0, c = ee.length; b < c; b++) if (ee[b][1].exec(i[1])) {
                                e = ee[b][0],
                                    d = ee[b][2] !== !1;
                                break
                            }
                            if (null == e) return void(a._isValid = !1);
                            if (i[3]) {
                                for (b = 0, c = fe.length; b < c; b++) if (fe[b][1].exec(i[3])) {
                                    f = (i[2] || " ") + fe[b][0];
                                    break
                                }
                                if (null == f) return void(a._isValid = !1)
                            }
                            if (!d && null != f) return void(a._isValid = !1);
                            if (i[4]) {
                                if (!de.exec(i[4])) return void(a._isValid = !1);
                                g = "Z"
                            }
                            a._f = e + (f || "") + (g || ""),
                                Fa(a)
                        } else a._isValid = !1
                    }

                    function ra(a) {
                        var c = ge.exec(a._i);
                        if (null !== c) return void(a._d = new Date(+c[1]));
                        qa(a),
                        a._isValid === !1 && (delete a._isValid, b.createFromInputFallback(a))
                    }

                    function sa(a, b, c, d, e, f, g) {
                        var h = new Date(a, b, c, d, e, f, g);
                        return a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a),
                            h
                    }

                    function ta(a) {
                        var b = new Date(Date.UTC.apply(null, arguments));
                        return a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a),
                            b
                    }

                    function ua(a) {
                        return va(a) ? 366 : 365
                    }

                    function va(a) {
                        return a % 4 == 0 && a % 100 != 0 || a % 400 == 0
                    }

                    function wa() {
                        return va(this.year())
                    }

                    function xa(a, b, c) {
                        var d = 7 + b - c;
                        return -((7 + ta(a, 0, d).getUTCDay() - b) % 7) + d - 1
                    }

                    function ya(a, b, c, d, e) {
                        var f, g, h = (7 + c - d) % 7,
                            i = xa(a, d, e),
                            j = 1 + 7 * (b - 1) + h + i;
                        return j <= 0 ? (f = a - 1, g = ua(f) + j) : j > ua(a) ? (f = a + 1, g = j - ua(a)) : (f = a, g = j),
                            {
                                year: f,
                                dayOfYear: g
                            }
                    }

                    function za(a, b, c) {
                        var d, e, f = xa(a.year(), b, c),
                            g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
                        return g < 1 ? (e = a.year() - 1, d = g + Aa(e, b, c)) : g > Aa(a.year(), b, c) ? (d = g - Aa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g),
                            {
                                week: d,
                                year: e
                            }
                    }

                    function Aa(a, b, c) {
                        var d = xa(a, b, c),
                            e = xa(a + 1, b, c);
                        return (ua(a) - d + e) / 7
                    }

                    function Ba(a, b, c) {
                        return null != a ? a : null != b ? b : c
                    }

                    function Ca(a) {
                        var c = new Date(b.now());
                        return a._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
                    }

                    function Da(a) {
                        var b, c, d, e, f = [];
                        if (!a._d) {
                            for (d = Ca(a), a._w && null == a._a[Rd] && null == a._a[Qd] && Ea(a), a._dayOfYear && (e = Ba(a._a[Pd], d[Pd]), a._dayOfYear > ua(e) && (m(a)._overflowDayOfYear = !0), c = ta(e, 0, a._dayOfYear), a._a[Qd] = c.getUTCMonth(), a._a[Rd] = c.getUTCDate()), b = 0; b < 3 && null == a._a[b]; ++b) a._a[b] = f[b] = d[b];
                            for (; b < 7; b++) a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
                            24 === a._a[Sd] && 0 === a._a[Td] && 0 === a._a[Ud] && 0 === a._a[Vd] && (a._nextDay = !0, a._a[Sd] = 0),
                                a._d = (a._useUTC ? ta : sa).apply(null, f),
                            null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
                            a._nextDay && (a._a[Sd] = 24)
                        }
                    }

                    function Ea(a) {
                        var b, c, d, e, f, g, h, i;
                        b = a._w,
                            null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = Ba(b.GG, a._a[Pd], za(Na(), 1, 4).year), d = Ba(b.W, 1), ((e = Ba(b.E, 1)) < 1 || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = Ba(b.gg, a._a[Pd], za(Na(), f, g).year), d = Ba(b.w, 1), null != b.d ? ((e = b.d) < 0 || e > 6) && (i = !0) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f),
                            d < 1 || d > Aa(c, f, g) ? m(a)._overflowWeeks = !0 : null != i ? m(a)._overflowWeekday = !0 : (h = ya(c, d, e, f, g), a._a[Pd] = h.year, a._dayOfYear = h.dayOfYear)
                    }

                    function Fa(a) {
                        if (a._f === b.ISO_8601) return void qa(a);
                        a._a = [],
                            m(a).empty = !0;
                        var c, d, e, f, g, h = "" + a._i,
                            i = h.length,
                            j = 0;
                        for (e = Y(a._f, a._locale).match(sd) || [], c = 0; c < e.length; c++) f = e[c],
                            d = (h.match($(f, a)) || [])[0],
                        d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && m(a).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length),
                            vd[f] ? (d ? m(a).empty = !1 : m(a).unusedTokens.push(f), da(f, d, a)) : a._strict && !d && m(a).unusedTokens.push(f);
                        m(a).charsLeftOver = i - j,
                        h.length > 0 && m(a).unusedInput.push(h),
                        m(a).bigHour === !0 && a._a[Sd] <= 12 && a._a[Sd] > 0 && (m(a).bigHour = void 0),
                            m(a).parsedDateParts = a._a.slice(0),
                            m(a).meridiem = a._meridiem,
                            a._a[Sd] = Ga(a._locale, a._a[Sd], a._meridiem),
                            Da(a),
                            pa(a)
                    }

                    function Ga(a, b, c) {
                        var d;
                        return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && b < 12 && (b += 12), d || 12 !== b || (b = 0), b) : b
                    }

                    function Ha(a) {
                        var b, c, d, e, f;
                        if (0 === a._f.length) return m(a).invalidFormat = !0,
                            void(a._d = new Date(NaN));
                        for (e = 0; e < a._f.length; e++) f = 0,
                            b = q({},
                                a),
                        null != a._useUTC && (b._useUTC = a._useUTC),
                            b._f = a._f[e],
                            Fa(b),
                        n(b) && (f += m(b).charsLeftOver, f += 10 * m(b).unusedTokens.length, m(b).score = f, (null == d || f < d) && (d = f, c = b));
                        j(a, c || b)
                    }

                    function Ia(a) {
                        if (!a._d) {
                            var b = O(a._i);
                            a._a = h([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond],
                                function (a) {
                                    return a && parseInt(a, 10)
                                }),
                                Da(a)
                        }
                    }

                    function Ja(a) {
                        var b = new r(pa(Ka(a)));
                        return b._nextDay && (b.add(1, "d"), b._nextDay = void 0),
                            b
                    }

                    function Ka(a) {
                        var b = a._i,
                            c = a._f;
                        return a._locale = a._locale || K(a._l),
                            null === b || void 0 === c && "" === b ? o({
                                nullInput: !0
                            }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), s(b) ? new r(pa(b)) : (f(c) ? Ha(a) : c ? Fa(a) : g(b) ? a._d = b : La(a), n(a) || (a._d = null), a))
                    }

                    function La(a) {
                        var c = a._i;
                        void 0 === c ? a._d = new Date(b.now()) : g(c) ? a._d = new Date(c.valueOf()) : "string" == typeof c ? ra(a) : f(c) ? (a._a = h(c.slice(0),
                            function (a) {
                                return parseInt(a, 10)
                            }), Da(a)) : "object" == typeof c ? Ia(a) : "number" == typeof c ? a._d = new Date(c) : b.createFromInputFallback(a)
                    }

                    function Ma(a, b, c, d, e) {
                        var f = {};
                        return "boolean" == typeof c && (d = c, c = void 0),
                            f._isAMomentObject = !0,
                            f._useUTC = f._isUTC = e,
                            f._l = c,
                            f._i = a,
                            f._f = b,
                            f._strict = d,
                            Ja(f)
                    }

                    function Na(a, b, c, d) {
                        return Ma(a, b, c, d, !1)
                    }

                    function Oa(a, b) {
                        var c, d;
                        if (1 === b.length && f(b[0]) && (b = b[0]), !b.length) return Na();
                        for (c = b[0], d = 1; d < b.length; ++d) b[d].isValid() && !b[d][a](c) || (c = b[d]);
                        return c
                    }

                    function Pa() {
                        return Oa("isBefore", [].slice.call(arguments, 0))
                    }

                    function Qa() {
                        return Oa("isAfter", [].slice.call(arguments, 0))
                    }

                    function Ra(a) {
                        var b = O(a),
                            c = b.year || 0,
                            d = b.quarter || 0,
                            e = b.month || 0,
                            f = b.week || 0,
                            g = b.day || 0,
                            h = b.hour || 0,
                            i = b.minute || 0,
                            j = b.second || 0,
                            k = b.millisecond || 0;
                        this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60,
                            this._days = +g + 7 * f,
                            this._months = +e + 3 * d + 12 * c,
                            this._data = {},
                            this._locale = K(),
                            this._bubble()
                    }

                    function Sa(a) {
                        return a instanceof Ra
                    }

                    function Ta(a, b) {
                        U(a, 0, 0,
                            function () {
                                var a = this.utcOffset(),
                                    c = "+";
                                return a < 0 && (a = -a, c = "-"),
                                c + T(~~(a / 60), 2) + b + T(~~a % 60, 2)
                            })
                    }

                    function Ua(a, b) {
                        var c = (b || "").match(a) || [],
                            d = c[c.length - 1] || [],
                            e = (d + "").match(le) || ["-", 0, 0],
                            f = +(60 * e[1]) + u(e[2]);
                        return "+" === e[0] ? f : -f
                    }

                    function Va(a, c) {
                        var d, e;
                        return c._isUTC ? (d = c.clone(), e = (s(a) || g(a) ? a.valueOf() : Na(a).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), b.updateOffset(d, !1), d) : Na(a).local()
                    }

                    function Wa(a) {
                        return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
                    }

                    function Xa(a, c) {
                        var d, e = this._offset || 0;
                        return this.isValid() ? null != a ? ("string" == typeof a ? a = Ua(Kd, a) : Math.abs(a) < 16 && (a *= 60), !this._isUTC && c && (d = Wa(this)), this._offset = a, this._isUTC = !0, null != d && this.add(d, "m"), e !== a && (!c || this._changeInProgress ? mb(this, gb(a - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, b.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Wa(this) : null != a ? this : NaN
                    }

                    function Ya(a, b) {
                        return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
                    }

                    function Za(a) {
                        return this.utcOffset(0, a)
                    }

                    function $a(a) {
                        return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Wa(this), "m")),
                            this
                    }

                    function _a() {
                        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ua(Jd, this._i)),
                            this
                    }

                    function ab(a) {
                        return !!this.isValid() && (a = a ? Na(a).utcOffset() : 0, (this.utcOffset() - a) % 60 == 0)
                    }

                    function bb() {
                        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                    }

                    function cb() {
                        if (!p(this._isDSTShifted)) return this._isDSTShifted;
                        var a = {};
                        if (q(a, this), a = Ka(a), a._a) {
                            var b = a._isUTC ? k(a._a) : Na(a._a);
                            this._isDSTShifted = this.isValid() && v(a._a, b.toArray()) > 0
                        } else this._isDSTShifted = !1;
                        return this._isDSTShifted
                    }

                    function db() {
                        return !!this.isValid() && !this._isUTC
                    }

                    function eb() {
                        return !!this.isValid() && this._isUTC
                    }

                    function fb() {
                        return !!this.isValid() && (this._isUTC && 0 === this._offset)
                    }

                    function gb(a, b) {
                        var c, d, e, f = a,
                            g = null;
                        return Sa(a) ? f = {
                            ms: a._milliseconds,
                            d: a._days,
                            M: a._months
                        } : "number" == typeof a ? (f = {},
                            b ? f[b] = a : f.milliseconds = a) : (g = me.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
                            y: 0,
                            d: u(g[Rd]) * c,
                            h: u(g[Sd]) * c,
                            m: u(g[Td]) * c,
                            s: u(g[Ud]) * c,
                            ms: u(g[Vd]) * c
                        }) : (g = ne.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
                            y: hb(g[2], c),
                            M: hb(g[3], c),
                            w: hb(g[4], c),
                            d: hb(g[5], c),
                            h: hb(g[6], c),
                            m: hb(g[7], c),
                            s: hb(g[8], c)
                        }) : null == f ? f = {} : "object" == typeof f && ("from" in f || "to" in f) && (e = jb(Na(f.from), Na(f.to)), f = {},
                            f.ms = e.milliseconds, f.M = e.months),
                            d = new Ra(f),
                        Sa(a) && i(a, "_locale") && (d._locale = a._locale),
                            d
                    }

                    function hb(a, b) {
                        var c = a && parseFloat(a.replace(",", "."));
                        return (isNaN(c) ? 0 : c) * b
                    }

                    function ib(a, b) {
                        var c = {
                            milliseconds: 0,
                            months: 0
                        };
                        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()),
                        a.clone().add(c.months, "M").isAfter(b) && --c.months,
                            c.milliseconds = +b - +a.clone().add(c.months, "M"),
                            c
                    }

                    function jb(a, b) {
                        var c;
                        return a.isValid() && b.isValid() ? (b = Va(b, a), a.isBefore(b) ? c = ib(a, b) : (c = ib(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
                            milliseconds: 0,
                            months: 0
                        }
                    }

                    function kb(a) {
                        return a < 0 ? Math.round(-1 * a) * -1 : Math.round(a)
                    }

                    function lb(a, b) {
                        return function (c, d) {
                            var e, f;
                            return null === d || isNaN(+d) || (y(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f),
                                c = "string" == typeof c ? +c : c,
                                e = gb(c, d),
                                mb(this, e, a),
                                this
                        }
                    }

                    function mb(a, c, d, e) {
                        var f = c._milliseconds,
                            g = kb(c._days),
                            h = kb(c._months);
                        a.isValid() && (e = null == e || e, f && a._d.setTime(a._d.valueOf() + f * d), g && R(a, "Date", Q(a, "Date") + g * d), h && ja(a, Q(a, "Month") + h * d), e && b.updateOffset(a, g || h))
                    }

                    function nb(a, b) {
                        var c = a || Na(),
                            d = Va(c, this).startOf("day"),
                            e = this.diff(d, "days", !0),
                            f = e < -6 ? "sameElse" : e < -1 ? "lastWeek" : e < 0 ? "lastDay" : e < 1 ? "sameDay" : e < 2 ? "nextDay" : e < 7 ? "nextWeek" : "sameElse",
                            g = b && (z(b[f]) ? b[f]() : b[f]);
                        return this.format(g || this.localeData().calendar(f, this, Na(c)))
                    }

                    function ob() {
                        return new r(this)
                    }

                    function pb(a, b) {
                        var c = s(a) ? a : Na(a);
                        return !(!this.isValid() || !c.isValid()) && (b = N(p(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf())
                    }

                    function qb(a, b) {
                        var c = s(a) ? a : Na(a);
                        return !(!this.isValid() || !c.isValid()) && (b = N(p(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf())
                    }

                    function rb(a, b, c, d) {
                        return d = d || "()",
                        ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c))
                    }

                    function sb(a, b) {
                        var c, d = s(a) ? a : Na(a);
                        return !(!this.isValid() || !d.isValid()) && (b = N(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf()))
                    }

                    function tb(a, b) {
                        return this.isSame(a, b) || this.isAfter(a, b)
                    }

                    function ub(a, b) {
                        return this.isSame(a, b) || this.isBefore(a, b)
                    }

                    function vb(a, b, c) {
                        var d, e, f, g;
                        return this.isValid() ? (d = Va(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = N(b), "year" === b || "month" === b || "quarter" === b ? (g = wb(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : t(g)) : NaN) : NaN
                    }

                    function wb(a, b) {
                        var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
                            f = a.clone().add(e, "months");
                        return b - f < 0 ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)),
                        -(e + d) || 0
                    }

                    function xb() {
                        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                    }

                    function yb() {
                        var a = this.clone().utc();
                        return 0 < a.year() && a.year() <= 9999 ? z(Date.prototype.toISOString) ? this.toDate().toISOString() : X(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : X(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                    }

                    function zb(a) {
                        a || (a = this.isUtc() ? b.defaultFormatUtc : b.defaultFormat);
                        var c = X(this, a);
                        return this.localeData().postformat(c)
                    }

                    function Ab(a, b) {
                        return this.isValid() && (s(a) && a.isValid() || Na(a).isValid()) ? gb({
                            to: this,
                            from: a
                        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
                    }

                    function Bb(a) {
                        return this.from(Na(), a)
                    }

                    function Cb(a, b) {
                        return this.isValid() && (s(a) && a.isValid() || Na(a).isValid()) ? gb({
                            from: this,
                            to: a
                        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
                    }

                    function Db(a) {
                        return this.to(Na(), a)
                    }

                    function Eb(a) {
                        var b;
                        return void 0 === a ? this._locale._abbr : (b = K(a), null != b && (this._locale = b), this)
                    }

                    function Fb() {
                        return this._locale
                    }

                    function Gb(a) {
                        switch (a = N(a)) {
                            case "year":
                                this.month(0);
                            case "quarter":
                            case "month":
                                this.date(1);
                            case "week":
                            case "isoWeek":
                            case "day":
                            case "date":
                                this.hours(0);
                            case "hour":
                                this.minutes(0);
                            case "minute":
                                this.seconds(0);
                            case "second":
                                this.milliseconds(0)
                        }
                        return "week" === a && this.weekday(0),
                        "isoWeek" === a && this.isoWeekday(1),
                        "quarter" === a && this.month(3 * Math.floor(this.month() / 3)),
                            this
                    }

                    function Hb(a) {
                        return void 0 === (a = N(a)) || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"))
                    }

                    function Ib() {
                        return this._d.valueOf() - 6e4 * (this._offset || 0)
                    }

                    function Jb() {
                        return Math.floor(this.valueOf() / 1e3)
                    }

                    function Kb() {
                        return this._offset ? new Date(this.valueOf()) : this._d
                    }

                    function Lb() {
                        var a = this;
                        return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
                    }

                    function Mb() {
                        var a = this;
                        return {
                            years: a.year(),
                            months: a.month(),
                            date: a.date(),
                            hours: a.hours(),
                            minutes: a.minutes(),
                            seconds: a.seconds(),
                            milliseconds: a.milliseconds()
                        }
                    }

                    function Nb() {
                        return this.isValid() ? this.toISOString() : null
                    }

                    function Ob() {
                        return n(this)
                    }

                    function Pb() {
                        return j({},
                            m(this))
                    }

                    function Qb() {
                        return m(this).overflow
                    }

                    function Rb() {
                        return {
                            input: this._i,
                            format: this._f,
                            locale: this._locale,
                            isUTC: this._isUTC,
                            strict: this._strict
                        }
                    }

                    function Sb(a, b) {
                        U(0, [a, a.length], 0, b)
                    }

                    function Tb(a) {
                        return Xb.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
                    }

                    function Ub(a) {
                        return Xb.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4)
                    }

                    function Vb() {
                        return Aa(this.year(), 1, 4)
                    }

                    function Wb() {
                        var a = this.localeData()._week;
                        return Aa(this.year(), a.dow, a.doy)
                    }

                    function Xb(a, b, c, d, e) {
                        var f;
                        return null == a ? za(this, d, e).year : (f = Aa(a, d, e), b > f && (b = f), Yb.call(this, a, b, c, d, e))
                    }

                    function Yb(a, b, c, d, e) {
                        var f = ya(a, b, c, d, e),
                            g = ta(f.year, 0, f.dayOfYear);
                        return this.year(g.getUTCFullYear()),
                            this.month(g.getUTCMonth()),
                            this.date(g.getUTCDate()),
                            this
                    }

                    function Zb(a) {
                        return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
                    }

                    function $b(a) {
                        return za(a, this._week.dow, this._week.doy).week
                    }

                    function _b() {
                        return this._week.dow
                    }

                    function ac() {
                        return this._week.doy
                    }

                    function bc(a) {
                        var b = this.localeData().week(this);
                        return null == a ? b : this.add(7 * (a - b), "d")
                    }

                    function cc(a) {
                        var b = za(this, 1, 4).week;
                        return null == a ? b : this.add(7 * (a - b), "d")
                    }

                    function dc(a, b) {
                        return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10)
                    }

                    function ec(a, b) {
                        return f(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()]
                    }

                    function fc(a) {
                        return this._weekdaysShort[a.day()]
                    }

                    function gc(a) {
                        return this._weekdaysMin[a.day()]
                    }

                    function hc(a, b, c) {
                        var d, e, f, g = a.toLocaleLowerCase();
                        if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; d < 7; ++d) f = k([2e3, 1]).day(d),
                            this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(),
                            this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(),
                            this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
                        return c ? "dddd" === b ? (e = pd.call(this._weekdaysParse, g), e !== -1 ? e : null) : "ddd" === b ? (e = pd.call(this._shortWeekdaysParse, g), e !== -1 ? e : null) : (e = pd.call(this._minWeekdaysParse, g), e !== -1 ? e : null) : "dddd" === b ? (e = pd.call(this._weekdaysParse, g)) !== -1 ? e : (e = pd.call(this._shortWeekdaysParse, g)) !== -1 ? e : (e = pd.call(this._minWeekdaysParse, g), e !== -1 ? e : null) : "ddd" === b ? (e = pd.call(this._shortWeekdaysParse, g)) !== -1 ? e : (e = pd.call(this._weekdaysParse, g)) !== -1 ? e : (e = pd.call(this._minWeekdaysParse, g), e !== -1 ? e : null) : (e = pd.call(this._minWeekdaysParse, g)) !== -1 ? e : (e = pd.call(this._weekdaysParse, g)) !== -1 ? e : (e = pd.call(this._shortWeekdaysParse, g), e !== -1 ? e : null)
                    }

                    function ic(a, b, c) {
                        var d, e, f;
                        if (this._weekdaysParseExact) return hc.call(this, a, b, c);
                        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; d < 7; d++) {
                            if (e = k([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
                            if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
                            if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
                            if (!c && this._weekdaysParse[d].test(a)) return d
                        }
                    }

                    function jc(a) {
                        if (!this.isValid()) return null != a ? this : NaN;
                        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                        return null != a ? (a = dc(a, this.localeData()), this.add(a - b, "d")) : b
                    }

                    function kc(a) {
                        if (!this.isValid()) return null != a ? this : NaN;
                        var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
                        return null == a ? b : this.add(a - b, "d")
                    }

                    function lc(a) {
                        return this.isValid() ? null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7) : null != a ? this : NaN
                    }

                    function mc(a) {
                        return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || pc.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex
                    }

                    function nc(a) {
                        return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || pc.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex
                    }

                    function oc(a) {
                        return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || pc.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex
                    }

                    function pc() {
                        function a(a, b) {
                            return b.length - a.length
                        }

                        var b, c, d, e, f, g = [],
                            h = [],
                            i = [],
                            j = [];
                        for (b = 0; b < 7; b++) c = k([2e3, 1]).day(b),
                            d = this.weekdaysMin(c, ""),
                            e = this.weekdaysShort(c, ""),
                            f = this.weekdays(c, ""),
                            g.push(d),
                            h.push(e),
                            i.push(f),
                            j.push(d),
                            j.push(e),
                            j.push(f);
                        for (g.sort(a), h.sort(a), i.sort(a), j.sort(a), b = 0; b < 7; b++) h[b] = aa(h[b]),
                            i[b] = aa(i[b]),
                            j[b] = aa(j[b]);
                        this._weekdaysRegex = new RegExp("^(" + j.join("|") + ")", "i"),
                            this._weekdaysShortRegex = this._weekdaysRegex,
                            this._weekdaysMinRegex = this._weekdaysRegex,
                            this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"),
                            this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"),
                            this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i")
                    }

                    function qc(a) {
                        var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                        return null == a ? b : this.add(a - b, "d")
                    }

                    function rc() {
                        return this.hours() % 12 || 12
                    }

                    function sc() {
                        return this.hours() || 24
                    }

                    function tc(a, b) {
                        U(a, 0, 0,
                            function () {
                                return this.localeData().meridiem(this.hours(), this.minutes(), b)
                            })
                    }

                    function uc(a, b) {
                        return b._meridiemParse
                    }

                    function vc(a) {
                        return "p" === (a + "").toLowerCase().charAt(0)
                    }

                    function wc(a, b, c) {
                        return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
                    }

                    function xc(a, b) {
                        b[Vd] = u(1e3 * ("0." + a))
                    }

                    function yc() {
                        return this._isUTC ? "UTC" : ""
                    }

                    function zc() {
                        return this._isUTC ? "Coordinated Universal Time" : ""
                    }

                    function Ac(a) {
                        return Na(1e3 * a)
                    }

                    function Bc() {
                        return Na.apply(null, arguments).parseZone()
                    }

                    function Cc(a, b, c) {
                        var d = this._calendar[a];
                        return z(d) ? d.call(b, c) : d
                    }

                    function Dc(a) {
                        var b = this._longDateFormat[a],
                            c = this._longDateFormat[a.toUpperCase()];
                        return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g,
                            function (a) {
                                return a.slice(1)
                            }), this._longDateFormat[a])
                    }

                    function Ec() {
                        return this._invalidDate
                    }

                    function Fc(a) {
                        return this._ordinal.replace("%d", a)
                    }

                    function Gc(a) {
                        return a
                    }

                    function Hc(a, b, c, d) {
                        var e = this._relativeTime[c];
                        return z(e) ? e(a, b, c, d) : e.replace(/%d/i, a)
                    }

                    function Ic(a, b) {
                        var c = this._relativeTime[a > 0 ? "future" : "past"];
                        return z(c) ? c(b) : c.replace(/%s/i, b)
                    }

                    function Jc(a, b, c, d) {
                        var e = K(),
                            f = k().set(d, b);
                        return e[c](f, a)
                    }

                    function Kc(a, b, c) {
                        if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return Jc(a, b, c, "month");
                        var d, e = [];
                        for (d = 0; d < 12; d++) e[d] = Jc(a, d, c, "month");
                        return e
                    }

                    function Lc(a, b, c, d) {
                        "boolean" == typeof a ? ("number" == typeof b && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, "number" == typeof b && (c = b, b = void 0), b = b || "");
                        var e = K(),
                            f = a ? e._week.dow : 0;
                        if (null != c) return Jc(b, (c + f) % 7, d, "day");
                        var g, h = [];
                        for (g = 0; g < 7; g++) h[g] = Jc(b, (g + f) % 7, d, "day");
                        return h
                    }

                    function Mc(a, b) {
                        return Kc(a, b, "months")
                    }

                    function Nc(a, b) {
                        return Kc(a, b, "monthsShort")
                    }

                    function Oc(a, b, c) {
                        return Lc(a, b, c, "weekdays")
                    }

                    function Pc(a, b, c) {
                        return Lc(a, b, c, "weekdaysShort")
                    }

                    function Qc(a, b, c) {
                        return Lc(a, b, c, "weekdaysMin")
                    }

                    function Rc() {
                        var a = this._data;
                        return this._milliseconds = Me(this._milliseconds),
                            this._days = Me(this._days),
                            this._months = Me(this._months),
                            a.milliseconds = Me(a.milliseconds),
                            a.seconds = Me(a.seconds),
                            a.minutes = Me(a.minutes),
                            a.hours = Me(a.hours),
                            a.months = Me(a.months),
                            a.years = Me(a.years),
                            this
                    }

                    function Sc(a, b, c, d) {
                        var e = gb(b, c);
                        return a._milliseconds += d * e._milliseconds,
                            a._days += d * e._days,
                            a._months += d * e._months,
                            a._bubble()
                    }

                    function Tc(a, b) {
                        return Sc(this, a, b, 1)
                    }

                    function Uc(a, b) {
                        return Sc(this, a, b, -1)
                    }

                    function Vc(a) {
                        return a < 0 ? Math.floor(a) : Math.ceil(a)
                    }

                    function Wc() {
                        var a, b, c, d, e, f = this._milliseconds,
                            g = this._days,
                            h = this._months,
                            i = this._data;
                        return f >= 0 && g >= 0 && h >= 0 || f <= 0 && g <= 0 && h <= 0 || (f += 864e5 * Vc(Yc(h) + g), g = 0, h = 0),
                            i.milliseconds = f % 1e3,
                            a = t(f / 1e3),
                            i.seconds = a % 60,
                            b = t(a / 60),
                            i.minutes = b % 60,
                            c = t(b / 60),
                            i.hours = c % 24,
                            g += t(c / 24),
                            e = t(Xc(g)),
                            h += e,
                            g -= Vc(Yc(e)),
                            d = t(h / 12),
                            h %= 12,
                            i.days = g,
                            i.months = h,
                            i.years = d,
                            this
                    }

                    function Xc(a) {
                        return 4800 * a / 146097
                    }

                    function Yc(a) {
                        return 146097 * a / 4800
                    }

                    function Zc(a) {
                        var b, c, d = this._milliseconds;
                        if ("month" === (a = N(a)) || "year" === a) return b = this._days + d / 864e5,
                            c = this._months + Xc(b),
                            "month" === a ? c : c / 12;
                        switch (b = this._days + Math.round(Yc(this._months)), a) {
                            case "week":
                                return b / 7 + d / 6048e5;
                            case "day":
                                return b + d / 864e5;
                            case "hour":
                                return 24 * b + d / 36e5;
                            case "minute":
                                return 1440 * b + d / 6e4;
                            case "second":
                                return 86400 * b + d / 1e3;
                            case "millisecond":
                                return Math.floor(864e5 * b) + d;
                            default:
                                throw new Error("Unknown unit " + a)
                        }
                    }

                    function $c() {
                        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * u(this._months / 12)
                    }

                    function _c(a) {
                        return function () {
                            return this.as(a)
                        }
                    }

                    function ad(a) {
                        return a = N(a),
                            this[a + "s"]()
                    }

                    function bd(a) {
                        return function () {
                            return this._data[a]
                        }
                    }

                    function cd() {
                        return t(this.days() / 7)
                    }

                    function dd(a, b, c, d, e) {
                        return e.relativeTime(b || 1, !!c, a, d)
                    }

                    function ed(a, b, c) {
                        var d = gb(a).abs(),
                            e = af(d.as("s")),
                            f = af(d.as("m")),
                            g = af(d.as("h")),
                            h = af(d.as("d")),
                            i = af(d.as("M")),
                            j = af(d.as("y")),
                            k = e < bf.s && ["s", e] || f <= 1 && ["m"] || f < bf.m && ["mm", f] || g <= 1 && ["h"] || g < bf.h && ["hh", g] || h <= 1 && ["d"] || h < bf.d && ["dd", h] || i <= 1 && ["M"] || i < bf.M && ["MM", i] || j <= 1 && ["y"] || ["yy", j];
                        return k[2] = b,
                            k[3] = +a > 0,
                            k[4] = c,
                            dd.apply(null, k)
                    }

                    function fd(a, b) {
                        return void 0 !== bf[a] && (void 0 === b ? bf[a] : (bf[a] = b, !0))
                    }

                    function gd(a) {
                        var b = this.localeData(),
                            c = ed(this, !a, b);
                        return a && (c = b.pastFuture(+this, c)),
                            b.postformat(c)
                    }

                    function hd() {
                        var a, b, c, d = cf(this._milliseconds) / 1e3,
                            e = cf(this._days),
                            f = cf(this._months);
                        a = t(d / 60),
                            b = t(a / 60),
                            d %= 60,
                            a %= 60,
                            c = t(f / 12),
                            f %= 12;
                        var g = c,
                            h = f,
                            i = e,
                            j = b,
                            k = a,
                            l = d,
                            m = this.asSeconds();
                        return m ? (m < 0 ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"
                    }

                    var id, jd;
                    jd = Array.prototype.some ? Array.prototype.some : function (a) {
                        for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++) if (d in b && a.call(this, b[d], d, b)) return !0;
                        return !1
                    };
                    var kd = b.momentProperties = [],
                        ld = !1,
                        md = {};
                    b.suppressDeprecationWarnings = !1,
                        b.deprecationHandler = null;
                    var nd;
                    nd = Object.keys ? Object.keys : function (a) {
                        var b, c = [];
                        for (b in a) i(a, b) && c.push(b);
                        return c
                    };
                    var od, pd, qd = {},
                        rd = {},
                        sd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                        td = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                        ud = {},
                        vd = {},
                        wd = /\d/,
                        xd = /\d\d/,
                        yd = /\d{3}/,
                        zd = /\d{4}/,
                        Ad = /[+-]?\d{6}/,
                        Bd = /\d\d?/,
                        Cd = /\d\d\d\d?/,
                        Dd = /\d\d\d\d\d\d?/,
                        Ed = /\d{1,3}/,
                        Fd = /\d{1,4}/,
                        Gd = /[+-]?\d{1,6}/,
                        Hd = /\d+/,
                        Id = /[+-]?\d+/,
                        Jd = /Z|[+-]\d\d:?\d\d/gi,
                        Kd = /Z|[+-]\d\d(?::?\d\d)?/gi,
                        Ld = /[+-]?\d+(\.\d{1,3})?/,
                        Md = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
                        Nd = {},
                        Od = {},
                        Pd = 0,
                        Qd = 1,
                        Rd = 2,
                        Sd = 3,
                        Td = 4,
                        Ud = 5,
                        Vd = 6,
                        Wd = 7,
                        Xd = 8;
                    pd = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
                        var b;
                        for (b = 0; b < this.length; ++b) if (this[b] === a) return b;
                        return -1
                    },
                        U("M", ["MM", 2], "Mo",
                            function () {
                                return this.month() + 1
                            }),
                        U("MMM", 0, 0,
                            function (a) {
                                return this.localeData().monthsShort(this, a)
                            }),
                        U("MMMM", 0, 0,
                            function (a) {
                                return this.localeData().months(this, a)
                            }),
                        M("month", "M"),
                        Z("M", Bd),
                        Z("MM", Bd, xd),
                        Z("MMM",
                            function (a, b) {
                                return b.monthsShortRegex(a)
                            }),
                        Z("MMMM",
                            function (a, b) {
                                return b.monthsRegex(a)
                            }),
                        ba(["M", "MM"],
                            function (a, b) {
                                b[Qd] = u(a) - 1
                            }),
                        ba(["MMM", "MMMM"],
                            function (a, b, c, d) {
                                var e = c._locale.monthsParse(a, d, c._strict);
                                null != e ? b[Qd] = e : m(c).invalidMonth = a
                            });
                    var Yd = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
                        Zd = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                        $d = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
                        _d = Md,
                        ae = Md,
                        be = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                        ce = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                        de = /Z|[+-]\d\d(?::?\d\d)?/,
                        ee = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
                        fe = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
                        ge = /^\/?Date\((\-?\d+)/i;
                    b.createFromInputFallback = x("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",
                        function (a) {
                            a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
                        }),
                        U("Y", 0, 0,
                            function () {
                                var a = this.year();
                                return a <= 9999 ? "" + a : "+" + a
                            }),
                        U(0, ["YY", 2], 0,
                            function () {
                                return this.year() % 100
                            }),
                        U(0, ["YYYY", 4], 0, "year"),
                        U(0, ["YYYYY", 5], 0, "year"),
                        U(0, ["YYYYYY", 6, !0], 0, "year"),
                        M("year", "y"),
                        Z("Y", Id),
                        Z("YY", Bd, xd),
                        Z("YYYY", Fd, zd),
                        Z("YYYYY", Gd, Ad),
                        Z("YYYYYY", Gd, Ad),
                        ba(["YYYYY", "YYYYYY"], Pd),
                        ba("YYYY",
                            function (a, c) {
                                c[Pd] = 2 === a.length ? b.parseTwoDigitYear(a) : u(a)
                            }),
                        ba("YY",
                            function (a, c) {
                                c[Pd] = b.parseTwoDigitYear(a)
                            }),
                        ba("Y",
                            function (a, b) {
                                b[Pd] = parseInt(a, 10)
                            }),
                        b.parseTwoDigitYear = function (a) {
                            return u(a) + (u(a) > 68 ? 1900 : 2e3)
                        };
                    var he = P("FullYear", !0);
                    b.ISO_8601 = function () {
                    };
                    var ie = x("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",
                        function () {
                            var a = Na.apply(null, arguments);
                            return this.isValid() && a.isValid() ? a < this ? this : a : o()
                        }),
                        je = x("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",
                            function () {
                                var a = Na.apply(null, arguments);
                                return this.isValid() && a.isValid() ? a > this ? this : a : o()
                            }),
                        ke = function () {
                            return Date.now ? Date.now() : +new Date
                        };
                    Ta("Z", ":"),
                        Ta("ZZ", ""),
                        Z("Z", Kd),
                        Z("ZZ", Kd),
                        ba(["Z", "ZZ"],
                            function (a, b, c) {
                                c._useUTC = !0,
                                    c._tzm = Ua(Kd, a)
                            });
                    var le = /([\+\-]|\d\d)/gi;
                    b.updateOffset = function () {
                    };
                    var me = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
                        ne = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
                    gb.fn = Ra.prototype;
                    var oe = lb(1, "add"),
                        pe = lb(-1, "subtract");
                    b.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
                        b.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
                    var qe = x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
                        function (a) {
                            return void 0 === a ? this.localeData() : this.locale(a)
                        });
                    U(0, ["gg", 2], 0,
                        function () {
                            return this.weekYear() % 100
                        }),
                        U(0, ["GG", 2], 0,
                            function () {
                                return this.isoWeekYear() % 100
                            }),
                        Sb("gggg", "weekYear"),
                        Sb("ggggg", "weekYear"),
                        Sb("GGGG", "isoWeekYear"),
                        Sb("GGGGG", "isoWeekYear"),
                        M("weekYear", "gg"),
                        M("isoWeekYear", "GG"),
                        Z("G", Id),
                        Z("g", Id),
                        Z("GG", Bd, xd),
                        Z("gg", Bd, xd),
                        Z("GGGG", Fd, zd),
                        Z("gggg", Fd, zd),
                        Z("GGGGG", Gd, Ad),
                        Z("ggggg", Gd, Ad),
                        ca(["gggg", "ggggg", "GGGG", "GGGGG"],
                            function (a, b, c, d) {
                                b[d.substr(0, 2)] = u(a)
                            }),
                        ca(["gg", "GG"],
                            function (a, c, d, e) {
                                c[e] = b.parseTwoDigitYear(a)
                            }),
                        U("Q", 0, "Qo", "quarter"),
                        M("quarter", "Q"),
                        Z("Q", wd),
                        ba("Q",
                            function (a, b) {
                                b[Qd] = 3 * (u(a) - 1)
                            }),
                        U("w", ["ww", 2], "wo", "week"),
                        U("W", ["WW", 2], "Wo", "isoWeek"),
                        M("week", "w"),
                        M("isoWeek", "W"),
                        Z("w", Bd),
                        Z("ww", Bd, xd),
                        Z("W", Bd),
                        Z("WW", Bd, xd),
                        ca(["w", "ww", "W", "WW"],
                            function (a, b, c, d) {
                                b[d.substr(0, 1)] = u(a)
                            });
                    var re = {
                        dow: 0,
                        doy: 6
                    };
                    U("D", ["DD", 2], "Do", "date"),
                        M("date", "D"),
                        Z("D", Bd),
                        Z("DD", Bd, xd),
                        Z("Do",
                            function (a, b) {
                                return a ? b._ordinalParse : b._ordinalParseLenient
                            }),
                        ba(["D", "DD"], Rd),
                        ba("Do",
                            function (a, b) {
                                b[Rd] = u(a.match(Bd)[0], 10)
                            });
                    var se = P("Date", !0);
                    U("d", 0, "do", "day"),
                        U("dd", 0, 0,
                            function (a) {
                                return this.localeData().weekdaysMin(this, a)
                            }),
                        U("ddd", 0, 0,
                            function (a) {
                                return this.localeData().weekdaysShort(this, a)
                            }),
                        U("dddd", 0, 0,
                            function (a) {
                                return this.localeData().weekdays(this, a)
                            }),
                        U("e", 0, 0, "weekday"),
                        U("E", 0, 0, "isoWeekday"),
                        M("day", "d"),
                        M("weekday", "e"),
                        M("isoWeekday", "E"),
                        Z("d", Bd),
                        Z("e", Bd),
                        Z("E", Bd),
                        Z("dd",
                            function (a, b) {
                                return b.weekdaysMinRegex(a)
                            }),
                        Z("ddd",
                            function (a, b) {
                                return b.weekdaysShortRegex(a)
                            }),
                        Z("dddd",
                            function (a, b) {
                                return b.weekdaysRegex(a)
                            }),
                        ca(["dd", "ddd", "dddd"],
                            function (a, b, c, d) {
                                var e = c._locale.weekdaysParse(a, d, c._strict);
                                null != e ? b.d = e : m(c).invalidWeekday = a
                            }),
                        ca(["d", "e", "E"],
                            function (a, b, c, d) {
                                b[d] = u(a)
                            });
                    var te = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                        ue = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                        ve = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
                        we = Md,
                        xe = Md,
                        ye = Md;
                    U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
                        M("dayOfYear", "DDD"),
                        Z("DDD", Ed),
                        Z("DDDD", yd),
                        ba(["DDD", "DDDD"],
                            function (a, b, c) {
                                c._dayOfYear = u(a)
                            }),
                        U("H", ["HH", 2], 0, "hour"),
                        U("h", ["hh", 2], 0, rc),
                        U("k", ["kk", 2], 0, sc),
                        U("hmm", 0, 0,
                            function () {
                                return "" + rc.apply(this) + T(this.minutes(), 2)
                            }),
                        U("hmmss", 0, 0,
                            function () {
                                return "" + rc.apply(this) + T(this.minutes(), 2) + T(this.seconds(), 2)
                            }),
                        U("Hmm", 0, 0,
                            function () {
                                return "" + this.hours() + T(this.minutes(), 2)
                            }),
                        U("Hmmss", 0, 0,
                            function () {
                                return "" + this.hours() + T(this.minutes(), 2) + T(this.seconds(), 2)
                            }),
                        tc("a", !0),
                        tc("A", !1),
                        M("hour", "h"),
                        Z("a", uc),
                        Z("A", uc),
                        Z("H", Bd),
                        Z("h", Bd),
                        Z("HH", Bd, xd),
                        Z("hh", Bd, xd),
                        Z("hmm", Cd),
                        Z("hmmss", Dd),
                        Z("Hmm", Cd),
                        Z("Hmmss", Dd),
                        ba(["H", "HH"], Sd),
                        ba(["a", "A"],
                            function (a, b, c) {
                                c._isPm = c._locale.isPM(a),
                                    c._meridiem = a
                            }),
                        ba(["h", "hh"],
                            function (a, b, c) {
                                b[Sd] = u(a),
                                    m(c).bigHour = !0
                            }),
                        ba("hmm",
                            function (a, b, c) {
                                var d = a.length - 2;
                                b[Sd] = u(a.substr(0, d)),
                                    b[Td] = u(a.substr(d)),
                                    m(c).bigHour = !0
                            }),
                        ba("hmmss",
                            function (a, b, c) {
                                var d = a.length - 4,
                                    e = a.length - 2;
                                b[Sd] = u(a.substr(0, d)),
                                    b[Td] = u(a.substr(d, 2)),
                                    b[Ud] = u(a.substr(e)),
                                    m(c).bigHour = !0
                            }),
                        ba("Hmm",
                            function (a, b, c) {
                                var d = a.length - 2;
                                b[Sd] = u(a.substr(0, d)),
                                    b[Td] = u(a.substr(d))
                            }),
                        ba("Hmmss",
                            function (a, b, c) {
                                var d = a.length - 4,
                                    e = a.length - 2;
                                b[Sd] = u(a.substr(0, d)),
                                    b[Td] = u(a.substr(d, 2)),
                                    b[Ud] = u(a.substr(e))
                            });
                    var ze = /[ap]\.?m?\.?/i,
                        Ae = P("Hours", !0);
                    U("m", ["mm", 2], 0, "minute"),
                        M("minute", "m"),
                        Z("m", Bd),
                        Z("mm", Bd, xd),
                        ba(["m", "mm"], Td);
                    var Be = P("Minutes", !1);
                    U("s", ["ss", 2], 0, "second"),
                        M("second", "s"),
                        Z("s", Bd),
                        Z("ss", Bd, xd),
                        ba(["s", "ss"], Ud);
                    var Ce = P("Seconds", !1);
                    U("S", 0, 0,
                        function () {
                            return ~~(this.millisecond() / 100)
                        }),
                        U(0, ["SS", 2], 0,
                            function () {
                                return ~~(this.millisecond() / 10)
                            }),
                        U(0, ["SSS", 3], 0, "millisecond"),
                        U(0, ["SSSS", 4], 0,
                            function () {
                                return 10 * this.millisecond()
                            }),
                        U(0, ["SSSSS", 5], 0,
                            function () {
                                return 100 * this.millisecond()
                            }),
                        U(0, ["SSSSSS", 6], 0,
                            function () {
                                return 1e3 * this.millisecond()
                            }),
                        U(0, ["SSSSSSS", 7], 0,
                            function () {
                                return 1e4 * this.millisecond()
                            }),
                        U(0, ["SSSSSSSS", 8], 0,
                            function () {
                                return 1e5 * this.millisecond()
                            }),
                        U(0, ["SSSSSSSSS", 9], 0,
                            function () {
                                return 1e6 * this.millisecond()
                            }),
                        M("millisecond", "ms"),
                        Z("S", Ed, wd),
                        Z("SS", Ed, xd),
                        Z("SSS", Ed, yd);
                    var De;
                    for (De = "SSSS"; De.length <= 9; De += "S") Z(De, Hd);
                    for (De = "S"; De.length <= 9; De += "S") ba(De, xc);
                    var Ee = P("Milliseconds", !1);
                    U("z", 0, 0, "zoneAbbr"),
                        U("zz", 0, 0, "zoneName");
                    var Fe = r.prototype;
                    Fe.add = oe,
                        Fe.calendar = nb,
                        Fe.clone = ob,
                        Fe.diff = vb,
                        Fe.endOf = Hb,
                        Fe.format = zb,
                        Fe.from = Ab,
                        Fe.fromNow = Bb,
                        Fe.to = Cb,
                        Fe.toNow = Db,
                        Fe.get = S,
                        Fe.invalidAt = Qb,
                        Fe.isAfter = pb,
                        Fe.isBefore = qb,
                        Fe.isBetween = rb,
                        Fe.isSame = sb,
                        Fe.isSameOrAfter = tb,
                        Fe.isSameOrBefore = ub,
                        Fe.isValid = Ob,
                        Fe.lang = qe,
                        Fe.locale = Eb,
                        Fe.localeData = Fb,
                        Fe.max = je,
                        Fe.min = ie,
                        Fe.parsingFlags = Pb,
                        Fe.set = S,
                        Fe.startOf = Gb,
                        Fe.subtract = pe,
                        Fe.toArray = Lb,
                        Fe.toObject = Mb,
                        Fe.toDate = Kb,
                        Fe.toISOString = yb,
                        Fe.toJSON = Nb,
                        Fe.toString = xb,
                        Fe.unix = Jb,
                        Fe.valueOf = Ib,
                        Fe.creationData = Rb,
                        Fe.year = he,
                        Fe.isLeapYear = wa,
                        Fe.weekYear = Tb,
                        Fe.isoWeekYear = Ub,
                        Fe.quarter = Fe.quarters = Zb,
                        Fe.month = ka,
                        Fe.daysInMonth = la,
                        Fe.week = Fe.weeks = bc,
                        Fe.isoWeek = Fe.isoWeeks = cc,
                        Fe.weeksInYear = Wb,
                        Fe.isoWeeksInYear = Vb,
                        Fe.date = se,
                        Fe.day = Fe.days = jc,
                        Fe.weekday = kc,
                        Fe.isoWeekday = lc,
                        Fe.dayOfYear = qc,
                        Fe.hour = Fe.hours = Ae,
                        Fe.minute = Fe.minutes = Be,
                        Fe.second = Fe.seconds = Ce,
                        Fe.millisecond = Fe.milliseconds = Ee,
                        Fe.utcOffset = Xa,
                        Fe.utc = Za,
                        Fe.local = $a,
                        Fe.parseZone = _a,
                        Fe.hasAlignedHourOffset = ab,
                        Fe.isDST = bb,
                        Fe.isDSTShifted = cb,
                        Fe.isLocal = db,
                        Fe.isUtcOffset = eb,
                        Fe.isUtc = fb,
                        Fe.isUTC = fb,
                        Fe.zoneAbbr = yc,
                        Fe.zoneName = zc,
                        Fe.dates = x("dates accessor is deprecated. Use date instead.", se),
                        Fe.months = x("months accessor is deprecated. Use month instead", ka),
                        Fe.years = x("years accessor is deprecated. Use year instead", he),
                        Fe.zone = x("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Ya);
                    var Ge = Fe,
                        He = {
                            sameDay: "[Today at] LT",
                            nextDay: "[Tomorrow at] LT",
                            nextWeek: "dddd [at] LT",
                            lastDay: "[Yesterday at] LT",
                            lastWeek: "[Last] dddd [at] LT",
                            sameElse: "L"
                        },
                        Ie = {
                            LTS: "h:mm:ss A",
                            LT: "h:mm A",
                            L: "MM/DD/YYYY",
                            LL: "MMMM D, YYYY",
                            LLL: "MMMM D, YYYY h:mm A",
                            LLLL: "dddd, MMMM D, YYYY h:mm A"
                        },
                        Je = /\d{1,2}/,
                        Ke = {
                            future: "in %s",
                            past: "%s ago",
                            s: "a few seconds",
                            m: "a minute",
                            mm: "%d minutes",
                            h: "an hour",
                            hh: "%d hours",
                            d: "a day",
                            dd: "%d days",
                            M: "a month",
                            MM: "%d months",
                            y: "a year",
                            yy: "%d years"
                        },
                        Le = D.prototype;
                    Le._calendar = He,
                        Le.calendar = Cc,
                        Le._longDateFormat = Ie,
                        Le.longDateFormat = Dc,
                        Le._invalidDate = "Invalid date",
                        Le.invalidDate = Ec,
                        Le._ordinal = "%d",
                        Le.ordinal = Fc,
                        Le._ordinalParse = Je,
                        Le.preparse = Gc,
                        Le.postformat = Gc,
                        Le._relativeTime = Ke,
                        Le.relativeTime = Hc,
                        Le.pastFuture = Ic,
                        Le.set = B,
                        Le.months = fa,
                        Le._months = Zd,
                        Le.monthsShort = ga,
                        Le._monthsShort = $d,
                        Le.monthsParse = ia,
                        Le._monthsRegex = ae,
                        Le.monthsRegex = na,
                        Le._monthsShortRegex = _d,
                        Le.monthsShortRegex = ma,
                        Le.week = $b,
                        Le._week = re,
                        Le.firstDayOfYear = ac,
                        Le.firstDayOfWeek = _b,
                        Le.weekdays = ec,
                        Le._weekdays = te,
                        Le.weekdaysMin = gc,
                        Le._weekdaysMin = ve,
                        Le.weekdaysShort = fc,
                        Le._weekdaysShort = ue,
                        Le.weekdaysParse = ic,
                        Le._weekdaysRegex = we,
                        Le.weekdaysRegex = mc,
                        Le._weekdaysShortRegex = xe,
                        Le.weekdaysShortRegex = nc,
                        Le._weekdaysMinRegex = ye,
                        Le.weekdaysMinRegex = oc,
                        Le.isPM = vc,
                        Le._meridiemParse = ze,
                        Le.meridiem = wc,
                        H("en", {
                            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
                            ordinal: function (a) {
                                var b = a % 10;
                                return a + (1 === u(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th")
                            }
                        }),
                        b.lang = x("moment.lang is deprecated. Use moment.locale instead.", H),
                        b.langData = x("moment.langData is deprecated. Use moment.localeData instead.", K);
                    var Me = Math.abs,
                        Ne = _c("ms"),
                        Oe = _c("s"),
                        Pe = _c("m"),
                        Qe = _c("h"),
                        Re = _c("d"),
                        Se = _c("w"),
                        Te = _c("M"),
                        Ue = _c("y"),
                        Ve = bd("milliseconds"),
                        We = bd("seconds"),
                        Xe = bd("minutes"),
                        Ye = bd("hours"),
                        Ze = bd("days"),
                        $e = bd("months"),
                        _e = bd("years"),
                        af = Math.round,
                        bf = {
                            s: 45,
                            m: 45,
                            h: 22,
                            d: 26,
                            M: 11
                        },
                        cf = Math.abs,
                        df = Ra.prototype;
                    df.abs = Rc,
                        df.add = Tc,
                        df.subtract = Uc,
                        df.as = Zc,
                        df.asMilliseconds = Ne,
                        df.asSeconds = Oe,
                        df.asMinutes = Pe,
                        df.asHours = Qe,
                        df.asDays = Re,
                        df.asWeeks = Se,
                        df.asMonths = Te,
                        df.asYears = Ue,
                        df.valueOf = $c,
                        df._bubble = Wc,
                        df.get = ad,
                        df.milliseconds = Ve,
                        df.seconds = We,
                        df.minutes = Xe,
                        df.hours = Ye,
                        df.days = Ze,
                        df.weeks = cd,
                        df.months = $e,
                        df.years = _e,
                        df.humanize = gd,
                        df.toISOString = hd,
                        df.toString = hd,
                        df.toJSON = hd,
                        df.locale = Eb,
                        df.localeData = Fb,
                        df.toIsoString = x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", hd),
                        df.lang = qe,
                        U("X", 0, 0, "unix"),
                        U("x", 0, 0, "valueOf"),
                        Z("x", Id),
                        Z("X", Ld),
                        ba("X",
                            function (a, b, c) {
                                c._d = new Date(1e3 * parseFloat(a, 10))
                            }),
                        ba("x",
                            function (a, b, c) {
                                c._d = new Date(u(a))
                            }),
                        b.version = "2.13.0",
                        e(Na),
                        b.fn = Ge,
                        b.min = Pa,
                        b.max = Qa,
                        b.now = ke,
                        b.utc = k,
                        b.unix = Ac,
                        b.months = Mc,
                        b.isDate = g,
                        b.locale = H,
                        b.invalid = o,
                        b.duration = gb,
                        b.isMoment = s,
                        b.weekdays = Oc,
                        b.parseZone = Bc,
                        b.localeData = K,
                        b.isDuration = Sa,
                        b.monthsShort = Nc,
                        b.weekdaysMin = Qc,
                        b.defineLocale = I,
                        b.updateLocale = J,
                        b.locales = L,
                        b.weekdaysShort = Pc,
                        b.normalizeUnits = N,
                        b.relativeTimeThreshold = fd,
                        b.prototype = Ge;
                    var ef = b;
                    return d = ef,
                        ef
                }),
                d
        });