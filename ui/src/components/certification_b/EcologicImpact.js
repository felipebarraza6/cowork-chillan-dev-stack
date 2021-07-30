import React from 'react'
import {Row, Col, Form, Input, Button, Checkbox} from 'antd'
const {Item:ItemForm}=Form
const {TextArea}=Input

const EcologicImpact = () => {

    return(
        <Form layout={'vertical'}>
            <Row>
                <Col span={8} style={styles.col}>
                    <ItemForm label='Cuentas con un plan de manejo de tus residuos' name='purpose'>
                        <Checkbox /> SI
                    </ItemForm>
                    <ItemForm label='Conoces la huella de carbono de tu negocio?' name='purpose'>
                        <Checkbox /> SI
                    </ItemForm>
                </Col>
                <Col span={8} style={styles.col} name='values'>
                    <ItemForm label='Usas energías renovables en tu emprendimiento'>
                        <Checkbox /> SI
                    </ItemForm>                            
                    <ItemForm label='Conoces la huella de hidrica de tu negocio?'>
                        <Checkbox /> SI
                    </ItemForm> 
                </Col>
                <Col span={8} style={styles.col}>
                    <ItemForm label='Dónde terminan los desechos de tu negocio' name='vision'>
                        <TextArea rows='3' />
                    </ItemForm>                                                        
                </Col>
                <Col span={24}>
                    <ItemForm label='Has participado en alguna actividad relacionada a mejorar el impacto ambiental de tu negocio y/o del  territorio que opera tu negocio?' name='purpose'>
                        <Checkbox /> SI
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
    }
}


export default EcologicImpact
