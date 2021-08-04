import React, { useState, useEffect, useContext } from 'react'
import { Table, Typography, Button } from 'antd'
import { getIncidences, updateIncidence } from '../../actions/incidences/ActionInsdicences'
import {AuthContext} from '../../App'
import AnswerIncidence from './AnswerIncidence'
const { Title, Text, Paragraph }  = Typography

const ListIncidences = () => {

    const { state:userContext } = useContext(AuthContext)
    const userObj = userContext.user

    const initialState = {
        page: 1,
        user: userContext.user.id,        
        count: 0,
        tasks: []
    }

    const [state, setState] = useState(initialState)
    console.log(userObj)

    const columns = [
        {
            title: 'Operador',
            dataIndex: 'operator',
            key: 'operator',
            render: (obj) => {
                return(
                    <Text>{obj.email}</Text>
                )
            }
        },
        {
            title: 'Mensaje',
            dataIndex: 'message',
            key: 'message',
            render: (obj) => <Paragraph>{obj}</Paragraph>
          },
        {
            title: 'Respuesta',
            dataIndex: 'response',
            key: 'response',
            render: (obj) => <Paragraph>{obj}</Paragraph>
        },
        {
            title: 'Activo',
            render: (obj) => {
                if(obj.is_active) {
                    return(<h4>Activo</h4>)
                } else {
                    return(<h4>No</h4>)
                }                
            }
        },
        {
            title: 'Respondido',
            render: (obj) => {
                if(obj.is_response){
                    return(<h4>Respondido</h4>)
                }else{
                    return(<h4>No</h4>)
                }                
            }
        },
        {
            render: (obj) => {
                if(obj.is_active === true && obj.is_response === false) {
                    return(<Button 
                                onClick={()=> updateIncidence(state, setState, obj.id, {is_active:false}) } 
                                danger 
                                type='primary'>Cancelar</Button>)
                }
                
                if(obj.is_active === false){
                    return(<Button 
                        onClick={()=> updateIncidence(state, setState, obj.id, {is_active:true}) }                          
                        type='primary'>Activar</Button>)

                }
            }
        },
        {
            render: (obj)=> {
                if(userObj.type_user === 'A' && obj.is_response===false){
                    return(
                        <AnswerIncidence insidence={obj} state={state} setState={setState} />
                    )
                }
            }
        }
    ]

    async function GetInsidences(){
        const request = await getIncidences(state, setState)
        console.log(request)
    }

    useEffect(() =>{

        GetInsidences()
        
    }, [])

    return(<>
        <Table 
            columns={columns} 
            dataSource={state.tasks} 
            title={()=><Title level={4}>Tus insidencias</Title>}
            pagination={{
                total: state.count,
                onChange: (value)=> {
                    getIncidences({
                        page: value,
                        user: state.user,
                        count: state.count,
                        tasks: state.tasks
                    }, setState)
                }
            }} />
    </>)

}


export default ListIncidences