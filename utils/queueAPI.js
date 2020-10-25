import { request } from '../plugins/api'

export function getAllQueue() {
  const URL = `/api/v1/queue`
  return request('get', URL, {}, 'auth')
}

export function getQueue(id) {
  const URL = `/api/v1/queue/${id}`
  return request('get', URL, {}, 'auth')
}

export function updateQueue(id, data) {
  const URL = `/api/v1/queue/${id}`
  return request('put', URL, data, 'auth')
}