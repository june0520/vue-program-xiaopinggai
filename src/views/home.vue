<template>
  <div class="home">
    <!-- 幻灯pain部分 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item><img src="../assets/images/banner.jpg" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../assets/images/banner2.jpg" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../assets/images/banner3.jpeg" alt=""></mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name:'newslist'}">
                <img src="../assets/images/news.png">
                <div class="mui-media-body">新闻资讯</div>
            </router-link>
            </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name: 'picShare'}">
                <img src="../assets/images/picture.png">
                <div class="mui-media-body">图片分享</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name: 'music'}">
                <img src="../assets/images/music.png">
                <div class="mui-media-body">音乐商城</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name: 'weather'}">
                <img src="../assets/images/weather.png" >
                <div class="mui-media-body">天气查询</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name: 'funny'}">
                <img src="../assets/images/duanzi.png" alt="">
                <div class="mui-media-body">搞笑段子</div>
            </router-link>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name: 'chat'}">
                <img src="../assets/images/chat.png" alt="">
                <div class="mui-media-body">AI聊天室</div>
            </router-link>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name: 'connect'}">
                <img src="../assets/images/phone.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </router-link>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link :to="{name: 'setting'}">
                <img src="../assets/images/set.png" alt="">
                <div class="mui-media-body">设置</div>
            </router-link>
        </li>

        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a href="#">
                <span class="mui-icon mui-icon-more"></span>
                <div class="mui-media-body" @click="tips">more</div>
            </a>
        </li>
    </ul>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  name: 'home',
  data () {
    return {
    }
  },
    methods: {
        tips(){
            Toast({
                message: '暂未上线，敬请期待',
                position: 'middle',
                duration: 1000
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home{
    background-color: #fff;
    .mint-swipe {
        height: 2rem;
    }
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        .mui-table-view-cell {
            border: none;
            width: 1.25rem;
            height: 1.18rem;
            img {
                width: 0.5rem;
            }
        }
    }
    .mint-swipe-items-wrap > div img {
        width: 100%;
    }
}
</style>
