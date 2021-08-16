import React from 'react'
import { Col, Row, Typography } from 'antd'
const { Title, Paragraph, Text } = Typography


const About = () => {

    return(
        <Row style={styles.container} >
            <Col span={24}>
            <Title style={styles.title}>Pensando en nuestro ecosistema de emprendimiento</Title>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.colPara}>
                <Paragraph style={styles.paragraph} align='justify'>
                <Text>
                <Text strong>CREEMOS ÑUBLE</Text>, es el primer evento de carácter virtual, participativo y abierto a todos los ciudadanos de la región de Ñuble, 
                cuyo principal objetivo <Text strong>crear las bases para nuestro Ecosistema de Emprendimiento</Text>. Inscríbete y participa de una <Text strong>metodología 
                participativa</Text>, generaremos un <Text strong>espacio de reflexión</Text> sobre las características que éste debería tener, el rol que deberían asumir 
                en el ecosistema de emprendimiento y las oportunidades que existen y las que debemos propiciar.
                </Text>

                </Paragraph>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.colPara}>
                <Paragraph style={styles.paragraph} >
                    <Text>                        
                    Estamos viviendo tiempos trascendentales… 
                    </Text>
                </Paragraph>
                <Paragraph style={styles.paragraph} align='justify'>
                    <Text>
                    Ya han transcurrido casi dos años desde que la pandemia se instaló, y la sociedad chilena está viviendo <Text strong>transformaciones importantes</Text>, 
                    redactando una nueva constitución y por cierto, eligiendo a sus nuevos gobernantes. 
                    </Text>
                </Paragraph>
                <Paragraph style={styles.paragraph}>
                    <Text>
                    Es <Text strong>EL MOMENTO</Text> de realizar esta reflexión…Acompáñanos a creer y crear nuestro Ñuble.
                    </Text>
                </Paragraph>
                <Paragraph style={styles.paragraph}>
                    <Text strong>
                    Creemos Ñuble
                    </Text>
                </Paragraph>
            </Col>
            <Col span={24}>
                <Paragraph style={styles.dates}>
                    <Text style={styles.textDates} strong>
                    8 y 9 de septiembre a las 18:30 hrs
                    </Text>
                </Paragraph>
            </Col>
        </Row>
    )
}


const styles = {
    container: {
        paddingTop: '80px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '40px',
        backgroundColor: '#F6E476',
    },
    title: {
        color: '#008E84',
        marginLeft: '20px'
    },
    paragraph: {
        color: 'gray'

    },
    colPara: {
        padding: '40px'        
    },
    dates: {
        textAlign: 'right',
        color: 'red',
        paddingRight: '20px',
        fontSize: '20px',        
    },
    textDates: {
        color: '#008E84',
    }
}


export default About