<template>
    <div class="login-page">
        <el-tooltip class="svg-github" effect="dark" content="Fork Me" placement="bottom">
            <a href="https://github.com/Sakuyakun/vue-eden">
                <icon name="github" :scale="2.5"></icon>
            </a>
        </el-tooltip>

        <div class="login-wrap">
            <el-col :class="translateLeft" :span="10">

                <div v-if="notforget">
                    <div class="logo">
                        <icon name="tree" :scale="6"></icon>
                        <div class="title">
                            <a>
                                <span>TTent</span><span class="subtitle">au</span>
                            </a>
                        </div>
                    </div>

                    <div class="login-form">
                        <el-form   ref="ruleForm">
                            <el-form-item prop="username">
                                <el-input v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <verify v-on:verifySuccess="verifySuccess=true"/>
                            </el-form-item>
                            <el-form-item class="btn">
                                <el-button :loading="loading" :disabled="!verifySuccess" type="primary" @click="login()">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div class="login-footer">
                        <el-col :span="12">
                            <el-checkbox v-model="remember" name="type">记住密码</el-checkbox>
                        </el-col>
                        <el-col class="forgetpwd" :span="12">
                            <span @click="wrapSwitch(false)">忘记密码</span>
                        </el-col>
                    </div>
                </div>

                <div v-else>
                    <div class="title forgetwrap-title">
                        <a>
                            <span>TTent</span><span class="subtitle">au</span>
                        </a>
                    </div>
                    <div class="forget-form">
                        <el-form  ref="forgetRuleForm">
                            <el-form-item>
                                <el-input v-model="forgetForm.email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="forgetForm.code"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="password" v-model="forgetForm.newPassword"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="password" v-model="forgetForm.confirmPassword"></el-input>
                            </el-form-item>
                            <el-form-item class="btn">
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-button @click="wrapSwitch(true)" type="primary">
                                            返回
                                        </el-button>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-button @click="forgetHandle" type="primary">登录
                                        </el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

            </el-col>

            <el-col :class="translateRight" :span="14">
                <div class="wallpaper"></div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import verify from '@/components/verify'

    export default {
        name: 'login',
        components: {verify},
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: ''
                },
                remember: true,
                loading: false,
                switchLeft: false,
                switchRight: false,
                notforget: true,
                verifySuccess: false,
                forgetForm: {
                    email: '',
                    newPassword: '',
                    confirmPassword: ''
                },
            }
        },
        computed: {
            translateLeft() {
                return {
                    'translate-left': true,
                    'login-col': true,
                    'switch-left': this.switchLeft
                }
            },
            translateRight() {
                return {
                    'translate-right': true,
                    'login-col': true,
                    'switch-right': this.switchLeft
                }
            }
        },
        methods: {
            wrapSwitch(state) {
                this.switchLeft = !this.switchLeft
                this.switchRight = !this.switchRight
                setTimeout(() => {
                    this.notforget = state
                    this.$refs['ruleForm'].resetFields()
                }, 300)
            },
            login() {
                this.loading = true
                this.$store.commit('setToken','adfasddfdsfadfads')
                this.$router.push({path: '/'})
            },
            forgetHandle() {
                this.$message.success('忘记密码')
                this.wrapSwitch(true)
            },
        }
    }
</script>

<style lang="scss">
    .forget-form, .login-form {
        .el-form-item__content {
            line-height: 40px
        }

        .el-input__inner {
            padding-top: 2px;
            height: 40px;
            line-height: 40px;
        }

    }

    .btn button {
        width: 100%;
        padding: 12px 20px;
    }


</style>

<style lang="scss" scoped>
    @import "../../assets/scss/color";

    .login-col {
        height: 100%;
    }

    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 100%;

        .lang {
            position: absolute;
            right: 59px;
            top: 24px;
        }

        .svg-github {
            position: absolute;
            right: 29px;
            top: 25px;
        }

        .translate-left, .translate-right {
            will-change: auto;
            transform: translateX(0px);
            transition: transform .6s ease-in-out;
        }

        .switch-left {
            transform: translateX(525px);
        }

        .switch-right {
            transform: translateX(-375px);
        }
    }

    .login-wrap {
        overflow: hidden;
        width: 900px;
        height: 430px;
        background: white;
        border-radius: 4px;
        transform: translateY(-10px);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

        .logo {
            padding-top: 26px;
            text-align: center;
        }

        .title {
            font-weight: bold;
            color: $main-color;
            padding-top: 8px;
            font-size: 22px;

            a {
                cursor: cell;
            }

            a:before {
                content: '[';
                opacity: 0;
                margin-right: 10px;
                transform: translateX(-10px);
                transition: transform .2s, opacity .2s;
            }

            a:after {
                content: ']';
                opacity: 0;
                margin-left: 10px;
                transform: translateX(10px);
                transition: transform .2s, opacity .2s;
            }

            a:hover:after {
                opacity: 1;
                transform: translateX(0);
            }

            .subtitle {
                color: $sub-color;
            }
        }

        .forgetwrap-title {
            padding-top: 30px;
            padding-left: 15px;
        }

        .forget-form {
            padding: 20px 30px 30px;
            padding-bottom: 0;
        }

        .login-form {
            padding: 30px;
            padding-bottom: 0;
        }

        .login-footer {
            padding: 0 30px;

            .forgetpwd {
                text-align: right;

                span {
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    color: #606266;
                }
            }
        }

        .wallpaper {
            width: 100%;
            height: 100%;
            background: url('../../assets/images/loginwallpaper.jpg');
            background-size: cover;
            position: relative;
        }
    }

</style>
