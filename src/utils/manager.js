import axios from "axios";
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/userStore"


const manager = axios.create({
    baseURL: 'http://10.112.244.193:8002',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},
});

// 用户管理模块 请求前统一操作
manager.interceptors.request.use((request) => {
    // console.log('开始请求')
    const userStore = useUserStore()
    if(userStore.getToken){
        request.headers.Authorization = userStore.getToken 
    }
    // console.log('request:',request)
    return request
},(error)=>{
    ElMessage.error(error.response.data.error);
    return Promise.reject(error.response.data.error);
})


manager.interceptors.response.use((response) => {
    // console.log('响应：',response)
    if (response.status === 200) {
        if (response.data.status===200){
            console.log('成功出去请求拦截！')
            return response.data
        }
        return response.data
    }
    return Promise.reject(response.statusText);
},(error)=>{
    return Promise.reject(error.response.data.error);
})

export default manager