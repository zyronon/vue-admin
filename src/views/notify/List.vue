<template>
    <div class="List">
        <el-tabs type="border-card" stretch>
            <el-tab-pane label="公告">
                <el-row class="mb20p">
                    <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline"
                               @click="$router.push('create')">新建
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="del(rows.notify.list,1)">删除</el-button>
                    <el-input v-model="input" placeholder="请输入内容" class="w200p ml20p"></el-input>
                    <el-button type="primary" icon="el-icon-search" class="ml10p" @click="getData()">搜索</el-button>
                    <el-button type="primary" icon="el-icon-refresh"
                               @click="rows.filter.key = '';rows.filter.date = ''">重置
                    </el-button>
                </el-row>
                <el-card class="box-card mb20p">
                    <div slot="header" class="clearfix">
                        <span>公告列表</span>
                    </div>
                    <el-table :data="rows.notify.list" style="width: 100%" border stripe v-loading="listLoading">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column fixed prop="Name" label="供应商" sortable></el-table-column>
                        <el-table-column prop="Number" label="合同分类" sortable></el-table-column>
                        <el-table-column prop="Number" label="合同金额" sortable></el-table-column>
                        <el-table-column prop="Create_By" label="创建人" sortable></el-table-column>
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
            </el-tab-pane>
            <el-tab-pane label="通知">
                <el-row class="mb20p">
                    <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="$router.push('create')">新建
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="del(rows.notify.list,2)">删除</el-button>
                    <el-input v-model="input" placeholder="请输入内容" class="w200p ml20p"></el-input>
                    <el-button type="primary" icon="el-icon-search" class="ml10p" @click="getData()">搜索</el-button>
                    <el-button type="primary" icon="el-icon-refresh"
                               @click="rows.filter.key = '';rows.filter.date = ''">重置
                    </el-button>
                </el-row>
                <el-card class="box-card mb20p">
                    <div slot="header" class="clearfix">
                        <span>公告列表</span>
                    </div>
                    <el-table :data="rows.notify.list" style="width: 100%" border stripe v-loading="listLoading">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column fixed prop="Name" label="供应商" sortable></el-table-column>
                        <el-table-column prop="Number" label="合同分类" sortable></el-table-column>
                        <el-table-column prop="Number" label="合同金额" sortable></el-table-column>
                        <el-table-column prop="Create_By" label="创建人" sortable></el-table-column>
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "List",
        components: {},
        data() {
            return {
                input: "",
                rows: {
                    notify: {
                        list: []
                    }
                },
                listLoading: false
            }
        },
        created() {

        },
        methods: {
            getData() {
            },
            del(row, type) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        console.log(row)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }).catch(() => {
                })
            },
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>