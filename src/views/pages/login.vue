<template>
    <div class="login">
        <div class="container">
            <el-row>
                <el-col :span="12">
                    <div v-if="!isRegister" class="form-body">
                        <div class="notice">
                            <h1>登录</h1>
                            <h5>输入用户名和密码</h5>
                        </div>
                        <el-form ref="form" :model="form" label-width="0px">
                            <el-form-item label="">
                                <el-input prefix-icon="el-icon-user" v-model="form.account"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input prefix-icon="el-icon-key" v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item class="btn ">
                                <div class="d-flex justify-content-between">
                                    <el-button type="primary" @click="register()">注册</el-button>
                                    <el-button :loading="loading" :disabled="!verifySuccess" type="primary"
                                               @click="login()">登录
                                    </el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-else class="form-body">
                        <el-form ref="form" :model="form" label-width="0px">
                            <el-form-item label="">
                                <el-input prefix-icon="el-icon-user" v-model="form.account"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input prefix-icon="el-icon-key" v-model="form.password"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>

                </el-col>
                <el-col :span="12">
                    2
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import verify from '@/components/verify'

    export default {
        data() {
            return {
                form: {},
                isRegister: false
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
            width: 600px;
            height: 350px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 2px 20px 7px rgba(195, 193, 193, 0.25) !important;

            .form-body {
                padding: 40px;
            }
        }
    }
</style>
