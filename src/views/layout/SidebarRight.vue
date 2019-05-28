<template>
    <div class="messages">
        <div class="notice">
            <i class="el-icon-chat-dot-square cp"></i>
            <span>你有100条新消息</span>
            <i class="el-icon-close cp" @click="removeAll()"></i>
        </div>
        <!--        <ul class="list">-->
        <transition-group name="list" tag="ul">
            <li class="item" v-for="(item,index) in messages" :key="item.id">
                <div class="header">
                    <i class="el-notification__icon el-icon-info"></i>
                    <div class="title">提示提示{{index}}</div>
                    <i class="el-icon-close cp" @click="remove(index)"></i>
                </div>
                <div class="content">
                    这是一条不会自这是一条不会自动关闭的消息这是一条不会自动关闭的消息动关闭的消息
                </div>
            </li>
        </transition-group>

        <!--        </ul>-->
    </div>
</template>

<script>
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
            removeAll() {
                // this.$mConfirm('', '确定清空所有消息？', () => {
                //     this.messages = []
                // })
                this.getData()

            },
            getData(){
                for (let i = 0; i < 5; i++) {
                    this.messages.push({id: i})
                }
            }
        },
        components: {},
        mounted() {
           this.getData()
        }
    }
</script>

<style lang="scss" scoped>
    .item {
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
    .messages {
        height: 100%;
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

            i {
                font-size: 18px;
            }
        }

        ul {
            li {
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
