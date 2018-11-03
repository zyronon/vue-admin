<template>
    <div class="Settlement">
        <el-dialog
                title="结算"
                :visible.sync="isVisible"
                width="30%"
                :before-close="close">
            <el-form ref="form" label-width="180px" label-position="left">
                <el-form-item label="结算报告:" required>
                    <input type="file" @change="fileChange($event,1)">
                </el-form-item>
                <el-form-item label="项目总结会会议纪要:" required @change="fileChange($event,2)">
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
        name: "Settlement",
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