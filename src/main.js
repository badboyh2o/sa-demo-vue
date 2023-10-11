import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import sensors  from 'sa-sdk-javascript'
import sessionEvent  from 'sa-sdk-javascript/dist/web/plugin/session-event/index.es6.js';


// step 1: npm install sa-sdk-javascript


// const app = createApp(App).use(router).mount('#app')
const app = createApp(App).use(router)


// step 2：使用sa 插件

// 使用外置插件  https://manual.sensorsdata.cn/sa/latest/zh_cn/web-17571615.html
// 外置插件需要手动集成插件，并手动使用。例如：使用外置的 session-event 插件
sensors.use(sessionEvent);


// 使用内置插件 https://manual.sensorsdata.cn/sa/latest/zh_cn/web-17571615.html
// https://github.com/sensorsdata/sa-sdk-javascript/tree/master/dist/web/plugin/pageleave
// sensors.use('PageLeave', option);
sensors.use('PageLeave', {
  // custom_props：页面浏览时长自定义属性。 类型：Object，可选。
  // heartbeat_interval_time：心跳记录刷新时间。 类型：Number ，单位：秒 ，默认：5，范围：大于 0，可选。
  // max_duration：最大页面浏览时长。 类型：Number ，单位：秒 ，默认：432000 (5天) ，范围：大于 0，可选。
  // isCollectUrl：设置是否采集当前页面浏览时长。 类型：Function 。必须为具有返回值的 Function，返回 true 为需要采集，返回 false 或者不返回则为不采集。可选。
  custom_props: {
    prop1: 'value1'
  },
  heartbeat_interval_time: 5,
  max_duration: 5 * 24 * 60 * 60,
  isCollectUrl: function(url){
    console.log(url)
    return true
  }
});




// step 3：初始化
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
    // 是否开启点击图， default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    clickmap: 'default',
    // 是否开启触达图， not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    scroll_notice_map: 'not_collect'
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


// 注册公共属性
sensors.registerPage({
  branch_code: '54001',
  referrer: document.referrer
});

// 测试 id mapping2.0 login
//sensors.logout();
//sensors.login("user_123456789");


// 测试 id mapping3.0 login
sensors.logout();
sensors.loginWithKey('$identity_login_id','user_123456789');
// 绑定其他用户标识
sensors.bind("$identity_mobile","187****8991")


// 自动收集页面浏览事件 $pageview ，以及设置初始来源。第二个参数可配置附加的属性
sensors.quick('autoTrack', {
    platform: 'h5'
})

// 挂到 vue
app.config.globalProperties.$sensors = sensors

app.mount('#app')