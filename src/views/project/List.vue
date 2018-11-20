<template>
    <div class="all-list">
        <el-row type="flex" justify="space-between">
            <div>
                <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline"
                           @click="dialogProjectVisible=true">新建
                </el-button>
                <el-button type="danger" icon="el-icon-delete" @click="del(rows.list)">删除</el-button>
                <el-input v-model="rows.filter.key" placeholder="项目编号/项目名称" class="w200p ml10p"></el-input>
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
                <el-button type="primary" icon="el-icon-search" class="ml10p" @click="getData()">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh"
                           @click="rows.filter.key = '';rows.filter.date = ''">重置
                </el-button>
            </div>
            <div>
                <el-radio-group v-model="rows.filter.type" @change="getData()">
                    <el-radio-button label="-1">所有</el-radio-button>
                    <el-radio-button label="100">审核中</el-radio-button>
                    <el-radio-button label="101">进行中</el-radio-button>
                    <el-radio-button label="102">已结束</el-radio-button>
                </el-radio-group>
            </div>
        </el-row>
        <el-row>
            <el-table :data="rows.list" style="width: 100%" border stripe v-loading="listLoading">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed prop="Name" label="项目编号" sortable width="450"></el-table-column>
                <el-table-column prop="Number" label="项目编号" sortable></el-table-column>
                <el-table-column prop="Status" label="状态" sortable>
                    <template slot-scope="scope">
                        {{scope.row.Status|processStatus}}
                    </template>
                </el-table-column>
                <el-table-column prop="Create_By" label="创建人" sortable></el-table-column>
                <el-table-column prop="Create_Date" label="创建时间" sortable></el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="look(scope.row)">查看</el-button>
                        <el-button type="danger" size="small" @click="del([scope.row])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="table-bottom">
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
        </el-row>

        <el-dialog title="项目" :visible.sync="dialogProjectVisible" width="30%">
            <div>
                <div class="modal-body">
                    <el-form ref="form" :model="project" label-width="100px" label-position="left">
                        <el-form-item label="项目编号:">
                            <el-input v-model="project.Name"></el-input>
                        </el-form-item>
                        <el-form-item label="项目名称:">
                            <el-input v-model="project.Number"></el-input>
                        </el-form-item>
                        <el-form-item label="立项申请表:">
                            <input type="file">
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogProjectVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogProjectVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Project from "../../api/project"


    export default {
        name: 'ProjectList',
        data() {
            return {
                project: {},
                dialogProjectVisible: false,
                rows: {
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
                listLoading: false,
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
            this.getData()
        },
        methods: {
            async getData() {
                this.listLoading = true
                setTimeout(async () => {
                    let data = {
                        offset: this.rows.offset,
                        limit: this.rows.limit,
                        key: this.rows.filter.key,
                        date: this.rows.filter.date,
                        type: this.rows.filter.type,

                    }
                    // console.log(data)
                    let result = await Project.list(data)
                    // console.log(result)
                    if (result.status == 1) {
                        this.rows.list = result.data.list
                        this.rows.count = result.data.count
                    }
                    this.listLoading = false
                }, 500)
            },
            handleSizeChange(limit) {
                this.rows.limit = limit
                this.getData()
            },
            close() {
                this.dialogProjectVisible = false
            },
            createProject() {
                this.dialogProjectVisible = true
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
            },
            look(id) {
                console.log(id)
                this.$router.push({name: 'ProjectDetail', params: {id: id}})
            },
        },
        filters: {
            processStatus(value) {
                switch (value) {
                    case '100':
                        return '审核中'
                    case '101':
                        return '进行中'
                    case '102':
                        return '已结束'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>