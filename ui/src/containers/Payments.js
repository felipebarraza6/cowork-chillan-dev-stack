import React from 'react'
import { Row, Col, Typography } from 'antd'
import ListPayments from '../components/payments/ListPayments'
const { Title } = Typography


const Payments = () => {

    return(<>
        <Row>
            <Col span={24} style={styles.colTitle}>
                <Title level={3}>Pagos y gastos</Title>
            </Col>
        </Row>
        <Row>            
            <Col span={24} style={styles.col}>
                <ListPayments />
            </Col>
        </Row>
    </>)

}


const styles = {
    colTitle: {
        marginBottom: '20px'
    },
    col: {
        paddingLeft: '10px',
        paddingRight: '10px'
    }
}

export default Payments