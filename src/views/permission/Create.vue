<template>
    <div class="Create">
        <el-row class="mb20p">
            <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline mb10p">
                <el-form-item label="权限名称">
                    <el-input v-model="formInline.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input class="w700p"
                              type="textarea"
                              autosize
                              placeholder="请输入内容"
                              v-model="formInline.descrption">
                    </el-input>
                </el-form-item>
                <el-form-item label="快捷选择">
                    <el-select v-model="formInline.type" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData6"
                    :span-method="objectSpanMethod"
                    border
                    style="width: 100%;">
                <el-table-column
                        align="center"
                        width="200"
                        prop="module"
                        label="模块">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="权限名称">
                    <template slot-scope="scope">
                        <input type="checkbox">{{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="描述">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Create",
        components: {},
        data() {
            return {
                formInline: {},
                options: [
                    {
                        value: '选项1',
                        label: '权限1'
                    }, {
                        value: '选项2',
                        label: '权限2'
                    }, {
                        value: '选项3',
                        label: '权限3'
                    }, {
                        value: '选项4',
                        label: '权限4'
                    }, {
                        value: '选项5',
                        label: '权限5'
                    }],
                tableData6: [
                    {
                        id: '1',
                        module: '项目',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '2',
                        module: '项目',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '3',
                        module: '项目',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '4',
                        module: '项目',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '5',
                        module: '项目',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '6',
                        module: '批文',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '7',
                        module: '批文',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '8',
                        module: '批文',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '9',
                        module: '流程',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '10',
                        module: '流程',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    }, {
                        id: '11',
                        module: '流程',
                        name: '添加',
                        description: "权限描述权限描述权限描述权限描述权限描述"
                    },
                ],
                spanArr: [],
                pos: 0
            }
        },
        created() {

        },
        mounted() {
            this.getSpanArr(this.tableData6)
        },
        methods: {
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            getSpanArr(data) {
                for (let i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[i].module === data[i - 1].module) {
                            this.spanArr[this.pos] += 1
                            this.spanArr.push(0)
                        } else {
                            this.spanArr.push(1)
                            this.pos = i
                        }
                    }
                }
            },

        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>
    .cell {
        text-align: center;
    }

    .el-table .cell {
        text-align: center;
    }
</style>