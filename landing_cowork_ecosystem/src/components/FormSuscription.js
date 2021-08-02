import React, { useState } from 'react'
import { Form, Typography, Select,
        notification, Row, Col, 
        Input, Button, } from 'antd'
import { callbacks } from '../api/endpoints'

const { Title, Text } = Typography
const { Option } = Select

const FormSuscription = ({ closeAffix, is_affix }) => {

    const initialState = {
        is_select_ocupation: false,
        string_ocupation: '',
        gender_other: false
    }

    const [form] = Form.useForm()

    const [state, setState] = useState(initialState)

    const onFinish = async(values) => {
        console.log(values)
        try {
            const request = await callbacks.signupEvent(values)
            notification.success({message: 'Inscripcion realizada correctamente'})
            form.resetFields()
            if(is_affix){                
                closeAffix(false)
            }
            return request
        } catch (error) {            
            notification.error({message: 'Error al procesar tu inscripcion'})   
        }
        
    }

    const resetForm = () => {
        form.resetFields()
        notification.warning({message:'Formulario reiniciado'})
    }
    
    return(<>        
                <Form form={form} style={styles.form} layout={'vertical'} onFinish={onFinish}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col}>
                            <Form.Item name='name'
                                rules={[{ required: true, message: 'Ingresa tu nombre completo' }]} 
                                style={{color:'white'}} label={<Text style={styles.text}>Nombre completo</Text>}>
                                <Input placeholder='Escribe tu nombre completo' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col}>
                            <Form.Item name='phone' 
                                rules={[{ required: true, message: 'Ingresa tu telefono'  }]} 
                                style={{color:'white'}} label={<Text style={styles.text}>Telefono</Text>} >
                                <Input placeholder='Escribe tu telefono de contacto' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col}>
                            <Form.Item name='email' 
                                rules={[
                                    {
                                        required: true, 
                                        message: 'Ingresa tu correo electronico' 
                                    }, 
                                    {
                                        type: 'email',
                                        message: 'Recuerda ingresar tu @'
                                    }]} 
                                style={{color:'white'}} label={<Text style={styles.text}>Correo</Text>}>
                                <Input placeholder='Escribe tu correo electronico' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col}>
                            <Form.Item name='commune'
                                rules={[{ required: true, message: 'Selecciona tu comuna' }]} 
                                style={{color:'white'}} label={<Text style={styles.text}>Comuna</Text>}>                        
                                <Select placeholder='Selecciona una opcion...'>
                                    <Option value='Bulnes'>Bulnes</Option>
                                    <Option value='Chillán'>Chillán</Option>
                                    <Option value='Chillán Viejo'>Chillán Viejo</Option>
                                    <Option value='Cobquecura'>Cobquecura</Option>
                                    <Option value='Coelemu'>Coelemu</Option>
                                    <Option value='Coihueco'>Coihueco</Option>
                                    <Option value='El Carmen'>El Carmen</Option>
                                    <Option value='Ninhue'>Ninhue</Option>
                                    <Option value='Ñiquén'>Ñiquén</Option>
                                    <Option value='Pemuco'>Pemuco</Option>
                                    <Option value='Pinto'>Pinto</Option>
                                    <Option value='Portezuelo'>Portezuelo</Option>
                                    <Option value='Quillón'>Quillón</Option>
                                    <Option value='Quirihue'>Quirihue</Option>
                                    <Option value='Ránquil'>Ránquil</Option>
                                    <Option value='San Carlos'>San Carlos</Option>
                                    <Option value='San Fabián'>San Fabián</Option>
                                    <Option value='San Ignacio'>San Ignacio</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col}>
                            <Form.Item name='age'
                                style={{color:'white'}} label={<Text style={styles.text}>Edad</Text>} >
                                <Input type='number' placeholder='Escribe tu edad(opcional)' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col}>
                            {state.gender_other ? <Form.Item name='gender' label={<Text style={styles.text}>Genero</Text>} style={{color:'white'}}>
                                <Input placeholder='Escribe tu genero' />
                            </Form.Item>: 
                            <Form.Item name='gender'
                                style={{color:'white'}} label={<Text style={styles.text}>Genero</Text>} >                                
                                <Select placeholder='Selecciona una opcion...' 
                                    onChange={(value)=>{
                                        if(value==='otro'){
                                            setState({
                                                ...state,
                                                gender_other: true
                                            })
                                        }
                                    }}>
                                    <Option value='hombre'>Hombre</Option>
                                    <Option value='mujer'>Mujer</Option>
                                    <Option value='otro'>Otro</Option>                                
                                </Select>
                            </Form.Item>}

                        </Col>
                        
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col}>
                            <Form.Item name='participation'
                                rules={[{ required: true, message: 'Selecciona tu participacion' }]} 
                                style={{color:'white'}} label={<Text style={styles.text}>Participacion</Text>}>                        
                                <Select placeholder='Selecciona una opcion...'>
                                    <Option value='Primera jornada(6 de septiembre)'>Primera jornada(6 de septiembre)</Option>
                                    <Option value='Segunda jornada(9 de Septiembre)'>Segunda jornada(9 de Septiembre)</Option>
                                    <Option value='Ambas jornadas(6 y 9 Septiembre)'>Ambas jornadas(6 y 9 Septiembre)</Option>                                    
                                </Select>
                            </Form.Item>
                        </Col>                        
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col} > 
                            <Form.Item name='ocupation'
                                rules={[{ required: true, message: 'Selecciona tu ocupacion' }]} 
                                style={{color:'white'}} label={<Text style={styles.text}>Ocupacion</Text>}>                        
                                <Select placeholder="Seleccionar una opcion..." onChange={(e)=> {                                    
                                    setState({
                                        ...state,
                                        is_select_ocupation: true
                                    })
                                }}>
                                    <Option value='Empleado'>Empleado</Option>
                                    <Option value='Emprendedor'>Emprendedor</Option>
                                    <Option value='Empresario'>Empresario</Option>
                                    <Option value='Estudiante'>Estudiante</Option>
                                    <Option value='Educador'>Educador</Option>
                                    <Option value='Funcionario Publico'>Funcionario Público</Option>
                                    <Option value='Otra'>Otra</Option>
                                </Select>    
                            </Form.Item>
                        </Col> 
                        {state.is_select_ocupation && <>         
                        <Col span={24} style={styles.col}>
                            <Title level={4} style={styles.text}>COMPLETAR</Title>
                        </Col>                   
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col} > 
                            <Form.Item name='enterprise' 
                                rules={[{ required: true, message: 'Ingresa tu organizacion/empresa' }]} 
                                style={{color:'white'}} label={<Text style={styles.text}>Organización/Empresa</Text>}>                        
                                <Input placeholder='Escribe tu organización / empresa' />   
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.col} > 
                            <Form.Item name='turn'
                                rules={[{ required: true, message: 'Ingresa tu giro/actividad' }]}  
                                style={{color:'white'}} label={<Text style={styles.text}>Giro/Actividad</Text>}>                        
                                <Input placeholder='Escribe tu giro / actividad' />   
                            </Form.Item>
                        </Col>
                        </>}
                    </Row> 
                    <Row>
                        <Button htmlType='submit' style={styles.btn} type='primary'>Inscribirse</Button>
                        <Button type='primary' style={styles.btn} onClick={resetForm}>Limpiar</Button>
                    </Row>
                </Form>


    </>)

}

const styles = {
    col: {
        paddingLeft: '5px', paddingRight:'5px'
    },
    btn: {
        marginRight:'10px',
        borderRadius: '5px'
    },
    form : {
        color:'white', 
        paddingLeft:'50px', 
        paddingRight:'50px',
        paddingTop:'10px'
    },
    container: {
        backgroundColor: '#001529',
        padding: '30px',
        paddingTop: '70px',
        paddingBottom:'60px'
    },
    title: {
        color:'white',
        textAlign: 'center'
    }, 
    text: {
        color: 'white',
    },
    label: {
        color: 'white'
    }
}


export default FormSuscription