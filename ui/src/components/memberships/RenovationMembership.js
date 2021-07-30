import React, { useState } from 'react'
import { Modal, Button, Descriptions,
        Input, DatePicker, notification} from 'antd'
import moment from 'moment'
import membership from '../../api/memberships/endpoints'
const { TextArea } = Input

const RenovationMembership = ({ data, style }) => {

    console.log(data)

    var client_business = null
    var client_person = null

    if(data.client_business){
        client_business = data.client_business.id
    }

    if(data.client_person){
        client_person = data.client_person.id
    }

    const initialState = {
        is_enterprise: data.is_enterprise,
        client_business: client_business,
        is_person: data.is_person,
        client_person: client_person,
        valoration: data.valoration.id,
        date_initial: '',
        discount_import: 0,
        discount_porcent: 0,
        payment_fees: 1,
        note_client: '',
        note_internal: '',
        is_renovation: true,
        renovation_uuid: data.uuid
    }

    const initialOptions = {
        is_discount_import: false,
        is_discount_procent: false
    }

    const [visible, setVisible] = useState(false)
    const [options, setOptions] = useState(initialOptions)
    const [predata, setPredata] = useState(initialState) 


    return(<>
        <Modal 
            visible={visible} 
            title={`Renovar membresia ${data.uuid}`} 
            onCancel={()=>setVisible(false)}
            width={'600px'}
            okText={'CONFIRMAR RENOVACION'}
            onOk={async()=> {
                const request = await membership.postNewMembership(predata)
                    .then((response)=> {
                        notification.success({message: 'MEMBRESIA RENOVADA'})
                        setVisible(false)
                    })
            }}
            style={styles.modal}>
            <Descriptions bordered style={styles.date}>
                <Descriptions.Item label='Fecha de inicio' span={2}>
                    <DatePicker placeholder='Seleccionar fecha' 
                        onChange={(value)=>{
                            setPredata({
                                ...predata,
                                date_initial: `${moment(value).format('YYYY-MM-DD')}T00:00:00`
                            })
                        }} />
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='Condiciones financieras' bordered layout='vertical' style={styles.date}>
                <Descriptions.Item style={styles.description} label='Descuento por importe'>
                    <Input placeholder='Monto $' disabled={options.is_discount_import} onChange={(e)=>{
                        setPredata({
                            ...predata,
                            discount_import: e.target.value
                        })
                    }} />
                </Descriptions.Item>
                <Descriptions.Item label='Descuento por porcentaje'>
                    <Input placeholder='Porcentaje %' disabled={options.is_discount_procent} onChange={(e)=> {
                        setPredata({
                            ...predata,
                            discount_porcent: e.target.value
                        })
                    }} />
                </Descriptions.Item>
                <Descriptions.Item label='Cuotas de pago'>
                    <Input type='number' placeholder='Cantidad' onChange={(e)=>{
                        setPredata({
                            ...predata,
                            payment_fees: e.target.value
                        })
                    }} />
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='Notas' layout='vertical' bordered style={styles.date}>
                <Descriptions.Item label='Nota cliente'>
                    <TextArea rows='4' onChange={(e)=>{
                        setPredata({
                            ...predata,
                            note_client: e.target.value
                        })
                    }} />
                </Descriptions.Item>
                <Descriptions.Item label='Nota contrato'>
                    <TextArea rows='4' onChange={(e)=>{
                        setPredata({
                            ...predata,
                            note_internal: e.target.value
                        })
                    }} />
                </Descriptions.Item>
            </Descriptions>
        </Modal>
        <Button type='primary' style={style.btn} onClick={ () => {
            setVisible(true)
        }} >Renovar</Button>
    </>)
}


const styles = {
    description: {
        marginRight:'5px',
        marginLeft: '5px',
    },
    date: {
        marginBottom: '10px',
    },
    modal: {
        top:'10px'
    }
}


export default RenovationMembership
