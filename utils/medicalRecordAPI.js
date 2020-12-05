import { request } from '../plugins/api'

export function getAllMedicalRecord(params) {
    const URL = '/api/v1/medicalRecord'
    return request('get', URL, {}, 'auth', params)
}

export function newMedicalRecord(data) {
    const URL = '/api/v1/medicalRecord/new'
    return request('post', URL, data, 'auth')
}

export function getOneMedicalRecord(id) {
    const URL = `/api/v1/medicalRecord/${id}`
    return request('get', URL, {}, 'auth')
}

export function updateMedicalRecord(data, id) {
    const URL = `/api/v1/medicalRecord/${id}`
    return request('put', URL, data, 'auth')
}

export function deleteMedicalRecord(id) {
    const URL = `/api/v1/medicalRecord/${id}`
    return request('delete', URL, {}, 'auth')
}