<template>
    <div class="shopCar-container">
        <narbar :title = "title"></narbar>
        <ul>
            <li class="goods" v-for="(music, index) in carList" :key="music.song_id">
                <div class="goods-h">
                    <mt-switch class="switch" v-model="$store.getters.getSelect[music.song_id]" @change="selectedChange(music.song_id,$store.getters.getSelect[music.song_id])"></mt-switch>
                    <img :src="music.pic_small" alt="封面" width="90" height="90">
                </div>
                <div class="wrap">
                    <p class="goods-name">{{music.title}}-{{music.author}}</p>
                    <div class="goods-f">
                        <span class="price">￥2</span>
                        <numberbox :id='music.song_id'></numberbox>
                        <a href="#" @click.prevent='del(index,music.song_id)'>删除</a>
                    </div> 
                </div>               
            </li>
        </ul>
        <p v-if="carList.length===0?true:false" class="tip">
            购物车是空的，快去<router-link :to="{name: 'music'}" class='red'>音乐商城</router-link>挑选些东西吧
        </p>
        <div class="settlement">
            <div class="left">
                <p>总计（不含运费）</p>
                <p class="sum">已选择<span class='red'> {{ $store.getters.getSum.count }}</span>商品，总计<span class='red'>{{ $store.getters.getSum.sum }}</span>元</p>
            </div>
            <mt-button class="danger" type="danger" @click="settlement">去结算</mt-button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import numberbox from '../components/shopCar_munberbox.vue'
export default {
    data(){
        return {
            title:'购物车',
            carList:[],
            musicList : [],
        }
    },
    methods: {
        settlement(){

        },
        getlist(){
            this.$axios.get('http://api.apiopen.top/musicRankings').then(result => {
                if(result.data.code === 200){
                    this.musicList = result.data.result
                    var ids = this.$store.getters.getId
                    for(let i = 0;i < ids.length; i++){
                        this.musicList.forEach(item1 => {
                            item1.content.forEach(item => {
                                if(item.song_id === ids[i]){
                                    this.carList.push(item)
                                }
                            })
                        })
                    }
                } else {
                    Toast('获取购物车列表失败')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        del(index,id) {
            this.carList.splice(index,1)
            this.$store.commit('delGoods',id)
        },
        selectedChange (id,val){
            var obj = {id: id,val:val}
            this.$store.commit('updateSelect',obj)
        }
    },
    created(){
        this.getlist() 
    },
    components: {
        numberbox
    }
    
}
</script>
<style lang="less" scoped>
.goods {
    width: 96%;
    margin: 18px 0 10px 10px;
    border-bottom: 1px solid gray;
    overflow: hidden;
    position: relative;
}
.goods-h {
    float: left;
}
.goods-h img {
    margin-left: 10px;
}
.mint-switch {
    width: 30px;
    height: 20px;
    position: absolute;
    top: 2px;
    right: 10px;
    transform: scale(0.8,0.8)
}

.goods-name {
    margin-top: 8px;
    font-size: 18px;
    color: #999;
    font-weight: 700;
}
.price {
    font-weight: bold;
    margin-right: 6px; 
}
.goods-f {
    display: flex;
    margin-top: 10px;
    margin-left: 20px;
    justify-content: space-around;
    align-items: center;
}
.sub, .num, .add {
    display: inline-block;
    width: 22px;
    height: 22px;
    border: 1px solid gray;
    text-align: center;
    line-height: 22px;
    margin-bottom: 4px;
}
.add {
    margin-right: 26px;
}

.settlement {
    width: 100%;
    height: .7rem;
    background-color: #eee;
    text-align: left;
    padding: .15rem .2rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .sum {
        font-size: 17px;
        font-weight: 700;
        margin-top: .08rem;
    }

}
.red {
    color: red;
    font-weight: 700;
    font-size: 20px;
}
.tip {
    text-align: center;
    margin: 1rem 0;
    font-size: 18px;
}


</style>
