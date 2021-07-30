import React, { useState, useContext } from 'react'
import { Card, Col, Typography, 
        Select, Button } from 'antd'
import clients from '../../../api/clients/endpoints'
import { CreateContext } from './CreateMemberships'
const { Title } = Typography
const {Option} = Select 


const SelectClient = () => {

    const initialState = {
        is_client: null,
        is_business: null,
        list_clients: [],
        client_selected: null,
        client_data_selected:null,
    }

    const [local, setLocal] = useState(initialState)
    const { dispatch } = useContext(CreateContext)
    
    const getClients = async(value) => {
        try {
            const request = await clients.list_clients(1,'', '', value, '', true)
            setLocal({...local ,list_clients: request.results})
            return request
        }catch (error){
            console.log(error)
        }
    }

    const getBusiness = async(value) => {
        try {
            const request = await clients.list_business(1, '', value)
            setLocal({...local, list_clients: request.results})
            return request
        }catch (error){
            console.log(error)
        }
    }


    return(
        <>
            <Col span={12}>
            <Card hoverable 
                style={{ backgroundColor: local.is_client && '#1890ff' }}  
                onClick={()=>setLocal({...local, is_client:true, is_business:false})}>
                    <Title 
                        style={styles.title} 
                        level={3}>
                            persona</Title>    
            </Card>    
            </Col>
            <Col span={12}>
            <Card hoverable 
                style={{backgroundColor: local.is_business && '#1890ff'}}
                onClick={() =>setLocal({...local, is_business:true, is_client:false})}>
                    <Title style={styles.title} level={3}>empresa</Title>
            </Card>
            </Col>
            <Col>
            {local.is_client && 
                <Select 
                    placeholder="Buscar persona por rut..." 
                    style={{ width: 364, marginTop:'20px', marginBottom:'20px' }}                    
                    defaultActiveFirstOption={false}
                    onSelect={(index, obj) => {
                        setLocal({
                            ...local,
                            client_selected: obj.value,
                            client_data_selected: {
                                name: `${obj.children[0]} ${obj.children[2]}`,
                                dni: obj.children[4]
                            }
                        })
                    }}
                    showSearch
                    allowClear
                    filterOption={false}
                    onSearch={(value)=> getClients(value)}>
                    notFoundContent={null}
                    {local.list_clients.length > 0 && <>
                        {local.list_clients.map((obj)=>
                            <Option 
                                key={obj.id} 
                                value={obj.id}>
                                    {obj.first_name} {obj.surname} ({obj.dni})
                            </Option>)}
                        </>}
                </Select>}
            {local.is_business &&
                <Select
                    placeholder="Buscar empresa por rut..."
                    style={{ width: 364, marginTop:'20px', marginBottom:'20px' }} 
                    defaultActiveFirstOption={false}
                    onSelect={(index, obj) => {
                        console.log(obj)
                        setLocal({
                            ...local,
                            client_selected: obj.value,
                            client_data_selected: {
                                name: obj.children[0],
                                dni: obj.children[2]
                            }
                        })
                    }}
                    showSearch
                    allowClear
                    filterOption={false}
                    notFoundContent={null}
                    onSearch={(value)=> getBusiness(value)}>
                    {local.list_clients.map((obj)=>
                        <Option key={obj.id} value={obj.id}>
                            {obj.business_name} ({obj.dni_business})
                        </Option>
                    )}

                </Select>}
            </Col>
            <Col span={12}>
                {local.client_data_selected && <>
                    {local.client_data_selected.name} {local.client_data_selected.dni}</>}
            </Col>
            <Col span={12} style={{textAlign:'right', marginTop:'17px'}}>
                {local.client_selected && <>
                    <Button onClick={() => {
                        if(local.is_business){
                            dispatch({
                                type:'ADD_CLIENT',
                                client_selected: local.client_selected,
                                client_data_selected: local.client_data_selected,
                                is_enterprise: local.is_business,
                                is_person: false,
                                client_business: local.client_selected,
                                client_person: ''
                            })
                        } else{
                             dispatch({
                                type:'ADD_CLIENT',
                                client_selected: local.client_selected,
                                client_data_selected: local.client_data_selected,
                                is_person: local.is_client,
                                is_enterprise: false,
                                client_person: local.client_selected,
                                client_business: ''
                            })
                        }
                    }} type='primary'>confirmar</Button>
                    <Button 
                        type='primary' 
                        danger 
                        onClick={()=> {
                            setLocal({
                                ...local, 
                                client_selected: null, 
                                client_data_selected:{}, 
                                is_business: false, 
                                is_client: false
                            })
                            dispatch({
                                type:'REMOVE_CLIENT'
                            })
                        }}>
                            cancelar
                </Button></>}
            </Col>
        </>
    )
}


const styles = {
    title: {
        textAlign: 'center',
    }
}

export default SelectClient
