<template>
    <div class="messages">
        <div class="notice">
            <i class="el-icon-chat-dot-square cp"></i>
            <span>你有100条新消息</span>
            <i class="el-icon-close cp" @click="removeAll()"></i>
        </div>
        <transition-group name="list" tag="ul">
            <li class="item" v-for="(item,index) in messages" :key="item.id">
                <div class="header">
                    <i class=" el-icon-bell"></i>
                    <div class="title">提示提示{{index}}</div>
                    <i class="el-icon-close cp" @click="remove(index)"></i>
                </div>
                <div class="content">
                    这是一条不会自这是一条不会自动关闭的消息这是一条不会自动关闭的消息动关闭的消息
                </div>
            </li>
        </transition-group>
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
        created() {
            this.getData()
        },
        methods: {
            remove(index) {
                this.messages.splice(index, 1)
            },
            removeAll() {
                if (this.messages.length === 0) {
                    return this.$warning('没有消息可清空！')
                }
                this.$mConfirm('', '确定清空所有消息？', () => {
                    this.messages = []
                })
            },
            getData() {
                for (let i = 0; i < 7; i++) {
                    this.messages.push({id: i})
                }
            }
        },
        components: {},
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .messages {
        /*overflow: auto;*/
        /*height: 100%;*/
        /*min-width: 300px;*/
        /*overflow-x: hidden;*/
        /*padding: 0 15px;*/
        /*box-sizing: border-box;*/

        .el-icon-close:hover{
            transition: all .5s;
            transform: rotate(90deg);
        }
        .notice {
            /*position: absolute;*/
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
                /*box-sizing: border-box;*/
                /*width: 280px;*/
                padding: 15px;
                margin: 20px 15px;
                background: #f1f1f1;
                border-radius: 4px;
                color: #606266;
                box-shadow: 3px 3px 5px 1px  #ccc;

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;

                    .title {
                        color: black;
                    }

                    .el-icon-bell {
                        color: #7ac23c;
                        font-size: 18px;
                    }
                }
            }
        }
    }

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
</style>
