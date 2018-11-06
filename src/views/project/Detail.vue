<template>
    <div class="project-detail">
        <el-row>
            <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <el-card class="box-card mb20p">
                <div slot="header" class="clearfix">
                    <span>项目详情</span>
                </div>
                <el-row>
                    <label>项目编号：{{project.Number}}</label>
                </el-row>
                <el-row>
                    <label>项目名字：{{project.Name}}</label>
                </el-row>
                <el-row>
                    <label>创建时间：{{project.Create_Date}}</label>
                </el-row>
                <el-row>
                    <label>创建人：{{project.Create_By}}</label>
                </el-row>
                <el-row>
                    <label>当前状态：{{project.Status}}</label>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="dialog.ProjectBiddingStartVisible = true">竞标</el-button>
                    <el-button type="primary" @click="dialog.WinningBidVisible = true">中标</el-button>
                    <el-button type="primary" @click="projectChange()">变更</el-button>
                    <el-button type="primary" @click="dialog.SettlementVisible = true">结算</el-button>
                    <el-button type="primary" @click="dialog.DataExportVisible = true">资料导出</el-button>
                    <el-button type="primary" @click="dialog.ProjectStopVisible = true">终止</el-button>
                </el-row>
            </el-card>
            <el-tabs type="border-card" stretch>
                <el-tab-pane label="规划管理">
                    <el-row>
                        <el-button type="primary" icon="el-icon-circle-plus-outline"
                                   @click="dialog.AddProjectPlanVisible =true">添加预算
                        </el-button>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="back()">变更记录</el-button>
                    </el-row>
                    <el-table :data="rows.purchase.list" style="width: 100%" border stripe v-loading="listLoading">
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
                </el-tab-pane>
                <el-tab-pane label="采购管理">
                    <el-row>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="back()">添加采购
                        </el-button>
                    </el-row>
                    <el-table :data="rows.purchase.list" style="width: 100%" border stripe v-loading="listLoading">
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
                </el-tab-pane>
                <el-tab-pane label="现场周报管理">
                    <el-row>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="back()">添加周报/节点报
                        </el-button>
                    </el-row>
                    <el-table :data="rows.purchase.list" style="width: 100%" border stripe v-loading="listLoading">
                        <!--<el-table-column type="selection" width="55"></el-table-column>-->
                        <el-table-column prop="Create_Date" label="日期" sortable></el-table-column>
                        <el-table-column prop="Create_By" label="上传人" sortable></el-table-column>
                        <el-table-column prop="Number" label="说明" sortable></el-table-column>
                        <el-table-column prop="Number" label="文件" sortable></el-table-column>
                        <el-table-column prop="" label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="look(scope.row.id)">预览</el-button>
                                <el-button type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="计量支付管理">
                    <el-row>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="back()">新增支付申请
                        </el-button>
                    </el-row>
                    <el-table :data="rows.purchase.list" style="width: 100%" border stripe v-loading="listLoading">
                        <!--<el-table-column type="selection" width="55"></el-table-column>-->
                        <el-table-column fixed prop="Name" label="标题" sortable></el-table-column>
                        <el-table-column prop="Number" label="不含税金额" sortable></el-table-column>
                        <el-table-column prop="Number" label="税额" sortable></el-table-column>
                        <el-table-column prop="Create_By" label="应报金额" sortable></el-table-column>
                        <el-table-column prop="Create_Date" label="实际支付" sortable></el-table-column>
                        <el-table-column prop="Create_Date" label="发起人" sortable></el-table-column>
                        <el-table-column prop="Create_Date" label="申请时间" sortable></el-table-column>
                        <el-table-column prop="Status" label="状态" sortable>
                            <template slot-scope="scope">
                                {{scope.row.Status|processStatus}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="look(scope.row.id)">查看</el-button>
                                <el-button type="primary" size="small" @click="look(scope.row.id)">导出</el-button>
                                <el-button type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="收款管理">
                    <el-row>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="back()">新增收款
                        </el-button>
                    </el-row>
                    <el-table :data="rows.purchase.list" style="width: 100%" border stripe v-loading="listLoading">
                        <!--<el-table-column type="selection" width="55"></el-table-column>-->
                        <el-table-column fixed prop="Name" label="收款金额" sortable></el-table-column>
                        <el-table-column fixed prop="Name" label="录入时间" sortable></el-table-column>
                        <el-table-column prop="Create_By" label="录入人员" sortable></el-table-column>
                        <el-table-column prop="Number" label="备注" sortable></el-table-column>
                        <el-table-column prop="Create_Date" label="提交时间" sortable></el-table-column>
                        <el-table-column prop="" label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="look(scope.row.id)">查看</el-button>
                                <el-button type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <ProjectBiddingStart v-bind:is-visible="dialog.ProjectBiddingStartVisible"
                             v-on:close="dialog.ProjectBiddingStartVisible = false"/>
        <WinningBid v-bind:is-visible="dialog.WinningBidVisible"
                    v-on:close="dialog.WinningBidVisible = false"/>
        <Settlement v-bind:is-visible="dialog.SettlementVisible"
                    v-on:close="dialog.SettlementVisible = false"/>
        <DataExport v-bind:is-visible="dialog.DataExportVisible"
                    v-on:close="dialog.DataExportVisible = false"/>
        <ProjectStop v-bind:is-visible="dialog.ProjectStopVisible"
                     v-on:close="dialog.ProjectStopVisible = false"/>
        <AddProjectPlan v-bind:is-visible="dialog.AddProjectPlanVisible"
                        v-on:close="dialog.AddProjectPlanVisible = false"/>

    </div>
</template>

<script>
    import Project from "../../api/project"
    import ProjectBiddingStart from "./dialog/ProjectBiddingStart"
    import WinningBid from "./dialog/WinningBid"
    import Settlement from "./dialog/Settlement"
    import DataExport from "./dialog/DataExport"
    import ProjectStop from "./dialog/ProjectStop"
    import AddProjectPlan from "./dialog/AddProjectPlan"


    export default {
        name: "ProjectDetail",
        components: {
            ProjectBiddingStart,
            WinningBid,
            Settlement,
            DataExport,
            ProjectStop,
            AddProjectPlan
        },
        data() {
            return {
                dialog: {
                    ProjectBiddingStartVisible: false,
                    WinningBidVisible: false,
                    SettlementVisible: false,
                    DataExportVisible: false,
                    ProjectStopVisible: false,
                    AddProjectPlanVisible: false,
                },
                project: {
                    id: ''
                },
                listLoading: false,
                rows: {
                    purchase: {
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
            }
        },
        created() {
            // console.log(this.$route)
            // console.log(this.$route.params)
            this.project.id = this.$route.params.id
            this.getData()
        },
        methods: {
            async getData() {
                let data = {
                    id: this.project.id
                }
                let result = await Project.detail(data)
                if (result.status === 1) {
                    this.project = result.data
                }
                console.log(this.project)
            },
            projectChange() {
                this.$router.push('project-change')
            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang="scss">
    .el-row {
        margin-bottom: 20px;
    }

</style>