<template>
    <div class="Create">
        <el-row class="mb20p">
            <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline mb20p">
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
            <div class="processes">
                <div v-for="(item , index) in list" class="item oh" v-on:mouseleave="hover($event,1,index)"
                     v-on:mouseenter="hover($event,0,index)">
                    <i class="el-icon-delete delete" @click="delLevel(index)"/>
                    <div class="w5 pull-left left" ref="left">
                        {{index+1}}级
                    </div>
                    <div class="w93 pull-left right" ref="right">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="审批类型：">
                                <el-select v-model="formInline.region" placeholder="活动区域">
                                    <el-option label="普通" value="shanghai"></el-option>
                                    <el-option label="会签" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审批人员类型：">
                                <el-select v-model="formInline.region" placeholder="活动区域">
                                    <el-option label="指定人员" value="shanghai"></el-option>
                                    <el-option label="指定职务" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审批人员：">
                                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                            </el-form-item>
                            <el-form-item label="审批通过：">
                                <el-select v-model="formInline.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>

                        </el-form>
                    </div>
                </div>
                <div class="level-line"></div>
            </div>
            <div class="add" @click="addLevel()">
                <i class="el-icon-plus"/>添加审批级别
            </div>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;margin-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check">提交</el-button>
                    <el-button @click="$router.push('detail')" type="success" icon="el-icon-check">预览
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete">重置</el-button>
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
                this.list.push({})
            },
            delLevel(index) {
                if (index != 0)
                    this.list.splice(index, 1)
            },
            calculationLeftHeight() {
                let lefts = this.$refs.left
                let rights = this.$refs.right
                rights.forEach((item, index, array) => {
                    lefts[index].style.height = item.offsetHeight + 'px'
                })
            },
            hover(e, type, index) {
                let deleteEl = e.currentTarget.firstElementChild
                if (type === 0) {
                    if (index != 0) {
                        deleteEl.style.display = "block"
                    } else {
                        deleteEl.style.display = "none"
                    }
                } else {
                    deleteEl.style.display = "none"
                }
            }
        },
        mounted() {
            this.calculationLeftHeight()
        },
        updated() {
            this.calculationLeftHeight()
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>
    .processes {
        position: relative;
        .item {
            z-index: 1;
            margin-bottom: 40px;
            cursor: pointer;
            position: relative;
            border: 1px solid gainsboro;
            border-radius: 3px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2) !important;

            &:hover {
                border: 1px solid #24a4ff;
            }

            .left {
                background: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
            }

            .right {
                padding: 20px 0 20px 2%;
            }

            .delete {
                display: none;
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 22px;
                color: red;
            }
        }

        .level-line {
            height: 100%;
            border-left: 1px dashed #979797;
            position: absolute;
            top: 0;
            bottom: 100px;
            left: 40px;
            width: 0;
        }
    }

    .add {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        padding: 30px 0;
        border: 1px dashed #24a4ff;
        color: #24a4ff;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
            border: 1px solid #0088ff;
            color: #0088ff;
        }
    }

</style>