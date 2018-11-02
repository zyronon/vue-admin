<template>
    <div class="ProjectChange">
        <el-row class="mb20p">
            <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialog.ProjectChangeVisible = true">
                新建项目变更
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>项目基本信息变更管理</span>
            </div>
            <el-table :data="rows.list" style="width: 100%" border stripe v-loading="listLoading">
                <!--<el-table-column type="selection" width="55"></el-table-column>-->
                <el-table-column prop="Id" label="序号" sortable></el-table-column>
                <el-table-column prop="CreateBy" label="创建人" sortable></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间" sortable>
                    <template slot-scope="scope">
                        {{scope.row.CreateTime|date('YYYY-MM-DD')}}
                    </template>
                </el-table-column>
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
        <ProjectChangeDialog v-bind:is-visible="dialog.ProjectChangeVisible"
                       v-on:close="dialog.ProjectChangeVisible = false"/>
    </div>
</template>

<script>
    import ProjectChangeDialog from './dialog/ProjectChangeDialog'

    export default {
        name: "ProjectChange",
        components: {
            ProjectChangeDialog
        },
        data() {
            return {
                dialog: {
                    ProjectChangeVisible: false
                },
                listLoading: false,
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
                }
            }
        },
        created() {
            let list = []
            for (let i = 0; i < 5; i++) {
                let temp = {
                    Id: i,
                    CreateTime: Date.now(),
                    CreateBy: '王王王' + i,
                    Status: '101',
                }
                list.push(temp)
            }
            this.rows.list = list
            this.rows.count = list.length
        },
        methods: {},
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>