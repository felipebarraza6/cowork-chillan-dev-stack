import React from 'react'

import { Col, Row, Input, 
        Form, Button, Typography,
        Select} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const {Item:ItemForm} = Form
const {TextArea}=Input
const {Text}=Typography
const {Option}=Select


const SocialImpact = () => {

    return(
        <Form layout={'vertical'} >
            <Row>
                <Col span={24}>
                    <h1>Socios</h1>
                </Col> 
                <Col span={8}>
                    <Form.Item label='Número de socios de la empresa'>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de socias mujeres'>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de socios de la empresa'>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de soci@s que se consideren marginados socialmente'>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de soci@s que pertenezcan a una etnia originaria(especifique) '>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <h1>Trabajadores</h1>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de trabajadores totales.'>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de trabajadores mujeres.'>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de trabajadores que se consideren marginados socialmente.'>
                        <Input type='number' style={{width:'200px'}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de trabajadores que pertenezcan a una etnia originaria (especifique cual).'>
                        <Input type='number' style={{width:'200px'}} />
                   </Form.Item>
                </Col>
            </Row>
            <Row style={{marginBottom:'30px'}}>
                <Col span={12} style={styles.col}>
                        <Row>
                            <Col span={24} style={{marginBottom:'10px'}}>
                                <Text>Número de trabajadores inmigrantes.</Text> 
                            </Col>
                            <Col>
                                <Input type='number' placeholder='Cantidad' style={{width:'140px'}}/>    
                            </Col>
                            <Col>
                                <Input type='text' placeholder='Pais' style={{width:'200px'}}/>    
                            </Col>
                            <Col>
                                <Button type='primary' icon={<PlusOutlined />}></Button>
                            </Col>
                        </Row>
                </Col>
                <Col span={12} style={styles.col}>
                    <Row>
                        <Col span={24} style={{marginBottom:'10px'}}>
                            <Text>Número de trabajadores con capacidades diferentes.</Text>
                        </Col>
                        <Col>
                            <Input type='number' placeholder='Cantidad' style={{width:'140px'}}/>    
                        </Col>
                        <Col>
                            <Input type='text' placeholder='Capacidad' style={{width:'200px'}} />
                        </Col>
                        <Col>
                            <Button type='primary' icon={<PlusOutlined />}></Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={12} style={{marginTop:'20px', marginBottom:'20px', paddingRight:'15px'}} >
                    <ItemForm label='Dónde se encuentran la mayoría de tus proveedores? ( >80% de tus proveedores) Selección de region, comuna y provincia.' name='vision'>
                        <Row>
                            <Col span={7}>
                                <Select placeholder='Region' width='100px'></Select>
                            </Col>
                            <Col span={7}>
                                <Select placeholder='Provincia' width='100px'></Select>
                            </Col>
                            <Col span={7}>
                                <Select placeholder='Comuna' width='100px'></Select>
                            </Col>
                            <Col span={3}>
                                <Input placeholder='%'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Select placeholder='Region' width='100px'></Select>
                            </Col>
                            <Col span={7}>
                                <Select placeholder='Provincia' width='100px'></Select>
                            </Col>
                            <Col span={7}>
                                <Select placeholder='Comuna' width='100px'></Select>
                            </Col>
                            <Col span={3}>
                                <Input placeholder='%'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Select placeholder='Region' width='100px'></Select>
                            </Col>
                            <Col span={7}>
                                <Select placeholder='Provincia' width='100px'></Select>
                            </Col>
                            <Col span={7}>
                                <Select placeholder='Comuna' width='100px'></Select>
                            </Col>
                            <Col span={3}>
                                <Input placeholder='%' />
                            </Col>
                        </Row>
                    </ItemForm>
                </Col>
                <Col span={12} style={{marginTop:'20px', marginBottoma:'20px', paddingRight:'5px'}} name='values'>
                    <ItemForm label='Que actividades(talleres, cursos,  capacitaciones y entre otros) has realizado tu y/o tu equipo humano para mejorar sus capacidades (competencias y habilidades).'>
                        <TextArea rows='2' />
                    </ItemForm>
                </Col>
                <Col style={{textAlign: 'right'}} span={24} >
                    <Button type='primary'>Guardar</Button>
                </Col>
        </Row>
        </Form>

    )

}

const styles={
    col:{
        paddingRight:'5px'
    }
}

export default SocialImpact
