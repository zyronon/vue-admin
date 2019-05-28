<template>
    <div class="messages">
        <div class="notice">
            <span></span>
            <span>你有100条新消息</span>
            <i class="el-icon-close cp"></i>
        </div>
        <div class="list">
            <div class="item" v-for="(item,index) in messages" :key="item.id">
                <div class="header">
                    <i class="el-notification__icon el-icon-info"></i>
                    <div class="title">提示提示</div>
                    <i class="el-icon-close cp"></i>
                </div>
                <div class="content">
                    这是一条不会自这是一条不会自动关闭的消息这是一条不会自动关闭的消息动关闭的消息
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    // import _ from 'lodash'

    export default {
        name: 'SidebarRight',
        data() {
            return {
                messages: [],
            }
        },
        methods: {
            remove(index) {
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
    .messages {
        width: 320px;
        border: 1px solid #bbb;

        .notice {

            padding: 0 10px;
            position: relative;
            height: 50px;
            background: #f1f1f1;
            border-left: 4px solid #999;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .list {
            .item {
                padding: 10px;
                margin: 10px;
                background: #f1f1f1;
                border-radius: 4px;
                color: #606266;

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;

                    .title {
                        color: black;
                    }

                    .el-icon-info {
                        color: #888b91;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>
