import { request } from '../plugins/api'

export function getAllUser() {
  const URL = `/api/v1/users`
  return request('get', URL, {}, 'auth')
}

export function getMe() {
  const URL = `/api/v1/me`
  return request('get', URL, {}, 'auth')
}

export function newUser(data) {
  const URL = `/api/v1/newUser`
  return request('post', URL, data, 'auth')
}

export function getOneUser(id) {
  const URL = `/api/v1/users/${id}`
  return request('get', URL, {}, 'auth')
}

export function deleteUser(id) {
  const URL = `/api/v1/users/${id}`
  return request('delete', URL, {}, 'auth')
}

// current user

export function changePasswordMe(data) {
  const URL = `/api/v1/password/change`
  return request('put', URL, data, 'auth')
}

export function updateMe(data) {
  const URL = `/api/v1//me/update`
  return request('put', URL, data, 'auth')
}

export function deleteMe() {
  const URL = `/api/v1/me/delete`
  return request('delete', URL, {}, 'auth')
}