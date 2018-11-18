<template>
    <div class="List">
        <el-row class="mb20p">
            <el-button type="info" icon="el-icon-refresh"></el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline"
                       @click="dialog.AddEmployeeVisible=true">新建
            </el-button>
            <el-button type="danger" icon="el-icon-delete" @click="$router.push('create')">删除</el-button>
            <el-input v-model="input" placeholder="请输入内容" class="w200p ml20p"></el-input>
            <el-button type="primary" icon="el-icon-search" class="ml10p" @click="getData()">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh"
                       @click="rows.filter.key = '';rows.filter.date = ''">重置
            </el-button>
        </el-row>
        <el-card class="box-card mb20p">
            <div slot="header" class="clearfix">
                <span>流程列表</span>
            </div>
            <el-table :data="rows.notify.list" style="width: 100%" border stripe v-loading="listLoading">
                <!--<el-table-column type="selection" width="55"></el-table-column>-->
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
                        <el-button type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "List",
        components: {},
        data() {
            return {
                listLoading:false,
                rows:{
                    notify:{
                        list:[]
                    }
                }
            }
        },
        created() {

        },
        methods: {},
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>