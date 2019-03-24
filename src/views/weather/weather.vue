<template>
    <div class="weather-container">
        <narbar :title="title"></narbar>
        <div class="weath-top">
            <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i>
                    <input class="mint-searchbar-core inp" type="text" v-model="city" placeholder="城市">
                </div>
            </div>
            <mt-button class="btn" type='primary' @click="getWeatherInfo(city)">搜索</mt-button>
        </div>
        <div v-if="weatherInfo?true:false" class="bg-img" :class="{'晴':'qing','暴雨':'yu','大雨':'yu','小雨':'yu','多云':'duoyun'}[weatherInfo.forecast[0].type]"> 
            <div class="main"> 
                <h3 class="city">{{weatherInfo.city}}</h3>
                <p class="type">{{weatherInfo.forecast[0].type}}</p>
                <h1 class="wendu">{{weatherInfo.wendu}}</h1>
            </div>
            <div class="info">
                <p><span>{{month+'月'}}{{weatherInfo.forecast[0].date}}</span> 今天 <span style="float: right">{{weatherInfo.forecast[0].high}}</span><span>{{weatherInfo.forecast[0].low}}</span></p>
                <hr>
                <div class="line"></div>
                <p class='feng'><span>风向： {{weatherInfo.forecast[0].fengxiang}}</span><span>风力： {{weatherInfo.forecast[0].fengli | fengliFormat}}</span></p>
                <p>{{weatherInfo.ganmao}}</p>
                <div class="line"></div>
                <hr>
            </div>
            <ul class="ortherday">
                <li v-for="(item, index) in  weatherInfo.forecast.slice(1)" :key="index">
                    <span>{{month+'月'}}{{item.date}}</span><span>{{item.type}}</span><span>{{item.high}}&nbsp;{{item.low}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            title: "天气查询",
            city : '',
            weatherInfo:'',
            month : new Date().getMonth()+1
        }
    },
    methods : {
        getWeatherInfo(city){
            this.$axios.get('https://www.apiopen.top/weatherApi?city='+city).then(result => {
                if(result.data.code === 200){
                    this.weatherInfo = result.data.data                    
                }else{
                    Toast ('暂未查相关天气')
                }
            }).catch(err=>{
                console.log(err)
            }) 

        }
    },
    created(){
        this.getWeatherInfo('北京')

    },
    filters: {
        'fengliFormat': function(data){
            // console.log(data.match(/<!\[CDATA\[(\S*)\]\]>/))
            return data.match(/<!\[CDATA\[(\S*)\]\]>/)[1]
        }}
    
}
</script>
<style lang="less" scoped>
.weath-top {
    display: flex;
    justify-content: space-between;
    .mint-searchbar {
        flex: 8;
        .inp  {
            height: .28rem;
            padding: 0;
            border: 0;
            margin: 0;
        }
        .mint-button {
            flex: 2;
            height: 44px;;
        }
    }
}
.weather-body {
    width: 100%;
    height: 6rem;
    background: url(../../assets/images/qing.jpg) no-repeat;
    .line {
        width: 100%;
        background-color: #ccc;
        height: 1px;
    }
}
p {
    color: #fff;
}
    .btn {
        display: inline-block;
        width: 14%;
    }

    .main {
        text-align: center;
        padding-top: 50px;
        color:#fff
         
    }
    .main p{
        color: white;
    } 
    .city {
        font-size: 22px;
        margin-bottom: 0px;
        
    }
    .wendu {
        font-size: 48px;
        margin-top: 14px;
        margin-left: 6%;
    }
    .info {
        width: 96%;
        height: 80px;
        margin: 0 auto;
        margin-top: 30px;
        font-size: 14px;
        text-align: left;
        line-height: .2rem;
    }
    .feng {
        display: flex;
        justify-content: space-between;
    }
    .tip {
        box-sizing: border-box;
        margin-top: 6px;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        padding:6px;
    }
    .tip span:nth-child(2) {
        float:right;
    }
    .ortherday {
        width: 96%;
        text-align: center;
        margin: 36px auto;
        font-size: 14px;
    }
    .ortherday li {
        margin-bottom: 16px;
    }
    .ortherday span:nth-child(1) {
        float: left;
    }
    .ortherday span:nth-child(3) {
        float: right;
    }
    .bg-img {
        position: absolute;
        width: 100%;
        height: 80%;
        color: white;
        background: url('../../assets/images/qing.jpg') no-repeat;
    }
    .bg-img.qing {
        background: url('../../assets/images/qing.jpg') no-repeat;
    }
    .bg-img.yu {
        background: url('../../assets/images/yu.jpg') no-repeat;
    }
    .bg-img.duoyun {
        background: url('../../assets/images/duoyun.jpg') no-repeat;
    }
    .msg {
        font-size: 20px;
        color: black;
        margin: 10px 0 0 10px;
    }

</style>

