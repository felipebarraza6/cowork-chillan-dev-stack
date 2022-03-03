import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Typography,
        Select, Row, Col, Checkbox, notification } from 'antd'

import payments from '../../api/payments/endpoints'

const { Title } = Typography        


const ModalAddPaymentForMembership = ({ membership }) => {

    
    const [visible, setVisible] = useState(false)
    const [list, setList] = useState([])

    const [data, setData] = useState({
        membership: membership.id,
        method: null,
        bank_account: null,
        amount: null,
        description: '',
        is_invoice: false,
        is_pay: true,
        is_ticket: false,
        comprobant_file: null,                                                        
    })


        
    useEffect(() => {
        const getData = async() => {
            try {
                const request = await payments.listBanks()                
                setList(request.data.results)
                return request
            } catch (err) {
                console.log(err)
            }
        }               
        getData()
    }, [])

    const changeHandler = (event) => {
	setData({...data, comprobant_file:event.target.files[0]})		
    }

    const postData = async() => {
        try {
            const request = await payments.addPaymemtForMembership(data).then((r)=> {
                notification.success({message:'PAGO INGRESADO :)'})
                setVisible(false)
            })            
            return request
        } catch(e) {
            notification.error({message:'REVISA TUS DATOS'})
            console.log(e)
        }
    }

    
    return(<>
        <Modal visible={visible} 
            onCancel={()=> {
                setVisible(false)            
            }}
            onOk = {postData}               
            title={`Agregar Pago a membresia ${membership.uuid}`}
            width={700}>
                <Row gutter={16}>
                    <Col>
                        <Title style={styles.txt} level={4}>
                        Tipo de pago
                        </Title>
                        <Select style={styles.select} placeholder="Selecciona una opcion"
                            onChange = {(txt) => { 
                                setData({...data, method: txt})
                            }}>
                            <Select.Option value='Efectivo'>
                                Efectivo
                            </Select.Option>
                            <Select.Option value='Transferencia'>
                                Transferencia
                            </Select.Option>
                            <Select.Option value='Debito'>
                                Tarjeta de Debito
                            </Select.Option>
                            <Select.Option value='Credito'>
                                Tarjeta de Credito
                            </Select.Option>
                        </Select>
                    </Col>
                    <Col>
                        <Title level={4} style={styles.txt}>
                        Cuenta Bancaria
                        </Title>
                        <Select style={styles.select} placeholder="Selecciona una opcion"
                            onChange = {(txt)=> {                                
                                setData({
                                    ...data,
                                    bank_account: txt 
                                })
                            }}>
                            {list.map((x)=> 
                                <Select.Option key={x.id} value={x.id}>
                                    {x.bank}
                                </Select.Option>                                
                            )}                                                       
                        </Select> 
                    </Col>
                    <Col>
                    <Title level={4} style={styles.txt}>
                            Monto ($)
                        </Title>
                        <Input placeholder={'$'} onChange={(e)=>setData({...data, amount: e.target.value})} /> 
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={styles.description}>
                        <Title level={4}>Descripcion</Title>
                        <Input.TextArea rows={6} onChange={(e)=>setData({...data, description: e.target.value})} />
                    </Col>
                </Row>
                <Row style={styles.description}>
                    <Col span={12}>
                        <Checkbox disabled={data.is_ticket} onChange = {(e)=> {                            
                            setData({
                                ...data,
                                is_invoice: e.target.checked
                            })
                        }} /> FACTURA
                    </Col>
                    <Col span={12}>
                        <Checkbox disabled={data.is_invoice} onChange = {(e)=> {                            
                            setData({
                                ...data,
                                is_ticket: e.target.checked
                            })
                        }} /> BOLETA
                    </Col>
                    <Col span={12}>
                        <Title level={4} style={styles.txt2}>Subir comprobante</Title>
                        <input type="file" id="myFile" name="filename" onChange={changeHandler} accept="application/pdf,application/vnd.ms-excel" />
                    </Col>
                    <Col span={12}>
                        <Title level={4} style={styles.txt2}>Subir facturra</Title>
                        <input type="file" id="myFile" name="filename" onChange={changeHandler} accept="application/pdf,application/vnd.ms-excel" />
                    </Col>
                </Row>
            </Modal>
        <Button style={styles.btn} type='primary' onClick={()=>{
            setVisible(true)
        }}>(+) Agregar Pago</Button>
    </>)

}


const styles = {
    btn: {
        margin: '10px'
    },
    txt: {
        textAlign: 'center'
    },
    txt2: {
        marginTop: '20px'
    },
    description: {
        marginTop:'30px'
    },
    select: {
        width: '200px'
    }
}


export default ModalAddPaymentForMembership
