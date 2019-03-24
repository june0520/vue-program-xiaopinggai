// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource';
import Axios from 'axios'
import Moment from 'moment'
import './lib/mit/css/mui.min.css'
import './lib/mit/css/icons-extra.css'
import './assets/css/reset.css'
import { Button, Cell ,Header,Swipe, SwipeItem,Indicator, Loadmore,Search,Lazyload,Switch} from 'mint-ui'
import narbar from './components/narbar.vue'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Search.name, Search);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);

//在vue原型上挂载Axios
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Vue.use(VueResource);
//设置拦截器
Axios.interceptors.request.use(function(config){
  // 在AI聊天是页面关闭拦截器
  if(config.url.indexOf('api.php')<0){
    Indicator.open()
  }
  return config
})
Axios.interceptors.response.use(function(config){
  Indicator.close()
  return config
})

Vue.filter('dateFormat',function(data,params='YYYY-MM-DD HH:mm:ss'){
   return Moment(data).format(params)

})
Vue.component('narbar',narbar)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
