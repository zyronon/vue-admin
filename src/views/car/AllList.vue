<template>
    <div class="all-list">
        <el-row type="flex" justify="space-between">
            <div>
                <el-button type="info" icon="el-icon-refresh"></el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline"
                           @click="dialog.AddEmployeeVisible=true">新建
                </el-button>
                <el-button type="danger" icon="el-icon-delete" @click="$router.push('create')">删除</el-button>
                <el-input v-model="rows.filter.key" placeholder="项目编号/项目名称" class="w200p ml10p"></el-input>
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
                </el-button></div>
            <div>
                <el-radio-group v-model="radio">
                    <el-radio-button label="不可发车"></el-radio-button>
                    <el-radio-button label="可发车"></el-radio-button>
                    <el-radio-button label="已出租"></el-radio-button>
                    <el-radio-button label="即将到期车辆"></el-radio-button>
                </el-radio-group>
            </div>
        </el-row>
        <el-row>
            <el-table :data="rows" style="width: 100%" border stripe v-loading="listLoading">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column fixed prop="CarOwnerName" label="车主姓名" sortable></el-table-column>
                <el-table-column prop="LicensePlateNumber" label="车牌号/是否现车" sortable width="200">
                    <template slot-scope="scope">
                        <div style="display: flex;align-items: center;justify-content: space-around;">
                            <span>{{ scope.row.LicensePlateNumber }}</span>
                            <el-button type="primary" size="mini" icon="el-icon-arrow-right">现车
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="CarBrand" label="品牌" sortable></el-table-column>
                <el-table-column prop="CarType" label="型号" sortable></el-table-column>
                <el-table-column label="未外理违章" sortable>
                    <template slot-scope="scope">
                        <div @click="showIllegal(scope.row)" class="clickable">{{ scope.row.Illegal }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="CanRentTime" label="可租时间" sortable></el-table-column>
                <el-table-column prop="CreationTime" label="上传时间" sortable></el-table-column>
                <el-table-column prop="IsRent" label="是否可发车" sortable></el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                        <el-button type="primary" size="small">编辑</el-button>
                        <el-button type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>


        <el-dialog title="违章" :visible.sync="isShowIllegal" width="70%">
            <div>
                <div class="modal-body">
                    <el-row>
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin-left: 10px;">
                                刷新违章
                            </el-button>
                        </el-col>
                        <el-col :span="6">
                            <label class="col-form-label">上次刷新时间：
                                <span v-if="car!=null">
                                    <span v-if="car.Illegal.FetchDate!=null">
                                    {{car.Illegal.FetchDate}}
                                    </span>
                                </span>
                            </label>
                        </el-col>
                        <el-col :span="6">
                            <label class="col-form-label">车牌号：{{car.LicensePlateNumber}}</label>
                        </el-col>
                        <el-col :span="6">
                            <label class="col-form-label">车牌号：{{car.CarOwnerName}}</label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6"><label class="col-md-3 col-form-label">违章总条数：{{data.amount}}</label>
                        </el-col>
                        <el-col :span="6"><label class="col-md-3 col-form-label">未处理违章条数：{{data.untreated}}</label>
                        </el-col>
                        <el-col :span="6"><label class="col-md-3 col-form-label">未处理违章总罚款：{{data.totalFine}}</label>
                        </el-col>
                        <el-col :span="6"><label class="col-md-3 col-form-label">未处理违章总扣分：{{data.totalPoints}}</label>
                        </el-col>

                    </el-row>
                    <el-tabs type="border-card">
                        <el-tab-pane label="未处理">
                            <el-table :data="showNotProcessRow()" style="width: 100%" border stripe
                                      v-loading="listLoading">
                                <el-table-column fixed prop="CarOwnerName" label="金额" sortable></el-table-column>
                                <el-table-column prop="LicensePlateNumber" label="地址" sortable></el-table-column>
                                <el-table-column prop="CarBrand" label="原因" sortable></el-table-column>
                                <el-table-column prop="CarType" label="扣分" sortable></el-table-column>
                                <el-table-column prop="CarType" label="省份" sortable></el-table-column>
                                <el-table-column prop="CanRentTime" label="城市" sortable></el-table-column>
                                <el-table-column prop="CreationTime" label="状态" sortable></el-table-column>
                                <el-table-column prop="IsRent" label="时间" sortable></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="全部">
                            <el-table :data="showNotProcessRow()" style="width: 100%" border stripe
                                      v-loading="listLoading">
                                <el-table-column fixed prop="CarOwnerName" label="金额" sortable></el-table-column>
                                <el-table-column prop="LicensePlateNumber" label="地址" sortable></el-table-column>
                                <el-table-column prop="CarBrand" label="原因" sortable></el-table-column>
                                <el-table-column prop="CarType" label="扣分" sortable></el-table-column>
                                <el-table-column prop="CarType" label="省份" sortable></el-table-column>
                                <el-table-column prop="CanRentTime" label="城市" sortable></el-table-column>
                                <el-table-column prop="CreationTime" label="状态" sortable></el-table-column>
                                <el-table-column prop="IsRent" label="时间" sortable></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'CarAllList',
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
                pickerOptions2: {
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
            addCar() {
                this.$router.push('create')
            },
            showIllegal(row) {
                this.isShowIllegal = true;
            },
            close() {
                this.isShowIllegal = false;
            },
            refreshIllegal() {
            },
            showNotProcessRow() {
                return [];
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