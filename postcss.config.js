module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度.
            viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度.(也可以不配置)
            unitPrecision: 5, // 保留几位小数，指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['ignore', 'tabbar', 'tabbaritem', 'home-nav'], // 指定不需要转换的类 直接在div上架ignore
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
            mediaQuery: false, // 允许在媒体查询中转换`px`
            exclude: [/Tabbar/] //必须是正则表达式  排除匹配的vue不转换
        },
    }
}