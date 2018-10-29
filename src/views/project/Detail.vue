<template>
    <div class="project-detail">
        <el-row>
            <el-button type="primary" icon="el-icon-arrow-left" style="margin-bottom: 10px;" @click="back()">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <el-card class="box-card">
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
                    <label>状态：{{project.Status}}</label>
                </el-row>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import Project from "../../api/project"


    export default {
        name: "ProjectDetail",
        data() {
            return {
                project: {
                    id: ''
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