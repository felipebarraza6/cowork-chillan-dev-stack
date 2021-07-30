import React from 'react'
import { Row, Col, Steps,
        Typography, List } from 'antd'

import { TagFilled } from '@ant-design/icons'

const { Step } = Steps
const { Text, Title } = Typography


const Itinerary = () => {


    return (<Row>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.containerSteps}>
            <Title style={styles.title} level={3}>Primeda Jornada</Title>
            <List>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Saludo e Introducción</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Video ecosistema</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Explicación de metodología y glosario</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Mostrar ejemplos de éxito de ecosistemas</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Aplicación de herramienta participativa</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Reflexiones finales e invitación próxima jornada</Text>}
                    />
                </List.Item>
            </List>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={styles.containerSteps}>
            <Title style={styles.title} level={3}>Segunda Jornada</Title>
            <List>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Saludo e Introducción</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Video ecosistema</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Explicación de metodología y glosario</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Presentación resultado primera jornada</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Aplicación de herramienta participativa</Text>}
                    />
                </List.Item>
                <List.Item style={styles.step}>
                    <List.Item.Meta                        
                        avatar={<TagFilled />}
                        title={<Text style={styles.step}>Reflexiones finales y próximos pasos</Text>}
                    />
                </List.Item>
            </List>
        </Col>
        <Col span={24} style={styles.title1}>
            <Title style={styles.title} level={3}>Acompáñanos creer y crear nuestro Ñuble!</Title>
        </Col>
    </Row>)
}


const styles = {
    step: {
        color: 'white'
    },
    title: {
        color: 'white'
    },
    title1: {
        color: 'white',
        textAlign: 'center'
    },
    containerSteps: {
        padding: '10px'
    },
    colTitle: {
        marginRight: '30px',
        marginLeft: '30px',
    }
}

export default Itinerary