import tools from "./tools"
import filters from "./filters"
import Config from '../config'
import CONSTANT from './const_var'

export default {
    data() {
        return {
            CONFIG: Config,
            CONSTANT: CONSTANT
        }
    },
    methods: {
        // //将tools里面的方法挂载到vue上,以方便调用，直接this.$xxx方法名就可以了
        // Object.keys(tools).forEach(key => {
        //     Vue.prototype[key] = tools[key]
        // })
        //将tools里面的方法用对象展开符混入到mixin上,以方便调用，直接this.$xxx方法名就可以了
        ...tools
    },
    filters: {
        // //将filter里面的方法添加了vue的筛选器上
        // Object.keys(filters).forEach(key => {
        //     Vue.filter(key, filters[key])
        // })
        ...filters
    }
}
