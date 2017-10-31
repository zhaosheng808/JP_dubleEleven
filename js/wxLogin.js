/**
 * Created by DELL on 2017/10/30.
 */
(function () {
    function WxLogin() {
        this.appID = app_config.appID;
        this.base_url = 'base_url';
        this.baseLink = _Config.appBaseLink;
        this.wxconfig = new WxConfig();
        this.init();
    }
    WxLogin.prototype = {
        init: function () {
            if (this.isWxBrowser()) {
                if (this.getOpenId()) {
                    console.log('有用户信息');
                    this.login_success();
                } else {
                    this.authorization();
                }
            } else {  // 非微信环境
                this.login_success();
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
            if (!code) {
                var callbackurl = window.location.href;
                // 请求此链接若微信用户同意授权重定向到设置的URL中code也会加载到其中
                var jump_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(callbackurl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                window.location.href = jump_url;
            } else {
                $.ajax({
                    type: 'GET',
                    url: 'https://api-live.foundao.com/base/wx_userinfo_redis.php',
                    dataType: 'jsonp',
                    data: {
                        appid: appId,
                        code: code
                    },
                    success: function (result) {
                        if (result.result == 0) {
                            console.log(result.data);
                            localStorage.setItem('td_openid', result.data.openid);
                            localStorage.setItem('td_nickname', result.data.nickname);
                            localStorage.setItem('td_avatar', result.data.headimgurl);
                            localStorage.setItem('td_sex', result.data.sex);
                            _this.login_success();
                        } else {
                            alert('获取用户信息错误')
                        }
                    }
                })
            }
        },
        // 授权成功
        login_success: function () {
            this.configWXsdk();
            // 实例化app信息
            new AppManage();
        },
        // 默认的微信配置
        configWXsdk: function (obj) {
            if (!obj) {
                obj = {};
            }
            var wxconfig = this.wxconfig;
            var appid = this.appID;
            var link = obj.link || this.baseLink;
            var title = obj.title || '做短视频，我用蕉片';
            var desc = obj.desc || '蕉片双11活动等你来参与';
            var imgUrl = obj.imgUrl || app_config.base_url + '/images/wxShare.png';
            wxconfig.init({
                appid: appid,
                url: window.location.href,
                link: link,
                debug: false,
                title: title,
                desc: desc,
                imgUrl: imgUrl
            });
        },
        // 拉取用户信息
        getUserInfo: function () {
            var td_uid = localStorage.getItem('td_uid');
            var td_avatar = localStorage.getItem('td_avatar');
            var td_nickname = localStorage.getItem('td_nickname');
            return {
                'td_uid': td_uid,
                'td_avatar': td_avatar || './images/wxShare.png',
                'td_nickname': td_nickname || '小顺子'
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