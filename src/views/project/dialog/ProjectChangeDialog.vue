<template>
    <div class="ProjectChange">
        <el-dialog
                title="项目基本信息变更"
                :visible.sync="isVisible"
                width="30%"
                :before-close="close">
            <el-form ref="form" label-width="180px" label-position="left">
                <el-form-item label="公司编号：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目名字：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="预算金额：">
                    <span>1000</span>
                </el-form-item>
                <el-form-item label="发起人：">
                    <span>TTentau</span>
                </el-form-item>
                <el-form-item label="发起时间：">
                    <span>2018-11-11 11:11:11</span>
                </el-form-item>
                <el-form-item label="发起人：">
                    <span class="clickable">立项申请表.docx</span>
                    <el-button class="el-button ml10p" type="primary" size="mini">重新上传</el-button>
                </el-form-item>
                <el-form-item label="标前分析会会议纪要：" required>
                    <input type="file" @change="fileChange($event,1)">
                </el-form-item>
                <el-form-item label="资信输申请表：" required @change="fileChange($event,2)">
                    <input type="file">
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProjectChangeDialog",
        props: ['isVisible'],
        data() {
            return {
                form: {}
            }
        },
        created() {

        },
        methods: {
            close() {
                this.$emit('close')
            },
            submit() {
                this.close()
            },
            fileChange() {

            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped land='scss'>

</style>