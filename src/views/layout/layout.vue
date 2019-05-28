<template>
    <el-container>
        <el-header>
            <div class="left">
                <icon class="el-header__icon" name="tree" :scale="4"></icon>
                <span class="name">TTentau</span>
            </div>
            <div class="right">
                <div class="right-left">
                    <div @click="switchNavbar()">
                        <icon class="menu-icon cp" name="menu" :scale="2.8"></icon>
                    </div>
                    <breadcrumb/>
                </div>
                <div class="right-right">
                    <infodrop class="mr20p"/>
                    <el-badge is-dot class="notice-area">
                        <div @click="switchRightbar">
                            <icon style="padding: 0;margin: 0;" name="notice" :scale="2.8"></icon>
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
                                <icon v-if="item.children[0].meta && item.children[0].meta.icon"
                                      :name="item.children[0].meta.icon"
                                      :scale="2">
                                </icon>
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
                                <icon v-if="item.meta && item.meta.icon"
                                      :name="item.meta.icon"
                                      :scale="2">
                                </icon>
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
                                        <icon v-if="child.meta && child.meta.icon"
                                              :name="child.meta.icon"
                                              :scale="2">
                                        </icon>
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
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-aside class="el-aside-left" :width="isRightCollapse?'0px':'320px'">
                <side-bar-right class="sidebar-container"/>
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
        methods: {
            onlyOneShowingChildren(children) {
                return children.filter(item => !item.hidden).length === 1
            },
            switchNavbar() {
                console.log(666)
                this.isCollapse = !this.isCollapse
            },
            switchRightbar() {
                this.isRightCollapse = !this.isRightCollapse
            }
        }
    }
</script>

<style scoped lang="scss">
    svg {
        margin-right: 25px;
    }

    .is-active {
        background: #20a8d8 !important;
    }

    .el-container {
        height: 100%;
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
        transition: width .3s;
        border: 1px solid #ddd;
        background: #fff;
    }

    .el-main {
        background: #f1f1f1;
    }

</style>
