import React, { useState, useContext } from 'react'

import { Col, Row, Input, 
        Button, Typography, notification } from 'antd'
import { FormContext } from './FormUpdate.js'
import clients from '../../api/clients/endpoints'

const { TextArea } = Input

const { Text, Paragraph } = Typography

const Sustainability = () => {
    
    const { state } = useContext(FormContext)

    const dataState = {
        purpose: null,
        vision: null,
        your_values: null,
        socio_environmental_benefits: null,
        how_help_you: null,
        link_to_you: null
    }    

    const [data, setData] = useState(dataState)

    const updateCertb = async(data) => {
        let validated_data = {}

        for (var [key, value] of Object.entries(data)) {
            if(value != null){
                validated_data[key] = value
            }
        }
        
        try {
            const request = await clients.update_profileb(state.id, validated_data)
            notification.success({message:'DATOS ACTUALIZADOS, EN EL PROXIMO INGRESO VERAS LOS CAMBIOS'})
            return request
        }catch(e) {
            notification.error({message: 'ERROR AL ACTUALIZAR TUS DATOS CONTACTA AL ADMINISTRADOR'})
        }
    }

    return(
            <Row>
                <Col span={8} style={styles.col}>
                    <div style={styles.container}>
                        <Text>Escribe el Propósito de tu negocio.</Text>
                        {state.purpose && 
                            <Paragraph mark >{state.purpose}</Paragraph>}
                        <TextArea rows='4' defaultValue={state.purpose} onChange={e=>setData({...data, purpose: e.target.value})} />
                    </div>
                    <div style={styles.container}>
                        <Text>Qué beneficios socioambientales les entregas a tus clientes a través de tu negocio.</Text>
                        {state.socio_environmental_benefits && 
                            <Paragraph mark >{state.socio_environmental_benefits}</Paragraph>}
                        <TextArea name='how_help_you' rows='4' 
                            onChange={ e =>setData({...data, socio_environmental_benefits: e.target.value})} />
                    </div>
                </Col>       
                <Col span={8} style={styles.col}>
                    <div style={styles.container}>
                        <Text>Escribe la Vision de tu negocio.</Text>
                        {state.vision && 
                            <Paragraph mark>{state.vision}</Paragraph>}
                        <TextArea name='vision' rows='4' 
                            onChange = { e =>setData({...data, vision: e.target.value})} />
                    </div>
                    <div style={styles.container}>
                        <Text>Como podemos ayudar a mejorar el impacto sostenible de tu negocio.</Text>
                        {state.how_help_you && 
                            <Paragraph mark >{state.how_help_you}</Paragraph>}
                        <TextArea name='how_help_you' rows='4'  
                            onChange = { e =>setData({...data, how_help_you: e.target.value})} />
                    </div>
                </Col>        
                <Col span={8} style={styles.col}>
                    <div style={styles.container}>
                        <Text>Escribe los Valores de tu negocio.</Text>
                        {state.your_values && 
                            <Paragraph mark>{state.your_values}</Paragraph>}
                        <TextArea name='values' rows='4' 
                            onChange = { e =>setData({...data, your_values: e.target.value})} />
                    </div>
                    <div style={styles.container}>
                        <Text>Con quien te has vinculado y con quien deseas vincularte para mejorar tu impacto.</Text>
                        {state.link_to_you && 
                            <Paragraph mark>{state.link_to_you}</Paragraph>}
                        <TextArea name='link_to_you' rows='4'
                            onChange = { e =>setData({...data, link_to_you: e.target.value})} />
                    </div>
                </Col>
                <Col span={24} style={styles.btn}>
                    <Button type='primary' onClick={()=>updateCertb(data)} >Guardar Sustentabilidad</Button>
                </Col>
            </Row>
    )
}


const styles = {
    col: {
        paddingRight:'5px',
        paddingLeft:'5px'
    },
    container: {
        margin: '10px'
    },
    btn: {
        textAlign: 'right'
    }
}


export default Sustainability
