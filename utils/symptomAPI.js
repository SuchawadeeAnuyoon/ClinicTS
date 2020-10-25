import { request } from '../plugins/api'

export function getSymptom(id) {
  const URL = `/api/v1/symptom/${id}`
  return request('get', URL, {}, 'auth')
}

export function createSymptom(data) {
  const URL = `/api/v1/symptom`
  return request('post', URL, data, 'auth')
}

export function updateSymptom(id, data) {
  const URL = `/api/v1/symptom/${id}`
  return request('put', URL, data, 'auth')
}