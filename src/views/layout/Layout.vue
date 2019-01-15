<template>
    <el-container>
        <el-header>
            <nav-bar/>
        </el-header>

        <el-container>
            <el-aside :width="asideWidth">
                <side-bar class="sidebar-container"/>
            </el-aside>

            <el-container>
                <el-main>
                    <tags-view/>
                    <app-main/>
                </el-main>
            </el-container>
            <el-aside class="right_sidebar" :width="rightSideWidth">
                <side-bar-right class="sidebar-container"/>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import Navbar from './Navbar'
    import Sidebar from './Sidebar'
    import SidebarRight from './SidebarRight'
    import AppMain from './AppMain'
    import TagsView from './TagsView'

    export default {
        name: 'Layout',
        components: {
            'side-bar': Sidebar,
            'side-bar-right': SidebarRight,
            'nav-bar': Navbar,
            'app-main': AppMain,
            'tags-view': TagsView
        },
        computed: {
            asideWidth() {
                return this.$store.getters.getSliderStateWidth
            },
            rightSideWidth() {
                return this.$store.getters.getRightSliderStateWidth
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/variables";

    .el-container {
        width: 100%;
        height: 100%;
    }

    .el-header {
        padding: 0;
        font-size: 0;
        line-height: 60px;
        background: white;
        box-sizing: border-box;
        overflow: hidden;
    }

    .el-aside {
        transition: width .3s;
        background: $el-aside-bg;
        color: $el-aside-color;
        overflow: hidden;
    }
    .right_sidebar{
        border-left: 4px solid gainsboro;
        background: rgba(161, 161, 161, 0.32);
    }

    .el-main {
        padding: 0;
        height: 100%;
        overflow: auto;
    }

    .el-footer{
        /*padding: 0;*/
        border-top: 1px solid gainsboro;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
