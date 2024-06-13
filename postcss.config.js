module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'i0s >= 7']
    },
    'postcss-pxtorem': {
      // 根节点的 fontsize 值
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [':root']
    }
  }
}
