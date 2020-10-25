import { request } from '../plugins/api'

export function createDrugList(data) {
  const URL = `/api/v1/druglist`
  return request('post', URL, data, 'auth')
}

export function paidDrugList(id) {
  const URL = `/api/v1/druglist/${id}`
  return request('put', URL, {}, 'auth')
}

export function deleteDrugList(id) {
  const URL = `/api/v1/druglist/${id}`
  return request('delete', URL, {}, 'auth')
}