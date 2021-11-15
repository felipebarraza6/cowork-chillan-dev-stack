import React, { useState, useEffect, useContext } from 'react'
import { Table, Typography, Row,
        Col, Button } from 'antd'
import { ListPaymentsAction } from '../../actions/payments/ActionPayments'
import { columns } from './columns'
import AddSpeding from './AddSpeding'
import { PaymentsContext } from '../../containers/Payments'

const { Title } = Typography

const ListPayments = () => {

    const { state, dispatch } = useContext(PaymentsContext)    
    const [loading, setLoading] = useState(false)    


    const getPayments = async(is_speding, page) => {
        setLoading(true)
        try {
            const request = await ListPaymentsAction(is_speding, page, dispatch)                          
            setLoading(false)
            return request
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }        

    useEffect(() => {
        getPayments(false, state.page)
    }, [])


    return(<> 
        <Table 
            columns={columns(state, dispatch)}    
            loading={loading}  
            rowKey='id'          
            title={()=> {            
            return(<Row>
                <Col span={12}>
                    {state.is_speding ? <Title level={3}>Gastos</Title>:<Title level={3}>Pagos</Title> }
                </Col>
                <Col style={styles.colBtn} span={12}>
                        
                    {state.is_speding ? <>
                        <AddSpeding />
                        <Button onClick={()=> {
                            dispatch({
                                type:'IS_NOT_SPEADING'
                            })                           
                            dispatch({
                                type: 'CHANGE_PAGE',
                                page: 1
                            })
                            getPayments(false, 1)

                        }} type='primary'>Ver pagos</Button>
                        </> 
                        :<>
                        <Button style={{marginRight:'10px'}} onClick={()=> {                            
                            getPayments(state.is_speding, 1)
                        }} type='primary'>Actualizar</Button>
                        <Button onClick={()=> {                            
                            dispatch({
                                type:'IS_SPEADING'
                            })
                            dispatch({
                                type: 'CHANGE_PAGE',
                                page: 1
                            })
                            getPayments(true, 1)
                        }} type='primary'>Ver costos</Button>    
                        </>
                    }
                </Col>

            </Row>)
        }}
        bordered
        dataSource={state.payments}        
        pagination={{
            total:state.count,
            current: state.page,
            onChange: (x)=> {
                dispatch({
                    type: 'CHANGE_PAGE',
                    page: x
                })
                getPayments(state.is_speding, x)
            }           
            
        }}
        />
        </>
    )
}


const styles = {
    colBtn: {
        textAlign: 'right'
    }
}


export default ListPayments
