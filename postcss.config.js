export default {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: true
    },
    'postcss-pxtorem': {
      // "exclude": /node_modules/i, // 这里表示不处理node_modules文件下的css
      rootValue: 16, // 基准字体大小 设计稿宽度的1/10，代表 1rem=37.5px
      unitPrecision: 5, // 转换后的rem保留小数点位数
      propList: ['*'] // 需要做转化处理的css属性  * 就是所有属性都要转换，如`hight`、`width`、`margin`等，`*`表示全部
    }
  }
}
