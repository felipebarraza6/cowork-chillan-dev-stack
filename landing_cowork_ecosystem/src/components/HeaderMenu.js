import React from 'react'
import {Col, Row, Button } from 'antd'
import { HashLink as Link } from 'react-router-hash-link'

const HeaderMenu = ({ is_mobile }) => {

    return(
        <Row >         
            {is_mobile ? <>
            <Col style={styles.col}>
                <Link smooth to="#" style={styles.btn}>Inicio</Link>                
            </Col>
            <Col style={styles.col}>
                <Link smooth to="#about" style={styles.btn}>¿Que es?</Link>                
            </Col>
            <Col style={styles.col}>
                <Link smooth to="#features" style={styles.btn}>El Evento</Link>                
            </Col>                        
            <Col style={styles.col}>
                <Link smooth to="#colaborators" style={styles.btn}>Colaboradores</Link>                
            </Col>
            <Col style={styles.col}>
                <Link smooth to="#contact" style={styles.btn}>Participa</Link>                
            </Col></>:
                <Col style={styles.col}>
                    <Link smooth to="#contact" style={styles.btn}>Participa</Link>                
            </Col> 
            }
        </Row>
    )
}


const styles = {
    col: {
        color:'white',
        marginLeft:'20px', 
        paddingRight:'20x'
    },
    btn: {
        color:'white'
    }
}


export default HeaderMenu