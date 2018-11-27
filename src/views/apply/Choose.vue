<template>
    <div class="Choose">
        <div class="ml170p mr200p mb20p">
            <p class="mb10p">日常</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            普通申请
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="ml170p mr200p mb20p">
            <p class="mb10p">党委</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            党委发文申请
                        </div>
                    </div>
                </el-col>

                <el-col :span="6" @click="choose(2)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            党委收文申请
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="ml170p mr200p mb20p">
            <p class="mb10p">行政</p>
            <el-row :gutter="20">
                <el-col :span="6" @click="choose(3)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            行政发文申请
                        </div>
                    </div>
                </el-col>

                <el-col :span="6" @click="choose(4)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            行政收文申请
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="ml170p mr200p mb20p">
            <p class="mb10p">纪委</p>
            <el-row :gutter="20">
                <el-col :span="6" @click="choose(5)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            纪委发文申请
                        </div>
                    </div>
                </el-col>

                <el-col :span="6" @click="choose(6)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            纪委收文申请
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="ml170p mr200p mb20p">
            <p class="mb10p">其它</p>
            <el-row :gutter="20">
                <el-col :span="6" @click="choose(7)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            对外支付证书申请
                        </div>
                    </div>
                </el-col>

                <el-col :span="6" @click="choose(8)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            合同审签申请
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" @click="choose(9)">
                    <div class="el-card is-always-shadow cp" @click="choose(1);alert(6)">
                        <div class="el-card__body">
                            用印申请
                        </div>
                    </div>
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
        methods: {
            choose(type) {
                console.log(type)
                this.$router.push('create')
            }
        },
        filter: {},
        computed: {}
    }
</script>

<style scoped lang='scss'>

</style>