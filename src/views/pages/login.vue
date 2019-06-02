<template>
    <div class="login">
        <div class="container">
            <div class="w50 left">
                <div v-show="!isRegister" class="form-body">
                    <div class="notice">
                        <h1>登录</h1>
                        <h5>输入用户名和密码</h5>
                    </div>
                    <el-form ref="loginForm" status-icon :rules="loginRules" :model="loginForm" label-width="0px">
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
                        <el-form-item class="btn mb0p">
                            <div class="d-flex justify-content-between">
                                <el-button type="primary" @click="goRegister()">注册</el-button>
                                <el-button :loading="loading" :disabled="!verifySuccess" type="primary"
                                           @click="login()">登录
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="isRegister" class="form-body">
                    <div class="notice">
                        <h1 class="mt0p">注册</h1>
                    </div>
                    <el-form ref="registerForm" status-icon :rules="registerRules" :model="registerForm"
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
                                <el-button :loading="loading" type="primary" @click="register()">注册</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="w50 right">
                <div class="logo-body">
                    <!-- <img src="" alt="" class="logo">-->
                    <i class="el-icon-office-building f50"></i>
                    <div class="name">Vue-Admin</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import verify from '@/components/verify'

    export default {
        components: {
            verify
        },
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入手机号'))
                } else if (!(/^1(3|4|5|7|6|8|9)\d{9}$/.test(value))) {
                    callback(new Error('输入的号码不符合规范，请输入11位手机号!'))
                } else {
                    callback()
                }
            }

            return {
                loginForm: {
                    account:'',
                    password:'',
                },
                registerForm: {
                    account:'',
                    password:'',
                    phone:'',
                    name:'',
                    nickname:'',
                },
                isRegister: false,
                verifySuccess: false,
                loading: false,
                loginRules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '长度不能小于 6 个字符', trigger: 'blur'}
                    ],
                },
                registerRules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '长度不能小于 6 个字符', trigger: 'blur'}
                    ],
                    phone: [
                        {validator: checkPhone, trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            login() {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.$store.commit('setToken','adfasddfdsfadfads')
                        this.$router.push({path: '/'})
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            goRegister() {
                this.isRegister = true
                this.$refs['loginForm'].resetFields();
                this.$refs['registerForm'].resetFields();
            },
            register() {
                this.$refs['registerForm'].validate((valid) => {
                    if (valid) {
                        alert('submit!')
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            backLogin() {
                this.isRegister = false
                this.$refs['loginForm'].resetFields();
                this.$refs['registerForm'].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/color.scss";

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
