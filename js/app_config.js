/**
 * Created by DELL on 2017/10/26.
 */
/* 移动项目目录需配置 -->项目根目录，微信授权回到链接根据跟目录配置*/
var app_config = {
  appID: 'wxd142e84bcff75c90',
  host_url: 'https://cdn-live.foundao.com',
  base_url: 'https://cdn-live.foundao.com/jper_activity/2017_11'   // 项目根目录
};
var _Config = {
    WXsharebaseLink: app_config.base_url+ '/share.html',    // 微信分享页面
    appBaseLink: app_config.base_url + '/index.html',    // 项目入口目录
};
var result_words = {
  step2: ['亲。你住在运营商机房吧？', '任何秒杀对你来说都是慢镜头', '网速还算够用', '换个网蹭吧......'],
  step3: ['快的都快穿越时空了', '你抢空了别人还在排队', '出门右转，[祖传贴膜]能提速一点', '同学，该换块屏幕了......'],
};