import { login, getInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/auth'
// eslint-disable-next-line import/no-duplicates
import { resetRouter } from '@/router'
// eslint-disable-next-line import/no-duplicates
import { addRouter } from '@/router/index.ts'

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
        const user = data.user || {}
        const token = data.token || ''
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
            getInfo(state.token).then((response: any) => {
                const { dataSet }: any = response
                if (!dataSet) {
                    // eslint-disable-next-line prefer-promise-reject-errors
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
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('USER_ROUTER')
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
