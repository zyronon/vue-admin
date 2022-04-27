<template>
  <el-container>
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <el-container>
      <el-aside class="el-aside-left" :width="isLeftCollapse?'60px':'240px'">
        <layout-menu></layout-menu>
      </el-aside>
      <el-container>
        <el-main :style="{'margin-right':isRightCollapse?'0':'320px'}">
          <keep-alive :include="notReadMessages">
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <el-aside class="el-aside-right" :style="{'right':isRightCollapse?'-320px':'0'}">
          <layout-right-bar/>
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import layoutRightBar from './layout-right-bar'
import layoutHeader from './layout-header'
import layoutMenu from './layout-menu'
import { types } from '../../store/mutation-types'

export default {
  name: 'layout',
  components: {
    'layout-right-bar': layoutRightBar,
    'layout-header': layoutHeader,
    'layout-menu': layoutMenu,
  },
  data() {
    return {}
  },
  watch: {
    $route(newVal, oldVal) {
      console.log('当前：', newVal)
      let currentComName = newVal.matched[newVal.matched.length - 1].components.default.name
      console.log('当前：', currentComName)
      let notReadMessages = JSON.parse(JSON.stringify(this.notReadMessages))
      let res = notReadMessages.find(v => v === currentComName)
      if (!res) {
        notReadMessages.push(currentComName)
        this.$store.commit(types.SET_NOT_READ_MESSAGES, notReadMessages)
      }
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapState({
      isLeftCollapse: state => state.layout.isLeftCollapse,
      isRightCollapse: state => state.layout.isRightCollapse,
      notReadMessages: state => state.user.notReadMessages
    }),
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/color";

.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  padding: 0;
  font-size: 0;
  line-height: 60px;
  background: white;
  box-sizing: border-box;
  overflow: hidden;
}

.el-aside-left {
  transition: width .3s;
  background: $menu-bg-color;
  overflow: hidden;
}

.el-aside-right {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  z-index: 9;
  width: 320px !important;
  transition: all .3s;
  border: 1px solid #ddd;
  background: #fff;
}

.el-main {
  background: $bg-color;
  padding: 20px;
  height: 100%;
  overflow: auto;
  transition: all .3s;
}
</style>
