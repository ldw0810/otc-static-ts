import {LanguageData} from './typings/globle'

const zhCN = require('./assets/i18n/zh-CN.json')
const zhHK = require('./assets/i18n/zh-HK.json')
const enUS = require('./assets/i18n/en-US.json')

const languageDataList: LanguageData[] = [
  {
    language: 'zh-CN',
    name: '简体中文',
    data: zhCN
  },
  {
    language: 'zh-HK',
    name: '繁體中文',
    data: zhHK
  },
  {
    language: 'en-US',
    name: 'English',
    data: enUS
  }
]
export default languageDataList
