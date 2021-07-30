import React, { useState } from 'react'
import { Button, Modal, Form, Select, Input,
        Checkbox } from 'antd'
import { EditOutlined } from '@ant-design/icons'         
import { createValoration, updateValoration } from '../../actions/services/services_valoration'
const { Option } = Select
const { TextArea } = Input


const CreateForm = ({ visible, onFinish, onCancel, title, initialData}) => {
    
    const [form] = Form.useForm()

    return(
        <Modal
            visible={visible}
            title={<> {initialData ? `Modificar valorizacion`: 
                                    `Crear valorizacion para: ${title}`} </>}
            okText={initialData ? 'Modificar valorizacion':'Crear valorizacion'}
            cancelText='Cancelar'
            onCancel={onCancel}
            onOk={()=> {
                form
                    .validateFields()
                    .then((values)=> {
                        
                        onFinish(values)
                    })                    
            }}
        >            
            <Form
                form={form}
                layout='vertical'
                name='form_in_modal'
                initialValues={initialData}
            >                
                <Form.Item name='duration' label='Duracion(periodo)' >
                    <Select placeholder='Selecciona una opcion...'>            
                        <Option value='365 day, 0:00:00'>Anual(365 Dias, 0:00:00)</Option>
                        <Option value='182 day, 12:00:00' >Semestral(182 Dias, 12:00:00)</Option>
                        <Option value='90 day, 0:00:00' >Trimestral(90 Dias, 0:00:00)</Option>
                        <Option value='30 day, 0:00:00' >Mensual(30 Dias, 0:00:00)</Option>
                        <Option value='1 day, 0:00:00' >Dia(1 Dias, 0:00:00)</Option>
                        <Option value='0 day, 1:00:00' >Hora(0 Dias, 1:00:00)</Option>
                    </Select>
                </Form.Item>
                <Form.Item name='price' label='Precio ($)' >
                    <Input placeholder='$ 100.000' />
                </Form.Item>
                <Form.Item name='used_by_membership' valuePropName="checked">
                    <Checkbox style={{marginRight:'5px'}} /> Se utilizara en membresias?
                </Form.Item>
                <Form.Item name='note' label='Nota' >
                    <TextArea placeholder='Describe tu nota...' />
                </Form.Item>
            </Form>
        </Modal>
    )

}


const FormValoration = ({ service, initialData, dispatch, valoration }) => {
    
    const [visible, setVisible] = useState(false)
    
    function openModal(){
        setVisible(true)
    }

    function closeModal(){
        setVisible(false)
    }

    function onFinish(values){
        console.log(values)
        if(initialData){
            updateValoration(dispatch, values,valoration).then((response)=> {
                closeModal()
            })
        }else{

            values = {
                ...values,
                'service':service.id
            }

            createValoration(dispatch, values).then((response)=> {
                Modal.destroyAll()
            })        
        }
        
    }

    

    return(
        <React.Fragment>            
            {initialData ? 
                <Button shape='circle' style={styles.btn} onClick={openModal} type='primary'><EditOutlined /></Button>:
                <Button style={styles.btn} onClick={openModal} type='primary'>(+) Valoracion</Button>
            }
            
            <CreateForm
                visible={visible}
                onCancel={closeModal}
                onFinish={onFinish}
                title={service.name}
                initialData= {initialData}
            />
        </React.Fragment>
    )

}


const styles = {
    btn:{
        marginRight:'10px'
    }
}


export default FormValoration