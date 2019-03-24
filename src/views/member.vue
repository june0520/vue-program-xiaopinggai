<template>
    <div class="menber">
        <!-- <narbar :title = "title"></narbar> -->
        <div class="login_form">
            <div class="loginAndRes">
                <h1>会员登录</h1>
                <router-link :to="{name: 'register'}" class="register fl">立即注册</router-link>
            </div>
            <form class="form">
                <div class="form_input">
                    <input type="text" class="login_name" placeholder="请输入用户名" v-model="name" @change="checkName" required>
                    <div class="user_error">输入错误</div>
                    <input type="password" class="login_pwd" placeholder="请输入密码" v-model="pwd" @change="checkPwd" required>
                    <div class="pwd_error">输入错误</div>
                </div>
                <div class="more_input clearfix">
                    <input type="checkbox" class="fl" id="remember">
                    <label class="fl remember" for='remember'>记住用户名</label>
                    <a href="#" class="fr">忘记密码</a>
                </div>
                <input type="submit" value="登录" class="login_btn">
            </form>

        </div>

    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            title: '会员',
            name: '',
            pwd: '',
        }
    },
    methods: {
        checkName(){
        },
        checkPwd(){
        }
    }
}


</script>
<style lang="less" scoped>
.fl {
    float: left;
}
.fr {
    float: right;
}
.login_form {
    width: 3.68rem;
    height: 3.80rem;
    background-color: #fff;
    margin-top: .3rem;
    
}
.loginAndRes {
    width: 308px;
    height: 50px;
    margin:30px 0 0 30px;
    border-bottom: 1px solid #c6c6c5;
}
.loginAndRes h1{
    font-size: 24px;
    color: #a8a8a8;
    font-weight:bold;
    text-indent: 34px;
    float: left;
}
.loginAndRes .register {
    display: block;
    width: 100px;
    height: 20px;
    color: #32d3eb ;
    font-size: 16px;
    margin: 6px 0 0 36px;
    text-indent:26px;
    // background: url(../images/icons02.png)0 2px no-repeat;
    

}
/* form表单input输入框部分 */
.form {
    padding: 0 30px ;
    position: relative;

}
.form_input {
    width: 3.10rem;
    height: 1.35rem;
    margin-top:18px;
    position: relative;
    color: #a9a9a9;


}
.login_name,
.login_pwd {
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
    text-indent: 10px;
    height: .38rem;
    width: 3.06rem;
    border: 1px solid #e0e0e0;
    // background:  #f8f8f8 url(../images/icons02.png) 270px -42px no-repeat;
    font-size: 16px;
}
.login_pwd {
    top: 65px;
    background-position: 2.7rem -94px;

}
.form_input .user_error,.pwd_error {
    font-size:12px;
    color: #ff5400;
    margin-top:9px;
    height: 18px;
    position: absolute;
    left: 0;
    top: 38px;
    display: none;
    
}
.pwd_error {
    top: 102px;
}

.remember {
    font-size:12px;
    color: #4b4b4b;
    text-indent: 10px;

}
.more_input a:hover {
    color: #f80;
}
.login_btn {
    width: 308px;
    height: 40px;
    color: #fff;
    background-color: #32d3eb ;
    margin-top: 30px;
    font-size: 22px;
    font-weight: 700;
    cursor: pointer;

}
.mui-btn-blue, .mui-btn-primary, input[type=submit] {
    border: none;
}
a {
    color: #32d3eb;
}

</style>

