<template>
    <div class="number-box">
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click='reduce'>-</button>
            <input id="test" class="mui-input-numbox" type="number" :value='num' readonly/>
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click='add'>+</button>
		</div>  
    </div>
</template>
<script>
export default {
    data(){
        return {
            num:this.$store.getters.getIdAndCount[this.id]
        }
    },
    props: ['id'],
    methods:{
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
    watch: {
        'num':function(newVal){
            var obj = {id: this.id,count: newVal}
            this.$store.commit('updateCount',obj)
        }
    } 
}
</script>
<style lang="less" scoped>
.mui-numbox {
    height: 28px;
}

</style>