<template>
    <div class="pic-container">
        <narbar :title='title'></narbar>
        <mt-loadmore class="mian" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="isAutoFill" >
        	<div class="mui-card" v-for='(item, i) in pictureList' :key='i'>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <img :src="item.url">
					</div>
				</div>
			</div>
        </mt-loadmore>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            title: '图片分享',
            page: 2,
            pictureList: [],
            allLoaded: false,
            isAutoFill: false,
        }
    },
    methods:{
        getPicture(){
            this.$axios.get("https://www.apiopen.top/meituApi?page=" + this.page).then(result => {
                if(result.data.code === 200){
                    Toast('获取图片列表成功')
                    console.log(result.data.data)
                    this.pictureList = this.pictureList.concat(result.data.data)
                    console.log(this.pictureList.length)
                    if(result.data.data.length < 20) {
                        this.allLoaded = true
                    }
                }  else {
                    Toast('获取图片列表失败')
                    }
            }).catch(err=>{
                console.log(err)
            })
        },
        loadBottom(){
            console.log("触发了上啦可")
            this.page++
            this.getPicture()
            this.$refs.loadmore.onBottomLoaded();
        }
    },
    created(){
        this.getPicture()
    }
}
</script>
<style lang="less" scoped>
.pic-container{
    height: 5.77rem;
    overflow: auto;

    .mui-card-content-inner {
        padding: 0;
        img {
            width: 3.55rem;
        }
    
    }
}
  
</style>