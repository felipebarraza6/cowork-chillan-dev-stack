import { GET, PATCH, POST, INSTANCE} from '../api'


const token = JSON.parse(localStorage.getItem('access_token') || null)

const options = {
    headers: {
        Authorization: `Token ${token}`
    }
}

const get_memberships = async(filters) => {

    let str_date = ''
    if(filters.month){
        str_date = `date_initial__month=${filters.month}`
    } else{
        str_date='date_initial__month='
    }


    const request = await GET(`memberships/?is_finish=${filters.is_finish || ''}&is_renovation=${filters.is_renovation || ''}&is_active=${filters.is_active || 'false'}&client_person__dni__contains=${filters.person_dni || ''}&client_business__dni_business__contains=${filters.business_dni || ''}&${str_date || ''}`)
            return request
}

const update_membership_file = async(membership, file_contract, copy_file_contract, file_cancel) => {
    let data = new FormData()
    if(file_contract){
        data.append('file_contract', file_contract)
    }
    if(copy_file_contract){
        data.append('copy_file_contract', copy_file_contract)
    }
    if(file_cancel){
        data.append('file_cancel', file_cancel)
    }

    try{
        const request = await INSTANCE.patch(`memberships/${membership}/`, data, options)
        return request
    }catch(error){
        console.log(error)
    }
}

const update_membership = async(membership, data) => {
    try {
        const request = await PATCH(`memberships/${membership}/`, data)
        return request
    }catch (error) {
        return error
    }
}

const create_membership = async(data) => {
    try{
        const request = await POST('memberships/', data)
        return request
    }catch (error){
        return error
    }
}

        
const memberships = {
    getMemberships: get_memberships,
    patchMembership: update_membership,
    patchFilesMembership: update_membership_file,
    postNewMembership: create_membership
}


export default memberships
