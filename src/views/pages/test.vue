<template>
    <div>
        <el-card :body-style="{ 'padding-top': '6px' }">
            <div slot="header">文章列表</div>
            <div class="d-flex flex-wrap-wrap">
                <div>
                    <label>代码</label>
                    <el-input
                            v-model="code"
                            placeholder="文章名称"
                            class="mt14p ml10p mr20p w200p"
                    ></el-input>
                    <label>第二个条件</label>
                    <el-input
                            v-model="two"
                            placeholder="第二个条件"
                            class="mt14p ml10p mr20p w200p"
                    ></el-input>
                    <label>第三个条件</label>
                    <el-input
                            v-model="three"
                            placeholder="第三个条件"
                            class="mt14p ml10p mr20p w200p"
                    ></el-input>
                </div>
                <el-button type="primary" icon="el-icon-search" class="ml10p mt14p" @click="init()">搜索
                </el-button>
            </div>
        </el-card>
        <el-table :data="realtime" border stripe class="mt20p">
            <el-table-column prop="code" label="股票代码" min-width="100"></el-table-column>
            <el-table-column prop="name" label="股票名字" min-width="100"></el-table-column>
            <el-table-column prop="open" label="今日开盘价" min-width="100"></el-table-column>
            <el-table-column prop="price" label="当前价格" min-width="100"></el-table-column>
            <el-table-column prop="pre_close" label="昨日收盘价" min-width="100"></el-table-column>
            <el-table-column prop="high" label="今日最高价" min-width="100"></el-table-column>
            <el-table-column prop="low" label="今日最低价" min-width="100"></el-table-column>
            <el-table-column prop="volume" label="成交量" min-width="100"></el-table-column>
            <el-table-column prop="amount" label="成交金额（元 CNY）" min-width="100"></el-table-column>
        </el-table>
        <el-table :data="today" border stripe class="mt20p">
            <el-table-column prop="code" label="股票代码" min-width="100"></el-table-column>
            <el-table-column prop="name" label="股票名字" min-width="100"></el-table-column>
            <el-table-column prop="open" label="今日开盘价" min-width="100"></el-table-column>
            <el-table-column prop="price" label="当前价格" min-width="100"></el-table-column>
            <el-table-column prop="pre_close" label="昨日收盘价" min-width="100"></el-table-column>
            <el-table-column prop="high" label="今日最高价" min-width="100"></el-table-column>
            <el-table-column prop="low" label="今日最低价" min-width="100"></el-table-column>
            <el-table-column prop="volume" label="成交量" min-width="100"></el-table-column>
            <el-table-column prop="amount" label="成交金额（元 CNY）" min-width="100"></el-table-column>
        </el-table>
        <el-table :data="history" border stripe class="mt20p">
            <el-table-column prop="close" label="收盘价" min-width="100"></el-table-column>
            <el-table-column prop="high" label="今日最高价" min-width="100"></el-table-column>
            <el-table-column prop="low" label="今日最低价" min-width="100"></el-table-column>
            <el-table-column prop="date" label="时间" min-width="100">
                <template v-slot="scope">{{scope.row.date}}</template>
            </el-table-column>
            <el-table-column prop="volume" label="成交量" min-width="100"></el-table-column>
        </el-table>

    </div>
</template>

