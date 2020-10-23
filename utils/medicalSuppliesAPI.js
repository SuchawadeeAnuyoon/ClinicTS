import { request } from '../plugins/api'

export function getAllMedicalSupplies() {
    const URL = '/api/v1/medicalSupplies'
    return request('get', URL, {}, 'auth')
}

export function newMedicalSupply(data) {
    const URL = '/api/v1/medicalSupplies/new'
    return request('post', URL, data, 'auth')
}

export function getOneMidicalSupply(id) {
    const URL = `/api/v1/medicalSupplies/${id}`
    return request('get', URL, {}, 'auth')
}

export function updateMidicalSupply(data, id) {
    const URL = `/api/v1/medicalSupplies/${id}`
    return request('put', URL, data, 'auth')
}

export function updateAmountMidicalSupply(data, id) {
    const URL = `/api/v1/medicalSupplies/addAmount/${id}`
    return request('put', URL, data, 'auth')
}

export function deleteMidicalSupply(id) {
    const URL = `/api/v1/medicalSupplies/${id}`
    return request('delete', URL, {}, 'auth')
}