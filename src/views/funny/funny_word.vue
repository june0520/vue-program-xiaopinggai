<template>
    <div>
        <ul>
            <li v-for="(item, i) in duanziList" :key="i">
                <div class="header">
                    <img :src="item.header" alt="">
                    <div class="top-wrap">
                        <p class="nickname">{{ item.username }}</p>
                        <p class="passtime">{{ item.passtime }}</p>
                    </div>
                </div>
                <h1 v-html="item.text" class="title"></h1>
            </li>
        </ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            duanziList: []
        }
    },
    methods: {
        getPicList(){
            this.$axios.get("https://www.apiopen.top/satinGodApi?type=2&page=1").then(result => {
                if(result.data.code === 200){
                    Toast('获取段子成功')
                    console.log(result.data.data)
                    this.duanziList = result.data.data
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.getPicList()
    }
    
}
</script>
<style lang="less" scoped>
ul {
    padding: 5px;
}
.header {
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        float: left;
        margin-left:8px;
    }
    .top-wrap {
        height: 50px;
        margin: 15px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8px 15px 0;

        .nickname {
            color: #0094ff;;
            font-size: 15px;
            font-weight: 700;
        }
    }
}
.title {
    font-size: 15px;
    text-align: left;
    line-height: 30px;
    font-weight: 700;

}
    
</style>