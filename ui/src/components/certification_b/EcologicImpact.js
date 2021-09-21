import React, { useState, useContext } from 'react'
import { Row, Col, Input, 
        Button, Checkbox, Typography,
        notification } from 'antd'
import { FormContext } from './FormUpdate.js'
import clients from '../../api/clients/endpoints'

const { TextArea }= Input
const { Paragraph } = Typography

const EcologicImpact = () => {
    
    const { state } = useContext(FormContext)
    
    const dataState = {
        management_plan_accounts:null,
        renewable_energy:null,
        carbon_footprint:null,
        hydrica_footprint:null,
        impact_activities:null,
        waste_ends:null
    }
    
    const fieldsState = {
        managementPlan: false,
        renewableEnergy: false,
        carbonFootprint: false,
        waterFootprint: false,
        environmentalImpactActivity: false
    }


    const [data, setData] = useState(dataState)
    const [field, setField] = useState(fieldsState)


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
                    <div style={styles.containerField}>
                        <Paragraph>Cuentas con un plan de manejo de tus residuos</Paragraph>
                        {state.management_plan_accounts &&
                            <Paragraph mark>{state.management_plan_accounts}</Paragraph>
                        }
                            <Checkbox onChange={(e)=> {  
                                if(e.target.checked) {
                                    setField({...field, managementPlan: true})
                                }else{
                                    setField({...field, managementPlan: false})
                                }}} /> SI
                                    {field.managementPlan && 
                                        <Input style={styles.input} placeholder='Describe...' 
                                            onChange={(e)=> setData({...data, management_plan_accounts:e.target.value })} />}
                    </div>
                    <div style={styles.containerField}>
                        <Paragraph>Conoces la huella de carbono de tu negocio</Paragraph>
                        {state.carbon_footprint && 
                            <Paragraph mark>{state.carbon_footprint}</Paragraph>
                        }
                            <Checkbox onChange={(e)=> {
                                if(e.target.checked) {
                                    setField({...field, carbonFootprint: true})
                                }else{
                                    setField({...field, carbonFootprint: false})
                                }}} /> SI
                                    {field.carbonFootprint && 
                                            <Input style={styles.input}  placeholder='Describe...'
                                                onChange={(e)=> setData({...data, carbon_footprint:e.target.value })} />}
                    </div>
                </Col>
                <Col span={8} style={styles.col} name='values'>
                    <div style={styles.containerField}>
                        <Paragraph>Usas energías renovables en tu emprendimiento</Paragraph>
                        {state.renewable_energy && 
                            <Paragraph mark>{state.renewable_energy}</Paragraph>
                        }
                            <Checkbox onChange={(e)=> {  
                                if(e.target.checked) {
                                    setField({...field, renewableEnergy: true})
                                }else{
                                    setField({...field, renewableEnergy: false})
                                }}} /> SI
                                    {field.renewableEnergy && 
                                            <Input style={styles.input} placeholder='Describe...'
                                                onChange={(e)=> setData({...data, renewable_energy:e.target.value })} />}
                    </div>
                    <div style={styles.containerField}>
                        <Paragraph>Conoces la huella de hidrica de tu negocio</Paragraph>
                        {state.hydrica_footprint && 
                            <Paragraph mark>{state.hydrica_footprint}</Paragraph>
                        }
                            <Checkbox onChange={(e)=> {
                                if(e.target.checked) {
                                    setField({...field, waterFootprint: true})
                                }else{
                                    setField({...field, waterFootprint: false})
                                }}} /> SI
                                    {field.waterFootprint && 
                                            <Input style={styles.input} placeholder='Describe...' 
                                                onChange={(e)=>setData({...data, hydrica_footprint: e.target.value})}/>}
                    </div>
                </Col>
                <Col span={6} style={styles.col}>
                    <div style={styles.containerField}>
                        <Paragraph>Dónde terminan los desechos de tu negocio</Paragraph>
                        {state.waste_ends && 
                            <Paragraph mark>{state.waste_ends}</Paragraph>
                        }
                            <TextArea rows='5' onChange={(e)=> setData({...data, waste_ends: e.target.value})} />
                    </div>                                                        
                </Col>
                <Col span={12}>
                    <div style={styles.containerField}>
                        <Paragraph>Has participado en alguna actividad relacionada a mejorar el impacto ambiental de tu negocio y/o del  territorio que opera tu negocio?</Paragraph>
                        {state.impact_activities && 
                            <Paragraph mark>{state.impact_activities}</Paragraph>
                        }
                            <Checkbox onChange={(e)=> {
                                if(e.target.checked) {
                                    setField({...field, environmentalImpactActivity: true})
                                }else{
                                    setField({...field, environmentalImpactActivity: false})
                                }}} /> SI
                                    {field.environmentalImpactActivity && 
                                            <Input style={styles.input} placeholder='Describe...' 
                                                onChange={(e)=>setData({...data, impact_activities: e.target.value})}/>}
                    </div>
                </Col>
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type='primary' onClick={()=>updateCertb(data)}>Guardar Impacto Ambiental</Button>
                </Col>
            </Row>
    )
}


const styles = {
    containerField: {
        margin: '10px 20px 10px 20px'
    },
    col: {
        paddingLeft:'5px',
        paddingRight:'5px'
    },
    input: {
        marginTop:'10px'
    }
}


export default EcologicImpact
