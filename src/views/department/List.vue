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
                                           @click="dialog.AddDepartmentVisible=true"
                                >新建
                                </el-button>
                            </div>
                            <el-tree
                                    :data="departments"
                                    node-key="id"
                                    default-expand-all
                                    :props="defaultProps">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                              <el-button
                                      type="text"
                                      size="mini"
                                      @click="() => remove(node, data)">
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
                                           @click="dialog.AddPositionVisible=true"
                                >新建
                                </el-button>
                            </div>
                            <el-tree
                                    :data="positions"
                                    node-key="id"
                                    default-expand-all
                                    :props="defaultProps">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                              <el-button
                                      type="text"
                                      size="mini"
                                      @click="() => remove(node, data)">
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
                        <el-button type="danger" icon="el-icon-delete" @click="$router.push('create')">删除</el-button>
                        <el-input v-model="input" placeholder="请输入内容" class="w200p ml20p"></el-input>
                        <el-button type="primary" icon="el-icon-search" class="ml10p" @click="getData()">搜索</el-button>
                        <el-button type="primary" icon="el-icon-refresh"
                                   @click="rows.filter.key = '';rows.filter.date = ''">重置
                        </el-button>
                    </el-row>
                    <el-table :data="rows.notify.list" style="width: 100%" border stripe v-loading="listLoading">
                        <el-table-column type="selection" width="55"></el-table-column>
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
                                <el-button type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row class="mt20p">
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
                    limit: 10,
                    count: 100
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
                positions: [{
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