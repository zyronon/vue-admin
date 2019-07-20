<template>
    <div class="all-list" v-loading="loading">
        <el-card :body-style="{ 'padding-top': '6px' }">
            <div slot="header">文章列表</div>
            <div class="d-flex flex-wrap-wrap">
                <div>
                    <label>文章名称</label>
                    <el-input
                            v-model="searchData.searchKey"
                            placeholder="文章名称"
                            class="mt14p ml10p mr20p w200p"
                    ></el-input>
                </div>
                <div>
                    <label>日期</label>
                    <el-date-picker
                            class="w300p mt14p ml10p mr20p"
                            v-model="searchDate"
                            type="daterange"
                            size="medium"
                            align="right"
                            format="yyyy-MM-dd"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="CONSTANT.PICKEROPTIONS"
                    ></el-date-picker>
                </div>
                <el-button type="primary" icon="el-icon-search" class="ml10p mt14p" @click="search()">搜索</el-button>
                <el-button type="info" icon="el-icon-refresh" class="ml10p mt14p" @click="reset">重置</el-button>
            </div>
        </el-card>
        <el-card class="mt20p">
            <div class="d-flex justify-content-between align-items-center">
                <span>共有{{tableData.count}}条数据</span>
                <div>
                    <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                    <el-button
                            type="primary"
                            icon="el-icon-circle-plus-outline"
                            @click="$router.push('create')"
                    >新建
                    </el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="del(rows)">删除</el-button>
                </div>
            </div>
            <el-table :data="tableData.list" border stripe class="mt20p">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed prop="CarOwnerName" label="车主姓名" min-width="100"></el-table-column>
                <el-table-column prop="CarBrand" label="品牌" min-width="100"></el-table-column>
                <el-table-column prop="CarType" label="型号" min-width="100"></el-table-column>
                <el-table-column prop="CanRentTime" label="可租时间" min-width="100">
                    <template v-slot="scope">{{scope.row.CanRentTime|date}}</template>
                </el-table-column>
                <el-table-column prop="CreationTime" label="上传时间" min-width="100"></el-table-column>
                <el-table-column prop="IsRent" label="是否可发车" min-width="100"></el-table-column>
                <el-table-column prop label="操作" align="center" fixed="right" min-width="200">
                    <template v-slot="scope">
                        <el-button
                                @click="$router.push({path:'detail',query:{id:'xxx'}})"
                                icon="el-icon-reading"
                                type="primary"
                                size="small"
                        >查看
                        </el-button>
                        <el-button
                                @click="$router.push({path:'detail',query:{id:'xxx'}})"
                                type="primary"
                                icon="el-icon-edit"
                                size="small"
                        >编辑
                        </el-button>
                        <el-button type="primary" icon="el-icon-delete" size="small" @click="del(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="table-bottom mt20p" v-if="tableData.count !== 0">
                <el-pagination
                        class="pull-right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="offset"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.count"
                ></el-pagination>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'index',
        data() {
            return {
                loading: false,
                searchDate: [],
                searchData: {},
                tableData: {
                    list: [],
                    count: 30
                },
                offset: 0,
                limit: 10,
                isSearch: false
            }
        },
        watch: {
            // 检测到这个值有变动，设置到searchData里面
            searchDate(newValue) {
                if (newValue && newValue.length > 0) {
                    this.searchData.minCreateTime = newValue[0]
                    this.searchData.maxCreateTime = newValue[1]
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            // 搜索
            search() {
                this.isSearch = true
                this.searchData.pageSize = this.limit = 10
                this.searchData.pageNumber = this.offset = 0
                this.getData()
            },
            // 重置
            reset() {
                this.isSearch = false
                this.searchData = {}
                this.searchDate = []
                this.limit = 10
                this.offset = 0
                this.getData()
            },
            getData() {
                this.loading = true
                for (let i = 0; i < 12; i++) {
                    this.tableData.list.push({
                        CarOwnerName: '曹操',
                        LicensePlateNumber: '沪A12345',
                        CarBrand: '奥迪',
                        CarType: 'A6',
                        Illegal: '18条',
                        CanRentTime: 1554486493646,
                        CreationTime: '2018-11-11',
                        IsRent: '是'
                    })
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
            // 页条目改变事件
            handleSizeChange(val) {
                this.limit = val
                this.getData()
            },
            // 页码改变事件
            handleCurrentChange(val) {
                this.offset = val
                this.getData()
            },
            del(row) {
                // eslint-disable-line
                this.$mConfirm('', '此操作将永久删除该文件, 是否继续?', () => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
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
