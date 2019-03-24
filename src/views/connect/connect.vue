<template>
    <div class="connect-container">
        <narbar :title='title'></narbar>
        <h4>联系方式：</h4>
        <pre v-text="msg"></pre>
    </div>
</template>
<script>
export default {
    data(){
        return {
            title: 'wechat',
            msg: '',
            n: 0,
            code: `let arr = [8, 2, 1, 0, 5, 6],
    index = [
        2, 0, 5, 2, 3, 2, 1, 3, 4, 1, 2
    ],
    tel = '';
index.forEach(element => {
    tel += arr[element]
})
console.log('WeChat：' + tel);`

        }
    },
    methods: {
        loop(){
            if(this.n < this.code.length-1){
                setTimeout(() => {
                    this.msg += this.code.slice(this.n, this.n+1)
                    this.n++
                    this.loop()
                },80)
            }
            return 
        }
    },
    created(){
        this.loop()
    }
    
}
</script>
<style lang="less" scoped>
.connect-container {
    text-align: left;
    h4 {
        margin: 30px 0 0 6px; 
        font-size: 18px;
        font-weight: 700;
    }
    pre{
        margin: 16px auto;
        font-size: 18px;
        font-weight: 700;
        line-height: 30px;
        color: #000;
    }
}

    
</style>
