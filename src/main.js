import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


var sensors = require('sa-sdk-javascript');
sensors.init({
  server_url: 'http://81.69.254.141:2002/sa.gif?project=test',//数据接收地址，后台：http://localhost:2001/api/sa/data?project=test
  is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
  use_client_time: true,
  send_type: 'image',  // image ， beacon ， ajax
  show_log: true,
  // 设置成 true 后，表示在根域下设置 cookie 。
  cross_subdomain: true,
  // 开启 cookie 加密配置，默认 false
  encrypt_cookie: false,
  heatmap: {
    // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    clickmap: 'default',
    // 是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    scroll_notice_map: 'default'
  }
})
//part_url 配置 sensorsdata.cn 和 example.com 后，会在神策分析环境中实现用户统一，从而实现跨域打通
sensors.use('SiteLinker',
{
    linker: [
            {part_url: 'sensorsdata.cn', after_hash: false},
            {part_url: 'example.com', after_hash: false}
    ],
        // 该配置设置为 true 后，如果从已登录的页面跳转过来，即使当前网页已经登录，当前网页仍然会以之前网页的登录 id 再次登录。
        re_login: true
});

//sensors.login("user_123456789");
//Vue.prototype.$sensors = sensors

// 自动采集事件埋点
sensors.quick('autoTrack', {
    platform: 'h5'
})

