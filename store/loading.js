export const state = () => {
	return {
		loading: false,
	};
};

export const getters = {
	getLoading: (state) => {
		return state.loading;
	},
};

export const mutations = {
	SET_LOADING(state, value) {
		state.loading = value;
	},
};

export const actions = {
	setLoading({ commit }, value) {
		commit("SET_LOADING", value);
	},
};
