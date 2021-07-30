import React, { useState } from 'react'

import {
    Form, Input, Row, Col, Typography,
    Button, Select, Tag, Checkbox, message
} from 'antd'

import { createClient, updateClient } from '../../actions/clients/master_table'

import { validate } from 'rut.js'

import { geo } from '../../resources/geo'

const { Option } = Select

const { Title } = Typography

const FormClients = ({
    initial,
    dispatch,
    state,
    is_represent
}) => {  

    const [form] = Form.useForm()
    const [geography, setGeography] = useState({
        region: [],
        province: [],
        id_region: null,
        commune: []
    })

    const finishForm = (values) =>{

        if(state.create_represent){
            values = {
                ...values,
                'is_natural_person':false,
                'is_legal_represent':true
            }
        }
        
        if(initial){
            updateClient(dispatch, values, state)
        }

        if(!initial){
            createClient(dispatch, values, state)
            if(createClient){
                form.resetFields()
            }
        }
        
    }
    
    return (
        <Form         
            layout="horizontal"
            form = {form}
            onFinish = {finishForm}
            initialValues={initial}
            style={{backgroundColor:'#141414', 
                    padding: '50px', 
                    marginLeft: '20px', 
                    marginRight: '20px'}}
        >
            {!initial && <>
                
                {is_represent ? <>
                    <Row>
                        <Col span={12}>
                            <Title style={{textAlign: 'left'}} level={4}>AGREGAR REPRESENTANTE LEGAL</Title>                        
                        </Col>
                        <Col span={12}>
                            <Tag color="green" >{state.dni_business_legal_represent.business_name}</Tag>
                        </Col>
                    </Row>
                    
                    </>:
                    <Title level={3}>NUEVA PERSONA</Title>
                }
            </>}

            {initial &&
            <>  
                    <Row>
                    <Col span={12}>
                        <Title style={{textAlign: 'left'}} level={4}>EDITAR PERSONA</Title>                                                
                    </Col>
                    <Col span={12}>
                        <Tag color="volcano">{initial.first_name} {initial.surname}</Tag>                                   
                    </Col>
                    </Row>
                
            </>
            }
            
            <Row style={{marginTop: '55px'}}>                
                <Col span={8} style={{paddingRight:'5px'}}>                    
                    <Form.Item name='first_name'
                        rules={[{ required: true, message: 'Ingresa el primer nombre' }]}
                    >
                        <Input placeholder="Nombre" maxLength={20}/>
                    </Form.Item>    
                </Col>
                <Col span={8} style={{paddingRight:'5px', paddingLeft:'5px'}}>
                    <Form.Item name="surname"
                        rules={[{ required: true, message: 'Ingresa el primer apellido' }]}
                    >
                        <Input placeholder="Apellido" maxLength={20} />
                    </Form.Item>    
                </Col>           
                <Col span={8} style={{paddingRight:'5px', paddingLeft:'5px'}}>
                    <Form.Item name="second_surname">
                        <Input placeholder="Segundo Apellido" maxLength={20} />
                    </Form.Item>
                </Col>
                {!initial ? 
                <Col span={8} style={{paddingRight:'5px'}}>
                    <Form.Item name="dni"  rules={[{ required: true, message: 'Ingresa el rut' }]}>
                        <Input placeholder="Rut" maxLength={10} minLength={9} onBlur={(e)=>{
                            if(validate(e.target.value)){
                                message.success('Rut correcto')
                            }else{
                                message.error('Rut incorrecto')
                            }
                        }} />
                    </Form.Item>    
                </Col>:
                <Col span={8} style={{paddingRight:'5px'}}>
                <Form.Item name="dni" >
                    <Input placeholder="Rut" disabled />
                </Form.Item>    
            </Col>

                }
                <Col span={8} style={{paddingRight:'5px', paddingLeft:'5px'}}>
                    <Form.Item name="phone_number"
                        rules={[{ required: true, message: 'Ingresa el telefono' }]}                        
                    >
                        <Input placeholder="Telefono" maxLength={17} minLength={9} />
                    </Form.Item>
                </Col>
                <Col span={8} style={{paddingRight:'5px', paddingLeft:'5px'}}>
                    <Form.Item name="email" 
                     rules={[{ required: true, message: 'Ingresa el email' }]}
                     >
                        <Input placeholder="Email" type="email" />
                    </Form.Item>    
                </Col>


                <Col span={8} style={{paddingRight:'5px'}}>
                <Form.Item name="region">
                        <Select placeholder="Región" maxLength={100}
                            onSelect={(index, value) =>{                                
                                setGeography({
                                    ...geography,
                                    province: geo[value.key].provincias,
                                    id_region: value.key
                                })
                            }}
                        >
                            {geo.map((index, value) => <Option key={value} value={index.region}>{index.region}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} style={{paddingRight:'5px', paddingLeft:'5px'}}>
                <Form.Item name="province">
                        <Select placeholder="Provincía" maxLength={100}
                            onSelect={(index,value)=>{
                                setGeography({
                                    ...geography,
                                    commune: geo[geography.id_region].provincias[value.key].comunas
                                })
                            }}
                        >
                            {geography.province.map((value, index)=><Option key={index} value={value.name} >{value.name}</Option>)}

                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} style={{paddingLeft:'5px'}}>
                <Form.Item name="commune">
                        <Select placeholder="Comuna" maxLength={100}>
                            {geography.commune.map((value, index)=><Option key={index} value={value.name} >{value.name}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>                  
                
                <Col span={12} style={{paddingRight:'5px'}}>
                    <Form.Item name="address">
                        <Input placeholder="Dirección" maxLength={200} />
                    </Form.Item>
                </Col>
                <Col span={12} style={{paddingLeft:'5px'}}>
                        <Form.Item name='gender'>
                            <Select style={{textAlign:'left'}} placeholder='Genero'>
                                <Option value='masculino'>Masculino</Option>
                                <Option value='femenino'>Femenino</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                {!is_represent && <>
                    <Col span={12} style={{paddingRight:'5px'}}>
                        <Form.Item name='webpage'>
                            <Input type='url' placeholder='Web' maxLength={120} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{paddingLeft:'5px'}}>
                        <Form.Item name="work_area" >
                         <Select placeholder="Area" style={{textAlign:'left'}}>
                            <Option value="Gastronomia">Gastronomia</Option>
                            <Option value="Agricultura">Agricultura</Option>
                            <Option value="Construcción">Construcción</Option>
                            <Option value="Publicidad">Publicidad</Option>
                            <Option value="Turismo">Turismo</Option>
                            <Option value="Comercio">Comercio</Option>
                            <Option value="Otros">Otros</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="business_heading">
                            <Input placeholder="Rubro Comercial" maxLength={200} />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item name="turn">
                            <Input placeholder="Giros" maxLength={200} />
                        </Form.Item>
                    </Col>
                    <Col style={{marginRight:'15px'}}>
                    <Form.Item name="is_recive_mentories" valuePropName="checked" label='Recibe mentorias?' >
                       <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col style={{marginRight:'15px'}}>
                    <Form.Item name="is_natural_person" valuePropName="checked" label='Persona Natural' >
                        <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="is_legal_represent" valuePropName="checked" label='Representante Legal'>
                        <Checkbox />
                    </Form.Item>
                  </Col>
                </>}                                
                
                <Col span={24} style={{marginTop: '30px'}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                            Guardar
                        </Button>
                    </Form.Item>                    
                </Col>        
            </Row>
                                          
            
        </Form>
    )

}

export default FormClients