<script>
    import HmacSHA256 from 'crypto-js/hmac-sha256'

    export default {
        components: {},
        data() {
            return {
                today: [],
                realtime: [],
                history: [],
                code: '603927',
                three: 0.18,
                two: 0.4
            }
        },
        created() {
            this.init()
        },
        methods: {
            async init() {
                await this.getData()
                // await this.getToday()
                // await this.getRealtime()
            },
            async getData() {
                let params = {
                    end: new Date().toISOString(),
                    ktype: 'D',
                    start: new Date(2020, 7, 21).toISOString(),
                    symbols: this.code,
                }
                let res = await this.request('historys', params)
                if (res) {
                    res = res[0]
                    // console.log(res)
                }

                // this.history = res.hist.slice(0, 20)
                // let first = this.history[0]

                let tempFirst = res.hist[0]
                let tempEnd = res.hist[res.hist.length - 1]

                let arr = res.hist
                let max = arr.length - 1
                for (let j = 0; j < max; j++) {
                    let done = true
                    for (let i = 0; i < max - j; i++) {
                        if (arr[i].close < arr[i + 1].close) {
                            let temp = arr[i]
                            arr[i] = arr[i + 1]
                            arr[i + 1] = temp
                            done = false
                        }
                    }
                    if (done) {
                        break
                    }
                }
                // console.log(arr)
                //
                this.history = arr
                //
                let first = this.history[0]
                let end = this.history[this.history.length - 1]
                //
                //
                // this.$console(tempFirst.close)
                // this.$console(tempEnd.close)
                console.log('当天收盘价', tempFirst.close)
                console.log('三个月前收盘价', tempEnd.close)
                console.log('三个月内最高收盘价', first.close)
                console.log('三个月内最低收盘价', end.close)

                console.log('第一个条件：当天收盘价  是否  小于 三个月前收盘价', tempFirst.close, '---', tempEnd.close, tempFirst.close < tempEnd.close)
                if (tempFirst.close < tempEnd.close) {
                    let temp = (first.close - end.close) / first.close
                    console.log('第二个条件：三个月内最高收盘价-三个月内最低收盘价/三个月内最高收盘价  是否  小于 0.4', first.close, '-', end.close, '/', first.close ,'=',temp,';', temp >  this.two)

                    if (temp > this.two) {
                        console.log('第二个条件ok')
                        await this.getData2(end)
                    } else {
                        console.log('第二个条件不不不不不不不不不不不不不ok2')
                    }
                } else {
                    console.log('第一个条件不不不不不不不不不ok1')
                }

            },
            async getData2(threeLow) {
                let params = {
                    end: new Date().toISOString(),
                    ktype: 'D',
                    start: new Date(2019, 12, 21).toISOString(),
                    symbols: this.code,
                }
                let res = await this.request('historys', params)
                if (res) {
                    res = res[0]
                    // console.log(res)
                }

                // this.history = res.hist.slice(0, 20)
                // let first = this.history[0]
                //
                // let tempFirst = res.hist[0]
                // let tempEnd = res.hist[res.hist.length - 1]

                let arr = res.hist
                let max = arr.length - 1
                for (let j = 0; j < max; j++) {
                    let done = true
                    for (let i = 0; i < max - j; i++) {
                        if (arr[i].volume < arr[i + 1].volume) {
                            let temp = arr[i]
                            arr[i] = arr[i + 1]
                            arr[i + 1] = temp
                            done = false
                        }
                    }
                    if (done) {
                        break
                    }
                }
                // console.log(arr)

                //
                let first = arr[0]
                let end = arr[arr.length - 1]
                //
                //
                // this.$console(tempFirst.close)
                // this.$console(tempEnd.close)
                console.log('全年最高成交量', first.volume)
                console.log('全年最高成交量的收盘价', first.close)
                console.log('三个月最低收盘价', threeLow.close)
                console.log('-----------------')

                let res1 = (first.close - threeLow.close) / first.close
                console.log('第三个条件：全年最高成交量的收盘价-三个月最低收盘价/三个月内最高收盘价  是否  小于 0.15   ', first.close, '-', threeLow.close, '/', first.close, res1 < this.three)

                if (res1 < this.three) {
                    console.log('第三个放量条件ok')
                } else {
                    console.log('第三个放量条件不不不不不不不不不不不不不不ok')

                }

                // this.$console(first)

            },
            async getToday() {
                let params = { symbols: this.code }
                let res = await this.request('today', params)

                // res = res[0]
                this.today = res
            },
            async getRealtime() {
                let params = { symbols: this.code }
                let res = await this.request('realtime/', params)
                // res = res[0]
                this.realtime = res
            },
            request(api, params) {
                let timestamp = new Date().toISOString()
                // timestamp = '2020-11-20T17:02:24Z'
                let authStringPrefix = 'bce-auth-v1/758464a045b144fda1200f788c8d9f60/' + timestamp + '/1800'
                let signingKey = HmacSHA256(authStringPrefix, 'b61ed9c5892c4e4bbf503ee7217e5820')
                    .toString()

                let str = ''
                let keys = Object.keys(params)
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i]
                    if (i !== keys.length - 1) {
                        // str += key + '=' + params[key] + '&'
                        str += key + '=' + this.normalize(params[key]) + '&'
                    } else {
                        str += key + '=' + this.normalize(params[key])
                    }
                }

                // console.log(str);

                let header2 = 'GET\n' +
                    '/' + api + '\n' +
                    str + '\n' +
                    'host:gwgp-5bmrebmatbr.n.bdcloudapi.com'

                // console.log(header2);
                let signature = HmacSHA256(header2, signingKey)
                    .toString()

                // console.log(signingKey)
                // console.log(signature)

                // return authStringPrefix + '/host/' + signature
                return new Promise(resolve => {
                    this.$axios({
                        headers: {
                            'X-Bce-Signature': authStringPrefix + '/host/' + signature
                        },
                        method: 'GET',
                        url: 'http://testtestgp.com/' + api,
                        params
                    })
                        .then(r => {
                            resolve(r.data)
                        })
                })
            },
            normalize(string, encodingSlash) {
                let kEscapedMap = {
                    '!': '%21',
                    '\'': '%27',
                    '(': '%28',
                    ')': '%29',
                    '*': '%2A'
                }

                if (string === null) {
                    return ''
                }
                let result = encodeURIComponent(string)
                result = result.replace(/[!'\(\)\*]/g, function ($1) {
                    return kEscapedMap[$1]
                })

                if (encodingSlash === false) {
                    result = result.replace(/%2F/gi, '/')
                }

                return result
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/color.scss";

</style>
