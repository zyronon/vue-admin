<template>
    <div class="Create">
        <el-row class="mb20p">
            <el-button type="primary" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新建公告</span>
                <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">
                <el-form-item label="编号:">
                    XXSDFSFGEW34FSF32
                </el-form-item>
                <el-form-item label="标题:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="正文:">
                            <input type="file">
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="附件:">
                            <input type="file">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="内容:">
                            <div ref="editor" style="text-align:left"></div>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="是否可评论:">
                            <el-checkbox v-model="checked"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="通知人员:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="发起人:">
                            TTentau
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                <el-col :span="24">
                    <el-form-item label="发起时间:">
                        2018-11-06 01:22:22
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check">提交</el-button>
                    <el-button @click="$router.push('detail')" type="success" icon="el-icon-check">预览
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import E from 'wangeditor';


    export default {
        name: "Create",
        components: {},
        data() {
            return {
                form: {},
                employee: {},
                editor: null,
                textarea2: '',
                checked: false
            }
        },
        methods: {
            preview() {
                let printHtml = this.editor.txt.html();
                printHtml = `<div style = "font-family: 宋体,SimSun;line-height: 30px;margin-bottom: 0;">
                                ${printHtml}
                            </div>`;
                let wind = window.open('', 'newwindow', 'height=1000, width=1000, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
                wind.document.body.innerHTML = printHtml;
                wind.print();
            }
        },
        mounted() {
            this.editor = new E(this.$refs.editor)
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            this.editor.create()
        }
    }
</script>

<style scoped lang='scss'>

</style>