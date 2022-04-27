<template>
    <div class="login">
        <div class="container">
            <div class="w50 left">
                <div v-show="leftType === 1" class="form-body">
                    <div class="notice">
                        <h1>登录</h1>
                        <h5>输入用户名和密码</h5>
                    </div>
                    <el-form ref="loginForm"
                             status-icon
                             :rules="loginRules"
                             :model="loginForm"
                             label-width="0px">
                        <el-form-item label="" prop="account">
                            <el-input prefix-icon="el-icon-user" placeholder="请输入账号"
                                      v-model="loginForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input prefix-icon="el-icon-key" placeholder="请输入密码"
                                      v-model="loginForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <verify v-on:verifySuccess="verifySuccess=true"/>
                        </el-form-item>
                        <div class="oh mb10p">
                            <el-link class="pull-right" @click="forgetPassword()">忘记密码？</el-link>
                        </div>
                        <el-form-item class="btn mb0p">
                            <div class="d-flex justify-content-between">
                                <el-button type="primary" @click="goRegister()">注册</el-button>
                                <el-button :loading="loading"
                                           :disabled="!verifySuccess"
                                           type="primary"
                                           @click="login()">登录
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="leftType === 2" class="form-body">
                    <div class="notice">
                        <h1 class="mt0p">注册</h1>
                    </div>
                    <el-form ref="registerForm"
                             status-icon
                             :rules="registerRules"
                             :model="registerForm"
                             label-width="0px">
                        <el-form-item label="" prop="account">
                            <el-input placeholder="请输入账号" v-model="registerForm.account">
                                <template slot="prepend">
                                    <span class="c-red">* </span>账号：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input placeholder="请输入密码" v-model="registerForm.password">
                                <template slot="prepend">
                                    <span class="c-red">* </span>密码：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="phone">
                            <el-input placeholder="请输入手机号" v-model="registerForm.phone">
                                <template slot="prepend">
                                    <span class="c-red">* </span>手机号：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input placeholder="请输入姓名" v-model="registerForm.name">
                                <template slot="prepend">姓名：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input placeholder="请输入昵称" v-model="registerForm.nickname">
                                <template slot="prepend">昵称：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="btn mb0p">
                            <div class="d-flex justify-content-between">
                                <el-button type="primary" @click="backLogin()">返回</el-button>
                                <el-button :loading="loading" type="primary" @click="register()">
                                    注册
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="leftType === 3" class="form-body">
                    <div class="notice">
                        <h1 class="mt0p">忘记密码</h1>
                    </div>
                    <el-form ref="forgetPasswordForm" status-icon
                             :rules="forgetPasswordRules"
                             :model="forgetPasswordForm"
                             label-width="0px">
                        <el-form-item label="" prop="account">
                            <el-input placeholder="请输入账号" v-model="forgetPasswordForm.account">
                                <template slot="prepend">
                                    <span class="c-red">* </span>账号：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="phone">
                            <el-input placeholder="请输入手机号" v-model="forgetPasswordForm.phone">
                                <template slot="prepend">
                                    <span class="c-red">* </span>手机号：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input placeholder="请输入验证码" v-model="forgetPasswordForm.verifyCode">
                                <el-button slot="append" @click="sendVerifyCode()">
                                    {{isSendVerifyCode?countdownTime+'秒':'发送验证码'}}
                                </el-button>
                            </el-input>
                        </el-form-item>

                        <el-form-item class="btn mb0p">
                            <div class="d-flex justify-content-between">
                                <el-button type="primary" @click="backLogin()">返回</el-button>
                                <el-button :loading="loading" type="primary" @click="forgetPasswordNext()">下一步
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="leftType === 4" class="form-body">
                    <div class="notice">
                        <h1 class="mt0p">修改密码</h1>
                    </div>
                    <el-form ref="changePasswordForm" status-icon
                             :rules="changePasswordRules"
                             :model="changePasswordForm"
                             label-width="0px">
                        <el-form-item label="" prop="password">
                            <el-input placeholder="请输入新密码" type="password" v-model="changePasswordForm.password">
                                <template slot="prepend">
                                    <span class="c-red">* </span>新密码：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="newPassword">
                            <el-input placeholder="请重复密码" type="password" v-model="changePasswordForm.newPassword">
                                <template slot="prepend">
                                    <span class="c-red">* </span>重复密码：
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="btn mb0p">
                            <div class="d-flex justify-content-between">
                                <el-button type="primary" @click="backForgetPassword()">返回</el-button>
                                <el-button :loading="loading" type="primary" @click="submitChangePassword()">确定
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="w50 right">
                <div class="logo-body">
                    <!-- <img src="" alt="" class="logo">-->
                    <i class="el-icon-office-building f50"></i>
                    <div class="name">{{CONFIG.COMPANY_NAME}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import verify from '../../components/verify'
    import { types } from '../../store/mutation-types'

    export default {
        components: {
            verify,
        },
        data() {
            const checkPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入手机号'))
                } else if (!(/^1(3|4|5|7|6|8|9)\d{9}$/.test(value))) {
                    callback(new Error('输入的号码不符合规范，请输入11位手机号!'))
                } else {
                    callback()
                }
            }

            return {
                leftType: 1,
                loginForm: {
                    account: '',
                    password: '',
                },
                registerForm: {
                    account: '',
                    password: '',
                    phone: '',
                    name: '',
                    nickname: '',
                },
                forgetPasswordForm: {
                    account: '',
                    verifyCode: '',
                    phone: '',
                },
                changePasswordForm: {
                    password: '',
                    newPassword: '',
                },
                verifySuccess: false,
                loading: false,
                loginRules: {
                    account: [
                        {
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            message: '长度不能小于 6 个字符',
                            trigger: 'blur'
                        },
                    ],
                },
                registerRules: {
                    account: [
                        {
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            message: '长度不能小于 6 个字符',
                            trigger: 'blur'
                        },
                    ],
                    phone: [
                        {
                            validator: checkPhone,
                            trigger: 'blur'
                        },
                    ],
                },
                forgetPasswordRules: {
                    account: [
                        {
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                    ],
                    phone: [
                        {
                            validator: checkPhone,
                            trigger: 'blur'
                        },
                    ],
                },
                changePasswordRules: {
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                    ],
                    newPassword: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                    ],
                },
                isSendVerifyCode: false,
                countdownTime: 60
            }
        },
        methods: {
            submitChangePassword() {
                this.$refs['changePasswordForm'].validate((valid) => {
                })
            },
            forgetPasswordNext() {
                this.leftType = 4
            },
            sendVerifyCode() {
                this.$refs['forgetPasswordForm'].validate((valid) => {
                    if (valid) {
                        if (!this.isSendVerifyCode) {
                            this.isSendVerifyCode = true
                            const inter = setInterval(() => {
                                if (this.countdownTime < 1) {
                                    this.isSendVerifyCode = false
                                    this.countdownTime = 60
                                    clearInterval(inter)
                                } else {
                                    this.countdownTime--
                                }
                            }, 1000)
                        }
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                    return false
                })
            },
            login() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        // 管理员账号
                        if (this.loginForm.account === this.CONFIG.ADMIN_ACCOUNT
                            && this.loginForm.password === this.CONFIG.ADMIN_PASSWORD) {
                            this.$store.commit(types.SET_TOKEN, 'adfasddfdsfadfads')
                            this.$store.commit(types.SET_USERINFO, {
                                account: this.CONFIG.ADMIN_ACCOUNT,
                                password: this.CONFIG.ADMIN_PASSWORD,
                                username: 'Admin',
                                avatar: 'https://i.loli.net/2018/08/18/5b7819891bab1.jpg',
                            })
                        } else {
                            this.$store.commit(types.SET_TOKEN, 'adfasddfdsfadfads')
                        }
                        this.$router.push({ path: '/' })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                    return false
                })
            },
            forgetPassword() {
                this.leftType = 3
                this.$refs['loginForm'].resetFields()
                this.$refs['registerForm'].resetFields()
            },
            goRegister() {
                this.leftType = 2
                this.$refs['loginForm'].resetFields()
                this.$refs['registerForm'].resetFields()
            },
            register() {
                this.$refs['registerForm'].validate((valid) => {
                    if (valid) {
                        console.log('submit!!')
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                    return false
                })
            },
            backLogin() {
                this.leftType = 1
                this.$refs['loginForm'].resetFields()
                this.$refs['registerForm'].resetFields()
            },
            backForgetPassword() {
                this.leftType = 3
                this.$refs['forgetPasswordForm'].resetFields()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/color.scss";

    .login {
        background: $bg-color;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .container {
            display: flex;
            width: 800px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 2px 20px 7px rgba(195, 193, 193, 0.25) !important;

            h5 {
                color: #999;
            }

            .form-body {
                padding: 40px;
            }

            .logo-body {
                height: 100%;
                background: $main-color;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #ffffff;

                .name {
                    margin-top: 20px;
                    font-size: 32px;
                }
            }
        }
    }
</style>
