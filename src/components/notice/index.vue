<template>
    <el-badge is-dot class="notice-area">
        <div @click="handleSwitchRightSidebar">
            <icon name="notice" :scale="2.8"></icon>
        </div>
    </el-badge>
</template>

<script>
    export default {
        name: 'demo',
        methods: {
            handleSwitchRightSidebar() {
                this.$store.dispatch('toggleRightSideBar')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notice-area {
        width: 26px;
        height: 34px;
        cursor: pointer;
        transition: color .28s;
        svg {
            color: #515151;
            transition: color .28s;
            &:hover {
                color: #41b883;
            }
        }
    }
</style>
