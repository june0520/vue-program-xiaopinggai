<template>
    <div class="funny-container">
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></a>
            <router-link :to="{name: 'random'}">推荐</router-link>
            <router-link :to="{name: 'duanzi'}">段子</router-link>
            <router-link :to="{name: 'funnypic'}">图片</router-link>
            <router-link :to="{name: 'funnyvideo'}">视频</router-link>
		</header> 
      <router-view/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            title: '搞笑段子'
        }
    },
    methods: {
        getFunnyList(){
            this.$axios.get().then(result => {
            }).catch(err => {
                console.log(err)
            })
        },
        goBack(){
            this.$router.go(-1)
        }
    },
    created(){
    }
}
</script>
<style lang="less" scoped>
.mui-bar-nav{
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 16px;
        a {
            color: #000;
        }
    }
.mui-active {
    color: #007aff!important;
}

</style>
