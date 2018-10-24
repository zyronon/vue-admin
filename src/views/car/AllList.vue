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
                <el-button type="primary" icon="el-icon-circle-plus-outline">添加车辆</el-button>
            </div>
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
                <el-table-column prop="LicensePlateNumber" label="车牌号/是否现车" sortable></el-table-column>
                <el-table-column prop="CarBrand" label="品牌" sortable></el-table-column>
                <el-table-column prop="CarType" label="型号" sortable></el-table-column>
                <el-table-column prop="Illegal" label="未外理违章" sortable></el-table-column>
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
    </div>
</template>

<script>
    export default {
        name: 'AllList',
        data() {
            return {
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
                input:'',
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
                }
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