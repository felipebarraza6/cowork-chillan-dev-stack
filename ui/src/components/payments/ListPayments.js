import React, { useState, useEffect } from 'react'
import { Table, Typography, Row,
        Col, Button } from 'antd'
import { ListPaymentsAction } from '../../actions/payments/ActionPayments'
import { columns } from './columns'
const { Title } = Typography

const ListPayments = ({type_data}) => {

    const initialState = {
        payments: [],
        page: 1,
        is_speding: false        
    }
    const [data, setData] = useState([])

    const [local, setLocal] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const getPayments = async(is_speding) => {
        setLoading(true)
        try {
            const request = await ListPaymentsAction(is_speding)
            
            setData(request.data.results)            
            setLoading(false)
            return request
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    

    

    useEffect(() => {
        getPayments(false)
    }, [])

    return(
        <Table 
            columns={columns}    
            loading={loading}            
            title={()=> {            
            return(<Row>
                <Col span={12}>
                    {local.is_speding ? <Title level={3}>Gastos</Title>:<Title level={3}>Pagos</Title> }
                </Col>
                <Col style={styles.colBtn} span={12}>
                        <Button style={{marginRight:'10px'}} onClick={()=> {                         
                        }} type='primary'>(+) Agregar pago</Button>
                    {local.is_speding ? 
                        <Button onClick={()=> {
                            setLocal({...local, is_speding: false})
                            getPayments(false)
                        }} type='primary'>Ver pagos</Button>
                        :
                        <Button onClick={()=> {
                            setLocal({...local, is_speding: true})
                            getPayments(true)
                        }} type='primary'>Ver costos</Button>    
                    }
                </Col>

            </Row>)
        }}
        bordered
        dataSource={data}        
        />
    )
}


const styles = {
    colBtn: {
        textAlign: 'right'
    }
}


export default ListPayments