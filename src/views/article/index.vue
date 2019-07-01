<template>
    <div class="all-list" v-loading="loading">
        <el-card>
            <div slot="header">
                文章列表
            </div>
            <el-input v-model="searchData.searchKey" placeholder="文章名称" class="w200p ml10p"></el-input>
            <el-date-picker class="w300p ml10p"
                            v-model="searchData.date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="CONSTANT.PICKEROPTIONS">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" class="ml10p" @click="getData()">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh"
                       @click="searchData.searchKey = '';searchData.date = ''">重置
            </el-button>
        </el-card>
        <el-card class="mt20p">
            <div class="d-flex justify-content-between align-items-center">
                <span> 共有0条数据 </span>
                <div>
                    <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline"
                               @click="$router.push('create')">新建
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="del(rows)">删除</el-button>
                </div>
            </div>
            <el-table :data="tableData.list" border stripe class="mt20p">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed prop="CarOwnerName" label="车主姓名" sortable></el-table-column>
                <el-table-column prop="CarBrand" label="品牌" sortable></el-table-column>
                <el-table-column prop="CarType" label="型号" sortable></el-table-column>
                <el-table-column prop="CanRentTime" label="可租时间" sortable>
                    <template v-slot="scope">
                        {{scope.row.CanRentTime|date}}
                    </template>
                </el-table-column>
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
            <el-row class="table-bottom mt20p" v-if="tableData.count !== 0">
                <el-pagination class="pull-right"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="offset"
                               :page-sizes="[10, 20, 30, 40]"
                               :page-size="limit"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="tableData.count">
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>
<script>

    export default {
        name: "index",
        data() {
            return {
                loading: true,
                searchData: {},
                tableData: {
                    list: [],
                    count: 30
                },
                offset: 0,
                limit: 10,
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                this.loading = true
                for (let i = 0; i < 12; i++) {
                    this.tableData.list.push(
                        {
                            CarOwnerName: '曹操',
                            LicensePlateNumber: '沪A12345',
                            CarBrand: '奥迪',
                            CarType: 'A6',
                            Illegal: '18条',
                            CanRentTime: 1554486493646,
                            CreationTime: '2018-11-11',
                            IsRent: '是'
                        }
                    )
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
            //页条目改变事件
            handleSizeChange(val) {
                this.limit = val
                this.getData()
            },
            //页码改变事件
            handleCurrentChange(val) {
                this.offset = val
                this.getData()
            },
            addArticle() {
                this.$router.push('create')
            },
            del(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
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
