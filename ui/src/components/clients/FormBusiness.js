import React, { useState} from 'react'

import {Form, Input, Row, Col, Typography,
        Button, Select, Checkbox,
        message } from 'antd'

import { updateBusiness, createBusiness } from '../../actions/clients/master_table'
import { geo } from '../../resources/geo'

import { validate } from 'rut.js'

const { Option } = Select

const { Title } = Typography
const { TextArea } = Input

const FormBusiness = ({
    initial,
    dispatch,
    state,    
}) =>{        
    if(initial){

    
    initial = {
        ...initial,
        'dni_business': initial.dni_business
    }
}
    const [geography, setGeography] = useState({
        region: [],
        province: [],
        id_region: null,
        commune: []
    })

    const [form] = Form.useForm()    
    const finishForm =(value)=>{
        if(state.legal_represent_create_enterprise){
            value = {
              ...value,
              'represent_legal': [state.legal_represent_create_enterprise.id],              
            }
        } 
        if(initial){            
            updateBusiness(dispatch, value, initial, state)
        }
        if(!initial){
            createBusiness(dispatch, value, state)
            if(createBusiness){
                form.resetFields()
            }
        }
    }

    return (
        <Form         
            layout="horizontal"
            onFinish={finishForm}
            form = {form}
            initialValues={initial}
            style={{backgroundColor:'#141414', 
                    padding: '50px', 
                    marginLeft: '20px', 
                    marginRight: '20px'}}
        >
            {!initial &&
              <>
                <Title level={3}>NUEVA EMPRESA</Title>
                {state.legal_represent_create_enterprise &&
                  <Title level={4}>
                    {state.legal_represent_create_enterprise.first_name} 
                    {state.legal_represent_create_enterprise.surname} 
                    {state.legal_represent_create_enterprise.second_surname}
                  </Title>
                }
              </>
            }
            {initial &&<> 
                <Title code level={3}>{initial.business_name}</Title>
                </>
            }
            <Row style={{marginTop: '15px'}}>                
                <Col span={12} style={{paddingRight:'5px'}}>
                    <Form.Item 
                        name='business_name'
                        rules={[{ required: true, message: 'Ingresa el nombre de la empresa' }]}
                                                
                    >
                        <Input placeholder="Nombre Empresa" maxLength={55} />
                    </Form.Item>    
                </Col>
                <Col span={12} style={{paddingLeft:'5px'}}>
                    {initial ? 
                        <Form.Item 
                        name="dni_business"
                        rules={[{ required: true, message: 'Ingresa el rut de la empresa' }]}                        
                        >
                            <Input placeholder="Rut" disabled  />
                        </Form.Item>    
                        :
                        <Form.Item 
                        name="dni_business"
                        rules={[{ required: true, message: 'Ingresa el rut de la empresa' }]}
                        >
                            <Input placeholder="Rut" onBlur={(e)=>{

                                if(validate(e.target.value)){
                                    message.success('Rut correcto')
                                }else{
                                    message.error('Rut incorrecto')
                                }
                                
                                }} maxLength={10} minLength={9} />
                        </Form.Item>    
                    }
                </Col>           
                <Col span={24} >
                    <Form.Item name="business_heading">
                        <Input placeholder="Rubro Comercial" maxLength={40} />
                    </Form.Item>
                    <Form.Item name="turn">
                        <TextArea placeholder="Giros" maxLength={500} />
                    </Form.Item>
                </Col>
                <Col span={12} style={{paddingRight:'5px'}}>
                    <Form.Item 
                        name="email"
                        rules={[{ required: true, message: 'Ingresa el email de la empresa' }]}
                    >
                        <Input placeholder="Email" type="email" />
                    </Form.Item>    
                </Col>
                <Col span={12} style={{paddingLeft:'5px'}}>
                    <Form.Item name="phone_number"
                        rules={[{ required: true, message: 'Ingresa el telefono de la empresa' }]}
                    >
                        <Input placeholder="Telefono" maxLength={17} minLength={9}/>
                    </Form.Item>    
                </Col>
                <Col span={12} style={{paddingRight:'5px'}}>
                    <Form.Item name="webpage" >
                        <Input placeholder="Sitio Web" type='url' maxLength={120}/>
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
                <Col span={24} >
                    <Form.Item name="address">
                        <Input placeholder="Dirección" maxLength={200} value="18 de septiembre #998" />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item name="is_recive_mentories" valuePropName="checked" label='Recibe mentorias?' >
                       <Checkbox />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>                    
                </Col>        
            </Row>
        </Form>
    )

}

export default FormBusiness
