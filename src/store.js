import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoading: false,
        baseUrl: '',
        masks: {
            phone: "00-000-00-00",
            card: "0000 0000 0000 0000",
            sum: Number,
            expire: '00/00'
        },
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