import axios from 'axios'


//export const BASE_URL = 'http://localhost:8000'
export const BASE_URL = 'http://localhost:8000'

export const INSTANCE = axios.create({
    baseURL: BASE_URL
})


export const POST = async(endpoints, data) => {        
    const request = await INSTANCE.post(endpoints, data)
    return request
}

