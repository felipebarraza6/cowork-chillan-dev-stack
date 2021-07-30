import React from 'react'

import { Modal, notification } from 'antd'
import { DeleteOutlined, BuildOutlined, UserOutlined } from '@ant-design/icons'
import clients from '../../api/clients/endpoints.js'


export const getClients= async(dispatch, page, 
    text_first_name= '', text_last_name= '',text_dni= '') =>{
    
        dispatch({
            type:'SET_FILTERS', 
            filter_name: text_first_name, 
            filter_dni: text_dni, 
            filter_last_name: text_last_name
        })
    
    
    try{    
        dispatch({type:'LOADING'})
        const request = await clients.list_clients(page, text_first_name, text_last_name, text_dni)

        dispatch({
            type: 'LIST_CLIENTS',
            payload: request
        })
    }catch(error){
         Modal.error({
            title:'ERROR',
            content: 'HA OCURRIDO ALGUN ERROR VUELVE A INTENTARLO'
        })
    }
}

export const updateClient = async(dispatch, data, client, state)=>{
        
        dispatch({type:'LOADING'})
        const request = await clients.update_client(data, client.dataForm.dni).then((response)=> {
            getClients(dispatch, client.page, 
                client.filter_name, client.filter_last_name, client.filter_dni)

            notification.open({
                    message: `Persona Actualizada!`,
                    description: `Persona actualizada`,
                    icon: <UserOutlined  />
            }) 
        }).catch((error)=> {
            console.log(error)
            Modal.error({
                title:'ERROR',
                content: 'HA OCURRIDO ALGUN ERROR VUELVE A INTENTARLO'
            })
        })

        return request
}

export const deleteClient = async(dispatch, client, state) => {
    
    let is_represent = null
    
    if(state){
        is_represent = state.dataForm.is_legal_represent
    }
    
    if(is_represent){
        const data = await clients.delete_client(client.dni)
        if(data){                    
            await dispatch({
                type:'SET_PAGE',
                page:1
            })
            await notification.open({
                message: `Representante Legal Eliminado!`,
                description: `${client.first_name} fue eliminado`,
                icon: <DeleteOutlined style={{ color: 'red'}} />
            })
            await getBusiness(dispatch, 1)                
            
        } 
    }else{
        try{        
            Modal.confirm({
                title:`Eliminar a ${client.first_name} ${client.surname} - ${client.dni}`,
                content: 'Recuerda que al eliminar un cliente no podrás recuperarlo',
                okText: 'ELIMINAR',
                okType: 'danger',
                cancelText: 'Cancelar',
                width: '600px',
                cancelButtonProps: () => 'cancelar',
                onOk: async() =>{
                    dispatch({type:'LOADING'})
                    const data = await clients.delete_client(client.dni)
                    if(data){                    
                        dispatch({
                            type:'SET_PAGE',
                            page:1
                        })
                        notification.open({
                            message: `Persona Eliminada!`,
                            description: `${client.first_name} fue eliminado`,
                            icon: <DeleteOutlined style={{ color: 'red'}} />
                        })
                        await getClients(dispatch, 1)               
                        
                    }                
            } 
            })
        }catch(error){
             Modal.error({
            title:'ERROR',
            content: 'HA OCURRIDO ALGUN ERROR VUELVE A INTENTARLO'
        })
        }
    }
    
}

