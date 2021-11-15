import React, { useReducer, createContext } from 'react'
import { Row, Col, Typography } from 'antd'
import ListPayments from '../components/payments/ListPayments'
import { reducer } from '../reducers/payments/reducer'
export const PaymentsContext = createContext()
const { Title } = Typography


const Payments = () => {

    const initialState = {
        payments: [],
        is_speding: false,
        page: 1,
        count: 0
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    
    
    return(<PaymentsContext.Provider value={{ 
            state,
            dispatch
        }}>
        <Row>
            <Col span={24} style={styles.colTitle}>
                <Title level={3}>Pagos y gastos</Title>
            </Col>
        </Row>
        <Row>            
            <Col span={24} style={styles.col}>
                <ListPayments />
            </Col>
        </Row>
    </PaymentsContext.Provider>)

}


const styles = {
    colTitle: {
        marginBottom: '20px'
    },
    col: {
        paddingLeft: '10px',
        paddingRight: '10px'
    }
}

export default Payments