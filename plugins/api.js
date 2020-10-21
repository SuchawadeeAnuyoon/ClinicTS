import axios from 'axios'

// get token
let getToken=() => {
  if(process.server) {
    // server side
    return
  }
  if(window.$nuxt) {
    return window.$nuxt.$auth.getToken('local')
  }
}

export async function request(method, url, data, auth = false, params) {
  const headers = {}
  if (auth == 'auth') {
    headers['Authorization'] = getToken()
  }
  else if(auth == 'json') {
    headers['Authorization'] = getToken()
    headers['Content-Type'] = 'application/json'
  }
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      params
    })
    return response
  } catch (error) {
    return error.response
  }
}