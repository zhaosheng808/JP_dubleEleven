/**
 * Created by DELL on 2017/10/30.
 */
(function () {
    function WxLogin() {
        this.appID = 'wxd142e84bcff75c90';
        this.init();
    }
    WxLogin.prototype = {
        init: function () {
            if (this.isWxBrowser()) {
                if (this.getOpenId()) {
                    console.log('有用户信息');
                } else {
                    this.authorization();
                }
            }
        },
        getOpenId: function () {
            return localStorage.getItem('td_openid') || '';
        },
        isWxBrowser: function () {
            return /micromessenger/.test(navigator.userAgent.toLowerCase())
        },
        // 授权
        authorization: function () {
            var _this = this;
            var _params = this.GetParams();
            var code = _params['code'];
            var appId = this.appID;
            console.log(code, 'code');
            if (!code) {
                var callbackurl = window.location.href;
                // 请求此链接若微信用户同意授权重定向到设置的URL中code也会加载到其中
                var jump_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(callbackurl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                console.log(jump_url, 'jump_url');
                window.location.href = jump_url;
            } else {
                var appid = this.appID;
                // 第三方登录授权获取access_token
                $.ajax({
                    type: 'get',
                    url: 'https://api-live.foundao.com/base/wx_userinfo_redis.php',
                    dataType: 'json',
                    data: {
                        appid: this.appID,
                        code: code
                    },
                }).done(function (resp) {
                    alert(resp);
                    if (resp.rusult == 0) {
                        openid = resp.data.openid;
                        console.log(resp);
                    } else {
                        alert(resp.msg)
                    }
                })
            }
        },
        GetParams: function () {
            var url = window.location.href;
            var theRequest = new Object();
            var start = url.indexOf("?");
            if (start != -1) {
                var str = url.substr(start + 1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }

    };
    window.WxLogin = WxLogin;
})();