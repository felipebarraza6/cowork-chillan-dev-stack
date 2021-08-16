import React, { useState } from 'react'

import { Col, Row, Form, Input, Button } from 'antd'
const {TextArea} = Input
const {Item:ItemForm} = Form


const Sustainability = () => {
    
    const initialState = {
        purpose: '',
        vision: '',
        values: '',
        socio_environmental_benefits: '',
        how_help_you: ''        
    }

    const [state, setState] = useState(initialState)

    const onChange = (value) => {
        var name=value.target.name

        setState({
            ...state, 
            name: value.target.value
        })
    }

    console.log(state)

    return(<Form layout={'vertical'}>
            <Row>
                <Col span={8} style={styles.col} >
                    <ItemForm label='Escribe el Propósito de tu negocio.' name='purpose'>
                        <TextArea rows='4' />
                    </ItemForm>
                    <ItemForm label='Qué beneficios socioambientales les entregas a tus clientes a través de tu negocio.' name='socio_environmental_benefits'>
                        <TextArea name='how_help_you' rows='4' value={state.purpose} onChange={(value)=>onChange(value)} />
                    </ItemForm>  
                </Col>       
                <Col span={8} style={styles.col} >
                    <ItemForm label='Escribe la Vision de tu negocio.' name='vision'>
                        <TextArea rows='4' />
                    </ItemForm>
                    <ItemForm label='Como podemos ayudar a mejorar el impacto sostenible de tu negocio.' name='how_help_you'>
                        <TextArea rows='4' />
                    </ItemForm>
                </Col>        
                <Col span={8} style={styles.col} >
                    <ItemForm label='Escribe los Valores de tu negocio.' name='values'>
                        <TextArea rows='4' />
                    </ItemForm>
                    <ItemForm label='Con quien te has vinculado y con quien deseas vincularte para mejorar tu impacto.' name='weaknesses'>
                        <TextArea rows='4' />
                    </ItemForm>
                </Col>
                <Col style={{textAlign: 'right'}} span={24}>
                    <Button type='primary'>Guardar</Button>
                </Col>
            </Row>
        </Form>
    )
}


const styles = {
    col: {
        paddingRight:'5px',
        paddingLeft:'5px'
    }
}


export default Sustainability
