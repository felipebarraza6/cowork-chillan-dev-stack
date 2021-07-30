//React
import React, { useContext, useState } from 'react'

//Build
import './../build/css/App.css'
import logo from '../build/images/logo.png'

//Antd
import { Input, Button, Form, Spin, message } from 'antd'
import { MailOutlined, ExportOutlined } from '@ant-design/icons';

//Context
import { AuthContext } from '../App'

//Endpoint
import api from '../api/authenticated/endpoints'

const Login = () => {

    const { dispatch } = useContext(AuthContext)

    const initialState = {
        email: '',
        password: '',
        isSubmitting: false,
        error: null
    }

    const [objUser, setObjUser] = useState(initialState)

    const handleInputChange = e => {
        setObjUser({
            ...objUser,
            [e.target.name]: e.target.value
        })
    }

    const loginFormSubmit = async e =>{

        setObjUser({
            ...objUser,
            isSubmitting: true,
        })

        try{

            const response = await api.authenticated.login(objUser)

            if(response){
                window.location.reload()
            }

            dispatch({
                type:'LOGIN',
                payload:response
            })
            message.success(`Acceso correcto: ${response.user.first_name} ${response.user.last_name}`)

        }catch(error){
            setObjUser({
                ...objUser,
                isSubmitting: false,
                error: error.message
            })
            message.error('Credenciales Incorrectas')
        }



    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    ERP
                </p>
                <div>
                    <Form
                        onFinish={loginFormSubmit}

                    >
                        <Form.Item name="email" rules={[{ required: true, message: 'Por favor ingresa tu usuario!', type:'email' }]}>
                            <Input name="email" size="large" placeholder="Usuario" prefix={<MailOutlined />} onChange={handleInputChange} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}>
                            <Input.Password name="password" size="large" placeholder="Contraseña"  prefix={<ExportOutlined />} onChange={handleInputChange} />
                        </Form.Item>
                        {objUser.isSubmitting ?
                                <Spin />:
                        <Form.Item>

                                <Button type="primary" htmlType="submit">
                                    Ingresa
                                </Button>
                                </Form.Item>
                        }
                    </Form>
                </div>



            </header>
    </div>
    )
}

export default Login
