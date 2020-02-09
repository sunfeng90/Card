import axios from 'axios'
import {config} from '@/api/config.js'
axios.defaults.timeout = 30 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const appService = axios.create({
  baseURL: config.appService,
  timeout: 30 * 1000,
  headers: {"clienttype": "web"}
})
const services = [appService]
services.forEach(service => {
  service.interceptors.response.use(response => {
    if (response.status == 200) {
      return response.data;
    }
  }, error => Promise.reject(error))
})

export const wxService = axios.create({
  baseURL: config.appService,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    "clienttype": "web",
    "appAlias": 'com.baidao.silver'
  }
})

const wxservices = [wxService]
wxservices.forEach(service => {
  service.interceptors.response.use(response => {
    if (response.status == 200) {
      return response.data;
    }
  }, error => Promise.reject(error))
})