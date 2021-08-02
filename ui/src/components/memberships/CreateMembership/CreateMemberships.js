import React, { useState, createContext, useReducer } from 'react'
import {Card, Row, Col, 
        Typography, Steps, Button} from 'antd'
import { ArrowRightOutlined, 
        RedoOutlined, 
        FileDoneOutlined } from '@ant-design/icons'
import { reducer } from '../../../reducers/memberships/create'
import SelectClient from './SelectClient'
import SelectService from './SelectService'
import ComercialInfo from './ComercialInfo'
import ValidationContract from './ValidationContract'
export const CreateContext = createContext()
const { Paragraph } = Typography


const CreateMemberships = () => {

    const initialReducerState = {      
        client_selected: null,
        client_businesss: '',
        client_person: '',
        is_person: false,
        is_enterprise: false,
        client_data_selected: {},
        valoration_selected: null,
        valoration_data_selected: {},
        date_initial: null,
        discount_porcent: 0,
        discount_import: 0,
        note_client: '',
        note_contract: '',
        payment_fees: 1,
        comercial_info: false,
        is_renovantion: false,
        renovation_uuid: '',
        disabled_next_btn: true,
        step: 1,
        completed_registration: false,
    }

    
    const [state, dispatch] = useReducer(reducer, initialReducerState)
    
    return(<div style={styles.contain}>
        <CreateContext.Provider value={{
            state, 
            dispatch
        }}>
        <Card bordered={false} title={'Crear membresia'} extra={<FileDoneOutlined style={styles.icon} />} >
            {state.step === 1 && <Paragraph>Debes comenzar seleccionando el tipo de cliente para tu nueva membresia...</Paragraph>}
            {state.step === 2 && <Paragraph>Seleciona el servicio y su fecha de inicio...</Paragraph>}
            {state.step === 3 && <Paragraph>Define las condiciones finales...</Paragraph>}
            {state.step === 4 && <Paragraph>Confirma tu informacion ingresada...</Paragraph>}
            <Row style={styles.dinamicCanvas}>
                {state.step === 1 && <SelectClient />}
                {state.step === 2 && <SelectService />}
                {state.step === 3 && <ComercialInfo />}
                {state.step === 4 && <ValidationContract data={state} />}
            </Row>
            <Row align={'center'} style={styles.containTop}>
                <Col span={24}>
                    <Steps size='small' current={state.step}>
                        {state.client_selected && <Steps.Step title={state.client_data_selected.dni}></Steps.Step>}                        
                        {state.valoration_selected && <Steps.Step title={<>{state.valoration_data_selected.get_service} / {state.date_initial}</>}></Steps.Step> }
                        {state.comercial_info && <Steps.Step title='Condiciones ingresadas'></Steps.Step>}
                    </Steps>
                </Col>
                <Col span={12} style={{textAlign:'right', paddingLeft:'5px'}}>
                    <Button size='large' type='primary' shape='circle' disabled={state.disabled_next_btn} style={{marginTop:'20px'}}
                        onClick={() => dispatch({
                            type:'UPDATE_STEP',
                            step: state.step+1
                        })}>
                            <ArrowRightOutlined />
                    </Button>
                </Col>
                    {state.step > 1 && 
                    <Col span={12} style={{textAlign:'center', paddingRight:'5px'}}>
                        <Button size='middle' type='primary' icon={<RedoOutlined />} style={{marginTop:'20px'}}
                            onClick={() => dispatch({
                                type:'CLEAR_CREATE',
                            })}>
                            REINICIAR
                        </Button>
                    </Col>}

            </Row>
        </Card> 
        </CreateContext.Provider>
    </div>
    )
}


const styles = {
    dinamicCanvas: {
        margin:'10px'
    },
    contain: {
        paddingLeft:'10px'
    },
    icon: {
        fontSize:'30px'
    },
    containTop: {
        paddingTop:'20px',
        textAlign:'20px'
    },
    cardOption: {
        marginTop:'20px',
        marginBottom:'20px', 
        borderRadius:'20px'
    }
}


export default CreateMemberships
