<template>
    <div class="add-car">
        <el-row>
            <el-button type="primary" icon="el-icon-arrow-left" style="margin-bottom: 10px;" @click="back()">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>填写付款信息</span>
                <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">

                <el-form-item label="关联订单:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="收款人:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="付款人:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="付款时间:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="打款方式:">
                            <el-select v-model="form.region" placeholder="请选择变速箱">
                                <el-option label="自动档" value="shanghai"></el-option>
                                <el-option label="手动档" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="11">
                        <el-form-item label="原因:">
                            <el-select v-model="form.region" placeholder="请选择变速箱">
                                <el-option label="自动档" value="shanghai"></el-option>
                                <el-option label="手动档" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="金额:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注:">
                            <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="textarea2">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check">提交</el-button>
                    <el-button type="danger" icon="el-icon-delete">重置</el-button>
                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "Payout",
        data() {
            return {
                form:{},
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