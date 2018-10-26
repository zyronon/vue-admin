<template>
    <div class="add-car">
        <el-row>
            <el-button type="primary" icon="el-icon-arrow-left" style="margin-bottom: 10px;" @click="back()">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>填写订单信息</span>
                <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">

                <h2 style="text-align: center;">车主信息</h2>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="车主:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="身份证号:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="电话:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="签订日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <h2 style="text-align: center;">租客信息</h2>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="租客:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="身份证号:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="电话:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="签订日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>


                <h2 style="text-align: center;">车辆相关资料</h2>


                <el-row>
                    <el-table :data="rows" style="width: 100%" border stripe v-loading="listLoading">
                        <el-table-column fixed prop="CarOwnerName" label="序号"></el-table-column>
                        <el-table-column prop="LicensePlateNumber" label="车辆所有人">
                        </el-table-column>
                        <el-table-column prop="CarBrand" label="车牌号"></el-table-column>
                        <el-table-column prop="CarType" label="车辆型号"></el-table-column>
                        <el-table-column prop="CanRentTime" label="车架号"></el-table-column>
                        <el-table-column prop="CreationTime" label="发动机号"></el-table-column>
                        <el-table-column prop="IsRent" label="出厂日期"></el-table-column>
                        <el-table-column prop="IsRent" label="是否抵押"></el-table-column>
                        <el-table-column prop="IsRent" label="油品"></el-table-column>
                    </el-table>
                </el-row>

                <h2 style="text-align: center;">租期</h2>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="开始日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="截止日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>


                <h2 style="text-align: center;">交车和年检</h2>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="交车时间:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="年检日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>


                <h2 style="text-align: center;">保险有效期</h2>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="开始日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="截止日期:">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <h2 style="text-align: center;">费用</h2>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="租金:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="总押金:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="管理费用:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="交租日期:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="定金:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="业务员姓名:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注:">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </el-form-item>

            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check" style="margin-bottom: 10px;">提交</el-button>
                    <el-button type="danger" icon="el-icon-delete" style="margin-bottom: 10px;">重置</el-button>
                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "CreateOrder",
        data() {
            return {
                rows: [],
                listLoading: false,
                checked: '',
                textarea2: '',
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                input: '',
                employee: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
            },
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>