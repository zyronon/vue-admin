<template>
  <div class="article-detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章详情</span>
      </div>
      <el-row>
        <el-col :span="24" class>
          <label for>标题：</label>
          <span>标题标题标题标题标题</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="mt20p">
          <label for>作者：</label>
          <span>标题标题标题标题标题</span>
        </el-col>
        <el-col :span="8" class="mt20p">
          <label for>分类：</label>
          <span>标题标题标题标题标题</span>
        </el-col>
        <el-col :span="8" class="mt20p">
          <label for>标签：</label>
          <span>标题标题标题标题标题</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="mt20p">
          <label for>是否原创：</label>
          <span>是</span>
        </el-col>
        <el-col :span="8" class="mt20p">
          <label for>是否置顶：</label>
          <span>是</span>
        </el-col>
        <el-col :span="8" class="mt20p">
          <label for>是否显示：</label>
          <span>是</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="mt20p">
          <label for>备注：</label>
          <span>标题标题标题标题标题</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="mt20p">
          <label for>全文：</label>
          <p>全文全文全文全全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文全文文全文全文全文全文全文全文全文全文全文全文全文全文全文</p>
        </el-col>
      </el-row>
      <el-row class="tac mt20p" style="border-top: 1px solid gainsboro;padding-top: 20px;">
        <el-col :span="24">
          <el-button
            type="primary"
            icon="el-icon-arrow-left"
            style="margin-bottom: 10px;"
            @click="$router.go(-1)"
          >返回</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleDetail",
  data() {
    return { 
    };
  },
  created() {},
  methods: {
    submit() {
      this.$success("sdfsd");
    }, 
  },
  mounted() {}
};
</script>

<style scoped>
</style>
