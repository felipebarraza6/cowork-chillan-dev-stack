import React from 'react'
import { Row, Col, Typography } from 'antd'
const { Title, Text } = Typography


const Payments = () => {

    return(<>
        <Row>
            <Col span={24}>
                <Title level={3}>Pagos y gastos</Title>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Text>Pagos</Text>
            </Col>
            <Col span={12} >
                <Text>Gastos</Text>
            </Col>
        </Row>
    </>)

}


export default Payments