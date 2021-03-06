
const { resolve } = require('path');
const isProd = process.env.NODE_ENV === 'production';
let cfg={
    port:3008,
    wechat:{
        appID:'wxd46b7a729709996a',
        appSecret:'54cac499c4ad92e5185697e36d516533',
        token:'nhclike'
    },
    db:'mongodb://localhost/wechat7day',
    // 这里是你的代理地址
    baseUrl: 'http://nhclike.free.idcfengye.com/',
    doubanUrl:'https://douban.uieee.com'
};
if (isProd) {
    const config = require(resolve(__dirname, '../../../../config/config.json'));

    cfg = Object.assign(cfg, config)
}
module.exports=cfg;