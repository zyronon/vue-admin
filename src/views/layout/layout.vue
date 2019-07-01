<template>
    <el-container>
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
        <el-container>
            <el-aside class="el-aside-right" :width="isCollapse?'60px':'240px'" style="position: relative;">
                <el-menu unique-opened style="position: relative;"
                         class="sidebar-menu"
                         mode="vertical"
                         :show-timeout="200"
                         :default-active="$route.path"
                         :collapse="isCollapse"
                         :background-color="bg"
                         :text-color="tc"
                         :active-text-color="atc">
                    <template v-for="item in sideMenu" v-if="!item.hidden && item.children">
                        <!-- 单级 -->
                        <router-link
                                v-if="onlyOneShowingChildren(item.children) && !item.children[0].children && !item.hidden"
                                :key="item.children[0].name"
                                :to="item.path+'/'+item.children[0].path">
                            <el-menu-item :index="item.path + '/' + item.children[0].path">

                                <i class="el-icon-setting" v-if="item.children[0].meta && item.children[0].meta.icon"
                                   :name="item.children[0].meta.icon"></i>
                                <span slot="title" v-if="item.children[0].meta && item.children[0].meta.title">
                                        {{item.children[0].meta.title}}
                                    </span>
                            </el-menu-item>
                        </router-link>

                        <!-- 一级菜单 -->
                        <el-submenu class="sidebar-wrap__menu"
                                    v-else
                                    :key="item.name"
                                    :index="item.name || item.path">
                            <template slot="title">
                                <i class="el-icon-setting" v-if="item.meta && item.meta.icon"
                                   :name="item.meta.icon"></i>
                                <span slot="title" v-if="item.meta && item.meta.title">
                                    {{!isCollapse ? item.meta.title : ''}}
                                </span>
                            </template>
                            <template v-for="child in item .children" v-if="!child.hidden">
                                <!-- 二级菜单 -->
                                <sidebar-item v-if="child.children && child.children.length > 0"
                                              :routes="[child]"
                                              :key="child.path">
                                </sidebar-item>

                                <router-link v-else
                                             :to="item.path+'/'+child.path"
                                             :key="child.name">
                                    <el-menu-item :index="item.path+'/'+child.path">
                                        <i class="el-icon-setting" v-if="child.meta && child.meta.icon"
                                           :name="child.meta.icon"></i>
                                        <span slot="title" v-if="child.meta && child.meta.title">
                                            {{child.meta.title}}
                                        </span>
                                    </el-menu-item>
                                </router-link>
                            </template>
                        </el-submenu>
                    </template>
                </el-menu>
                <div class="sidebar-minimizer" v-bind:style="{ width: isCollapse?'0px':'180px'}" @click="switchNavbar">
                    <i v-bind:class="{ 'el-icon-arrow-left': !isCollapse, 'el-icon-arrow-right':isCollapse}"></i>
                </div>
            </el-aside>
            <el-main :style="{'margin-right':isRightCollapse?'0':'320px'}">
<!--                <keep-alive>-->
                    <router-view></router-view>
<!--                </keep-alive>-->
            </el-main>
            <el-aside class="el-aside-left" :style="{'right':isRightCollapse?'-320px':'0'}"  >
                <side-bar-right class="sidebar-container" />
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import breadcrumb from '@/components/breadcrumb'
    import SidebarRight from './SidebarRight'
    import infodrop from './NavbarInfoDrop'


    export default {
        name: "layout",
        components: {
            breadcrumb, infodrop,
            'side-bar-right': SidebarRight,
        },
        data() {
            return {
                bg: '#3c505a',
                tc: '#fff',
                atc: '#fff',
                sideMenu: this.$store.state.roles,
                isCollapse: false,
                isRightCollapse: true,
            }
        },
        created() {
        },
        mounted(){},
        methods: {
            reload(){
                location.href = '/'
            },
            onlyOneShowingChildren(children) {
                return children.filter(item => !item.hidden).length === 1
            },
            switchNavbar() {
                this.isCollapse = !this.isCollapse
            },
            switchRightbar() {
                this.isRightCollapse = !this.isRightCollapse
            }
        }
    }
</script>

<style scoped lang="scss">

    .is-active {
        background: #20a8d8 !important;
    }

    .el-container {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
    }

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

    .el-aside-right {
        transition: width .3s;
        height: 100%;
        background: #3c505a;
        overflow-x: hidden;

        .el-menu {
            border: 0;
            padding-bottom: 50px;
        }

        .el-menu:not(.el-menu--collapse) {
            width: 240px;
            min-height: 400px;
        }

        .sidebar-minimizer {
            transition: all .3s !important;
            position: fixed;
            width: 180px;
            /*right: 0;*/
            left: 0;
            bottom: 0;
            padding: 0 40px 0 20px;
            cursor: pointer;
            background: #2f353a;
            line-height: 50px;
            height: 50px;
            text-align: end;
            color: white;
        }
    }

    .el-aside-left {
        position: fixed;
        top: 60px;
        right: 0;
        bottom: 0;
        z-index: 9;
        width: 320px!important;
        transition: all .3s;
        border: 1px solid #ddd;
        background: #fff;
    }

    .el-main {
        transition: all .3s;
        background: #f1f1f1;
    }


</style>
