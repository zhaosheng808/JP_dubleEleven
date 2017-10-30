/**
 * Created by DELL on 2017/10/27.
 */
(function () {
    function AppManage() {
        this.step = 0;
        this.downloadTimeout = null; // 下载定时,超时检测
        this.step1Score = 0;
        this.step2Score = 0;
        this.step3Score = 0;
        this.init();
    }
    AppManage.prototype = {
        init: function () {
            this.event();
            this.initStep();
        },
        getRandomScore: function (min, max) {
            return Math.floor( Math.random() * (max - min + 1) + min );
        },
        // 初始化步骤
        initStep: function () {
            $('.wrapper section').hide();
            // 按钮影藏
            $('.hide').hide();
            $('#index_page').slideDown();
        },
        stepFirst_show: function () {
            var _this = this;
            $('#step1 .show_message').text('检测中...');
            $('#osScore').text('');
            $('#osMessage').text('');
            $('#step1 .test_slogan').show();
            $('#index_page').hide();
            $('#step1').fadeIn();
            setTimeout(function () {
                _this.stepFirst();
            }, 2000);
        },
        stepFirst: function(){
            this.checkOS();
            $('#step1 .btn_wrapper').fadeIn();
            $('#step1 .test_slogan').hide();
        },
        stepSecond_show: function () {
            var _this = this;
            $('#step1').hide();
            $('#speedScore').text('');
            $('#step2 .show_message').text('检测中...');
            $('#step2 .test_slogan').show();
            $('#speedScore').text('');
            $('#step2').slideDown();
            setTimeout(function () {
                _this.stepSecond();
            }, 2000);
        },
        stepSecond: function () {
            var _this = this;
            var isTimeOut = false;  // 下载是否超时
            console.log('进入下载');
            var Rand = Math.random();
            var RandNum = 1 + Math.round(Rand * 99);
            var szsrc = 'http://toutiao-cdn-jper.foundao.com/kjjy_cms/4096.jpg?id=' + RandNum;
//                var szsrc = 'http://www.newscctv.net/tap2cdn/video/images/images/10026/142/1008/20171024212723245.jpg?id=' + RandNum;
            var st = new Date();
            var imgObject = new Image();
            imgObject.crossOrigin = "*";
            imgObject.src = szsrc;
            _this.downloadTimeout = setTimeout(function () { // 10s还未下载完毕，提示网速过慢
                $('#speedScore').text('你的网速太慢了吧！');
                $('#step2 .test_slogan').hide();
                $('#step2 .btn_wrapper').fadeIn();
                $('#step2 .show_message').text('换个网蹭吧！');
                isTimeOut = true;
            }, 20000);
            imgObject.onload = function () {
                console.log('图片加载完毕');
                if (!isTimeOut) { // 未超时
                    console.log('图片加载完毕，清除定时');
                    clearTimeout(_this.downloadTimeout);
                    var fs = 3.89 * 1024;  //图片文件大小(KB)
                    var et = new Date();
                    var time_lag = (et - st) / 1000;  // 时间差，毫秒 ->秒
                    console.log(time_lag, '下载总时间');
                    var speed = fs / time_lag;

                    $('#speedScore').text('你的网速为： ' + speed.toFixed(2) + 'KB/秒');
                    $('#step2 .test_slogan').hide();
                    $('#step2 .btn_wrapper').fadeIn();
                    $('#step2 .show_message').text('任何秒杀对你来说都是慢镜头');
                }
            }
        },
        stepThird_show: function () {
            $('#step2').hide();
            $('#step3 .show_message').text('5');
            $('#step3 .test_slogan').show();
            $('#step3 .section_tips').show();
            $('#step3 .btn_wrapper').hide();
            $('#step3 .click_message').hide();
            $('#readyOk').show();
            $('#step3').slideDown();
            this.stepThird();
        },
        stepThird: function () {
            var nowNum = 5;
            $('#readyOk').click(function () {
                $(this).hide().off();
                var interval = setInterval(function () {
//                    console.log('---');
                    if(nowNum <= 0){
                        clearInterval(interval);
                        $('#step3 .show_message').text('点我');
                        var startTime = new Date();
                        $('#step3 .center_box').click(function () {
                            $(this).off();
                            var endTime = new Date();
                            var time_lag = (endTime - startTime) / 1000;  // 时间差，毫秒 ->秒
                            $('#step3 .click_message').show().find('.click_time').text(time_lag);
                            $('#step3 .test_slogan').hide();
                            $('#step3 .section_tips').hide();
                            $('#step3 .btn_wrapper').show();
                        })
                    } else {
                        nowNum = nowNum - 0.1;
                        var nowNumString = nowNum.toString();
                        var showTime = nowNumString.substr (0,3);
                        $('#step3 .show_message').text(showTime);
                    }
                }, 100);
            });


        },
        // 最终结果
        result_show: function () {
            var totalScore = this.step1Score + this.step2Score + this.step3Score;
            $('.totalScore').text(totalScore);
            $('#step3').hide();
            $('#result').slideDown();
        },
        checkOS: function () {
            var u = navigator.userAgent;
            $('#osMessage').text(u);
            var osScore = 0;
            var osType = '未知';
            /*----------------Android------------------------------*/
            if(/android/i.test(navigator.userAgent)){      //  Android
                osScore = this.getRandomScore(12, 15);           // android 12-15
                osType = 'Android';
                if (navigator.userAgent.match(/Android [8]/i)) { // android 8 18
                    osScore = 18;
                    osType = 'Android8';
                } else if (navigator.userAgent.match(/Android [7]/i)) {  // android 7 15-18
                    osScore = this.getRandomScore(15, 18);
                    osType = 'Android7';
                }
            }
            /*----------------iOS------------------------------*/
            if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){ // iOS
                osScore = this.getRandomScore(15, 20);           // ios 15-20
                osType = 'iOS';
                if (navigator.userAgent.match(/OS 11/i)) { // iOS 11
                    osScore = 20;
                    osType = 'iOS11';
                } else if (navigator.userAgent.match(/OS 10/i)) {  // android 10 15-18
                    osScore = 19;
                    osType = 'iOS10';
                } else if (navigator.userAgent.match(/OS 9/i)) {  // android 10 15-18
                    osScore = this.getRandomScore(18, 19);
                    osType = 'iOS9';
                }
            }

            var percentage = 0;
            if (osScore >= 15) {
                percentage = this.getRandomScore(80, 92);
            } else {
                percentage = this.getRandomScore(60, 75);
            }
            var stepResult = '你打败了 '+percentage+'% 的用户';
            $('#step1 .show_message').text(stepResult);
            $('#osScore').text('操作系统为: '+osType+' 多任务处理能力分数为：' + osScore);
            this.step1Score = osScore;
        },
        stepChange: function () {
            var step = this.step;
            if (step === 0) {       // 首页
                this.initStep();
            } else if (step === 1) { // 第一项
                this.stepFirst_show();
            } else if (step === 2) { // 第二项
                this.stepSecond_show();
            } else if (step === 3) {  // 第三项
                this.stepThird_show();
            } else if (step === 4) { // 结果
                this.result_show()

            }
        },
        event: function () {
            var _this = this;
            $('.next_step').click(function () {
                _this.step++;
//                    $(this).fadeOut();
//                    $('.next_step').off();
                console.log(_this.step);
                _this.stepChange();
            });
            // 分享
            $('#btn_share').click(function () {
                alert('分享');
            });
            // 再来一次
            $('#play_again').click(function () {
                _this.step = 0;
                _this.stepChange();
            });
        }
    };
    window.AppManage = AppManage;
})();