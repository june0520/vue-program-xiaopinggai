<template>
    <div>
        <transition
            @before-enter='beforeEnter'
            @enter='enter'
            @after-enter='afterEnter'>
            <div class="ball" v-show="isShow" ref='ball'></div>
        </transition>

        <narbar :title = "title"></narbar>
        <div>
            <div class="pic">
                <div class="wraper">
                    <img :src="info.pic_radio" width="200" height="200">
                    <audio src="" controls></audio>
                </div>
            </div>
            <div class="price">
                <h3>曲名： {{ info.title }}</h3>
                <div class="markprice">
                    <span>市场价：<del>￥4</del></span>&nbsp;&nbsp;&nbsp;&nbsp;<span>销售价：<strong style="color:#f10625;font-size:20px">￥2</strong> </span>
                    <br>
                    <div class="buyNum">
                        <span>购买数量：</span>
                        <numbox @func='getNum'></numbox>
				    </div>
                </div>
                <mt-button size = "small" type="primary" @click='buynow'>立即购买</mt-button>
                <mt-button size = "small" type="danger" @click="addShopcart">加入购物车</mt-button>
            </div>
            <div class="info">
                <p>歌手：{{info.author}}</p>
                <p>专辑：{{info.album_title}}</p>
                <p>地区：{{info.country}}</p>
                <p>语言：{{info.language}}</p>
                <p>出品方：{{info.si_proxycompany}}</p>
            </div>

        </div>
    </div>
</template>
<script>
import numbox from '../../components/music_munberbox.vue'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            title: "音乐详情",
            info: {},
            type: this.$route.query.type,
            id: this.$route.query.id ,
            isShow: false,
            num: 1,
        }
    },
    methods: {
        getInfo(){
            this.$axios.get('https://api.apiopen.top/musicRankingsDetails?type=' + this.type).then(result => {
                if(result.data.code === 200){
                    Toast('获取音乐列表成功')
                   this.info = result.data.result.filter(element => {
                        if(element.song_id === this.id){
                            return element
                        }
                    })[0]
                    
                }
            }).catch(err => {
                // console.log(err)
            })
        },
        buynow(){
            Toast('暂未上线')
        },
        addShopcart(){
            this.isShow =! this.isShow
            var goodsInfo = {id: this.id, count: this.num, price: 2, selected: true}
            this.$store.commit('addToCar',goodsInfo)
        },
        beforeEnter(el){
            el.style.transform = 'translate(0,0)'
        },
        enter(el,done){
            el.offsetWidth
            const ballX = this.$refs.ball.getBoundingClientRect().left
            const badgeX = document.getElementById('badge').getBoundingClientRect().left
            const ballY = this.$refs.ball.getBoundingClientRect().top
            const badgeY = document.getElementById('badge').getBoundingClientRect().top
            const disX = badgeX-ballX
            const disY = badgeY-ballY

            el.style.transform = `translate(${disX}px,${disY}px)`
            el.style.transition = 'all 1s cubic-bezier(.14,-0.29,.83,.67)'
            done()
        },
        afterEnter(el){
            this.isShow =! this.isShow
        },
        getNum(num){
            this.num = num
        }
    },
    created(){
        this.getInfo()
    },
    components: {
        numbox
    }
}
</script>
<style lang="less" scoped>
    .pic, .price, .info {
        width: 96%;
        margin: 2px auto;
        border: 1px solid gainsboro;
        border-radius: 8px;
        background: white;
        padding: 10px;
        font-size: 14px;
        color: gray;
    }
    .price h3 {
        color: #101010;
        font-weight: 700;
        font-size: 18px;
    }
    .info {
        text-align: left;
    }
    .wrap {
        border: 1px solid gainsboro;
        border-radius: 16px;
        text-align: center;
    }
    .markprice {
        margin-bottom: 8px;
    }
    h3 {
        width: 98%;
        border-bottom: 1px solid black;
        color: blue;
        padding-bottom: 4px;
    }
    .buyNum {
        display: flex;
        margin-top: 10px;
        justify-content: center;;
        align-items: center;
        span {
            font-size: 16px;
            // margin-top: 10px 10px 0 20px;
        }
    }
    .mint-button--small  {
        width: 94px;
        margin-right: 8px;
    }
    .ball {
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: red;
        position: absolute;
        z-index: 10000;
        top: 438px;
        left: 219px;
    }
    .info p {
        height: 18px;
    }



</style>