<template>
    <div class="ProjectStop">
        <el-dialog
                title="项目终止"
                :visible.sync="isVisible"
                width="30%"
                :before-close="close">
            <el-form ref="form" label-width="180px" label-position="left">
                <el-form-item label="停止原因:" required>
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="txetarea">
                    </el-input>
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
        name: "ProjectStop",
        props: ['isVisible'],
        components: {},
        data() {
            return {
                txetarea:""
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

<style scoped lang='scss'>

</style>