<template>
  <div class="dashboard-ctn">
    <el-button @click="test">test</el-button>
    <el-row :gutter="20" class="header">
      <el-col :span="6">
        <div class="header-item">
          <div class="img-ctn">
            <icon name="users" scale="5"></icon>
          </div>
          <div class="right-ctn">
            <div class="number">9999</div>
            <span class="notice">新增用户</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="header-item">
          <div class="img-ctn">
            <icon name="locate" scale="5"></icon>
          </div>
          <div class="right-ctn">
            <div class="number">4488</div>
            <span class="notice">累计点击</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="header-item">
          <div class="img-ctn">
            <icon name="money" scale="5"></icon>
          </div>
          <div class="right-ctn">
            <div class="number">3325</div>
            <span class="notice">累计收入</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="header-item">
          <div class="img-ctn">
            <icon name="message" scale="5"></icon>
          </div>
          <div class="right-ctn">
            <div class="number">1233</div>
            <span class="notice">累计消息</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-card>
      <header slot="header" class="d-flex justify-content-between align-items-center">
        <div class="left">
          <span>数据展示</span>
        </div>
        <div class="right">
          <el-radio-group v-model="radio1">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
          </el-radio-group>
          <el-button class="ml20p" icon="el-icon-upload" type="primary"></el-button>
        </div>
      </header>
      <ve-line :data="chartData" :settings="chartSettings" :extend="extend"></ve-line>

    </el-card>
  </div>
</template>

<script>
import { types } from '../../store/mutation-types'

export default {
  name: 'DashboardIndex',
  data() {
    this.chartSettings = {
      axisSite: { right: ['下单率'] },
      yAxisType: ['KMB', 'percent'],
      yAxisName: ['数值', '比率']
    }
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    }
    return {
      radio1: '上海',
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          {
            日期: '1/1',
            访问用户: 1393,
            下单用户: 1093,
            下单率: 0.32
          },
          {
            日期: '1/2',
            访问用户: 3530,
            下单用户: 3230,
            下单率: 0.26
          },
          {
            日期: '1/3',
            访问用户: 2923,
            下单用户: 2623,
            下单率: 0.76
          },
          {
            日期: '1/4',
            访问用户: 1723,
            下单用户: 1423,
            下单率: 0.49
          },
          {
            日期: '1/5',
            访问用户: 3792,
            下单用户: 3492,
            下单率: 0.323
          },
          {
            日期: '1/6',
            访问用户: 4593,
            下单用户: 4293,
            下单率: 0.78
          }
        ]
      }
    }
  },
  methods: {
    test() {
      this.$store.commit(types.SET_NOT_READ_MESSAGES2)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-ctn {
  .header {
    margin-bottom: 20px;
  }

  .header-item {
    border-radius: 4px;
    padding: 20px;
    height: 80px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;

    .img-ctn {
      padding: 20px;
      transition: all .5s;
      border-radius: 4px;
      color: #40c9c6;
    }

    &:hover {
      .img-ctn {
        color: #fff;
        background: #40c9c6;
      }
    }

    .right-ctn {
      text-align: center;

      .number {
        font-weight: bold;
        font-size: 45px;
      }
    }
  }
}
</style>
