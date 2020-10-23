import { request } from '../plugins/api'

export function getAllActivities() {
  const URL = `/api/v1/activities`
  return request('get', URL, {}, 'auth')
}