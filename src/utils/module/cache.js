import constant from './constants'
class Cache{
    setToken(token){
        if(token===undefined){
            return
        }
        window.localStorage.setItem(constant.tokenKey,JSON.stringify(token))
    }
    setUserName(username){
        if(username==undefined){
            return
        }
        window.localStorage.setItem(constant.usernameKey,JSON.stringify(username))
    }
    setUserId(userid){
        if(userid==undefined){
            return
        }
        window.localStorage.setItem(constant.useridKey,JSON.stringify(userid))
    }
    setUserRole(userrole){
        if(userrole==undefined){
            return
        }
        window.localStorage.setItem(constant.userroleKey,JSON.stringify(userrole))
    }

    getToken(){
        let result = window.localStorage.getItem(constant.tokenKey)
        return JSON.parse(result)
    }
    getUserName(){
        let result = window.localStorage.getItem(constant.usernameKey)
        return JSON.parse(result)
    }
    getUserId(){
        let result = window.localStorage.getItem(constant.useridKey)
        return JSON.parse(result)
    }
    getUserRole(){
        let result = window.localStorage.getItem(constant.userroleKey)
        return JSON.parse(result)
    }
}

export default new Cache()