import React, { useState, useContext } from 'react'
import { Button, Col, Row, 
        Checkbox, Form, Modal, 
        Input, notification, Spin } from 'antd'

import clients from '../../api/clients/endpoints'
import { FormContext } from './FormUpdate'

const { Item:ItemForm }=Form


const YourNeeds = () => {

    const [visible, setVisible] = useState(false)    
    const [loading, setLoading] = useState(false)
    const {state} = useContext(FormContext)
    console.log(state)    
    const initialState = {
        isSelect: false,
        message: ''
    }

    const [data, setData] = useState(initialState)
    const [services, setService] = useState([])
    
    const user = JSON.parse(localStorage.getItem('user') || null)

    const sendData = async() => {

        setLoading(true)

        try {
            const request = await clients.create_request_service({
                profile: state.id,
                services_list: services.toString(),
                username: user.username,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                phone: user.phone_number,
                message: data.message
            })
            setVisible(false)   
            setLoading(false)         
            notification.success({message: 'SOLICITUD ENVIADA CORRECTAMENTE'})
            return request
        } catch(e){ 
            setLoading(false)         
            notification.error({message:'ERROR! INTENTALO MAS TARDE'})
        }        
    }

    return(<>
        <Modal width="800" visible={visible} onCancel={()=>setVisible(false)} 
            footer={[<Row justify='end'>                    
                        <Col style={{marginRight:'15px'}}>
                            {loading && 
                                <Spin size='default' />
                            }
                        </Col>   
                        <Col>             
                            <Button type='primary' onClick={()=> sendData()}>
                                Enviar
                            </Button>
                        </Col>                    
                </Row>,                
                <Button onClick={()=> setVisible(false)}>
                  Volver
                </Button>                
              ]}>
                <Row>
                    <Col span={8} style={styles.col}>
                        <ItemForm name='purpose'>
                            <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> {                                     
                                setService([...services, 'Asesoría en contabilidad y/o finanzas'])
                            }} /> Asesoría en contabilidad y/o finanzas
                        </ItemForm>
                        <ItemForm name='purpose'>
                            <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> {                                     
                                setService([...services, 'Asesoría legal'])
                            }} /> Asesoría legal
                        </ItemForm>
                        <ItemForm name='purpose'>
                            <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> {                                     
                                    setService([...services, 'Asesoría de comercio internacional para exportar/importar'])                                                                     
                            }} /> Asesoría de comercio internacional para exportar/importar
                        </ItemForm>
                        <ItemForm name='purpose'>
                            <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                setService([...services, 'Construcciones y/o habilitación de infraestructura'])
                            }} /> Construcciones y/o habilitación de infraestructura
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Estudios de sostenibilidad territorial, de mercado e implementación de modelos de negocio sostenibles'])
                                 }} /> Estudios de sostenibilidad territorial, de mercado e implementación de modelos de negocio sostenibles
                            </ItemForm>
                        </Col>
                        <Col span={8} style={styles.col}>
                        <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Digitalizacion de la empresa'])
                                 }} /> Digitalizacion de la empresa
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Asesoría en marketing para incrementar ventas'])
                                 }} /> Asesoría en marketing para incrementar ventas
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Fotografía, generación de contenido y manejo de redes sociales'])
                                 }} /> Fotografía, generación de contenido y manejo de redes sociales
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Branding y diseño de productos y packaging'])
                                 }} /> Branding y diseño de productos y packaging
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Acceso a financiamiento: diseño, gestión y postulación de proyectos de impacto sostenible'])
                                 }} /> Acceso a financiamiento: diseño, gestión y postulación de proyectos de impacto sostenible
                            </ItemForm>
                            
                        </Col>
                        <Col span={8} style={styles.col} name='values'>
                        <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Diseño, validación y escalamiento de proyectos de innovación de impacto regenerativo'])
                                 }} /> Diseño, validación y escalamiento de proyectos de innovación de impacto regenerativo
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Certificaciones (Calidad, empresas B, normas chilenas, normas internacionales, entre otros…)'])
                                 }} /> Certificaciones (Calidad, empresas B, normas chilenas, normas internacionales, entre otros…)
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Actividades para mejora organizacional y empoderamiento de equipos de trabajo'])
                                 }} /> Actividades para mejora organizacional y empoderamiento de equipos de trabajo
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} onChange={(e)=> { 
                                    setService([...services, 'Asesoría en economía circular y reciclaje de residuos'])
                                 }} /> Asesoría en economía circular y reciclaje de residuos
                            </ItemForm>
                            <ItemForm>
                                <Checkbox onChange={(e)=> { 
                                    setService([...services, 'Otros...'])
                                 }} style={{marginRight:'5px'}} /> Otros...                                 

                            </ItemForm>
                        </Col>
                        <Col span={24}>                            
                            <Input.TextArea onChange={(e)=>setData({...data, message:e.target.value})} rows={6} placeholder='Describe...' />
                        </Col>
                    </Row> 
        </Modal> 
        <Row>            
            <Col>
                <Button type='primary' onClick={()=>setVisible(true)} >Tus necesidades(solicitar servicios)</Button>
            </Col>
        </Row>        
    </>
    )
}


const styles = {
    col: {
        paddingRight:'5px',
        paddingLeft:'5px'
    }
}


export default YourNeeds
