<template>
    <div>
        <div class="login-container">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

                <div class="title-container">
                    <h3 class="title">Signin Form</h3>
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
                <a style="color:#409EFF" @click.prevent="handleRegister">注册</a>
            </el-form>
        </div>
        <el-dialog title="注册" :visible.sync="dialogFormVisible">
            <el-form ref="regform" :rules="rules" v-model="register">
                <el-form-item label="电话号码" :label-width="'100px'">
                    <el-input v-model="register.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="'100px'">
                    <el-input v-model="register.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="'100px'">
                    <el-input type="password" v-model="register.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword" :label-width="'100px'">
                    <el-input type="password" v-model="register.repassword" autocomplete="off"></el-input>
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
import { login, register } from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(
                    new Error('The password can not be less than 6 digits')
                )
            } else {
                callback()
            }
        }
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.register.repassword !== '') {
                    this.$refs.regform.validateField('checkPass')
                }
                callback()
            }
        }
        let validatePass2 = (rule, value, callback) => {
            if (this.register.repassword === '') {
                callback(new Error('请再次输入密码'))
            } else if (this.register.repassword !== this.register.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                password: [{ validator: validatePass, trigger: 'blur' }],
                repassword: [{ validator: validatePass2, trigger: 'blur' }]
            },
            register: {
                phone: '',
                password: '',
                name: '',
                repassword: ''
            },
            dialogFormVisible: false,
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loginRules: {},
            loading: false,
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
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
                        phone: this.register.phone,
                        password: this.register.password,
                        name: this.register.name
                    }).then(res => {
                        console.log(res)
                        if (res.status === 1) {
                            this.$message.success('注册成功')
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
                        phone: this.loginForm.username,
                        email: this.loginForm.username,
                        password: this.loginForm.password
                    })
                        .then(res => {
                            // console.log(res)
                            if (res.status === 1) {
                                this.$store
                                    .dispatch('user/signin', res.data)
                                    .then(() => {
                                        this.$message({
                                            message: res.msg,
                                            type: 'success'
                                        })
                                        this.loading = false
                                        this.$router.push({
                                            path: this.redirect || '/',
                                            query: this.otherQuery
                                        })
                                    })
                            } else {
                                this.loading = false
                                this.$message.error(`登录失败:${res.msg}`)
                            }
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
</style>
