import React from 'react'

import { Modal, Descriptions, Badge, 
        Tooltip, Button, notification } from 'antd'

import { DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import {ModalProfilePerson} from './ModalProfilePerson'
import clients from '../../api/clients/endpoints'
import ManageLegalRepresent from './ManageLegalRepresent'

const DeleteLegalRepresent = async(enterprise, data, deleteRepresent)=>{
  var listData = []
  var objectData = {} 

  for(let i = 0; i < data.length; i++){
    if(data[i].id === deleteRepresent){
      data.splice(i, 1)
    }
  }

  for(var i = 0; i < data.length; i++){
    listData.push(data[i].id)
  }

  objectData = {
    "represent_legal": listData
  }

  const response = await clients.update_business(objectData, enterprise).then((response)=> {
      notification.open({
        message: `Representante legal eliminado`,
        icon: <UserOutlined  />
      })
      Modal.destroyAll()
  })

  return response

}



export const ModalBusinessData = async(business) =>{
      const request = await clients.retrieve_business(business.dni_business).then((response)=>{
          business = response.data
          
      Modal.info({
        title: <>
                {business.business_name}
                {business.is_active && 
                    <Badge status="processing" text="Activo" 
                    style={{float: 'right'}}
                />
                }
                {!business.is_active && 
                    <Badge status="error" text="Inactivo" 
                    style={{float: 'right'}}
                />
                }
            </>,
        width: '60%',
        okText: 'Volver',
        content: <React.Fragment>
            <Descriptions title='Representantes Legales' key={business} layout="" bordered style={{marginTop:'20px'}}>
                {business.represent_legal.map((obj)=>{
                  return(
                    <React.Fragment key={obj.id}>
                    <Descriptions.Item style={{textAlign:'center'}}>
                        {obj.first_name} {obj.surname} {obj.second_surname}
                    </Descriptions.Item>
                    <Descriptions.Item style={{textAlign:'center'}} >
                        {obj.dni}
                    </Descriptions.Item>
                    <Descriptions.Item style={{textAlign:'center'}}>
                      <Tooltip title='Eliminar Representante'>
                        <Button type='link' onClick={()=>DeleteLegalRepresent(business.dni_business, business.represent_legal, obj.id, Modal)} >
                          <DeleteOutlined style={{fontSize:'18px', color:'red'}} />
                        </Button>
                      </Tooltip>
                      <Tooltip title='Ver Datos'>
                        <Button type='link' onClick={()=> ModalProfilePerson(obj)}>
                          <EyeOutlined style={{fontSize:'18px', color:'green'}} />
                        </Button>
                      </Tooltip>
                    </Descriptions.Item>
                    </React.Fragment>
                  )
                })}
            </Descriptions>            
            <ManageLegalRepresent business={business.dni_business} accdata={business.represent_legal} />
            <Descriptions title="General" layout="vertical" bordered style={{marginTop:'20px'}}>
                <Descriptions.Item label="Nombre" >
                   {business.business_name}
                </Descriptions.Item>
                <Descriptions.Item label="Rut" >
                    {business.dni_business}
                </Descriptions.Item>
                <Descriptions.Item label="¿Recibe Mentorias?">
                    {business.is_recive_mentories ? 'SI' : 'NO'}
                </Descriptions.Item>
                <Descriptions.Item label="Rubro comercial" >
                    {business.business_heading}
                </Descriptions.Item>
                <Descriptions.Item label="Giros" >
                    {business.turn}
                </Descriptions.Item>
                <Descriptions.Item label="Area" >
                    {business.work_area}
                </Descriptions.Item>

            </Descriptions>

            <Descriptions title="Contacto" layout="vertical" bordered style={{marginTop:'20px'}}>
                <Descriptions.Item label="Telefono">
                    {business.phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    {business.email}
                </Descriptions.Item>
                 <Descriptions.Item label="Web">
                    {business.webpage}
                </Descriptions.Item>
            </Descriptions>
            
            <Descriptions title="Ubicación" bordered style={{marginTop:'20px'}}>
                <Descriptions.Item label="Region" span={3}>
                    {business.region}
                </Descriptions.Item>
                <Descriptions.Item label="Provincia" span={3}>
                    {business.province}
                </Descriptions.Item>
                <Descriptions.Item label="Comuna" span={3}>
                    {business.commune}
                </Descriptions.Item>  
                <Descriptions.Item label="Dirección" span={3}>
                    {business.address}
                </Descriptions.Item>                
            </Descriptions>

        </React.Fragment>
    })
          return request
        })
}
