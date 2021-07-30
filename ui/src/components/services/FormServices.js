import React from 'react'
import { Form, Input, Button, Select  } from 'antd'
import { updateService, createService } from '../../actions/services/services_manager'

const { Option } = Select


const FormServices = ({ dispatch, types_categories, initial_data, state }) => {    
    const [form] = Form.useForm()

    async function onFinish(values){
        
        if(initial_data){
            updateService(dispatch, values, state.update_data.id).then((response)=> {
                dispatch({type:'CLEAN_UPDATE_DATA'})
                form.resetFields()                
                dispatch({type:'RELOAD_FORM_SERVICES_OFF'})                
                dispatch({type:'RELOAD_FORM_SERVICES'})
            })
        }else{
            createService(dispatch, values).then((response)=> {
                form.resetFields()                                
            })
        }

    }

    

    return(
        <Form initialValues={initial_data} form={form} name="control-hooks" layout='inline' style={styles.form} onFinish={onFinish} >
            <Form.Item name='name' rules={[{required:true, message:'Campo obligatorio'}]} >
                <Input placeholder='Nombre servicio' size='large' style={styles.inputs.name} />
            </Form.Item>
            <Form.Item name='category' rules={[{required:true, message:'Campo obligatorio'}]} >
                <Select placeholder='Seleccionar categoria' size='large' style={styles.inputs.type_category}>
                    {types_categories && <>
                        {types_categories.map((obj)=> <Option value={obj.id} key={obj.id} > {obj.name} </Option> )}                        
                    </>}
                </Select>
            </Form.Item>
            <Form.Item>
                {initial_data ? 
                <Button size='large' htmlType='submit' type='primary' >Actualizar</Button>:
                <Button size='large' htmlType='submit' type='primary' >Agregar</Button>
                }
            </Form.Item>
        </Form>
    )

}


const styles = {
    form: {
        marginBottom:'10px'
    },
    inputs: {
        name: {
            width:'400px'
        },
        type_category: {
            width:'300px'
        }
    }

}


export default FormServices