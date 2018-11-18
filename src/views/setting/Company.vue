<template>
    <div class="company-setting">
        <el-tabs type="border-card">
            <el-tab-pane label="合同模板">
                <el-row>
                    <el-button type="info" icon="el-icon-refresh" @click="refresh()"></el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="createContractTemplate()">
                        合同模板
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="$router.push('create')">删除</el-button>
                </el-row>
                <el-row>
                    <el-table :data="rows" style="width: 100%" border stripe v-loading="listLoading">
                        <!--<el-table-column type="selection" width="55"></el-table-column>-->
                        <el-table-column fixed prop="CarOwnerName" label="合同编号" sortable></el-table-column>
                        <el-table-column fixed prop="CarOwnerName" label="合同名称" sortable></el-table-column>
                        <el-table-column prop="CarBrand" label="合同状态" sortable></el-table-column>
                        <el-table-column prop="CarType" label="创建时间" sortable></el-table-column>
                        <el-table-column prop="" label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small">查看</el-button>
                                <el-button type="primary" size="small">启用</el-button>
                                <el-button type="primary" size="small">禁用</el-button>
                                <el-button type="primary" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>

                <el-dialog title="合同模板" :visible.sync="ContractTemplateVisible" width="80%">
                    <div class="dialog-body">
                        <el-form ref="form" :model="form" label-width="100px" label-position="left">
                            <el-row type="flex" justify="space-between">
                                <div>
                                    <el-form-item label="合同模板名称:">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-button type="primary" icon="el-icon-refresh" @click="refresh()">选取字段名</el-button>
                                    <el-button type="success" icon="el-icon-circle-plus-outline" @click="addCar()">帮助</el-button>
                                </div>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div ref="editor" id="editor" style="text-align:left"></div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="ContractTemplateVisible = false">取 消</el-button>
                        <el-button type="primary" @click="ContractTemplateVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>


            <el-tab-pane label="短信模板">
                <el-row>
                    <el-button type="info"  icon="el-icon-refresh" @click="refresh()"></el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="createMessageTemplate()">
                        短信模板
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="$router.push('create')">删除</el-button>
                </el-row>
                <el-row>
                    <el-table :data="rows" style="width: 100%" border stripe v-loading="listLoading">
                        <!--<el-table-column type="selection" width="55"></el-table-column>-->
                        <el-table-column fixed prop="CarOwnerName" label="短信模板编号" sortable></el-table-column>
                        <el-table-column fixed prop="CarOwnerName" label="短信模板名称" sortable></el-table-column>
                        <el-table-column prop="CarBrand" label="短信模板状态" sortable></el-table-column>
                        <el-table-column prop="CarType" label="创建时间" sortable></el-table-column>
                        <el-table-column prop="" label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small">查看</el-button>
                                <el-button type="primary" size="small">启用</el-button>
                                <el-button type="primary" size="small">禁用</el-button>
                                <el-button type="primary" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>

                <el-dialog title="短信模板" :visible.sync="MessageTemplateVisible" width="20%">
                    <div>
                        <div class="modal-body">
                            <el-form ref="form" :model="form" label-width="80px" label-position="left">
                                <el-form-item label="模板标题:">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="模板内容:">
                                    <el-input
                                            type="textarea"
                                            autosize
                                            placeholder="请输入内容"
                                            v-model="textarea2">
                                    </el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="MessageTemplateVisible = false">取 消</el-button>
                        <el-button type="primary" @click="MessageTemplateVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import E from 'wangeditor';

    export default {
        name: "CompanySetting",
        data() {
            return {
                form:{},
                textarea2:'',
                listLoading:false,
                rows: [],
                employee: {},
                ContractTemplateVisible: false,
                MessageTemplateVisible: false,
                editor: null,
            }
        },
        methods: {
            createIncome() {
                this.$router.push('income')
            },
            createPayout() {
                this.$router.push('payout')
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
            },
            refresh() {

            },
            createContractTemplate() {
                this.ContractTemplateVisible = true;
                setTimeout(()=>{
                    let ref = this.$refs;
                    console.log(ref);
                    console.log(ref.editor);
                    if (!this.editor) {
                        this.editor = new E(this.$refs.editor)
                        this.editor.customConfig.onchange = (html) => {
                            this.editorContent = html
                        };
                        this.editor.create();
                    }
                },50);
            },
            createMessageTemplate() {
               this.MessageTemplateVisible = true;
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>