export const createClient = async(dispatch, data, state) => {
    
    const represent = state.create_represent

    try{

        dispatch({type:'LOADING'})

        const request = await clients.create_client(data)        
        
        if(request){            

            const id_represent =  request.data.id            


            if(represent){
                await clients.update_business({'represent_legal':id_represent}, state.dni_business_legal_represent.dni_business)
                await getBusiness(dispatch, state.page, state.filter_name, state.filter_dni)
                await notification.open({
                    message: `Representante Legal Creado!`,
                    description: `El representante legal "${data.first_name}" fue creada`,
                    icon: <BuildOutlined  />
                   })
                   
            }else{
                await getClients(dispatch, state.page, state.filter_name, state.filter_last_name, state.filter_dni, true)
                await notification.open({
                    message: `Persona Natural Creada!`,
                    description: `La persona natural "${data.first_name}" fue creada`,
                    icon: <UserOutlined  />
                   })
            }
                         
        }

    }catch(error){
        let captureError = error.response.data
        let errorData = ''

        if(captureError.dni){
            errorData = 'EL RUT YA EXISTE'
        }
        if(captureError.email){
            errorData = 'EL CORREO ELECTRONICO YA EXISTE'
        }

        Modal.error({
            title:'ERROR',
            content: errorData
        })
        dispatch({type:'NOLOADING'})

    }
} 

export const getBusiness= async(dispatch, page, text_name= '', text_dni= '') =>{
    
        dispatch({type:'SET_FILTERS', 
        filter_name: text_name,
         filter_dni: text_dni})
    try{    
        dispatch({type:'LOADING'})
        const request = await clients.list_business(page, text_name, text_dni)        

        dispatch({
            type: 'LIST_BUSINESS',
            payload: request
        })
    }catch(error){
         Modal.error({
            title:'ERROR',
            content: 'HA OCURRIDO ALGUN ERROR VUELVE A INTENTARLO'
        })
    }
}

export const updateBusiness = async(dispatch, data, business, state)=>{  
    console.log(business)
    console.log(data)
    try{
        dispatch({type:'LOADING'})
        const request = await clients.update_business(data, business.dni_business)

        if(request){
           await getBusiness(dispatch, state.page, state.filter_name, state.filter_dni)
           await notification.open({
            message: `Empresa Actualizada!`,
            description: `La empresa "${business.business_name}" fue actualizada`,
            icon: <BuildOutlined  />
        }) 
        }
    }catch(error){
         Modal.error({
            title:'ERROR',
            content: 'HA OCURRIDO ALGUN ERROR VUELVE A INTENTARLO'
        })
    }
}

export const deleteBusiness = async(dispatch, business) => {
    try{        
        Modal.confirm({
            title:`Eliminar a ${business.business_name} - ${business.dni_business}`,
            content: 'Recuerda que al eliminar una empresa no podrás recuperarla',
            okText: 'ELIMINAR',
            okType: 'danger',
            cancelText: 'Cancelar',
            width: '600px',
            cancelButtonProps: () => 'cancelar',
            onOk: async() =>{
                dispatch({type:'LOADING'})
                const data = await clients.delete_business(business.dni_business)
                if(data){                    
                    dispatch({
                        type:'SET_PAGE',
                        page:1
                    })
                    notification.open({
                        message: `Empresa Eliminada!`,
                        description: `La empresa ${business.business_name} fue eliminada`,
                        icon: <DeleteOutlined style={{ color: 'red'}} />
                    })                    
                    await getBusiness(dispatch, 1)
                }                
        } 
        })
    }catch(error){
         Modal.error({
            title:'ERROR',
            content: 'HA OCURRIDO ALGUN ERROR VUELVE A INTENTARLO'
        })
    }
}

export const createBusiness = async(dispatch, data, state) => {
    
    try{
        
        dispatch({type:'LOADING'})
      

        const request = await clients.create_business(data)

        if(request){
            await getBusiness(dispatch, state.page, state.filter_name, state.filter_dni)
            await notification.open({
             message: `Empresa Creada!`,
             description: `La empresa "${data.business_name}" fue creada`,
             icon: <BuildOutlined  />
            }) 
        }

    }catch(error){
        let captureError = error.response.data
        let errorData = ''

        if(captureError.dni_business){
            errorData = 'EL RUT YA EXISTE'
        }
        if(captureError.email){
            errorData = 'EL CORREO ELECTRONICO YA EXISTE'
        }

        Modal.error({
            title:'ERROR',
            content: errorData
        })
        dispatch({type:'NOLOADING'})
    }

}

