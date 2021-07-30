import React from 'react'

//antd
import { Tag, Button, Typography, Tooltip, Modal } from 'antd'
import { LikeOutlined, DislikeOutlined, EditOutlined,
        DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'      

import { updateClient, deleteClient, updateBusiness, deleteBusiness } from '../../actions/clients/master_table'

import { ModalProfilePerson } from './ModalProfilePerson'
import { ModalBusinessData } from './ModalBusinessData'
import {format} from 'rut.js'
import interfacesForm from '../../actions/clients/form_business_clients'

const { Text } = Typography


export const columnsClients = (dispatch, state) =>{
    

    return [
        {
            title: 'NOMBRE',
            render: (client) =><><Tag color="green">{client.first_name} {client.surname}</Tag></>
        },
        
        {
            title: 'RUT',
            key: 'dni',
            render: (client) => <Text keyboard>{format(client.dni)}</Text>
        },
        {
          title: <div style={{textAlign:'center'}}>ACCIONES</div>,
            render: (client) => <>
                <Tooltip title="Ver Perfil">
                  <Button onClick={() => ModalProfilePerson(client)}>
                      PERFIL
                  </Button>
                </Tooltip>
                <Tooltip title='Ver datos certificacion B'>
                    <Button style={{marginLeft:'5px'}} onClick={()=>Modal.info({width:'600px'})}> 
                        B
                    </Button>
                </Tooltip>
                {client.is_legal_represent && 
                <Tooltip title="Crear empresa">
                  <Button type="link" onClick={()=> interfacesForm.activeFormBusiness(dispatch, null, client)}>
                    <PlusCircleOutlined style={{fontSize:'20px'}} />
                 </Button>
               </Tooltip>
                }
                <Tooltip title="Editar">
                    <Button type="link" 
                      onClick={() => interfacesForm.activeFormClients(dispatch, client)}
                    >
                      <EditOutlined style={{fontSize:'20px'}} />
                    </Button>
                </Tooltip>
                {client.is_active ? 
                    <Tooltip title="Declarar como inactivo">
                    <Button type="link" 
                            onClick={() => 
                                updateClient(dispatch, 
                                    {'is_active':'false'}, 
                                    client, 
                                    state)}>
                        <LikeOutlined style={{fontSize:'20px'}} />
                    </Button>
                    </Tooltip>
                    :
                    <Tooltip title="Declarar como activo">
                    <Button type="link" 
                            onClick={() =>{ 
                                console.log(client)
                                updateClient(dispatch, 
                                    {'is_active':'true'}, 
                                    client,
                                    state)}}>
                        <DislikeOutlined style={{fontSize:'20px', color:'red'}} />
                    </Button>
                    </Tooltip>
                    }
                <Tooltip title="Eliminar">
                    <Button type="link"
                            onClick={() =>{
                                deleteClient(dispatch, 
                                    client
                                )
                            }}>
                        <DeleteOutlined style={{fontSize:'20px', color:'red'}} />
                    </Button>
                </Tooltip>
                </>         
        }        
    ]


}

export const columnsBusiness = (dispatch, state) =>{ 
    
        return [
                {
                    title:'NOMBRE',
                    key:'business_name',
                    render: (business) => <Tag color="green">{business.business_name.slice(0,15)}...</Tag>
                },
                {
                    title:'RUT',
                    key:'dni_business',        
                    render: (business) => <Tag color="blue">{format(business.dni_business)}</Tag>
                },
                {
                    title: <div style={{textAlign:'center'}}>ACCIONES</div>,
                    render: (business) => <>
                        <Tooltip title="Ver Datos" >
                            <Button
                                onClick={() => ModalBusinessData(business)}
                                style={{marginRight:'30px'}}
                            >
                                PERFIL
                            </Button>    
                        </Tooltip>   
                        <Tooltip title='Ver datos certificacion B' >
                            <Button style={{marginLeft:'0px'}} onClick={()=> Modal.info({width:'600px', content:<>                             
                            </>})}> 
                                B
                            </Button>
                        </Tooltip>                                                                 
                        <Tooltip title="Editar">
                            <Button type="link" 
                                onClick={ () => interfacesForm.activeFormBusiness(dispatch, business) }
                            >                            
                                <EditOutlined style={{fontSize:'20px'}} />
                            </Button>
                        </Tooltip>
                        {business.is_active ? 
                            <Tooltip title="Declarar como inactivo">
                            <Button type="link"
                                onClick={() => {
                                    updateBusiness(dispatch, 
                                        {'is_active':'false'}, 
                                        business, 
                                        state)
                                }}
                            >
                                <LikeOutlined style={{fontSize:'20px'}} />
                            </Button>
                            </Tooltip>
                            :
                            <Tooltip title="Declarar como activo">
                            <Button type="link"
                                onClick={() => {
                                    updateBusiness(dispatch, 
                                        {'is_active':'true'}, 
                                        business, 
                                        state)
                                }}>
                                <DislikeOutlined style={{fontSize:'20px', color:'red'}} />
                            </Button>
                            </Tooltip>
                            }
                        <Tooltip title="Eliminar">
                            <Button type="link" 
                                onClick={() => deleteBusiness(dispatch, business, state.page)}>
                                <DeleteOutlined style={{fontSize:'20px', color:'red'}} />
                            </Button>
                        </Tooltip>
                        </>         
                }
        ]
}
