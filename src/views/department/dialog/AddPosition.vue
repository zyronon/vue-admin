<template>
    <div class="AddPosition">
        <el-dialog title="添加职位" :visible.sync="isVisible" width="30%" :before-close="close">
            <div>
                <div class="modal-body">
                    <el-form ref="form" :model="employee" label-width="80px" label-position="left">
                        <el-form-item label="职位名称:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AddPosition",
        props: ['isVisible'],
        components: {},
        data() {
            return {
                employee:{}
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
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>