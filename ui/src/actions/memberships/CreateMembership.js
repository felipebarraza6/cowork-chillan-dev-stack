import memberships from '../../api/memberships/endpoints'
import { notification } from 'antd'

export const createMembership = (data, dispatch) => {
    
    var data_processed = {
        "is_person": data.is_person,
        "is_enterprise": data.is_enterprise,
        "client_business": data.client_business,
        "client_person":data.client_person,
        "valoration": data.valoration_selected,
        "discount_import": data.discount_import,
        "discount_porcent": data.discount_porcent,
        "note_internal": data.note_contract,
        "note_client": data.note_client,
        "date_initial": `${data.date_initial}T00:00:00`,
        "payment_fees": data.payment_fees,
        "is_renovation": data.is_renovation,
        "renovation_uuid": data.renovation_uuid
    }

    console.log(data_processed)

    console.log(data)

    const request = memberships.postNewMembership(data_processed)
    .then((response)=> {
        notification.success({message:'MEMBRESIA CREADA CORRECTAMENTE'})
        dispatch({
            type:'CLEAR_CREATE'
        })
    }).catch((error)=> {
        notification.error({message:'ERROR AL CREAR MEMBRESIA... VERIFICAR'})
    })

    return request
}



