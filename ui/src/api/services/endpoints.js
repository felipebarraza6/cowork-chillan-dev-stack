import { GET, PATCH, DELETE, POST } from '../api'


const list_categories = async(page) => {    
    const request = await GET(`services_category/?page=${page}`)
    return request.data
}

const delete_category = async(category) => {
    const request = await DELETE(`services_category/${category}/`)
    return request.data
}

const list_services = async(page) => {
    const request = await GET(`services/?page=${page}`)
    return request.data
}

const create_category = async(data) => {
    const request = await POST(`services_category/`, data)
    return request.data
}

const create_service = async(data) => {
    const request = await POST(`services/`, data)
    return request.data
}

const update_service = async(data, service) => {
    const request = await PATCH(`services/${service}/`, data)
    return request.data
}

const delete_service = async(service) => {
    const request = await DELETE(`services/${service}/`)
    return request.data
}

const list_valorations = async() => { 
    const request = await GET('services_valoration/')
    return request.data
}

const add_valoration = async(data) => {
    const request = await POST(`services_valoration/`, data)
    return request.data
}

const update_valoration = async(data, valoration) => {
    const request = await PATCH(`services_valoration/${valoration}/`, data)
    return request.data
}

const delete_valoration = async(valoration) => {
    const request = await DELETE(`services_valoration/${valoration}/`)
    return request.data
}

const services = {
    categories: {
        list_categories,
        delete_category,
        create_category
    },
    list_services,
    create_service,
    update_service,
    delete_service,
    valorations: {
        add_valoration,
        delete_valoration,
        update_valoration,
        list_valorations
    }
}


export default services
