<template>
  <div id="app">
    <mt-header fixed title="小瓶盖" class='title'></mt-header>
    <transition>
      <router-view/>
    </transition>
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" href="#tabbar" :to="{name: 'home'}">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
		  </router-link>
      <router-link class="mui-tab-item" href="#tabbar-with-contact" :to="{name: 'shopcar'}">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id='badge'>{{ $store.getters.getCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" href="#tabbar-with-chat" :to="{name: 'member'}">
        <span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>

		</nav>
  </div>

</template>

<script>
import fontSize from './assets/js/fontsize'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  padding: .4rem 0 .5rem;
  background-color: #fff;
}
.title {
  z-index: 9999;
}
/* .v-enter {
  opacity: 0;
  transform: translateX(100%)
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%)
}
.v-enter-active,
.v-leave-active {
  transition: all .5s ease;
}
.v-leave-active {
  position: absolute;
} */
.mui-bar-tab .mui-tab-item .mui-icon.mui-tab-label {
  margin-top: 0.04rem;
}
</style>
