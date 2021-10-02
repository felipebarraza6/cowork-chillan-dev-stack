import React, { useState, useContext, useEffect } from 'react'
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
        wasteEnds: false,
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

    useEffect(() => {
        let mana_plan = false
        let renewal = false
        let carbon = false
        let hydrica = false
        let activity = false
        let wasend = false

        if(state.management_plan_accounts){
            mana_plan = true
        }
        if(state.renewable_energy){
            renewal = true
        }
        if(state.carbon_footprint){
            carbon = true
        }
        if(state.hydrica_footprint){
            hydrica = true
        }
        if(state.impact_activities){
            activity = true
        }
        if(state.waste_ends){
            wasend = true
        }

        setField({...field, 
            managementPlan: mana_plan, 
            renewableEnergy: renewal,
            carbonFootprint: carbon,
            waterFootprint: hydrica, 
            environmentalImpactActivity: activity,
            wasteEnds: wasend,
        }) 
    }, [])

    return(
            <Row>
                <Col span={8} style={styles.col}>
                    <div style={styles.containerField}>
                        <Paragraph>Cuentas con un plan de manejo de tus residuos</Paragraph>                        
                            <Checkbox onChange={(e)=> {  
                                if(e.target.checked) {
                                    setField({...field, managementPlan: true})
                                }else{
                                    setField({...field, managementPlan: false})
                                }}} checked={field.managementPlan} /> SI                                    

                            <Checkbox onChange={(e)=> {                                  
                                    setField({...field, managementPlan: false})
                                    setData({...data, management_plan_accounts:'' })}

                                } checked={!field.managementPlan} /> NO

                            {field.managementPlan && 
                                <Input style={styles.input} placeholder='Describe...' 
                                    defaultValue={state.management_plan_accounts}
                                            onChange={(e)=> setData({...data, management_plan_accounts:e.target.value })} />}
                    </div>
                    <div style={styles.containerField}>
                        <Paragraph>Conoces la huella de carbono de tu negocio</Paragraph>
                            <Checkbox onChange={(e)=> {
                                if(e.target.checked) {
                                    setField({...field, carbonFootprint: true})
                                }else{
                                    setField({...field, carbonFootprint: false})
                                }}} checked={field.carbonFootprint}  /> SI

                            <Checkbox onChange={(e)=> {
                                    setField({...field, carbonFootprint: false})
                                    setData({...field, carbon_footprint: ''})
                                }} checked={!field.carbonFootprint}  /> NO
                                    {field.carbonFootprint && 
                                            <Input style={styles.input}  placeholder='Describe...'
                                                defaultValue={state.carbon_footprint}
                                                onChange={(e)=> setData({...data, carbon_footprint:e.target.value })} />}
                    </div>
                </Col>
                <Col span={8} style={styles.col} name='values'>
                    <div style={styles.containerField}>
                        <Paragraph>Usas energías renovables en tu emprendimiento</Paragraph>                        
                            <Checkbox onChange={(e)=> {  
                                if(e.target.checked) {
                                    setField({...field, renewableEnergy: true})
                                }else{
                                    setField({...field, renewableEnergy: false})
                                }}} checked={field.renewableEnergy} /> SI

                            <Checkbox onChange={(e)=> {  
                                    setField({...field, renewableEnergy: false})
                                    setData({...data, renewable_energy: ''})
                                }} checked={!field.renewableEnergy} /> NO

                                    {field.renewableEnergy && 
                                            <Input style={styles.input} placeholder='Describe...'
                                            defaultValue={state.renewable_energy}
                                                onChange={(e)=> {                                                    
                                                    setData({...data, renewable_energy:e.target.value })
                                                }} />}
                    </div>
                    <div style={styles.containerField}>
                        <Paragraph>Conoces la huella de hidrica de tu negocio</Paragraph>
                            <Checkbox onChange={(e)=> {
                                if(e.target.checked) {
                                    setField({...field, waterFootprint: true})
                                }else{
                                    setField({...field, waterFootprint: false})
                                }}} checked={field.waterFootprint} /> SI
                            <Checkbox onChange={(e)=> {
                                setField({...field, waterFootprint: false})
                                setData({...data, hydrica_footprint: ''})
                                }} checked={!field.waterFootprint} /> NO
                                    {field.waterFootprint && 
                                            <Input style={styles.input} placeholder='Describe...' 
                                                defaultValue={state.hydrica_footprint}
                                                onChange={(e)=>setData({...data, hydrica_footprint: e.target.value})}/>}
                    </div>
                </Col>
                <Col span={6} style={styles.col}>
                    <div style={styles.containerField}>
                        <Paragraph>Dónde terminan los desechos de tu negocio</Paragraph>                        
                            <TextArea defaultValue={state.waste_ends} rows='5' onChange={(e)=> setData({...data, waste_ends: e.target.value})} />
                    </div>                                                        
                </Col>
                <Col span={12}>
                    <div style={styles.containerField}>
                        <Paragraph>Has participado en alguna actividad relacionada a mejorar el impacto ambiental de tu negocio y/o del  territorio que opera tu negocio?</Paragraph>
                            <Checkbox onChange={(e)=> {
                                if(e.target.checked) {
                                    setField({...field, environmentalImpactActivity: true})
                                }else{
                                    setField({...field, environmentalImpactActivity: false})
                                }}} checked={field.environmentalImpactActivity} /> SI
                            <Checkbox onChange={(e)=> {                                
                                    setField({...field, environmentalImpactActivity: false})
                                    setData({...data, impact_activities: ''})
                                }} checked={!field.environmentalImpactActivity} /> NO
                                    {field.environmentalImpactActivity && 
                                            <Input style={styles.input} placeholder='Describe...' 
                                                defaultValue={state.impact_activities}
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
