<template>
    <div class="Choose">
        <div class="ml170p mr200p mb20p">
            <p class="mb10p">党委</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card >
                        党委发文申请
                    </el-card>
                </el-col>

                <el-col :span="6">
                    <el-card >
                        党委收文申请
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="ml170p mr200p mb20p">
            <p class="mb10p">行政</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card>
                        行政发文申请
                    </el-card>
                </el-col>

                <el-col :span="6">
                    <el-card>
                        行政收文申请
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="ml170p mr200p mb20p">
            <p class="mb10p">纪委</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card>
                        纪委发文申请
                    </el-card>
                </el-col>

                <el-col :span="6">
                    <el-card>
                        纪委收文申请
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="ml170p mr200p mb20p">
            <p class="mb10p">其它</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card>
                        对外支付证书申请
                    </el-card>
                </el-col>

                <el-col :span="6">
                    <el-card>
                        合同审签申请
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card>
                        用印申请
                    </el-card>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Choose",
        components: {},
        data() {
            return {}
        },
        created() {

        },
        methods: {},
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>