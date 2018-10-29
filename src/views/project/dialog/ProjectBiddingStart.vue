<template>
    <div class="ProjectBiddingStart">
        <el-dialog
                title="竞标启动"
                :visible.sync="isVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="150px" label-position="left">
                <el-form-item label="标前分析会会议纪要:">
                    <input type="file">
                </el-form-item>
                <el-form-item label="资信输申请表:">
                    <input type="file">
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('close')">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProjectBiddingStart",
        props: ['isVisible'],
        data() {
            return {
                form: {},
            }
        },
        created() {
        },
        methods: {
            submit() {
                //do something
                console.log('这里是项目竞标弹窗的submit事件')
                this.$emit('close')
            },
            handleClose(done) {
                this.$emit('close')
            }
        },
        filter: {},
    }
</script>

<style scoped land='scss'>

</style>