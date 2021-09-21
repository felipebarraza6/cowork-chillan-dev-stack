import { GET, PATCH, DELETE, POST, DOWNLOAD } from '../api'


const update_profileb = async(profile_id, data) => {
    const request = await PATCH(`profile_certb/${profile_id}/`, data)
    return request
}

const create_request_service = async(data) => {
    const request = await POST(`services_request/`, data)
    return request
}

const list_clients = async(page, first_name_contains = '', last_name_contains= '', dni_contains= '', is_legal_represent, is_active) => {
    const request = await GET(`clients/?page=${page}&dni__contains=${dni_contains}&first_name__contains=${first_name_contains}&surname__contains=${last_name_contains}&is_legal_represent=${is_legal_represent}&is_active=${is_active}`)
    return request.data
}

const update_client = async(data, id_client) =>{
    const request = await PATCH(`clients/${id_client}/`, data)
    return request
}

const delete_client = async(id_client) => {
    const request = await DELETE(`clients/${id_client}/`)
    return request
}

const retrieve_client = async(id_client) => {
    const request = await GET(`clients/${id_client}/`)
    return request
}

const list_business = async(page, name_contains = '', dni_contains= '') => {
    const request = await GET(`business/?page=${page}&business_name__contains=${name_contains}&dni_business__contains=${dni_contains}`)
    return request.data
}

const retrieve_business = async(id_business) => {
    const request = await GET(`business/${id_business}/`)
    return request
}

const update_business = async(data, id_business) =>{
    const request = await PATCH(`business/${id_business}/`, data)
    return request
}

const delete_business = async(id_business) => {
    const request = await DELETE(`business/${id_business}/`)
    return request
}

const create_business = async(data) =>{
    const request = await POST('business/', data)
    return request
}

const create_client = async(data) =>{
    const request = await POST('clients/', data)
    return request
}

const report_natural_person = async() => {
    const request = await DOWNLOAD('report/natural-persons/', 'listado_personas_naturales.xlsx')
    return request
}

const report_business = async() => {
    const request = await DOWNLOAD('report/business/', 'listado_empresas.xlsx')
    return request
}

const report_legal_represent = async() => {
    const request = await DOWNLOAD('report/legal-represents/', 'listado_representantes_legales.xlsx')
    return request
}

const clients = {
    create_client,
    list_clients,    
    update_client,
    delete_client,
    retrieve_client,
    create_business,
    list_business,
    update_business,
    delete_business,
    retrieve_business,
    report_natural_person,
    report_business,
    report_legal_represent,
    update_profileb,
    create_request_service
    
}

export default clients
