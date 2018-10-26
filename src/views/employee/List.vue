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
                <el-table-column fixed prop="Name" label="员工姓名" sortable></el-table-column>
                <el-table-column prop="Position" label="职位" sortable></el-table-column>
                <el-table-column prop="Phone" label="手机号" sortable></el-table-column>
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


        <el-dialog title="员工" :visible.sync="dialogEmployeeVisible" width="30%">
            <div>
                <div class="modal-body">
                    <el-form ref="form" :model="employee" label-width="80px" label-position="left">
                        <el-form-item label="姓名:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                        <el-form-item label="职位:">
                            <el-input v-model="employee.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEmployeeVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogEmployeeVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Mock from 'mockjs'

    export default {
        name: 'EmployeeList',
        data() {
            // let temp = Mock.mock({
            //     'firstName|3': 'fei',//重复fei这个字符串 3 次，打印出来就是'feifeifei'。
            //     'lastName|2-5': 'jiang',//重复jiang这个字符串 2-5 次。
            //     'big|+1': 0, //属性值自动加 1，初始值为 0
            //     'age|20-30': 25,//生成一个大于等于 20、小于等于 30 的整数，属性值 25 只是用来确定类型
            //     'weight|100-120.2-5': 110.24,//生成一个浮点数,整数部分大于等于 100、小于等于 120，小数部分保留 2 到 5 位。
            //     'likeMovie|1': false,//随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
            //     'friend1|1': ['adfadfa', 'fgsfgsdfgs', 'fdgtrnhgcv'],//从数组 arr 中随机选取 1 个元素，作为最终值。
            //     'friend2|+1': ['adfadfa', 'fgsfgsdfgs', 'fdgtrnhgcv'],//从属性值 arr 中顺序选取 1 个元素，作为最终值
            //     'friend3|2-3': ['adfadfa', 'fgsfgsdfgs', 'fdgtrnhgcv'],//通过重复属性值 arr 生成一个新数组，重复次数大于等于 2，小于等于 3。
            //     'life1|2': {
            //         Illegal: {
            //             FetchDate: '2018-11-11 12:23'
            //         },
            //         LicensePlateNumber: '沪A12345',
            //         CarOwnerName: '曹操',
            //     },//从属性值 obj 中随机选取 2 个属性
            //     'life1|1-2': {
            //         Illegal: {
            //             FetchDate: '2018-11-11 12:23'
            //         },
            //         LicensePlateNumber: '沪A12345',
            //         CarOwnerName: '曹操',
            //     },//从属性值 obj 中随机选取 1 到 2 个属性。
            //     'regexp1': /^[a-z][A-Z][0-9]$/,//生成的符合正则表达式的字符串
            //
            // })
            let temp = Mock.mock({
                'Name|3': 'fei',//重复fei这个字符串 3 次，打印出来就是'feifeifei'。
                'lastName|2-5': 'jiang',//重复jiang这个字符串 2-5 次。
                'big|+1': 0, //属性值自动加 1，初始值为 0
                'age|20-30': 25,//生成一个大于等于 20、小于等于 30 的整数，属性值 25 只是用来确定类型
                'weight|100-120.2-5': 110.24,//生成一个浮点数,整数部分大于等于 100、小于等于 120，小数部分保留 2 到 5 位。
                'likeMovie|1': false,//随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
                'Phone|1': ['13245678912', '13266678912', '1375678912'],//从数组 arr 中随机选取 1 个元素，作为最终值。
                'Name|+1': ['adfadfa', 'fgsfgsdfgs', 'fdgtrnhgcv'],//从属性值 arr 中顺序选取 1 个元素，作为最终值
                'Position|+1': ['经理', '业务', '车管', '财务', '助理'],//从属性值 arr 中顺序选取 1 个元素，作为最终值
                'friend3|2-3': ['adfadfa', 'fgsfgsdfgs', 'fdgtrnhgcv'],//通过重复属性值 arr 生成一个新数组，重复次数大于等于 2，小于等于 3。
                'life1|2': {
                    Illegal: {
                        FetchDate: '2018-11-11 12:23'
                    },
                    LicensePlateNumber: '沪A12345',
                    CarOwnerName: '曹操',
                },//从属性值 obj 中随机选取 2 个属性
                'life1|1-2': {
                    Illegal: {
                        FetchDate: '2018-11-11 12:23'
                    },
                    LicensePlateNumber: '沪A12345',
                    CarOwnerName: '曹操',
                },//从属性值 obj 中随机选取 1 到 2 个属性。
                'regexp1': /^[a-z][A-Z][0-9]$/,//生成的符合正则表达式的字符串

            })
            return {
                dialogEmployeeVisible: false,
                employee: {},
                car: {
                    Illegal: {
                        FetchDate: '2018-11-11 12:23'
                    },
                    LicensePlateNumber: '沪A12345',
                    CarOwnerName: '曹操',
                },
                data:{},
                rows: [temp],
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
            }
        },
        created() {
            console.log(this.rows)
        },
        // computed:{
        //     rows(){
        //         return [];
        //     }
        // },
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
                this.dialogEmployeeVisible = false
            },
            createEmployee() {
                this.dialogEmployeeVisible = true
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