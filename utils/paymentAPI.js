import { request } from '../plugins/api'

export function createPayment(data) {
  const URL = `/api/v1/payment`
  return request('post', URL, data, 'auth')
}

export function getPayment(id) {
  const URL = `/api/v1/payment/${id}`
  return request('get', URL, {}, 'auth')
}

export function updatePay(id) {
  const URL = `/api/v1/payment/${id}`
  return request('patch', URL, {}, 'auth')
}