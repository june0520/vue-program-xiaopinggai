<template>
    <div class="reginter-container">
        <div class="r_con fr">
            <div class="res_title">
                <h1 class="fl">用户注册</h1>
                <router-link :to="{name: 'member'}" class="fr">登录</router-link>
            </div>
            <div class="res_form">
                <form action="#">
                    <ul>
                        <li>
                            <label for="user_name">用户名:</label>
                            <input type="text" name="user_name" id="user_name" required autofocus v-model="name" @change="checkName">
                            <span class="error_tip">提示信息</span>
                        </li>
                        <li>
                            <label for="pwd">密码:</label>
                            <input type="password" name="pwd" id="pwd" required v-model="pwd" @change="checkPwd"> 
                            <span class="error_tip">提示信息</span>
                        </li>

                        <li>
                            <label for="cpwd">确认密码:</label>
                            <input type="password" name="cpwd" id="cpwd" required v-model="cpwd" @change="checkCpwd">
                            <span class="error_tip">提示信息</span>
                        </li>
                        <li>
                            <label for="email">邮箱:</label>
                            <input type="text" name="email" id="email" required v-model="email" @change="checkEmail"> 
                            <span class="error_tip">提示信息</span>
                        </li>
                        <li class="argument">
                            <input type="checkbox" name="allow" id="allow" checked="checked" @change="checkAllow" ref="checked">
                            <label for="allow">同意”用户使用协议“</label>
                            <span class="error_tip2" id='allow' ref="allow">请勾选同意</span>
                        </li>
                        <li class="res_sub">
                            <input type="submit" value="注册" class="register_btn">
                        </li>
                    </ul>
                </form>
            </div>

        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            name: '',
            pwd: '',
            cpwd: '',
            email: ''
        }
    },
    methods: {
        checkName(){
            var re = /[\u4e00-\u9fa5\w]{4,10}/
            if(re.test(this.name)){
                return
            } else{
                Toast('请输入由汉字，字母，数字，及下划线构成的4-14位用户名')
            }
        },
        checkPwd(){
            var re = /\w{6,16}/
            if(re.test(this.pwd)){
                return
            } else {
                Toast('请输入由，字母，数字，及下划线构成的6-16位密码')
            }
        },
        checkCpwd(){
            if(this.cpwd!==this.pwd){
                Toast({
                    message: '两次输入密码不一致，请重新输入',
                    position: 'middle',
                    duration: 1000
                })
            }

        },
        checkEmail(){
            var re = /[\w]+@[\w]{2,3}\.[a-z]{2,3}$/
            if(re.test(this.email)){
                return 
            } else {
                Toast({
                    message: '请输入正确的邮箱格式',
                    position: 'middle',
                    duration: 1000
                })
            }
        },
        checkAllow(e){
            console.log(e.target.checked)
            if(!e.target.checked){
                this.$refs.allow.style.display='block'
            } else {
                this.$refs.allow.style.display='none'
            }
        }
    }
}
</script>
<style lang="less" scoped>
.reginter-container {
    text-align:left;
}
.r_con {
    width: 100%;
    height:5rem;
}
.res_title {
    width: 95%;
    height: .5rem; 
    margin: 0 .2rem; 
    border-bottom: 1px solid #e0e0e0;
    display:flex;
    justify-content: space-between;
}
.res_title h1 {
    height: .5rem;
    line-height: 50px;
    font-size:24px;
    color:#a8a8a8;
    font-weight: 700;
}
.res_title a {
    font-size: 16px;
    color: #37ab40;
    height: .2rem;
    line-height: 20px;
    padding-right: 20px;
    // background: url(../images/icons02.png) 35px 3px no-repeat;
    margin-top: 15px;

}
.res_form {
    height: 4.2rem;
    width: 95%;
    margin: .2rem 0 0 .2rem;

}
.res_form li {
    height: .7rem;
    width: 100%;

}
.res_form li label {
    width: .55rem;
    height: .4rem;
    float:left;
    line-height: 40px;
    font-size: 12px;
    color: #a8a8a8;
}
.res_form li input {
    float: left;
    width: 2.8rem;
    height: .38rem;
    outline: none;
    border: 1px solid #e0e0e0;
    background-color: #f8f8f8;
    text-indent: 10px;
}
.res_form li span {
    margin-left: 70px;
    font-size:12px;
    color: #c40000;
    height: .3rem;
    line-height: 30px;
    display: none;
}
.res_form .argument input{
    width: 15px;
    height: 15px;
    float: left;
    margin-top: 13px;
}
.res_form .argument label {
    height: .4rem;
    width: 3rem;
    float: left;
    margin-left: 10px;
}
.res_form .argument  span {
    float: left;
    margin-left: 0;
    height: .2rem;
    line-height: 20px;

    
}
.res_form .res_sub  input{
    width: 95%;
    height: .4rem;
    color: #fff;
    background-color: #32d3eb ;
    font-size: 18px;
    cursor: pointer;
}
.register_btn {
    background-color: #32d3eb ;
}

</style>
