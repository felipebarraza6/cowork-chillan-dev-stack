import React from 'react'

import {Form, Input, Tabs, Row, Col, 
        Button,Checkbox} from 'antd'

import clients from '../../api/clients/endpoints'
import Sustainability from './Sustainability'
import EconomicImpact from './EconomicImpact'
import SocialImpact from './SocialImpact'
import EcologicImpact from './EcologicImpact'
import {FileProtectOutlined, DollarCircleFilled, 
    TeamOutlined, PictureOutlined, 
    CheckCircleOutlined} from '@ant-design/icons'

const { Item:ItemForm } = Form
const { TextArea } = Input
const { TabPane } = Tabs


const FormUpdate = ({ initial }) => {
    
    const [form] = Form.useForm()

    async function postData (values) {
        console.log(clients)
    }


    return (
        <>
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
        </>
    )
}

const styles = {
    col:{
        paddingRight:'10px',
        paddingLeft:'10px'
    }
}

export default FormUpdate
