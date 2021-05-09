export const state = () => {
  return {
    user: {},
    token: '',
    isShowMenuToggle: true,
  }
}

export const getters = {
  getToken: (state) => {
    const at = localStorage.getItem('token') || state.token
    return at
  },

  getUser: (state) => {
    const user = localStorage.getItem('user') || state.user
    const u = JSON.parse(user)
    return u
  },
  getIsShowMenuToggle: (state) => {
    const isShowMenuToggle = state.isShowMenuToggle
    return isShowMenuToggle
  },
}

export const mutations = {
  SET_TOKEN(state, token) {
    localStorage.setItem('token', token)
    state.token = token
  },
  SET_USER(state, user) {
    const u = JSON.stringify(user)
    localStorage.setItem('user', u)
    state.user = user
  },
  CLEAR_USER(state) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    state.user = {}
    state.token = ''
  },
  SET_ISSHOWMENUTOGGLE(state, is) {
    state.isShowMenuToggle = is
  },
}

export const actions = {
  async signup({ commit, dispatch }, form) {
    const self = this
    return await self.$api
      .signup(form)
      .then(async (response) => {
        return undefined
      })
      .catch((error) => {
        return error
      })
  },
  async login({ commit, dispatch }, { email, password }) {
    const self = this
    return await self.$api
      .login({
        email,
        password,
      })
      .then(async (response) => {
        await commit('SET_TOKEN', response.data.token)

        await dispatch('me')
        return response
      })
      .catch((error) => {
        return error
      })
  },
  async me({ commit }) {
    const self = this
    return await self.$api
      .me()
      .then(async (response) => {
        await commit('SET_USER', response.data.data)
      })
      .catch((error) => {
        return error
      })
  },

  async logout({ commit, getters }) {
    await commit('CLEAR_USER')
  },
}
