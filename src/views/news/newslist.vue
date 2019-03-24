<template>
    <div class="newlist-container">
        <narbar :title='title'></narbar>
        <mt-loadmore class="mian" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="isAutoFill" >
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for='(item, i) in newslist' :key='i'>
                    <a :href="item.link">
                        <img class="mui-media-object mui-pull-left" :src="item.picInfo[0]?item.picInfo[0].url:'/'">
                        <div class="mui-media-body">
                            {{ item.title }}<br/>
                            <br/><span style="float: left">点击次数：{{item.tcount}}</span><span style="float: right">{{item.ptime}}</span>
                        </div>
                    </a>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            title: "新闻列表",
            newslist: [],
            page: 0,
            moreNewsTitel: [],
            allLoaded: false,
            isAutoFill: false
        }
    },
    created() {
        this.getNewsList()
    },
    methods : {
        loadBottom(){
            this.page += 1;
            console.log('触发上拉')
            if(this.page === this.moreNewsTitle.length-1){
                this.allLoaded = true
            }
            this.getNewsList()
            this.$refs.loadmore.onBottomLoaded();
        },
        getNewsList(){
            this.$axios.get("https://www.apiopen.top/journalismApi").then(result => {
                if(result.data.code === 200){
                    this.moreNewsTitle = Object.keys(result.data.data);
                    this.newslist = this.newslist.concat(result.data.data[this.moreNewsTitle[this.page]])
                    console.log(this.page,this.moreNewsTitle[this.page])

                } else{
                    Toast('获取新闻列表失败')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.newlist-container {
    height: 5.77rem;
    overflow: auto;
    .mui-media-body {
        font-size: 16px;
        span {
            color: #0094ff;
            font-size: 12px;
        }
    }
}

</style>

