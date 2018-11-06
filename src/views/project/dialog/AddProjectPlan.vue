<template>
    <div class="AddProjectPlan">
        <el-dialog
                title="添加规划"
                :visible.sync="isVisible"
                width="60%"
                :before-close="close">
            <el-form ref="form" label-width="130px" label-position="left">
                <el-form-item label="项目预算：" required>
                    <input type="file">
                </el-form-item>

                <!--<h2 class="tac">主合同信息</h2>-->
                <div class="budget-title">
                    <span>科目名称</span>
                    <span>预算金额</span>
                    <span>调整金额</span>
                    <span>调整后金额</span>
                    <span>备注</span>
                </div>
                <el-tree
                        :data="data5"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false">
                      <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                                <span>
                                    <span>4000</span>
                                    <el-input v-model="input" placeholder="请输入内容"
                                              size="mini"></el-input>
                                </span> <span>
                                    <span>4000</span>
                                    <el-input v-model="input" placeholder="请输入内容"
                                              size="mini"></el-input>
                                </span>
                                <!--<span>-->
                                <!--<span>4000</span>-->
                                <!--<el-input v-model="input" placeholder="请输入内容"-->
                                <!--size="mini"></el-input>-->
                                <!--</span>-->
                                <!--<span>-->
                                <!--<span>4000</span>-->
                                <!--<el-input v-model="input" placeholder="请输入内容"-->
                                <!--size="mini"></el-input>-->
                                <!--</span>-->
                                <!--<span>-->
                                <!--<span>4000</span>-->
                                <!--<el-input v-model="input" placeholder="请输入内容"-->
                                <!--size="mini"></el-input>-->
                                <!--</span>-->

                            </span>
                      </span>
                </el-tree>
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
        name: "AddProjectPlan",
        props: ['isVisible'],
        components: {},
        data() {
            const data = [
                {
                    id: 1,
                    label: '合同金额',
                    children: [{
                        id: 5,
                        label: '合同收入'
                    }, {
                        id: 6,
                        label: '合同收入税额'
                    }, {
                        id: 6,
                        label: '暂列金（不含税）'
                    }, {
                        id: 6,
                        label: '暂列金（含税）'
                    }]
                }, {
                    id: 2,
                    label: '成本',
                    children: [{
                        id: 4,
                        label: '项目管理费',
                        children: [{
                            id: 9,
                            label: '驻地建设费'
                        }, {
                            id: 10,
                            label: '其它'
                        }, {
                            id: 10,
                            label: '人员薪酬',
                            children: [{
                                id: 10,
                                label: '基本薪酬',
                            }, {
                                id: 10,
                                label: '绩效薪酬',
                            }, {
                                id: 10,
                                label: '五险一金',
                            }, {
                                id: 10,
                                label: '其它',
                            }]
                        }]
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }]
            return {
                input: '',
                data4: JSON.parse(JSON.stringify(data)),
                data5: JSON.parse(JSON.stringify(data))
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
            append(data) {
                const newChild = {id: id++, label: 'testtest', children: []}
                if (!data.children) {
                    this.$set(data, 'children', [])
                }
                data.children.push(newChild)
            },

            remove(node, data) {
                const parent = node.parent
                const children = parent.data.children || parent.data
                const index = children.findIndex(d => d.id === data.id)
                children.splice(index, 1)
            },

        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>
    .custom-tree-node {
        /*flex: 1;*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        /*font-size: 14px;*/
        /*padding-right: 8px;*/
    }

    .budget-title {
        display: flex;
        justify-content: space-around;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid gainsboro;
    }
</style>