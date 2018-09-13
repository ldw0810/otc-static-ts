import languageDataList from '../locale'
import {hexSha1} from './sha1'
import store from '../store'
// import BigNum from 'bignum'

const configure = require('../../configure')

/**
 *修改页面标题
 * @param {string} [title] --> 默认为'OTCMAKER'
 * */
export const $title = function (title?: any): void {
  title = title || 'OTCMAKER'
  window.document.title = title
}

export const $getDateStr = function (value: number): string {
  const getNumStr = (tempValue: number) => {
    if (+value > 9) {
      return '' + tempValue
    } else {
      return '0' + tempValue
    }
  }
  const tempDate: Date = new Date(value)
  return getNumStr(tempDate.getFullYear()) + '/' + getNumStr(tempDate.getMonth() + 1) + '/' + getNumStr(tempDate.getDate()) + ' ' + getNumStr(tempDate.getHours()) + ':' + getNumStr(tempDate.getMinutes()) + ':' + getNumStr(tempDate.getSeconds())
}
/**
 *获取当前语言，从localStorage或配置中读取
 *
 * @return {string} --> like 'en-US', 'zh-CN', 'zh-TW', 'zh-HK'
 * */
export const $getLanguage = function (): string {
  const currentLanguage = localStorage.getItem('language')
  if (currentLanguage) {
    return currentLanguage
  } else {
    const navLang = navigator.language
    const langList = languageDataList.map((item) => {
      return item.language
    })
    const localLang = langList.indexOf(navLang) > -1 ? navLang : configure.DEFAULT_LANGUAGE
    localStorage.setItem('language', localLang)
    return localLang
  }
}

/**
 * 获取语言供接口使用(统一 'zh-TW' 与 'zh-HK'，非中文统一为 'en')
 * */
export const $getAxiosLanguage = function (): string {
  let ln = ''
  const currentLanguage = localStorage.getItem('language')
  if (currentLanguage) {
    ln = currentLanguage
  } else {
    const navLang = navigator.language
    const langList = languageDataList.map((item) => {
      return item.language
    })
    const localLang = langList.indexOf(navLang) > -1 ? navLang : configure.DEFAULT_LANGUAGE
    localStorage.setItem('language', localLang)
    ln = localLang
  }
  if (['zh-HK', 'zh-TW'].indexOf(ln) > -1) {
    ln = 'zh-TW'
  } else if (ln !== 'zh-CN') {
    ln = 'en'
  }
  return ln
}
/**
 * 获取语言在配置locale中的index坐标
 *
 * return {index} number
 * */
export const $getLanguageIndex = function (): number{
  let index = 0
  for (let i = 0; i < languageDataList.length; i++) {
    if (languageDataList[i].language === (localStorage.getItem('language') || configure.DEFAULT_LANGUAGE)) {
      index = i
    }
  }
  return index
}

/**
 * 使用BigNum来截取和显示小数
 *
 * **/
export const $fixDecimalAuto = function (value: string | number, currency: string): number {
  if (currency) {
    if (store.state.code.payable.indexOf(currency) > -1) {
      return $fixDecimalsLegal(+value)
    } else {
      return $fixDecimalsBase(+value)
    }
  } else {
    return $fixDecimal(+value, 1)
  }
}

/**
 * 资产默认位数
 */
export const $fixDecimalsAsset = function (value: string | number): number {
  return $fixDecimal(value, configure.CONF_DECIMAL_ASSET)
}
/**
 * 数字币基本位数
 */
export const $fixDecimalsBase = function (value: string | number): number {
  return $fixDecimal(value, configure.CONF_DECIMAL_BASE)
}
/**
 * 法币显示位数
 */
export const $fixDecimalsLegal = function (value: string | number): number {
  return $fixDecimal(value, configure.CONF_DECIMAL_LEGAL)
}
/**
 * 设置BigNum的全局参数
 */
export const $fixDecimal = function (value: string | number, limit: number): number {
  let tempLimit = +limit
  let tempValue = +value
  if (tempValue > 0) {
    while (tempValue < 0.1) {
      tempLimit += 1
      tempValue *= 10
    }
    while (tempValue >= 1000 && tempLimit >= 0) {
      tempLimit -= 1
      tempValue /= 10
      if (tempLimit === 0) {
        break
      }
    }
  } else if (tempValue === 0) {
    tempLimit = 0
  }
  // return Number(BigNum(value + '')
  //   .decimalPlaces(tempLimit, BigNum.ROUND_FLOOR)
  //   .toFixed(tempLimit).toString())
  return 0
}

/**
 * 加法（解决精度问题）
 */
export const $plus = function (...args: number[]): number {
  if (args.length !== 2) {
    throw Error('Must set two params')
  }
  // const BigNum = new BigNum(args[0])
  // return BigNum.plus(args[1])
  return 0
}
/**
 * 减法（解决精度问题）
 */
export const $minus = function (...args: number[]): number {
  if (args.length !== 2) {
    throw Error('Must set two params')
  }
  // const BigNum = new BigNum(args[0])
  // return BigNum.minus(args[1])
  return 0
}
/**
 * 乘法（解决精度问题）
 */
export const $multipliedBy = function (...args: number[]): number {
  if (args.length !== 2) {
    throw Error('Must set two params')
  }
  // const BigNum = new BigNum(args[0])
  // return BigNum.multipliedBy(args[1])
  return 0
}
/**
 * 除法（解决精度问题）
 */
export const $dividedBy = function (...args: number[]): number {
  if (args.length !== 2) {
    throw Error('Must set two params')
  }
  // const BigNum = new BigNum(args[0])
  // return BigNum.dividedBy(args[1])
  return 0
}

/**
 * @description 光标设置到节点的末尾
 * @param {element} 节点
 */
// export function $setCursorPosition(el: Element) {
//   el.focus()
//   const range = document.createRange()
//   range.selectNodeContents(el)
//   range.collapse(false)
//   const sel = window.getSelection()
//   sel.removeAllRanges()
//   sel.addRange(range)
// }
