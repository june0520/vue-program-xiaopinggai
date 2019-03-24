<template>
    <div class="chat-container">
        <div class="wrap" ref="wrap">
            <div  v-for="(item, index) in list" :key="index" :class="{'me': 'question','AI':'replay'}[item.target]" >
                <!-- 判断消息来源显示不同头像 -->
                <img src="../../assets/images/human.jpg" alt="" v-if="item.header">
                <img src="../../assets/images/dog.jpg" alt="" v-if="!item.header">
                <div class="content-wrap">
                    <p>{{item.time | dateFormat}}</p>
                        <span class="span-wrap">{{item.content}}</span>
                </div>
            </div>
            <img src="../../assets/images/loadding1.gif" alt="" v-if='flag' class='loading'>
        </div>

        <!-- 下方输入框 -->
        <div class="input-wrap">
            <input type="text" v-model="q" @keyup.enter="getReplay" class='input'>
            <mt-button size="small" type="primary" class='btn' @click="getReplay">发送</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            q: '',
            flag: false,
            top: 0,
            question: ''
        }
    },methods: {
        getReplay(){
            // 用中间变量接受q,将输入框及时清空
            this.question = this.q
            this.list.push({ target: 'me', content: this.q, time: new Date(), header: true})
            this.q = ''

            // 在有输入内容时将页面滚到最底部
            this.$nextTick(()=>{
                this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight;
            })
            this.flag = true
            this.$axios.get("/api/api.php?key=free&appid=0&msg="+this.question).then(result => {
                this.q = ''
                this.flag= false
                this.list.push({ target: 'AI', content: result.data.content, time:new Date(),header: false})

                // 在有输入内容时将页面滚到最底部
                this.$nextTick(()=>{
                    this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight;
                })
                // 储存到本地LocalStorage中
                localStorage.setItem('msg',JSON.stringify(this.list))
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.list = JSON.parse(localStorage.getItem('msg') || '[]')
        // 再页面完全加载的后滚动页面到最底下

        this.$nextTick(()=>{
            this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight;
        })
    }
}
</script>
<style lang="less" scoped>
.chat-container {
    text-align: left;
    .wrap {
        position: absolute;
        top:50px;
        left: 0;
        right: 0;
        bottom: 90px;
        overflow: auto;
    }
    .replay{
        margin-top: 8px;
        padding: 8px, 8px;
        text-align: left;
        color:red;
        display: flex;
        justify-content: left;
        overflow: hidden;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin:  0 10px 5px 15px;
        }
        p {
            font-size: 12px;
        }
        span {
            display: block;
            background-color: cyan;
            border-radius: 20px;
            padding:4px 10px;
            margin: 5px 0 0 0 ;
            width: 250px;
            font-size: 16px;
        }
    }
    .question {
        margin-top: 8px;
        padding: 8px, 8px;
        color:#333;
        text-align: right;
        overflow: hidden;
        img {
            float: right;
            margin-right: 8px;
            width: 40px;
            border-radius: 50%;
        }
        .content-wrap {
            float: right;
            width: 250px;
            margin-right: 10px;
        }
        p {
            font-size: 12px;
            margin: 5px 0 5px 0 ;
        }
        span {
            line-height: 20px;
            padding:4px 10px;
            font-size: 16px;
            text-align: left;
            border-radius: 20px;
            font-size: 16px;
            background-color: orange;
            display: block;
            word-wrap: break-word;
        }
    }
    .loading {
        height: 50px;
        border: none;
        margin-left: 20px;
    }
    .input-wrap {
        display: flex;
        position: fixed;
        bottom:50px;
        left: 0;
        width: 100%;
        margin: 2px;
        .input {
            flex: 7;
            margin: 0;
            padding: 0;
            border: 1px solid #ccc;
            outline: none;
            .btn {
                flex: 3;
            }
            .mint-button --small {
                height: 40px;
            }
        }
    }
}
</style>
 