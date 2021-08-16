import React, { useState } from 'react'

import { Button, Col, Row, Checkbox, Form, Modal, Input } from 'antd'
const {Item:ItemForm}=Form

const YourNeeds = () => {

    const [visible, setVisible] = useState(false)
    
    const initialState = {
        isOthers: false,
        str_other: ''
    }

    const [state, setState] = useState(initialState)

    return(<>
        <Modal width="800" visible={visible} onCancel={()=>setVisible(false)} okButtonProps={{ disabled: true }}>
                <Row>
                        <Col span={8} style={styles.col}>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Asesoría en contabilidad y/o finanzas
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Asesoría legal
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Asesoría de comercio internacional para exportar/importar
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Construcciones y/o habilitación de infraestructura
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Estudios de sostenibilidad territorial, de mercado e implementación de modelos de negocio sostenibles
                            </ItemForm>
                        </Col>
                        <Col span={8} style={styles.col}>
                        <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Digitalizacion de la empresa
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Asesoría en marketing para incrementar ventas
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Fotografía, generación de contenido y manejo de redes sociales
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Branding y diseño de productos y packaging
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Acceso a financiamiento: diseño, gestión y postulación de proyectos de impacto sostenible
                            </ItemForm>
                            
                        </Col>
                        <Col span={8} style={styles.col} name='values'>
                        <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Diseño, validación y escalamiento de proyectos de innovación de impacto regenerativo
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Certificaciones (Calidad, empresas B, normas chilenas, normas internacionales, entre otros…)
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Actividades para mejora organizacional y empoderamiento de equipos de trabajo
                            </ItemForm>
                            <ItemForm name='purpose'>
                                <Checkbox rows='4' style={{marginRight:'5px'}} /> Asesoría en economía circular y reciclaje de residuos
                            </ItemForm>
                            <ItemForm>
                                <Checkbox onChange={(e)=> { 
                                    if(e.target.checked){
                                        setState({...state, isOthers: true})
                                    }else{
                                        setState({...state, isOthers: false}) 
                                    }
                                 }} style={{marginRight:'5px'}} /> Otros...
                                 {state.isOthers && <Input.TextArea rows={4} placeholder='Describe...' />}
                            </ItemForm>
                            
                        </Col>
                    </Row> 
        </Modal>
        <Button type='primary' onClick={()=>setVisible(true)} >Tus necesidades(solicitar servicios)</Button>
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
