<template>
    <div class="all-list">
        <el-row>
            <el-input v-model="input" placeholder="车主姓名/车牌号/车辆型号" style="width: 250px;"></el-input>
            <el-date-picker style="margin-left: 10px;"
                            v-model="input"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
            </el-date-picker>
            <el-select v-model="value4" clearable placeholder="请选择" style="margin-left: 10px;">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin-left: 10px;">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" style="margin-left: 10px;">重置</el-button>
        </el-row>
        <el-row type="flex" justify="space-between">
            <div>
                <el-button type="primary" circle icon="el-icon-refresh" @click="refresh()"></el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="createEmployee()">添加员工</el-button>
            </div>
        </el-row>
        <el-row>
            <el-table :data="rows" style="width: 100%" border stripe v-loading="listLoading">
                <!--<el-table-column type="selection" width="55"></el-table-column>-->
                <el-table-column fixed prop="CarOwnerName" label="员工姓名" sortable></el-table-column>
                <el-table-column prop="CarBrand" label="职位" sortable></el-table-column>
                <el-table-column prop="CarBrand" label="手机号" sortable></el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small">修改</el-button>
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


        <el-dialog title="员工" :visible.sync="isShowEmployee" width="30%">
            <div>
                <div class="modal-body">
                    <el-form ref="form" :model="form" label-width="80px" label-position="left">
                        <el-form-item label="姓名:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="职位:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowEmployee = false">取 消</el-button>
                <el-button type="primary" @click="isShowEmployee = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'EmployeeList',
        data() {
            return {
                form: {},
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
                isShowEmployee: false
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
            createIncome() {
                this.$router.push('income')
            },
            createPayout() {
                this.$router.push('payout')
            },
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
                this.$router.push('add-car')
            },
            close() {
                this.isShowEmployee = false;
            },
            createEmployee() {
                this.isShowEmployee = true;
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