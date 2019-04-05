<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <transition-group name="list" tag="div">
            <div class="message list-item" v-for="(item,index) in messages" :key="item.id">
                <i class="el-notification__icon el-icon-info"></i>
                <div class="el-notification__group">
                    <h2 class="el-notification__title">提示{{item.id}}</h2>
                    <div class="el-notification__content">这是一条不会自这是一条不会自动关闭的消息这是一条不会自动关闭的消息动关闭的消息</div>
                    <div class="el-notification__closeBtn el-icon-close" @click="remove(index)"></div>
                </div>
            </div>
        </transition-group>

    </el-scrollbar>
</template>

<script>

    // import _ from 'lodash'

    export default {
        name: 'SidebarRight',
        data() {
            return {
                messages: [],
                items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                nextNum: 10
            }
        },
        methods: {
            remove(index) {
                console.log(index)
                this.messages.splice(index, 1)

            },
        },
        components: {},
        mounted() {
            for (let i = 0; i < 20; i++) {
                this.messages.push({id: i})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        display: flex;
        position: relative;
        background: #fff;
        /*color: #000;*/
        margin: 10px 20px 10px 10px;
        padding: 14px 26px 14px 13px;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

        .el-icon-info {
            color: #909399;
        }
    }

    ul, span {
        color: #000;
    }

    .list-item {
        transition: all .3s;
    }

    .list-enter-active, .list-leave-active {
        transition: all .3s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(230px);
    }

    .list-leave-active {
        position: absolute;
    }
</style>
