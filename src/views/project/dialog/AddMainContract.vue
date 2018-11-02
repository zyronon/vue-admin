<template>
    <div class="AddMainContract">
        <el-dialog
                title="添加主合同"
                :visible.sync="isVisible"
                width="30%"
                :before-close="close">
            <el-form ref="form" label-width="130px" label-position="left">
                <el-form-item label="合同名称：" required>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="内部文件编号：" required>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="合同分类：" required>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="合同金额：" required>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="合同工期：" required>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="支付条件：" required>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="文件：" required>
                    <div>
                        <input type="text">
                        <input type="file">
                    </div>
                    <el-button type="primary" size="mini">增加文件</el-button>

                </el-form-item>

                <!--<h2 class="tac">主合同信息</h2>-->

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
        name: "AddMainContract",
        components: {},
        props: ['isVisible'],
        data() {
            return {
                form: {},
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