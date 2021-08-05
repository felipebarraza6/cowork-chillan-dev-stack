import React from 'react'
import { Row, Col, Typography, Button} from 'antd'
import logo_cowork from '../assets/images/cowork_dark.png'
import logo_corfo from '../assets/images/corfo.png'
import logo_mentorinn from '../assets/images/mentorinn.png'
import logo_cidere from '../assets/images/cidere.png'
import logo_cdn from '../assets/images/cdn.png'

const { Title } = Typography

const Collaborators = () => {

    return (<>
        <Row style={styles.container} justify='center'>
            <Col span={24} style={styles.colTitle}>
                <Title level={1} style={styles.title}>Colaboradores</Title>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={styles.colImg}>
                <a noreferrer={true} href={'https://coworkchillan.cl'} target='__blank'>
                    <img src={logo_cowork} style={styles.logo_cowork} alt='logo_cowork' />
                </a>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={styles.colImg}>                
                <a noreferrer={true} href={'https://www.corfo.cl/sites/cpp/homecorfo'} target='__blank'>
                    <img src={logo_corfo} style={styles.logo} alt='logo_corfo' />
                </a>                
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} style={styles.colImg}>                
                <a noreferrer={true} href={'https://mentorinn.cl'} target='__blank'>
                    <img src={logo_mentorinn} style={styles.logo_mentorinn} alt='logo_mentorinn' />
                </a>                
            </Col>      
            <Col xs={24} sm={12} md={6} lg={6} xl={6} style={styles.colImg}>                
                <a noreferrer={true} href={'https://ciderebiobio.cl'} target='__blank'>
                    <img src={logo_cidere} style={styles.logo_cidere} alt='logo_cidere' />
                </a>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={6} style={styles.colImg}>                
                <a noreferrer={true} href={'https://www.sercotec.cl/centros-de-negocios/centro-de-desarrollo-de-negocios-chillan/'} target='__blank'>
                    <img src={logo_cdn} style={styles.logo_cdn} alt='logo_cdn' />
                </a>
            </Col>      
        </Row>
        
            
    </>)

}


const styles = {
    container: {
        marginTop: '15px',
        marginBottom: '40px'        
    },
    colTitle: {
        marginBottom:'3px'
    },
    logo: {
        width: '200px'
    },
    logo_mentorinn: {
        width: '300px'
    },
    logo_cowork: {
        width: '300px',        
    },
    logo_cidere: {
        width: '150px',
        paddingBottom: '40px'
    },
    logo_cdn: {
        width: '150px',
        marginBottom: '50px'
        
    },
    title: {
        textAlign: 'center',
        marginTop:'40px',
        marginBottom: '20px'
    },
    colImg: {
        textAlign: 'center',
        marginTop:'20px', marginBottom:'20px'   
    }
}


export default Collaborators