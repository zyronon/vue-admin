<template>
    <div>
        <input type="text" :value="value" @input="test2($event)">
<!--        <input type="text" v-model="childAbout">-->
    </div>
</template>

<script>
    export default {
        name: 'my-input',

        props: {
            value: String
        },
        methods: {
            test2($event) {
                this.$emit('input', $event.target.value)
            }
        },
        computed: {
            childAbout: {
                get() {
                    return this.value
                },
                set(val) {
                    // 调用父组件的input方法，将变量放在第二个参数，即可改变父组件的变量
                    this.$emit('input', val)
                }
            }
        }
    }
</script>

<style scoped>

</style>
