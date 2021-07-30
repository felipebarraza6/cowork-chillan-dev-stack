import React from 'react'
import { Row, Col } from 'antd'
import ListIncidences from '../components/incidences/ListIncidences'


const Incidences = () => {

    return(<Row>
        <Col spa={24}>            
            <ListIncidences />
        </Col>
    </Row>)

        
}


export default Incidences