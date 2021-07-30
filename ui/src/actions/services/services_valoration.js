import services from '../../api/services/endpoints'
import { getServices } from './services_manager'
import { notification } from 'antd'


export const createValoration = async(dispatch, data) => {
    const request = services.valorations.add_valoration(data).then((response)=> {
        notification.success({
            message:'Valoracion creada'
        })

        getServices(dispatch, 1)
    })

    return request
}

export const updateValoration = async(dispatch, data, valoration) => {
    const request = services.valorations.update_valoration(data, valoration).then((response)=> {
        notification.success({
            message: 'Valoracion actualizada'
        })

        getServices(dispatch, 1)
    })
    return request
}

export const deleteValoration = async(dispatch, valoration) => {
    const request = services.valorations.delete_valoration(valoration).then((response)=> {
        notification.success({
            message: 'Valoracion eliminada'
        })

        getServices(dispatch, 1)
    })
    return request
}