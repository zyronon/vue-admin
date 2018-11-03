<template>
    <div class="Winningbid">
        <el-dialog
                title="中标"
                :visible.sync="isVisible"
                width="30%"
                :before-close="close">
            <el-form ref="form" label-width="180px" label-position="left">
                <el-form-item label="项目启动会议纪要:" required>
                    <input type="file" @change="fileChange($event,1)">
                </el-form-item>
                <el-form-item label="前置条件办理申请表:" required @change="fileChange($event,2)">
                    <input type="file">
                </el-form-item>
                <el-form-item label="合同办理审签表:" required @change="fileChange($event,2)">
                    <input type="file">
                </el-form-item>
                <el-button type="primary" @click="dialog.AddMainContractVisible= true">添加主合同</el-button>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
        <AddMainContract v-bind:is-visible="dialog.AddMainContractVisible"
                         v-on:close="dialog.AddMainContractVisible = false"/>
    </div>
</template>

<script>
    import AddMainContract from "./AddMainContract"

    export default {
        name: "WinningBid",
        props:['isVisible'],
        components: {
            AddMainContract
        },
        data() {
            return {
                dialog: {
                    AddMainContractVisible: false,
                },
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