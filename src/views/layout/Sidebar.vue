<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu style="position: relative;"
                 unique-opened
                 class="sidebar-menu"
                 mode="vertical"
                 :show-timeout="200"
                 :default-active="$route.path"
                 :collapse="isCollapse"
                 :background-color="bg"
                 :text-color="tc"
                 :active-text-color="atc">
            <sidebar-item :routes="permission_routers"></sidebar-item>
            <div class="sidebar-minimizer" @click="handleSwitchNavbar">
                <i v-bind:class="{ 'el-icon-arrow-left': !isCollapse, 'el-icon-arrow-right':isCollapse}"></i>
            </div>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex'
    import sidebarItem from './SidebarItem'
    import _import from '@/utils/import'

    export default {
        name: 'Sidebar',
        data() {
            return {
                bg: '#556d84',
                tc: '#fff',
                atc: '#41B883',
            }
        },
        components: {
            sidebarItem
        },
        computed: {
            ...mapGetters(['sidebar', 'permission_routers']),
            isCollapse() {
                if (this.sidebar.sliderState === 'full') {
                    return false
                }
                return true
            }
        },
        methods: {
            handleSwitchNavbar() {
                this.$store.dispatch('toggleSideBar')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sidebar-minimizer {
        /*margin-right: 20px;*/
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        padding: 0 40px 0 20px;
        cursor: pointer;
        background: #2f353a;
        line-height: 50px;
        height: 50px;
        text-align: end;
    }
</style>
