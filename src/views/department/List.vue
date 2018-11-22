<template>
    <div class="List">
        <el-row>
            <el-col :span="5">
                <el-tabs type="border-card" stretch>
                    <el-tab-pane label="所有部门">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>所有部门</span>
                                <el-button style="float: right; padding: 3px 0" type="text"
                                           @click="dialog.AddDepartmentVisible=true">新建
                                </el-button>
                            </div>
                            <el-tree :data="departments" node-key="id" default-expand-all :props="defaultProps">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                                <el-button type="text" size="mini" @click="() => remove(node, data)">
                                    {{data.id==1?"":"删除"}}
                                </el-button>
                            </span>
                          </span>
                            </el-tree>
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="所有职位">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>所有职位</span>
                                <el-button style="float: right; padding: 3px 0" type="text"
                                           @click="dialog.AddPositionVisible=true">新建
                                </el-button>
                            </div>
                            <el-tree :data="positions" node-key="id" default-expand-all :props="defaultProps">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                              <el-button type="text" size="mini" @click="() => remove(node, data)">
                                {{data.id==1?"":"删除"}}
                              </el-button>
                            </span>
                          </span>
                            </el-tree>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>

            </el-col>

            <el-col :span="19" class="pl20p">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>员工列表</span>
                    </div>
                    <el-row class="mb20p">
                        <el-button type="info" icon="el-icon-refresh"></el-button>
                        <el-button type="primary" icon="el-icon-circle-plus-outline"
                                   @click="dialog.AddEmployeeVisible=true">新建
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="del(rows.notify.list)">删除</el-button>
                        <el-date-picker class="w250p ml10p"
                                        v-model="rows.filter.date"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                        </el-date-picker>
                        <el-input placeholder="请输入内容" v-model="input" class="input-with-select w250p ml10p">
                            <el-button slot="append" icon="el-icon-delete" @click="reset()"></el-button>
                            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                        </el-input>
                    </el-row>
                    <el-table :data="rows.notify.list" style="width: 100%" border stripe v-loading="listLoading">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column fixed prop="Name" label="头像" sortable></el-table-column>
                        <el-table-column prop="Number" label="职员姓名" sortable></el-table-column>
                        <el-table-column prop="Number" label="性别" sortable></el-table-column>
                        <el-table-column prop="Number" label="联系方式" sortable></el-table-column>
                        <el-table-column prop="Create_By" label="部门名称" sortable></el-table-column>
                        <el-table-column prop="Create_By" label="政治面貌" sortable></el-table-column>
                        <el-table-column prop="Create_Date" label="创建时间" sortable></el-table-column>
                        <el-table-column prop="Status" label="状态" sortable>
                            <template slot-scope="scope">
                                {{scope.row.Status|processStatus}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="look(scope.row.id)">查看</el-button>
                                <el-button type="primary" size="small" @click="del([scope.row])">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row class="table-bottom" v-if="rows.notify.list.length != 0">
                        <el-pagination class="pull-right"
                                       @size-change="handleSizeChange()"
                                       @current-change="getData()"
                                       :current-page="1"
                                       :page-sizes="[10, 20, 30, 40]"
                                       :page-size="100"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :total="rows.count">
                        </el-pagination>
                    </el-row>

                </el-card>
            </el-col>
        </el-row>

        <AddDepartment v-bind:is-visible="dialog.AddDepartmentVisible"
                       v-on:close="dialog.AddDepartmentVisible = false"/>
        <AddEmployee v-bind:is-visible="dialog.AddEmployeeVisible"
                     v-on:close="dialog.AddEmployeeVisible = false"/>
        <AddPosition v-bind:is-visible="dialog.AddPositionVisible"
                     v-on:close="dialog.AddPositionVisible = false"/>
    </div>
</template>

<script>

    import AddDepartment from './dialog/AddDepartment'
    import AddEmployee from './dialog/AddEmployee'
    import AddPosition from './dialog/AddPosition'

    export default {
        name: "List",
        components: {AddDepartment, AddEmployee, AddPosition},
        data() {
            return {
                dialog: {
                    AddDepartmentVisible: false,
                    AddEmployeeVisible: false,
                    AddPositionVisible: false
                },
                input: "",
                listLoading: false,
                rows: {
                    notify: {
                        list: []
                    },
                    list: [],
                    count: 0,
                    offset: 0,
                    limit: 10,
                    filter: {
                        type: '-1',
                        date: [],
                        key: ''
                    }
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
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
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created() {

        },
        methods: {
            handleSizeChange(limit) {
                this.rows.limit = limit
                this.getData()
            },
            getData() {

            },
            del(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                })
            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>