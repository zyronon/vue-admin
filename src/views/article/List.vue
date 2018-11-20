<template>
    <div class="all-list">
        <el-row type="flex" justify="space-between">
            <div>
                <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline"
                           @click="$router.push('create')">新建
                </el-button>
                <el-button type="danger" icon="el-icon-delete" @click="del(rows)">删除</el-button>
                <el-input v-model="rows.filter.key" placeholder="文章名称" class="w200p ml10p"></el-input>
                <el-date-picker class="w300p ml10p"
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
                <el-select v-model="value4" clearable placeholder="请选择" style="margin-left: 10px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-row>
        <el-row class="mb0p">
            <el-table :data="rows" border stripe v-loading="listLoading">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed prop="CarOwnerName" label="车主姓名" sortable></el-table-column>
                <el-table-column prop="CarBrand" label="品牌" sortable></el-table-column>
                <el-table-column prop="CarType" label="型号" sortable></el-table-column>
                <el-table-column prop="CanRentTime" label="可租时间" sortable></el-table-column>
                <el-table-column prop="CreationTime" label="上传时间" sortable></el-table-column>
                <el-table-column prop="IsRent" label="是否可发车" sortable></el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                        <el-button @click="look(scope.row)" type="primary" size="small">查看</el-button>
                        <el-button type="warning" size="small">编辑</el-button>
                        <el-button type="danger" size="small" @click="del([scope.row])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="table-bottom" v-if="rows.length != 0">
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
    </div>
</template>

<script>
    export default {
        name: "ArticleList",
        data() {
            return {
                car: {
                    Illegal: {
                        FetchDate: '2018-11-11 12:23'
                    },
                    LicensePlateNumber: '沪A12345',
                    CarOwnerName: '曹操',
                },
                data: {
                    amount: 10,
                    untreated: 10,
                    totalFine: 10,
                    totalPoints: 10,
                },
                options: [{
                    value: '选项1',
                    label: '起租日期'
                }, {
                    value: '选项2',
                    label: '开始日期'
                }, {
                    value: '选项3',
                    label: '结束日期'
                }],
                value4: '',
                input: '',
                listLoading: false,
                radio: '可发车',
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
                isShowIllegal: false
            }
        },
        computed: {
            rows() {
                let temp = []
                for (let i = 0; i < 10; i++) {
                    temp.push({
                        CarOwnerName: '曹操',
                        LicensePlateNumber: '沪A12345',
                        CarBrand: '奥迪',
                        CarType: 'A6',
                        Illegal: '18条',
                        CanRentTime: '2018-11-11',
                        CreationTime: '2018-11-11',
                        IsRent: '是'
                    })
                }
                return temp
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            refresh() {
                this.listLoading = true
                setTimeout(() => {
                    this.listLoading = false
                }, 1000)
            },
            addArticle() {
                this.$router.push('create')
            },
            showIllegal(row) {
                this.isShowIllegal = true
            },
            close() {
                this.isShowIllegal = false
            },
            refreshIllegal() {
            },
            showNotProcessRow() {
                return []
            },
            look(row) {
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