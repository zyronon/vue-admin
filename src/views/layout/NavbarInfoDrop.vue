<template>
    <div class="info-area">
        <el-dropdown trigger="click" @command="dropdownComm" class="info-area__dropdown">
      <span class="el-dropdown-link">
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="lock">锁定</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div @click="jumpToProfile" class="info-area__avatar">
            <img :src="avatarUrl"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'demo',
        data() {
            return {
                username: this.$store.state.userInfo.name||'test',
                avatarUrl: this.$store.state.userInfo.avatar||'https://i.loli.net/2018/08/18/5b7819891bab1.jpg'
            }
        },
        methods: {
            dropdownComm(command) {
                switch (command) {
                    case 'logout':
                        this.logouthandle()
                        break
                    case 'lock':
                        this.lockhandle()
                        break
                    case 'profile':
                        this.jumpToProfile()
                        break
                }
            },
            async logouthandle() {
                await this.$store.dispatch('logout')
                window.location.reload()
            },
            lockhandle() {
                this.$store.dispatch('setLockState', 'lock')
                this.$router.push({
                    path: '/lock'
                })
                this.$message.success(this.$t('lock.locked'))
            },
            jumpToProfile() {
                this.$router.push({
                    path: '/profile/index'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .inline-block-box {
        display: inline-block;
        vertical-align: middle;
    }

    .info-area {
        &__dropdown {
            @extend .inline-block-box;
            cursor: pointer;
        }
        &__avatar {
            @extend .inline-block-box;
            padding-left: 10px;
            width: 40px;
            height: 40px;
            overflow: hidden;
            cursor: pointer;
            img {
                border-radius: 50%;
                width: 100%;
                height: auto;
            }
        }
    }
</style>
