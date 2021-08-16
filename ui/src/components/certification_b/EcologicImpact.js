import React, {useState} from 'react'
import {Row, Col, Form, Input, Button, Checkbox } from 'antd'
const {Item:ItemForm}=Form
const {TextArea}=Input

const EcologicImpact = () => {

    const initialState = {
        managementPlan: false,
        renewableEnergy: false,
        carbonFootprint: false,
        waterFootprint: false,
        environmentalImpactActivity: false
    }

    const [state, setState] = useState(initialState)

    return(
        <Form layout={'vertical'}>
            <Row>
                <Col span={8} style={styles.col}>
                    <ItemForm label='Cuentas con un plan de manejo de tus residuos' name='purpose'>
                        <Checkbox onChange={(e)=> {
                            
                            if(e.target.checked) {
                                setState({...state, managementPlan: true})
                            }else{
                                setState({...state, managementPlan: false})
                            }
                            
                            }} /> SI
                            {state.managementPlan && <Input style={styles.input} placeholder='Describe...' />}
                    </ItemForm>
                    <ItemForm label='Conoces la huella de carbono de tu negocio?' name='purpose'>
                    <Checkbox onChange={(e)=> {
                            
                            if(e.target.checked) {
                                setState({...state, carbonFootprint: true})
                            }else{
                                setState({...state, carbonFootprint: false})
                            }
                            
                            }} /> SI
                            {state.carbonFootprint && <Input style={styles.input}  placeholder='Describe...' />}
                    </ItemForm>
                </Col>
                <Col span={8} style={styles.col} name='values'>
                    <ItemForm label='Usas energías renovables en tu emprendimiento'>
                    <Checkbox onChange={(e)=> {
                            
                            if(e.target.checked) {
                                setState({...state, renewableEnergy: true})
                            }else{
                                setState({...state, renewableEnergy: false})
                            }
                            
                            }} /> SI
                            {state.renewableEnergy && <Input style={styles.input} placeholder='Describe...' />}
                    </ItemForm>                            
                    <ItemForm label='Conoces la huella de hidrica de tu negocio?'>
                    <Checkbox onChange={(e)=> {
                            
                            if(e.target.checked) {
                                setState({...state, waterFootprint: true})
                            }else{
                                setState({...state, waterFootprint: false})
                            }
                            
                            }} /> SI
                            {state.waterFootprint && <Input style={styles.input} placeholder='Describe...' />}
                    </ItemForm> 
                </Col>
                <Col span={6} style={styles.col}>
                    <ItemForm label='Dónde terminan los desechos de tu negocio' name='vision'>
                        <TextArea rows='5' />
                    </ItemForm>                                                        
                </Col>
                <Col span={24}>
                    <ItemForm label='Has participado en alguna actividad relacionada a mejorar el impacto ambiental de tu negocio y/o del  territorio que opera tu negocio?' name='purpose'>
                    <Checkbox onChange={(e)=> {
                            
                            if(e.target.checked) {
                                setState({...state, environmentalImpactActivity: true})
                            }else{
                                setState({...state, environmentalImpactActivity: false})
                            }
                            
                            }} /> SI
                            {state.environmentalImpactActivity && <Input style={styles.input} placeholder='Describe...' />}
                    </ItemForm>
                </Col>
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type='primary'>Guardar</Button>
                </Col>
            </Row>
        </Form>


    )
}


const styles = {
    col: {
        paddingLeft:'5px',
        paddingRight:'5px'
    },
    input: {
        marginTop:'10px'
    }
}


export default EcologicImpact
