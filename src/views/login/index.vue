<template>
    <div>
        <div class="login-container">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
                <div class="title-container">
                    <h3 class="title">Signin</h3>
                </div>
                <el-form-item prop="username">
                    <span class="svg-container">
                        <svg-icon icon-class="user" />
                    </span>
                    <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
                </el-form-item>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
                <a style="color:#409EFF" @click.prevent="handleRegister">商家注册</a>
            </el-form>
        </div>
        <el-dialog title="注册" class="dialog" :visible.sync="dialogFormVisible">
            <el-form ref="regform" :rules="rules" v-model="register">
                <el-form-item label="邮箱" :label-width="'100px'">
                    <el-input v-model="register.userAccount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="'100px'">
                    <el-input v-model="register.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="'100px'">
                    <el-input type="password" v-model="register.userPassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="toRegister">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login, register } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/auth'
import aesUtil from '@/utils/aes'
export default {
    name: 'Login',
    data() {
        return {
            rules: {},
            register: {
                userAccount: '',
                userName: '',
                userPassword: ''
            },
            dialogFormVisible: false,
            loginForm: {
                username: '123',
                password: '12345'
            },
            loginRules: {},
            loading: false,
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        handleRegister() {
            this.dialogFormVisible = true
        },
        toRegister() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    register({
                        userAccount: this.register.userAccount,
                        userPassword: this.register.userPassword,
                        userName: this.register.userName,
                        userType: 2
                    }).then(res => {
                        if (res.resultCode === 'Success') {
                            this.$message.success(res.msg)
                            this.dialogFormVisible = false
                        }
                    })
                }
            })
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    login({
                        userAccount: this.loginForm.username,
                        userPassword: aesUtil.encrypt(this.loginForm.password)
                    })
                        .then(res => {
                            // console.log(res)
                            if (res.resultCode === 'Success') {
                                window.sessionStorage.setItem('token', res.dataSet.token)
                            } else {
                                this.$message.error(`登录失败:${res.msg}`)
                            }
                            this.$router.push(this.$route.redirect || '/')
                            this.loading = false
                        })
                        .catch(err => {
                            this.loading = false
                            console.log(err)
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    background-image: url('');
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
.dialog {
    /deep/.el-dialog {
        width: 500px;
    }
}
</style>
