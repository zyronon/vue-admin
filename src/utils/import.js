// 如果是开发环境普通导入
// 如果不是开发环境路由动态导入
export default function _import(file, viewPath = 'views') {
  if (process.env.NODE_ENV === 'development') {
    return require(`@/${viewPath}/${file}.vue`).default// eslint-disable-line
  } if (process.env.NODE_ENV === 'production') {
    return () => import(`@/${viewPath}/${file}.vue`)
  }
  return false
}
