import axios from 'axios'
import router from '../router'
import User from '@/apis/User'
export default {
    namespaced: true,
    state:{
        authenticated:false,
        user:{},
        token: {},
        // webAccess: {}
    },
    getters:{
        authenticated(state){
            return state.authenticated && Date.parse(state.token['tokenExpiry']) > (+ new Date())
        },
        user(state){
            return state.user
        },
        // webAccess(state){
        //     return state.user
        // },
        token(state){
            return state.token
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
        // SET_WEB_ACCESS (state, value) {
        //     state.webAccess = value
        // },
        SET_TOKEN (state, value) {
            state.token = value
        }
    },
    actions:{
        login({commit}, tokenData){
            commit('SET_TOKEN',tokenData)
            return User.auth().then(({data})=>{
                commit('SET_USER',data['data'])
                commit('SET_AUTHENTICATED',true)
                router.push('/dashboard')
            }).catch((error)=>{
                console.log(error)
                commit('SET_USER',{})
                commit('SET_AUTHENTICATED',false)
            })
        },
        // setWebAccess({commit}, webAccessData){
        //     commit('SET_WEB_ACCESS', webAccessData)
        // },
        logout({commit}){
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
        }
    }
}