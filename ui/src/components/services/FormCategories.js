import React from 'react'
import { Form, Input, Button,  } from 'antd'
import { createCategory } from '../../actions/services/services_categories'

const FormCategories = ({ dispatch }) => {

    const [form] = Form.useForm()

    function onCreate(values){
        createCategory(dispatch, values).then((response)=> {
            form.resetFields()

        })
    }

    return(
        <Form form={form} name="control-hooks" layout='inline' style={styles.form} onFinish={onCreate} >
            <Form.Item name='name' rules={[{required:true, message:'Campo obligatorio'}]} >
                <Input placeholder='Nombre categoria' size='large' />
            </Form.Item>
            <Form.Item>
                <Button size='large' htmlType='submit' type='primary' >Agregar</Button>
            </Form.Item>
        </Form>
    )

}


const styles = {
    form: {
        marginBottom:'10px'
    }
}


export default FormCategories