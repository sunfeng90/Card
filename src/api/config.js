export const env = process.env.VUE_APP_WEB
export const config = {
  test: {
    appService: '',
    // 分别为第一个股票名称、股票值和第二个股票名称、股票值
    stock: [{
        head: '金鸿控股',
        value: '+30.17%'
      },
      {
        head: '锦龙股份',
        value: '+24.50%'
      }
    ]
  },
  production: {
    appService: '',
    // 分别为第一个股票名称、股票值和第二个股票名称、股票值
    stock: [{
      head: '金鸿控股',
      value: '+30.17%'
    }, {
      head: '锦龙股份',
      value: '+24.50%'
    }]
  }
} [env]