<template>
    <div class="messages">
        <div class="notice">
            <i class="el-icon-chat-dot-square cp"></i>
            <span>您有{{notReadMessages.length}}条新消息</span>
            <i class="el-icon-close cp" @click="removeAll()"></i>
        </div>
        <transition-group name="list" tag="ul">
            <li class="item" v-for="(item) in notReadMessages" :key="item.id">
                <div class="header">
                    <i class=" el-icon-bell"></i>
                    <div class="title">{{item.title}}</div>
                    <i class="el-icon-close cp" @click="remove(item)"></i>
                </div>
                <div class="content">
                    {{item.content}}
                </div>
                <div class="date oh mt5p">
                    <span class="pull-right f12">{{item.createTime|date}}</span>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { types } from '../../store/mutation-types'

    export default {
        name: 'SidebarRight',
        data() {
            return {}
        },
        created() {
            this.getData()
        },
        computed: {
            ...mapState({
                notReadMessages: state => state.user.notReadMessages,
            }),
        },
        methods: {
            async remove(item) {
                const res = await this.$api.user.hasReadMessage({ id: item.id })
                if (res.code === '000000') {
                    this.$store.commit(types.SET_NOT_READ_MESSAGES, res.data)
                } else {
                    this.$error(res.msg)
                }
            },
            async removeAll() {
                const res = await this.$api.user.hasReadAllMessage({})
                if (res.code === '000000') {
                    this.$store.commit(types.SET_NOT_READ_MESSAGES, res.data)
                } else {
                    this.$error(res.msg)
                }
            },
            async getData() {
                const res = await this.$api.user.notReadMessages({})
                if (res.code === '000000') {
                    this.$store.commit(types.SET_NOT_READ_MESSAGES, res.data)
                } else {
                    this.$error(res.msg)
                }
            },
        },
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

        .el-icon-close:hover {
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
                box-shadow: 3px 3px 5px 1px #ccc;

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
