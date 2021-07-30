import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, 
        Col, Input, Typography, 
        Select, notification } from 'antd'

import tasks from  '../../api/tasks/endpoints'
import api from '../../api/authenticated/endpoints' 
const { TextArea } = Input
const { Text } = Typography


const ModalIncidence = ({payment}) => {

    const user = JSON.parse(localStorage.getItem('user') || null)
    const user_id = user.id
    console.log(payment)
    const [visible, setVisible] = useState(false)
    const [users, setUsers] = useState([])
    const [data, setData] = useState({
        user: user_id,
        operator: null,
        message: '',
        payment: payment.id
    })
    console.log(data)

    useEffect(() => {
        const get_users = async() => {
            const request = await api.list_admin()
            setUsers(request.results)
            console.log(request.results)
        }
        get_users()
    },[])

    console.log(users)
    return(
        <>
            <Modal visible={visible} 
                okText='ENVIAR INSIDENCIA' 
                onCancel={()=>setVisible(false)} 
                title={`Agregar pago #${payment.id} a insidencia `} 
                onOk={async()=> {
                    const request = await tasks.postTaks(data)
                        .then((response)=> {
                            notification.success({message: 'INSIDENCIA CREADA'})
                            setVisible(false)
                        })
                }} >
                <Row>
                    <Col span={24}>
                        <Text style={styles.text}>Operador: </Text>
                        <Select placeholder='Selecciona un usuario' 
                            onChange={(e)=>setData({...data, operator: e})}>
                            {users.map((obj)=> {
                                return(<Select.Option key={obj.id}>
                                    {obj.first_name} {obj.last_name}
                                </Select.Option>)
                            })}
                        </Select>
                    </Col>
                    <Col span={24}>
                        <Text style={styles.textArea}>Mensaje: </Text>
                        <TextArea rows="4" onChange={(e)=> setData({...data, message: e.target.value})} />
                    </Col>
                </Row>
            </Modal>
            <Button type='primary' onClick={()=> setVisible(true)}>
                (+) Asignar a insidencia
            </Button>
        </>
    )
}

const styles= {
    text:{
        marginRight:'10px'
    },
    textArea: {
        marginRight:'10px',
        marginBottom: '10px'
    }
}


export default ModalIncidence
