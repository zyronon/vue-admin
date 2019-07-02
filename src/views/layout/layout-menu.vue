<template>
    <div class='layout-menu'>
        <el-menu unique-opened style="position: relative;"
                 class="sidebar-menu"
                 mode="vertical"
                 :show-timeout="200"
                 :default-active="$route.path"
                 :collapse="isLeftCollapse"
                 :background-color="bg"
                 :text-color="tc"
                 :active-text-color="atc">
            <template v-for="item in sideMenu" >
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
                                    {{!isLeftCollapse ? item.meta.title : ''}}
                                </span>
                    </template>
                    <template v-for="child in item .children"  >
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
        <div class="sidebar-minimizer" v-bind:style="{ width: isLeftCollapse?'0px':'180px'}" @click="switchNavbar">
            <i v-bind:class="{ 'el-icon-arrow-left': !isLeftCollapse, 'el-icon-arrow-right':isLeftCollapse}"></i>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {types} from "../../store/mutation-types"

    export default {
        name: "layout-menu",
        components: {},
        data() {
            return {
                bg: '#3c505a',
                tc: '#fff',
                atc: '#fff',
            }
        },
        created() {

        },
        computed: {
            sideMenu() {
                let newArr = this.$store.state.user.roles.filter(v => !v.hidden && v.children)
                newArr.map(v => {
                    v.children = v.children.filter(w => !w.hidden)
                    return v
                })
                return newArr
            },
            ...mapState({
                isLeftCollapse: state => state.layout.isLeftCollapse,
            }),
        },
        methods: {
            onlyOneShowingChildren(children) {
                return children.filter(item => !item.hidden).length === 1
            },
            switchNavbar() {
                this.$store.commit(types.COLLAPSE_LEFT)
            },
        }
    }
</script>

<style scoped lang='scss'>
    .is-active {
        background: #20a8d8 !important;
    }

    .layout-menu {
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
</style>
