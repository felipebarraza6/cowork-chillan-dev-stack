import React from 'react'
import { Row, Col, Typography,
        Card } from 'antd'
import { SketchOutlined, CalendarOutlined, DesktopOutlined,
        DeploymentUnitOutlined, BuildOutlined, TeamOutlined,
        InfoCircleFilled } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const Services = () => {

    return(
        <Row justify='center' style={styles.row}>
            <Col span={24} style={styles.titleCol}>
                <Title>Juntos por el ecosistema de emprendimiento</Title>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card} hoverable>
                    <p>¿Cuándo?</p>
                    <CalendarOutlined style={styles.icon} />
                    <p>6 y 8 de Septiembre 2021 a las 18:30 hrs</p>
                </Card>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card1} hoverable>
                    <p>¿Dónde?</p>
                    <DesktopOutlined style={styles.icon} />
                    <p>Por Zoom</p>
                </Card>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card} hoverable>
                    <p>¿Cómo?</p>
                    <DeploymentUnitOutlined style={styles.icon} />
                    <p>Dos jornadas con metodologías participativas</p>
                </Card>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card1} hoverable>
                    <p>¿Quiénes?</p>
                    <BuildOutlined style={styles.icon} />
                    <p>Cowork Chillan, Corfo y Cidere</p>
                </Card>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card2} hoverable>
                    <p>¿A quiénes?</p>
                    <TeamOutlined style={styles.icon} />
                    <p>Todos, Empresa, Gobierno, Academia y Sociedad civil</p>
                </Card>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card3} hoverable>
                    <p>¿Para Qué?</p>
                    <InfoCircleFilled style={styles.icon} />
                    <p>Conocer preliminarmente a los actores que realizan funciones en el ecosistema actual</p>
                </Card>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card} hoverable>
                    <p>¿Para Qué?</p>
                    <InfoCircleFilled style={styles.icon} />
                    <p>Identificar roles que deberían existir (desarrollarse) para integrar un ecosistema robusto de emprendimiento.</p>
                </Card>
            </Col>
            <Col style={styles.col} col={6}>
                <Card style={styles.card} hoverable>
                    <p>¿Para Qué?</p>
                    <InfoCircleFilled style={styles.icon} />
                    <p>Elaborar una hoja de ruta con necesidades y oportunidades para nuestro ecosistema de emprendimiento</p>
                </Card>
            </Col>
        </Row>
    )
}


const styles = {
    card: {
        width: '250px',        
    },
    
    card1: {
        width: '250px',
        paddingBottom: '20px', 
        "&:hover": {
            background: 'red'
          }
    },    
    card2: {
        width: '250px',
        paddingBottom: '40px'
    },    
    card3: {
        width: '250px',
        paddingBottom: '20px'
    },  
    icon: {
        fontSize: '40px',
        marginBottom: '20px'
    },
    text: {
        fontSize: '22px',
        textAlign: 'center',
    },
    col: {
        textAlign: 'center',
        padding:'20px'
    },
    row: {
        paddingTop:'90px',
        marginBottom: '40px'
    },
    titleCol: {
        textAlign: 'center',
        marginBottom: '35px'
    }
}


export default Services
