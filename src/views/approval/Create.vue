<template>
    <div class="Create">
        <el-row class="mb20p">
            <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="审批流程名称">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="使用范围">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div v-for="(item , index) in list">
                <el-row class="mb10p mt10p">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addLevel()">
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="delLevel(index)"></el-button>
                </el-row>
                <el-card class="box-card">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item>{{index+1}}级</el-form-item>
                        <el-form-item label="审批人员类型">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审批人员">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                        <el-form-item label="审批通过">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审批方式">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;margin-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check" >提交</el-button>
                    <el-button @click="$router.push('detail')" type="success" icon="el-icon-check" >预览
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" >重置</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Create",
        components: {},
        data() {
            return {
                formInline: {},
                list: [{}]

            }
        },
        created() {

        },
        methods: {
            addLevel(v) {
                console.log(v)
                this.list.push({})
            },
            delLevel(index) {
                if (index != 0)
                this.list.splice(index, 1)
            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>