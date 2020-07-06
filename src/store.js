import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoading: false,
        baseUrl: '',
    },
    mutations: {
        setBaseUrl(state, baseUrl) {
            state.baseUrl = baseUrl;
        },
        setLoadingStatus(state, status = false) {
            state.isLoading = status
        }
    },
    getters : {
    
    }
});

export default store;