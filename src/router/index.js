import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: (resolve) => require(['@/views/home.vue'], resolve)
    },
    {
      path: '/member',
      name: 'member',
      component: (resolve) => require(['@/views/member.vue'], resolve)
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: (resolve) => require(['@/views/shopCar.vue'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: (resolve) => require(['@/views/search.vue'], resolve)
    
    },
    {
      path: '/newslist',
      name: 'newslist',
      component: (resolve) => require(['@/views/news/newslist.vue'], resolve)
    },
    {
      path: '/picShare',
      name: 'picShare',
      component: (resolve) => require(['@/views/picture/picture.vue'], resolve)
    },
    {
      path: '/music',
      name: 'music',
      component: (resolve) => require(['@/views/music/music.vue'], resolve)
    },
    {
      path: '/weather',
      name: 'weather',
      component: (resolve) => require(['@/views/weather/weather.vue'], resolve)
    },
    {
      path: '/funny',
      redirect: '/funny/random',
      name: 'funny',
      component: (resolve) => require(['@/views/funny/funny.vue'],resolve),
      children: [
        {path: 'pic',name: 'funnypic',component:(resolve) => require(['@/views/funny/funny_pic.vue'],resolve)},
        {path: 'video',name: 'funnyvideo',component:(resolve) => require(['@/views/funny/funny_video.vue'],resolve)},
        {path: 'word',name: 'duanzi',component:(resolve) => require(['@/views/funny/funny_word.vue'],resolve)},
        {path: 'random',name: 'random',component:(resolve) => require(['@/views/funny/funny_random.vue'],resolve)},
      ]
    },
    {
      path: '/chat',
      name: 'chat',
      component: (resolve) => require(['@/views/chat/chat.vue'],resolve)
    },
    {
      path: '/connect',
      name: 'connect',
      component: (resolve) => require(['@/views/connect/connect.vue'],resolve)
    },
    {
      path: '/music/detail',
      name: 'musicDetail',
      component: (resolve) => require(['@/views/music/musicDetail.vue'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['@/views/register.vue'],resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      component: (resolve) => require(['@/views/setting/setting.vue'],resolve)
    }
  ], 
  linkActiveClass: 'mui-active',

})
