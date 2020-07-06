import Vuex from 'vuex';
import Vue from 'vue'
import moment from 'moment';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        unreadMessageCountChange: false,
        localization:{
            languages: {},
            locale:{}
        },
        highlighted: {
            dates: [
                new Date(),
            ],
        },
    },
    actions: {},
    getters: {
        getLocale(state){
            return state.localization.locale;
        },
        getErrorLocale(state){
            return  state.localization.locale.ErrorFront ? state.localization.locale.ErrorFront : {};
        },
        getContentLocale(state, key){
            return state.localization.locale.Content ? state.localization.locale.Content : {};
        },
        getLanguages(state){
            return state.localization.languages;
        },
        getPayment(state) {
            return state.payment
        }
    },
    modules: {},
    mutations: {
        changeUnreadMessageState(state) {
            state.unreadMessageCountChange = !state.unreadMessageCountChange;
        },
        changeLocale(state, locale){
            state.localization.locale = locale
        },
        changeLanguages(state, languages){
            state.localization.languages = languages
        }
    },
    strict: {}
});
