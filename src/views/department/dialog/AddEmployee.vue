<template>
    <div class="AddEmployee">
        <el-dialog title="员工" :visible.sync="isVisible" width="30%">
            <div>
                <div class="modal-body">
                    <el-form ref="form" :model="employee" label-width="80px" label-position="left">
                        <el-form-item label="姓名:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                        <el-form-item label="职位:">
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
        name: "AddEmployee",
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