<template>
    <div>
        <narbar :title = "title"></narbar>
        <ul>
            <li class="fenlei" v-for="msc in musicList" :key="msc.type">
                <img :src="msc.pic_s260" :alt="msc.name" height="150" width="150">
                <ul class="song">
                    <li  v-for="(music, index) in msc.content" :key="index">
                        <router-link :to="{name: 'musicDetail', query: {type: msc.type, id: music.song_id}}">
                            {{index+1}}
                            {{music.title}} - {{music.author}}
                        </router-link>
                    </li>
                </ul>
                <hr>
            </li>
        </ul>
        

    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            title: "音乐",
            musicList: []
        }
    },
    methods: {
        getMusic(){
            this.$axios.get('http://api.apiopen.top/musicRankings').then(result => {
                if(result.data.code === 200){
                    Toast('获取音乐列表成功')
                    this.musicList = result.data.result
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.getMusic()
    }
    
}
</script>
<style lang="less" scoped>
    .fenlei{ 
        width: 100%;
        display: flex;
        margin-top: 10px;
        border-bottom: 1px solid gray;
        text-align: left;
    }
    .song {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        li {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 37px;
            width: 100%;
            line-height: 37px;
            padding-left: 3px;
        }
        a {
            color: #333!important;
            font-size: 14px;
      
        }
    } 
    .song li:nth-child(even) {
        background-color:#f7f7f7;

    } 
    a:hover {
        color: red;
    }
</style>