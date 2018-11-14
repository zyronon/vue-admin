<template>
    <div class="AddDepartment">
        <el-dialog
                title="添加部门"
                :visible.sync="isVisible"
                width="30%"
                :before-close="close">
            <el-form ref="form" label-width="130px" label-position="left">
                <el-form-item label="部门名称：" required>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="上级部门：" required>
                    <treeselect v-model="form.department" :options="departments"/>
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
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'


    export default {
        name: "AddDepartment",
        components: {Treeselect},
        props: ['isVisible'],
        data() {
            return {
                form: {},
                departments: [{
                    id: 1,
                    label: '集团部门',
                    children: [{
                        id: 2,
                        label: '经营层',
                    }, {
                        id: 3,
                        label: '财务部'
                    }, {
                        id: 4,
                        label: '安全生产部'
                    }, {
                        id: 5,
                        label: '市场经营部'
                    }, {
                        id: 6,
                        label: '广告项目部'
                    }, {
                        id: 7,
                        label: '测试部门'
                    }, {
                        id: 8,
                        label: '研发部门'
                    }, {
                        id: 9,
                        label: '工程管理部'
                    }
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
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

            },
            handleSelect() {

            },
            handleIconClick() {

            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>