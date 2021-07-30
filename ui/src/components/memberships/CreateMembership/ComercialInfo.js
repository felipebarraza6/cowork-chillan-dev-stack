import React, { useState, useContext } from 'react'
import {CreateContext} from './CreateMemberships'
import { Col, Row, Input, 
        Checkbox, Button, Typography } from 'antd'
const { TextArea } = Input
const { Text } = Typography

const ComercialInfo = () => {

    const { dispatch } = useContext(CreateContext)

    const initialState = {
        discount_import: false,
        discount_porcent: false,
        discount_import_amount: 0,
        discount_porcent_amount: 0,
        note_client: '',
        note_contract: '',
        payment_fees: 1
    }

    const [local, setLocal] = useState(initialState)


    return(
        <Row>
            <Col span={24} style={styles.col}>
                <Checkbox 
                    style={styles.checkbox}
                    checked={local.discount_porcent}
                    disabled={local.discount_import}
                    onChange={(e)=> {  
                        setLocal({...local, discount_porcent:e.target.checked})}} /> 
                        Descuento por porcentaje
            </Col>
            {local.discount_porcent && 
                <Input onChange={(e)=> 
                    setLocal({
                        ...local, 
                        discount_porcent_amount: e.target.value
                    })} />}
            <Col span={24} style={styles.col}>
                <Checkbox
                    style={styles.checkbox}
                    checked={local.discount_import} 
                    disabled={local.discount_porcent} 
                    onChange={(e)=>{
                        setLocal({...local, discount_import:e.target.checked})
                    }} /> 
                        Descuento por importe
            </Col>
            {local.discount_import && 
                <Input onChange={(e)=> {
                    setLocal({
                        ...local, 
                        discount_import_amount: e.target.value
                    })}} />}
            <Col span={24} style={styles.col}>
                <Text>Cuotas de pago</Text>
                <Input placeholder='Cuotas de pago' type='number' 
                    defaultValue={'1'}
                    onChange={(e)=>{
                        setLocal({
                            ...local, 
                            payment_fees: e.target.value
                        })
                    }} />
            </Col>
            <Col span={24} style={styles.col}>
                <TextArea placeholder="Nota cliente" maxLength={200} rows={4} 
                    onChange={(e)=> { 
                        setLocal({
                            ...local, 
                            note_client: e.target.value
                        })
                }} /> 
            </Col>
            <Col span={24} style={styles.col}>
                <TextArea placeholder="Nota contrato" maxLength={200} rows={4} 
                    onChange={(e)=> 
                        setLocal({
                            ...local, 
                            note_contract: e.target.value
                        })} />
            </Col>
            <Col span={24}>
                <Button type='primary'
                    onClick={() => {
                        dispatch({
                            type: 'ADD_COMERCIAL_INFO',
                            discount_import: local.discount_import_amount,
                            discount_porcent: local.discount_porcent_amount,
                            note_client: local.note_client,
                            note_contract: local.note_contract,
                            payment_fees: local.payment_fees
                        })
                    }}
                    >Confirmar condiciones</Button>    
            </Col>
        </Row>
    )
} 


const styles = {
    col:{
        marginTop:'10px',
        marginBottom: '10px'
    },
    checkbox: {
        marginRight: '10px'
    }
}


export default ComercialInfo
