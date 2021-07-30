import React, { useState } from 'react'
import Slide1 from '../assets/images/slide1.png'
import Slide2 from '../assets/images/slide1_mobile.png'
import FormSuscription from './FormSuscription'

import { Card, Row, Col, 
        Typography, Affix, Button } from 'antd'

import { CloseCircleOutlined } from '@ant-design/icons'

const { Title } = Typography


const Sliders = ({is_mobile}) => {

    const [viewForm, setViewForm] = useState(true)

    return(        
            <>
                {is_mobile ? <div style={{  
                    backgroundImage: `url(${Slide1})`,
                    backgroundPosition: 'center',
                    backgroundSize: '100% auto',
                    height: '500px',
                    backgroundRepeat: 'no-repeat',
                    width: '100%'
                    }}>
                        <Row>
                            {viewForm && 
                            <Col offset={13} style={styles.col}>
                                <Affix offsetTop={50}>
                                <Card style={styles.card}>
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
                                            <FormSuscription closeAffix={setViewForm} is_affix={true} />
                                        </Col>
                                    </Row>
                                </Card>
                                </Affix>
                            </Col>}
                        </Row>
                    </div> :
                    <>
                        <img style={styles.slide} src={Slide2} alt='slide1' />
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
        paddingTop:'10px'
    },
    card: {
        width: '600px',
        backgroundColor: '#3D276C',
        borderColor: '#3D276C',
        borderRadius: '20px',
        color: 'white',
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