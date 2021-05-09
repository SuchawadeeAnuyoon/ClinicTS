export default function ({ $axios, store, redirect, req, res }) {
  if (process.server) {
    return
  }

  $axios.onRequest(
    (config) =>
      new Promise(async (resolve, reject) => {
        // add Authorization header
        if (config.headers.Authorization) {
          let token = store.getters['me/getToken']
          config.headers.Authorization = `Bearer ${token}`
          resolve(config)
        } else {
          resolve(config)
        }
      })
  )

  $axios.onRequestError(
    (err) =>
      new Promise(async (resolve, reject) => {
        console.log(err)
        resolve(err.config)
      })
  )

  $axios.onResponse(
    (response) =>
      new Promise(async (resolve, reject) => {
        return resolve(response)
      })
  )

  $axios.onResponseError(
    (err) =>
      new Promise(async (resolve, reject) => {
        if (err.response.status == 401 || err.response.statusCode == 401) {
          await store.commit('me/CLEAR_USER')
          redirect('/login')
        } else {
          return reject(err)
        }
      })
  )
}
