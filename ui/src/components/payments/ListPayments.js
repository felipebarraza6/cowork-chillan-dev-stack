import React, { useState, useEffect } from 'react'
import { Table, Typography, Row,
        Col, Button } from 'antd'
import { ListPaymentsAction } from '../../actions/payments/ActionPayments'
const { Title } = Typography

const ListPayments = ({type_data}) => {

    const initialState = {
        payments: [],
        page: 1,
        is_speding: false        
    }

    const [local, setLocal] = useState(initialState)

    const getPayments = async() => {
        try {
            const request = await ListPaymentsAction(local.is_speding)
            
            setLocal({
                ...local,
                payments: request.data.results
            })
            return request
        } catch (err) {
            console.log(err)
        }
    }

    console.log(local)

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ]

    useEffect(() => {
        getPayments()
    }, [])

    return(
        <Table title={()=> {            
            return(<Row>
                <Col span={12}>
                    {local.is_speding ? <Title level={3}>Gastos</Title>:<Title level={3}>Pagos</Title> }
                </Col>
                <Col style={styles.colBtn} span={12}>
                    {local.is_speding ? 
                        <Button onClick={()=> setLocal({...local, is_speding: false})} type='primary'>Ver pagos</Button>:
                        <Button onClick={()=> setLocal({...local, is_speding: true})} type='primary'>Ver costos</Button>    
                    }
                </Col>
            </Row>)
        }}
        bordered
        dataSource={local.payments}        
        />
    )
}


const styles = {
    colBtn: {
        textAlign: 'right'
    }
}


export default ListPayments