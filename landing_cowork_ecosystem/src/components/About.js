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
                <Text strong>
                Evento de carácter participativo abierto a todos los ciudadanos de la región de Ñuble 
                cuyo principal objetivo es sentar las bases del futuro Ecosistema de Emprendimiento de 
                la región de Ñuble. Esto permitirá a todos los actores regionales participar en la reflexión 
                sobre las características que debería tener, el rol que deberían asumir en el ecosistema de 
                emprendimiento y las oportunidades que hay. Este evento se llevara acabo en dos jornadas 
                de trabajo virtual. 
                </Text>

                </Paragraph>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.colPara}>
                <Paragraph style={styles.paragraph} >
                    <Text strong>                        
                    Estamos viviendo tiempos trascendentales… 
                    </Text>
                </Paragraph>
                <Paragraph style={styles.paragraph} align='justify'>
                    <Text strong>
                    Recién saliendo de una terrible pandemia, viviendo transformaciones sociales, redactando una 
                    nueva constitución, eligiendo a nuestros gobernadores regionales. Y además estamos cerca de la 
                    celebración de un nuevo aniversario de nuestro reconocimiento como región.
                    </Text>
                </Paragraph>
                <Paragraph style={styles.paragraph}>
                    <Text strong>
                    …Acompáñanos  creer y crear nuestro Ñuble
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
                    6 y 9 de septiembre
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