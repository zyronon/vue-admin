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
                <el-main style="display: flex;">
                    <div style="width: 100%;">
                        <tags-view/>
                        <app-main class="app-main"/>
                    </div>
                    <div class="right_bar" v-bind:style="{'width':rightBarWidth}">
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                        adfasdfads
                    </div>
                </el-main>
                <el-footer style="display: flex;justify-content: space-between;align-items: center;">
                    <span><a href="http://console.jxzuche.cn">驾享租车共享平台</a> {{v}}</span>
                    <!-- <span class="ml-auto">Powered by <a href="http://coreui.io">CoreUI</a></span> -->
                    <div>使用过程中有问题请联系：滕先生，电话：
                        <span class="clickable">16621180566(微信同号)</span>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import Navbar from './Navbar'
    import Sidebar from './Sidebar'
    import AppMain from './AppMain'
    import TagsView from './TagsView'

    export default {
        name: 'Layout',
        components: {
            'side-bar': Sidebar,
            'nav-bar': Navbar,
            'app-main': AppMain,
            'tags-view': TagsView
        },
        computed: {
            asideWidth() {
                return this.$store.getters.getSliderStateWidth
            },
            rightBarWidth(){
                return this.$store.getters.getRightBarStateWidth
            }

        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../assets/styl/variables.styl"


    .el-container
        width 100%
        height 100%

    .el-header
        padding 0
        font-size 0
        line-height 60px
        background white
        box-sizing border-box
        overflow hidden

    .el-aside
        transition width .3s
        background el-aside-bg
        color el-aside-color
        overflow hidden

    .el-main
        padding 0
        height 100%
        overflow auto
</style>
