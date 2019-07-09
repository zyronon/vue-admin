<template>
    <div class="header">
        <div class="left">
            <i class="el-icon-school f30 ml20p mr30p cp" @click="reload()"></i>
            <span class="name">{{CONFIG.COMPANY_NAME}}</span>
        </div>
        <div class="right">
            <div class="right-left">
                <div @click="switchNavbar()" class="d-flex">
                    <i v-if="!isLeftCollapse" class="el-icon-s-unfold cp f22 ml10p mr10p"></i>
                    <i v-else class="el-icon-s-fold cp f22 ml10p mr10p"></i>
                </div>
                <breadcrumb/>
            </div>
            <div class="right-right">
                <infoDrop class="mr20p"/>
                <el-badge :value="notReadMessages.length"
                          :hidden="notReadMessages.length===0"
                          class="notice-area d-flex">
                    <i class="el-icon-bell f22 cp" @click="switchRightbar"></i>
                </el-badge>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
  import breadcrumb from '@/components/breadcrumb'
  import infoDrop from './info-drop'
  import { types } from '../../store/mutation-types'

  export default {
    name: 'layout-header',
    components: { breadcrumb, infoDrop },
    data() {
      return {}
    },
    created() {
    },
    computed: {
      ...mapState({
        isLeftCollapse: state => state.layout.isLeftCollapse,
        notReadMessages: state => state.user.notReadMessages,
      }),
    },
    methods: {
      reload() {
        window.location.href = '/'
      },
      switchNavbar() {
        this.$store.commit(types.COLLAPSE_LEFT)
      },
      switchRightbar() {
        this.$store.commit(types.COLLAPSE_RIGHT)
      },
    },
  }
</script>

<style scoped lang='scss'>
    .header {
        display: flex;
        align-items: center;

        .left {
            display: flex;
            align-items: center;
            width: 240px;

            .name {
                font-size: 22px;
                font-weight: bold;
                letter-spacing: 3px;
            }
        }

        .right {
            padding-right: 20px;
            flex: 1;
            justify-content: space-between;
            display: flex;
            align-items: center;

            .right-left {
                display: flex;
                align-items: center;
            }

            .right-right {
                display: flex;
                align-items: center;
            }
        }
    }

</style>
