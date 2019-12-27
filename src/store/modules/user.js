import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    // name: '',
    // avatar: ''
    user: {}
}

const mutations = {
    SET_USER: (state, user) => {
        state.user = user
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // user login
    signin({ commit }, data) {
        let user = data.user || {}
        let token = data.token || ''
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', token)
            setToken(token)
            // commit('SET_NAME', user.name || 'undefined')
            // commit('SET_AVATAR', user.avatar || '/img/default_avatar.png')
            commit('SET_USER', user)
            resolve()
        })
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { name, avatar } = data

                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            removeToken()
            resetRouter()
            resolve()
            // logout(state.token).then(() => {
            //     commit('SET_TOKEN', '')
            //     removeToken()
            //     resetRouter()
            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

