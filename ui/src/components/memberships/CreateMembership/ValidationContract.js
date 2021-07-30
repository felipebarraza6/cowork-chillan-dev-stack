import React, {useContext} from 'react'
import { Descriptions, Row, Col, 
        Typography, Button } from 'antd'

import { createMembership } from '../../../actions/memberships/CreateMembership'

import {CreateContext} from './CreateMemberships'

const { Item } = Descriptions
const {Paragraph, Text} = Typography

const ValidationContract = ({ data }) => {
    
    console.log(data)

    const {dispatch} = useContext(CreateContext)

    var date_initial = new Date(data.date_initial)
    var days_add = data.valoration_data_selected.duration.slice(0,3)
    var end_date = new Date(date_initial.setDate(date_initial.getDate()+parseInt(days_add)))

    var end_year = end_date.getFullYear()
    var end_month = end_date.getMonth() + 1
    var str_end_month = ''

    var price = ''

    if (data.discount_porcent > 0) {

        price = data.valoration_data_selected.price - (data.valoration_data_selected.price / 100) * data.discount_porcent
        
    } else if(data.discount_import > 0){
        
        price = data.valoration_data_selected.price - data.discount_import

    } else {
        price = data.valoration_data_selected.price
    }

    if(end_month < 10){
        str_end_month = `0${end_month}`
    }else {
        str_end_month = end_month
    }

    var price_for_quote = price / data.payment_fees

    return(<>
        <Row>
        <Col span={24}>
            <Descriptions style={{width:'100%'}} title='RESUMEN' bordered layout='vertical' >
                <Item label='Cliente'>
                    {data.client_data_selected.dni} / {data.client_data_selected.name}
                </Item>
                <Item label='Servicio' span={2}>
                    {data.valoration_data_selected.get_service} (${data.valoration_data_selected.price} (CLP)
                </Item>
                <Item label='Fecha de inicio'>
                    {data.date_initial}
                </Item>
                <Item label='Fecha de termino(YYYY-MM)'>
                    {end_year}-{str_end_month}
                </Item>
                <Item label='Descuento por porcentaje'>
                    {data.discount_porcent}%
                </Item>
                <Item label='Descuento por importe'>
                    $ {data.discount_import} (CLP)
                </Item>
                <Item label='Cantidad de cuotas'>
                    {data.payment_fees}
                </Item>
                <Item label='Pago por cuota'>
                    $ {price_for_quote} (CLP)
                </Item>
                <Item label='Pago total' span={3}>
                    $ {price} (CLP)
                </Item>
                <Item label='Nota cliente' span={3}>
                    {data.note_client}
                </Item>
                <Item label='Nota contrato' span={3}>
                    {data.note_contract}
                </Item>
            </Descriptions>
        </Col>
        </Row>
        <Row>
            <Col style={styles.colNotes}>
                <Button onClick={()=>createMembership(data, dispatch)} type='primary'>CREAR MEMBRESIA</Button>
            </Col>
        </Row>
        </>)
}


const styles = {
    colNotes: {
        margin:'20px'
    },
    colNoteP: {
        marginLeft: '20px'
    },
}


export default ValidationContract
