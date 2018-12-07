<template>
    <div class="ProjectBiddingStart">
        <el-dialog
                title="竞标启动"
                :visible.sync="isv"
                width="30%"
                :before-close="close">
            <el-form ref="form" label-width="180px" label-position="left">
                <el-form-item label="标前分析会会议纪要:" required>
                    <input type="file" @change="fileChange($event,1)">
                </el-form-item>
                <el-form-item label="资信输申请表:" required @change="fileChange($event,2)">
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
        name: "ProjectBiddingStart",
        props: ['isVisible'],
        data() {
            return {
                formData: new FormData(),
                isv: this.isVisible
            }
        },
        created() {
        },
        computed: {
            // visible() {
            //     return this.isVisible
            // }
        },
        methods: {
            close() {
                // this.$emit('close')
                this.isv = false
            },
            submit() {
                this.close()
            },
            fileChange(event, from) {
                let file = event.target.files[0]
                switch (from) {
                    case 1:
                        this.formData.set("标前分析会会议纪要", file)
                        break
                    case 2:
                        this.formData.set("资信输申请表", file)
                        break
                }
            }
        },
        filter: {},
    }
</script>

<style scoped land='scss'>

</style>