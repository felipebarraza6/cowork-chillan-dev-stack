import services from '../../api/services/endpoints'
import { Modal, notification } from 'antd'

export const getCategories = async(dispatch, page) => {

    dispatch({
        type:'LOADING'        
    })

    const request = await services.categories.list_categories(page).then((response)=> {        
        dispatch({
            type:'NOT_LOADING'        
        })
        dispatch({
            type:'SET_CATEGORIES',
            payload: response.results
        })
    })

    return request
    
}

export const createCategory = async(dispatch, data) => {

    const request = await services.categories.create_category(data).then((response)=> {
        console.log(response)
        notification.success({
            message:`Categoria ${response.name} creada!`
        })
        getCategories(dispatch, 1)
    })

    return request
}

export const deleteCategory = async(dispatch, category) => {    
    Modal.error({
        title: `Estas seguro de eliminar la categoria ${category.name} ?`,
        cancelText:'cancelar',
        okCancel: true,
        okType:'danger',
        okText:'ELIMINAR',
        onOk: ()=> {
            const request = services.categories.delete_category(category.id).then((response)=> {
                notification.success({
                    message:'Categoria Eliminada'
                })
                getCategories(dispatch, 1)
            })

            return request
        }
    })
}

