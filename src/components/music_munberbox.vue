<template>
    <div class="number-box">
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click='reduce'>-</button>
            <input id="test" class="mui-input-numbox" type="number" :value='num'/>
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click='add'>+</button>
		</div>  
    </div>
</template>
<script>
// import mui from '../lib/mit/js/mui.js'
export default {
    data(){
        return {
            num:1
        }
    },
    methods:{
        // numChange(){
        //     this.$emit('func',this.num)
        //     console.log(this.$refs.count.value)
        // },
        reduce(){
            if(this.num<=1){
                return 
            }
            this.num--
        },
        add(){
            this.num++
        }
    },
    watch:{
        //将number-box的数值传递给父组件
        'num':function(newVal){
            this.$emit('func',parseInt(newVal))
        }
    }
    
}
</script>
<style lang="less" scoped>
.mui-numbox {
    height: 28px;
}

</style>


 