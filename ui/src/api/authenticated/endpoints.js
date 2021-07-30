import { POST_LOGIN, GET } from '../api'

const login = async(data) =>{
    
    const request = await POST_LOGIN('users/login/', {
        email: data.email,
        password: data.password
    })

    return request.data
}

const retrieve = async(user) =>{
    
    const request = await GET(`users/${user}/`)

    return request.data
}


const list_admin= async()=>{
    const request = await GET('users/?type_user=A')
    return request.data
}


const api = {
    authenticated:{
        login
    },
    retrieve, 
    list_admin
}

export default api
