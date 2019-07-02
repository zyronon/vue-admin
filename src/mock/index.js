import user from './user'

function init() {
    //此方法没有作用，主要是让导出去的MockData调用一下，不然webstorm的格式化会将没有调用的方法或类给去掉；其实导入这个文件代码就生效了，
}

export default {
    user,
    init
}

