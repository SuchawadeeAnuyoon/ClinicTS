export const state = () => {
  return {
    list: [],
  }
}

export const getters = {
  getList: (state) => {
    return state.list
  },
}

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },
}

export const actions = {
  async fetch({ commit }, params) {
    const self = this
    return await self.$api
      .getMedicalSupplies(params)
      .then(async (response) => {
        await commit('SET_LIST', response.data.data)
      })
      .catch((error) => {})
  },
}
