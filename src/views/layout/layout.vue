<template>
    <el-container class="outer-ctn">
        <layout-header></layout-header>
        <el-container>
            <el-aside class="el-aside-left" :width="isLeftCollapse?'60px':'240px'" >
                <layout-menu></layout-menu>
            </el-aside>
            <el-main :style="{'margin-right':isRightCollapse?'0':'320px'}">
                <!--                <keep-alive>-->
                <router-view></router-view>
                <!--                </keep-alive>-->
            </el-main>
            <el-aside class="el-aside-right" :style="{'right':isRightCollapse?'-320px':'0'}">
                <layout-right-bar/>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import layoutRightBar from './layout-right-bar'
    import layoutHeader from './layout-header'
    import layoutMenu from './layout-menu'
    import {mapState} from 'vuex'


    export default {
        name: "layout",
        components: {
            'layout-right-bar': layoutRightBar,
            'layout-header': layoutHeader,
            'layout-menu': layoutMenu,
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        computed: {
            ...mapState({
                isLeftCollapse: state => state.layout.isLeftCollapse,
                isRightCollapse: state => state.layout.isRightCollapse,
            }),
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .outer-ctn {
        display: flex;
        flex-direction: column;
    }

    .el-container {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
    }

    .el-aside-left {
        transition: width .3s;
        height: 100%;
        background: #3c505a;
        overflow-x: hidden;
        position: relative;
    }

    .el-aside-right {
        position: fixed;
        top: 60px;
        right: 0;
        bottom: 0;
        z-index: 9;
        width: 320px !important;
        transition: all .3s;
        border: 1px solid #ddd;
        background: #fff;
    }

    .el-main {
        transition: all .3s;
        background: #f1f1f1;
    }


</style>
