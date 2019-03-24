import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
let state = {
    car: car
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})