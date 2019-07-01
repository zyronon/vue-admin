<template>
    <div class='layout-header'>
        <el-header>
            <div class="left">
                <i class="el-icon-school f30 mr30p cp" @click="reload()"></i>
                <span class="name">TTentau</span>
            </div>
            <div class="right">
                <div class="right-left">
                    <div @click="switchNavbar()">
                        <i v-if="!isCollapse" class="el-icon-s-unfold cp f22 ml10p mr10p"></i>
                        <i v-else class="el-icon-s-fold cp f22 ml10p mr10p"></i>
                    </div>
                    <breadcrumb/>
                </div>
                <div class="right-right">
                    <infodrop class="mr20p"/>
                    <el-badge is-dot class="notice-area">
                        <div @click="switchRightbar">
                            <i class="el-icon-bell f22 cp"></i>
                        </div>
                    </el-badge>
                </div>
            </div>
        </el-header>
    </div>
</template>
<script>
    export default {
        name: "layout-header",
        components: {},
        data() {
            return {
                isCollapse: false,
            }
        },
        created() {

        },
        computed: {
            switchRightbar() {

            },
            reload() {

            },
            switchNavbar() {
                // this.isCollapse = !this.isCollapse
            },
        },
        methods: {}
    }
</script>

<style scoped lang='scss'>
    .layout-header {
        .el-header {
            display: flex;
            align-items: center;

            .left {
                display: flex;
                align-items: center;
                width: 240px;

                .name {
                    font-size: 22px;
                    font-weight: bold;
                    font-family: 'Avenir', "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
                    letter-spacing: 3px;
                }
            }

            .right {
                width: 100%;
                justify-content: space-between;
                display: flex;
                align-items: center;

                .right-left {
                    display: flex;
                    align-items: center;
                }

                .right-right {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>
