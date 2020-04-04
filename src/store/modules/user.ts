import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const state = {
    token: getToken(),
    // name: '',
    // avatar: ''
    user: {}
}

const mutations = {
    SET_USER: (state: any, user: any) => {
        state.user = user
    },
    SET_TOKEN: (state: any, token: any) => {
        state.token = token
    },
    SET_NAME: (state: any, name: any) => {
        state.name = name
    },
    SET_AVATAR: (state: any, avatar: any) => {
        state.avatar = avatar
    }
}

const actions = {
    // user login
    signin({ commit }: any, data: any) {
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
    getInfo({ commit, state }: any) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { dataSet }: any = response

                if (!dataSet) {
                    reject('验证失败,请重新登录')
                }
                commit('SET_USER', dataSet)
                resolve(dataSet)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }: any) {
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
    resetToken({ commit }: any) {
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

