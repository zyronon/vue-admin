<template>
    <el-header>
        <div class="left">
            <i class="el-icon-school f30 mr30p cp" @click="reload()"></i>
            <span class="name">{{CONFIG.COMPANY_NAME}}</span>
        </div>
        <div class="right">
            <div class="right-left">
                <div @click="switchNavbar()">
                    <i v-if="!isLeftCollapse" class="el-icon-s-unfold cp f22 ml10p mr10p"></i>
                    <i v-else class="el-icon-s-fold cp f22 ml10p mr10p"></i>
                </div>
                <breadcrumb/>
            </div>
            <div class="right-right">
                <infoDrop class="mr20p"/>
                <el-badge :value="notReadMessages.length" :hidden="notReadMessages.length===0" class="notice-area">
                    <div @click="switchRightbar">
                        <i class="el-icon-bell f22 cp"></i>
                    </div>
                </el-badge>
            </div>
        </div>
    </el-header>
</template>
<script>
    import breadcrumb from '@/components/breadcrumb'
    import infoDrop from './info-drop'
    import {types} from "../../store/mutation-types"
    import {mapState} from 'vuex'

    export default {
        name: "layout-header",
        components: {breadcrumb, infoDrop},
        data() {
            return {}
        },
        created() {

        },
        computed: {
            ...mapState({
                isLeftCollapse: state => state.layout.isLeftCollapse,
                notReadMessages: state => state.user.notReadMessages
            })
        },
        methods: {
            reload() {
                location.href = '/'
            },
            switchNavbar() {
                this.$store.commit(types.COLLAPSE_LEFT)
            },
            switchRightbar() {
                this.$store.commit(types.COLLAPSE_RIGHT)
            }
        }
    }
</script>

<style scoped lang='scss'>
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

</style>
