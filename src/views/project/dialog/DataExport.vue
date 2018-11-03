<template>
    <div class="DataExport">
        <el-dialog
                title="资料导出"
                :visible.sync="isVisible"
                width="20%"
                :before-close="close">
            <el-form ref="form" label-width="180px" label-position="left">
                <el-form-item label="项目基本资料:" required>
                    <el-button type="primary" @click="submit()">导出</el-button>
                </el-form-item>
                <el-form-item label="项目规划：" required>
                    <el-button type="primary" @click="submit()">导出</el-button>
                </el-form-item>
                <el-form-item label="项目执行：" required>
                    <el-button type="primary" @click="submit()">导出</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close()">取 消</el-button>
                <el-button type="primary" @click="submit()">全部导出</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DataExport",
        props: ['isVisible'],
        components: {},
        data() {
            return {}
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

<style scoped lang='scss'>

</style>