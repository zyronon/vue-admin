<template>
    <div class="List">
        <el-row class="mb20p">
            <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline"
                       @click="$router.push('create')">新建
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
        <el-card class="box-card mb20p">
            <div slot="header" class="clearfix">
                <span>权限列表</span>
            </div>
            <el-table :data="rows.notify.list" style="width: 100%" border stripe v-loading="listLoading">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="Number" label="权限名称" sortable></el-table-column>
                <el-table-column prop="Number" label="权限描述" sortable></el-table-column>
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
    </div>
</template>

<script>
    export default {
        name: "List",
        components: {},
        data() {
            return {
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
            }
        },
        created() {

        },
        methods: {
            getData() {
            },
            del(row) {
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
            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>