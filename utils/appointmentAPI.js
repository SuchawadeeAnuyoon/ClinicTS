import { request } from '../plugins/api'

export function getAllAppointment() {
  const URL = `/api/v1/appointment`
  return request('get', URL, {}, 'auth')
}

export function newAppoinrment(data) {
  const URL = `/api/v1/appointment`
  return request('post', URL, data, 'auth')
}

export function updateAppoinrment(id, data) {
  const URL = `/api/v1/appointment/${id}`
  return request('put', URL, data, 'auth')
}

export function deleteAppoinrment(id, data) {
  const URL = `/api/v1/appointment/${id}`
  return request('delete', URL, data, 'auth')
}