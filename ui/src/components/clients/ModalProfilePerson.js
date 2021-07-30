import React from 'react'

import { Modal, Descriptions, Badge } from 'antd'
import {format} from 'rut.js'

export const ModalProfilePerson = (client) =>{
    client = {
        ...client,
        'dni': format(client.dni)
    }
    Modal.info({
        title: <>
                {client.first_name} {client.surname} {client.second_surname} 
                {client.is_active && 
                    <Badge status="processing" text="Activo" 
                    style={{float: 'right'}}
                />
                }

                {!client.is_active && 
                    <Badge status="error" text="Inactivo" 
                    style={{float: 'right'}}
                />
                }
            </>,
        width: '800px',
        okText: 'Volver',
        content: <React.Fragment>

            <Descriptions title="General" layout="vertical" bordered style={{marginTop:'20px'}}>
                <Descriptions.Item label="Rut">
                    {client.dni}
                </Descriptions.Item>
                <Descriptions.Item label="Nombre completo">
                    {client.first_name} {client.surname} {client.second_surname}
                </Descriptions.Item>
                <Descriptions.Item label="Genero">
                    {client.gender}
                </Descriptions.Item>
                <Descriptions.Item label="¿Recibe Mentorias?">
                    {client.is_recive_mentories ? 'SI' : 'NO'}
                </Descriptions.Item>
                <Descriptions.Item label="¿Persona Natural?">
                    {client.is_natural_person ? 'SI' : 'NO'}
                </Descriptions.Item>
                <Descriptions.Item label="¿Representante Legal?">
                    {client.is_legal_represent ? 'SI' : 'NO'}
                </Descriptions.Item>
                 <Descriptions.Item label="Rubro comercial" span={2}>
                    {client.business_heading}
                </Descriptions.Item>
                <Descriptions.Item label="Area" span={1} >
                    {client.work_area}
                </Descriptions.Item>
                <Descriptions.Item label="Giros" span={3}>
                    {client.turn}
                </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Contacto" layout="vertical" bordered style={{marginTop:'20px'}}>
                <Descriptions.Item label="Telefono">
                    {client.phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    {client.email}
                </Descriptions.Item>
                 <Descriptions.Item label="Web">
                    {client.webpage}
                </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Ubicación" bordered style={{marginTop:'20px'}}>
                <Descriptions.Item label="Región" span={3}>
                    {client.region}
                </Descriptions.Item>
                <Descriptions.Item label="Provincía" span={3}>
                    {client.province}
                </Descriptions.Item>
                <Descriptions.Item label="Comuna" span={3}>
                    {client.commune}
                </Descriptions.Item>
                <Descriptions.Item label="Dirección" span={3}>
                    {client.address}
                </Descriptions.Item>
            </Descriptions>

        </React.Fragment>
    })
}
