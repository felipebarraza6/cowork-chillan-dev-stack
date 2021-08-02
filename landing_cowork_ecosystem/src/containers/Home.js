import React, { useState, useEffect } from 'react'
import HeaderMenu from '../components/HeaderMenu'
import { Layout, Col, Row, 
        Affix, Typography, Modal} from 'antd'
import logo_src from '../assets/images/logo.png'
import Sliders from '../components/Sliders'
import About from '../components/About'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Collaborators from '../components/Collaborators'
import FooterInfo from '../components/FooterInfo'
import Inscribed from '../components/Inscribed'
import { BrowserRouter } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const Home = () => {


    const [width, setWidth] = useState()
    const [is_mobile, setIsMobile] = useState()    

    useEffect(()=> {

        setWidth(window.innerWidth)
        if(window.innerWidth > 800){
            setIsMobile(true)
        }

    }, [])

    console.log(width)

    return(<Layout>
        <BrowserRouter>
        
        <Affix offset={'20px'}>
        <Header style={styles.header}>
            <Row>
                <Col>
                    <div>
                        <img src={logo_src} alt='logo' style={styles.logo} />
                    </div>
                </Col>
                {width > 800 && <>
                <Col>
                    <Title style={styles.title} level={5}>6 y 9 de septiembre a las 18:30 hrs</Title>
                </Col>
                <Col offset={6}> 
                    <HeaderMenu is_mobile={is_mobile} />
                </Col></>}
            </Row>
        </Header>
        </Affix>
        <Content >
            <Row>
                <Col span={24} >
                    <Sliders is_mobile={is_mobile} />
                </Col>
                <Col span={24} id='about'>
                    <About />
                </Col>
                <Col span={24} id='features'>
                    <Services />
                </Col>
                <Col span={24} id='colaborators' style={styles.marginCol}>
                    <Collaborators />
                </Col>
                <Col span={24} id="contact">
                    <Contact />
                </Col>
                <Col span={24} id='inscribed' >
                    <Inscribed />
                </Col>
            </Row>
            
        </Content>
        </BrowserRouter>
        <Footer>
            <FooterInfo />
        </Footer>
    </Layout>)
}


const styles = {
    marginCol: {
        paddingTop:'20px',
        paddingBottom: '40px'
    },
    logo: {
        width: '200px',
    },
    title: {
        color:'white', 
        margin: '13px'
    },
    header: {
        backgroundColor: '#4E3D79',
    }
    
}


export default Home