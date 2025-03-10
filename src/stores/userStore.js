import { defineStore } from 'pinia'
import cache from '@/utils/module/cache'


export const useUserStore = defineStore('userStoreId',  {
  state:() => ({
    token: "",
    username: "",
    userid:"",
    userrole: "",
  }),
  getters:{
    getToken(state) {
      if(state.token){
        return state.token
      }
      return cache.getToken()
    },
    getUserName(state) {
      if(state.username){
        return state.username
      }
      return cache.getUserName()
    }, 
    getUserId(state) {
      if(state.userid){
        return state.userid
      }
      return cache.getUserId()
    },
    getUserRole(state) {
      if(state.userrole){
        return state.userrole
      }
      return cache.getUserRole()
    },
  },

  actions:{
    setToken(token) {
      this.token = token
      cache.setToken(token)
    },
    setUserName(username) {
      this.username = username
      cache.setUserName(username)
    },
    setUserId(userid) {
      this.userid = userid
      cache.setUserId(userid)
    },
    setUserRole(userrole) {
      this.userrole = userrole
      cache.setUserRole(userrole)
    },
  }
})
