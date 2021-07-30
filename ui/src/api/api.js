import { notification } from 'antd'

import axios from 'axios'

export const BASE_URL = 'http://localhost:8000/'

const token = JSON.parse(localStorage.getItem('access_token') || null)

const options = {
    headers: {
        Authorization: `Token ${token}`
    }
}

const download = {
    responseType: 'blob',
    headers: {        
        Authorization: `Token ${token}`
    }
}

export const INSTANCE = axios.create({
    baseURL: BASE_URL,
})

export const INSTANCE_OP = axios.create({
    baseURL: BASE_URL,
})

export const POST_LOGIN = async (endpoint, data) =>{
    
    const request = await INSTANCE.post(endpoint, data)

    return request
}

export const DOWNLOAD = async(endpoint, name_file) => {
    const request = await INSTANCE.get(endpoint, download).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', name_file)
        document.body.appendChild(link)
        link.click()
    })
    
    await notification.open({
        message: 'Notificación de Descarga',
        description: `Archivo ${name_file} descargado...`,
        placement: 'bottomRight'
    })

    return request
}

export const GET = async(endpoint) =>{
    const request = await INSTANCE.get(endpoint, options)
    return request
}

export const POST = async(endpoint, data) =>{
    const request = await INSTANCE.post(endpoint, data, options)
    return request
}

export const PATCH = async(endpoint, data) =>{
    const request = await INSTANCE.patch(endpoint, data, options)
    return request
}

export const DELETE = async(endpoint) =>{
    const request = await INSTANCE.delete(endpoint, options)
    return request
}
