import React from 'react'
import { Row, Col, Typography, Button} from 'antd'
import logo from '../assets/images/cowork_dark.png'
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
const { Paragraph, Title } = Typography

const FooterInfo = () => {

    return(<Row style={{marginTop:'70px', marginBottom:'70px'}}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6} style={{paddingLeft:'20px', paddingRight:'20px', paddingBottom:'20px'}}>
            <Title level={3} style={{textAlign: 'center'}}>
                Pensando en nuestro ecosistema de emprendimiento
            </Title>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6} style={{paddingLeft:'20px',paddingRight:'20px', paddingBottom:'20px'}}>
            <Title level={4} style={{marginBottom: '20px', textAlign: 'center'}}>Redes Sociales</Title>
            <Row>
                <Col span={8} style={{textAlign: 'center'}}>                    
                    <a noreferrer={true} href={'https://www.facebook.com/CoworkChillan/'} target='__blank'>
                        <FacebookOutlined style={{fontSize:'30px', color: '#3b5998'}} />
                    </a>                    
                </Col>
                <Col span={8} style={{textAlign: 'center'}}>                    
                    <a noreferrer={true} href={'https://www.instagram.com/coworkchillan/?hl=es'} target='__blank'>
                        <InstagramOutlined style={{fontSize:'30px', color: '#3f729b'}} />
                    </a>
                </Col>
                <Col span={8} style={{textAlign: 'center'}}>                    
                    <a noreferrer={true} href={'https://twitter.com/coworkchillan?lang=es'} target='__blank'> 
                        <TwitterOutlined style={{fontSize:'30px', color: '#00acee'}} />
                    </a>
                </Col>
            </Row>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6} style={{paddingLeft:'20px', paddingRight:'20px', paddingBottom:'20px'}}>
            <Title level={4} style={{marginBottom: '20px', textAlign: 'center', textAlign:'center'}}>Contacto</Title>
            <Paragraph align="center">
                <a style={styles.a} href='tel:229856635' target='_blank' rel='noreferrer'>229856635</a>
            </Paragraph>
            <Paragraph align="center">
                <a style={styles.a} href='mailto:contacto@coworkchillan.cl' target='_blank' rel='noreferrer'>contacto@coworkchillan.cl</a>
            </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6} style={{paddingLeft:'20px', paddingTop:'20px',paddingRight:'20px', textAlign: 'center', paddingBottom:'20px'}}>
            <a style={styles.a} href='https://coworkchillan.cl' target='_blank' rel='noreferrer'>
                <img src={logo} alt='logo' />
            </a>
        </Col>
    </Row>)
}


const styles = {
    a: {
        color:'black'
    }
}

export default FooterInfo