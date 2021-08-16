import React, { useState } from 'react'
import Slide1 from '../assets/images/slide1.png'
import Slide2 from '../assets/images/slide1_mobile.png'
import FormSuscription from './FormSuscription'

import { Card, Row, Col, 
        Typography, Affix, Button } from 'antd'

import { CloseCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph } =  Typography


const Sliders = ({is_mobile}) => {

    const [viewForm, setViewForm] = useState(true)

    return(<>
                {is_mobile ? <div style={{  
                    backgroundImage: `url(${Slide1})`,
                    backgroundPosition: 'center',
                    backgroundSize: '100% auto',
                    height: '540px',
                    backgroundRepeat: 'no-repeat',
                    width: '100%'
                    }}>
                        {viewForm && 
                        <Row>                            
                            <Col offset={8} style={styles.col}>
                                <Affix offsetTop={50}>
                                <Card style={styles.card}>
                                    <Row>
                                        <Col span={12}>
                                            <Title level={3} style={styles.title}>Participa</Title>                                            
                                        </Col>
                                        <Col span={12} style={{textAlign: 'end'}}>
                                            <Button type='link' onClick={()=>setViewForm(false)}>
                                                <CloseCircleOutlined style={styles.close} />
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Paragraph style={styles.title}>
                                                Sumate a crear el ecosistema de emprendimiento que necesita Ñuble, has click en el botón de acceso
                                            </Paragraph>
                                        </Col>
                                        <Col span={12}>
                                            <Button type='primary' size='large'
                                                style={{marginLeft:'40%'}}
                                                onClick={()=> {
                                                    window.open('https://us06web.zoom.us/j/2354833395')
                                                }}
                                            >
                                                INGRESAR</Button>
                                        </Col>
                                    </Row>
                                </Card>
                                </Affix>
                            </Col>
                        </Row>}
                    </div> :
                    <>
                        <div style={{  
                    backgroundImage: `url(${Slide2})`,
                    backgroundPosition: 'center',
                    backgroundSize: '100% auto',
                    height: '450px',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    WebkitBackgroundSize: 'cover',
                    }}>
                        {viewForm && 
                        <Row>                             
                            <Col style={styles.col}>
                                
                                <Card style={styles.card2}>
                                    <Row>
                                        <Col span={12}>
                                            <Title level={3} style={styles.title}>Participar</Title>                                            
                                        </Col>
                                        <Col span={12} style={{textAlign: 'end'}}>
                                            <Button type='link' onClick={()=>setViewForm(false)}>
                                                <CloseCircleOutlined style={styles.close} />
                                            </Button>
                                        </Col>
                                        <Col span={24}>
                                            <Paragraph style={styles.title}>
                                                Sumate a crear el ecosistema de emprendimiento que necesita Ñuble, has click en el botón de acceso
                                            </Paragraph>
                                        </Col>
                                        <Col span={24}>
                                            <Button type='primary' size='large'
                                                onClick={()=> window.open()}
                                            >Ingresar</Button>
                                        </Col>
                                    </Row>
                                </Card>
                              
                            </Col>
                        </Row>}
                    </div>                         
                    </>
                }
            </>                    
    )

}


const styles = {
    title: {
        color: 'white',
    },
    col: {
        paddingTop:'0px'
    },
    card: {
        width: '700px',
        backgroundColor: '#3D276C',
        borderColor: '#3D276C',
        borderRadius: '20px',
        color: 'white',
        marginTop: '10px',
        zIndex: '1'
    },
    card2: {
        width: '100% auto',
        backgroundColor: '#3D276C',
        borderColor: '#3D276C',
        borderRadius: '20px',
        color: 'white',
        marginTop:'10px',
        zIndex: '1'
    },
    slide: {
        width: '100%',
        position: 'relative',
    },
    close: {
        color: 'white',
        fontSize: '25px'        
    }
}


export default Sliders
