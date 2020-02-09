import {appService, wxService} from './instance.js'

// 签到
export const addSignIn = async (params) => {
  return await appService.post('signIn', params)
}

// 获取签到状态
export const getTodaySignStatus = async (params) => {
  return await appService.get('signIn/status', {params: params})
}

// 获取微信号
export const getWxValue = async (params) => {
  return await wxService.get('user/adviser/wechat', {params: params, headers: {'idfa': params.idfa, 'deviceid': params.deviceid, 'markettype': params.markettype}})
}