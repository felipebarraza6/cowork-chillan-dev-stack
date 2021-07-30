import services from '../../api/services/endpoints'
import { notification, Modal } from 'antd'


export const getServices = async(dispatch, page) => {
    dispatch({
        type:'LOADING'
    })
    
    const request = await services.list_services(page).then((response)=> {        
        dispatch({
            type:'NOT_LOADING'
        })
        dispatch({
            type:'SET_SERVICES',
            payload: response.results
        })

    })    
    return request
}

export const updateService = async(dispatch, data, service) => {

    const request = await services.update_service(data, service).then((response)=> {
        notification.success({
            message:'Servicio actualizado'
        })

        getServices(dispatch, 1)

    })

    return request

}

export const createService = async(dispatch, data) => {
    const request = services.create_service(data).then((response)=> {
        notification.success({
            message:'Servicio creado'
        })

        getServices(dispatch, 1)
    })

    return request
}

export const deleteService = async(dispatch, service) => {

    Modal.error({
        title: `Estas seguro de eliminar el servicio ${service.name} ?`,
        cancelText:'cancelar',
        okCancel: true,
        okType:'danger',
        okText:'ELIMINAR',
        onOk: ()=> {
            const request = services.delete_service(service.id).then((response)=> {
                notification.error({
                    message: 'Servicio eliminado'
                })
        
                getServices(dispatch, 1)
            })

            return request
        }
    })

}