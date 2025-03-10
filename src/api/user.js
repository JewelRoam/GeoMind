import manager from "@/utils/manager";

export const logUserApi=(data) => {
    return manager({
        url:'log/User',
        method:'post',
        data: data
    })
}

export const logAdminApi=(data) => {
    return manager({
        url:'log/Admin',
        method:'post',
        data: data
    })
}





    
   