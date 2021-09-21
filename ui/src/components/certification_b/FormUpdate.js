import React, { useReducer, createContext, useEffect } from 'react'

import {Row, Tabs, Col } from 'antd'

import Sustainability from './Sustainability'
import EconomicImpact from './EconomicImpact'
import SocialImpact from './SocialImpact'
import EcologicImpact from './EcologicImpact'
import YourNeeds from './YourNeeds'
import {FileProtectOutlined, DollarCircleFilled, 
    TeamOutlined, PictureOutlined } from '@ant-design/icons'
import { reducer } from '../../reducers/clients/certb'

export const FormContext = createContext()

const { TabPane } = Tabs


const FormUpdate = ({ initial }) => {
    
    const initialState = {}

    const [state, dispatch] = useReducer(reducer, initialState)

    
    useEffect(() =>{
        if(initial){
            dispatch({
                type: 'ADD',
                payload: initial
            })
        }
    },[])

    console.log(state)


    return (<FormContext.Provider value={{ state, dispatch}} >
        <Row>
            <Col offset={18}>
                <YourNeeds />
            </Col>
            <Col>            
            <Tabs>
                <TabPane key={1} tab={<span><FileProtectOutlined/>Sostenibilidad de tu negocios</span>}>                    
                   <Sustainability /> 
                </TabPane>
                <TabPane key={3} tab={<span><DollarCircleFilled/>Tu impacto económico</span>}>                    
                    <EconomicImpact />
                </TabPane>
                <TabPane key={4} tab={<span><TeamOutlined/>Tu impacto social</span>}>                    
                    <SocialImpact />
                </TabPane>
                <TabPane key={5} tab={<span><PictureOutlined/>Tu impacto ambiental</span>}>                    
                    <EcologicImpact /> 
                </TabPane>
            </Tabs>  
            </Col>
        </Row>
    </FormContext.Provider>)
}

const styles = {
    col:{
        paddingRight:'10px',
        paddingLeft:'10px'
    }
}

export default FormUpdate
