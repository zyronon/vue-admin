<template>
    <div class="Create">
        <el-row class="mb20p">
            <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新建申请</span>
                <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">
                <el-form-item label="编号:">
                    <el-select v-model="value" placeholder="请选择" :change="changeType()">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编号:">
                    XXSDFSFGEW34FSF32
                </el-form-item>
                <el-form-item label="标题:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="正文:">
                            <input type="file">
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="附件:">
                            <input type="file">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="事由:">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 7}"
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </el-form-item>
                <el-form-item label="审批流程:">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请人:">
                    TTentau
                </el-form-item>
                <el-form-item label="申请人所在部门:">
                    TTentau
                </el-form-item>
                <el-form-item label="申请时间:">
                    2019-10-10 11:11
                </el-form-item>
            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check" style="margin-bottom: 10px;">提交</el-button>
                    <el-button @click="$router.push('detail')" type="success" icon="el-icon-check" style="margin-bottom: 10px;">预览
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" style="margin-bottom: 10px;">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Create",
        components: {},
        data() {
            return {
                textarea2:"",
                form:{},
                options: [{
                    value: '1',
                    label: '普通申请'
                }, {
                    value: '2',
                    label: '党委发文申请'
                }, {
                    value: '3',
                    label: '党委收文申请'
                }, {
                    value: '4',
                    label: '行政发文申请'
                }, {
                    value: '5',
                    label: '行政收文申请'
                }, {
                    value: '6',
                    label: '纪委发文申请'
                }, {
                    value: '7',
                    label: '纪委收文申请'
                }, {
                    value: '8',
                    label: '对外支付证书申请'
                }, {
                    value: '9',
                    label: '合同审签申请'
                }, {
                    value: '10',
                    label: '用印申请'
                }],
                value: ''
            }
        },
        created() {

        },
        methods: {
            changeType(){
                console.log(2)
            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>