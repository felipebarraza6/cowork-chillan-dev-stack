import React from 'react'
import { Row, Col, Typography } from 'antd'
import YourNeeds from './YourNeeds'
const  { Title } = Typography


const HeaderOptions = () => {

    return (<Row style={styles.canvas}>
            <Col span={12}>
                <Title level={3}>
                    TU CENTRO DE EMPRENDIMIENTO E INNOVACION SOSTENIBLE
                </Title> 
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
                <YourNeeds />
            </Col>
        </Row>)

}


const styles = {
    canvas: {
        marginTop:'-20px'
    }
}

export default HeaderOptions
