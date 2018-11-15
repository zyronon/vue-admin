<template>
    <div class="AddEmployee">
        <el-dialog title="添加员工" :visible.sync="isVisible" width="30%" :before-close="close">
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
                        <el-form-item label="性别:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                        <el-form-item label="部门:">
                            <treeselect v-model="employee.department" :options="departments"/>
                        </el-form-item>
                        <el-form-item label="职位:">
                            <el-select v-model="employee.position" placeholder="请选择">
                                <el-option
                                        v-for="item in positions"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="权限:">
                            <el-select v-model="employee.position" placeholder="请选择">
                                <el-option
                                        v-for="item in positions"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="政治面貌:">
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

    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'


    export default {
        name: "AddEmployee",
        props: ['isVisible'],
        components: {Treeselect},
        data() {
            return {
                employee: {},
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
                positions: [
                    {
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
                ],
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