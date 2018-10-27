<template>
    <div class="add-article">
        <el-row>
            <el-button type="primary" icon="el-icon-arrow-left" style="margin-bottom: 10px;" @click="back()">返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加文章</span>
                <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">
                <el-form-item label="标题:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="作者:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="分类:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="标签:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="是否原创:">
                            <el-checkbox v-model="checked"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="是否置顶:">
                            <el-checkbox v-model="checked"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="是否显示:">
                            <el-checkbox v-model="checked"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注:">
                            <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="textarea2">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div ref="editor" style="text-align:left"></div>
                    </el-col>
                </el-row>
            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check" style="margin-bottom: 10px;">提交</el-button>
                    <el-button @click="preview()" type="success" icon="el-icon-check" style="margin-bottom: 10px;">预览
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" style="margin-bottom: 10px;">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import E from 'wangeditor';

    export default {
        name: "CreateArticle",
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

<style scoped>

</style>