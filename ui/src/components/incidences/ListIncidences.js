import React, { useState, useEffect, useContext } from 'react'
import { Table, Typography } from 'antd'
import { getIncidences } from '../../actions/incidences/ActionInsdicences'
import {AuthContext} from '../../App'
const { Title, Text }  = Typography

const ListIncidences = () => {

    const { state:userContext } = useContext(AuthContext)

    const initialState = {
        page: 1,
        user: userContext.user.id,
        operator: '',
        tasks: []
    }

    const [state, setState] = useState(initialState)
    console.log(state)

    const columns = [
        {
            title: 'Nota',
            dataIndex: 'message',
            key: 'message',
          },
    ]

    useEffect(() =>{
        async function GetInsidences(){
            const request = await getIncidences(state, setState)
            console.log(request)
            
        }

        GetInsidences()
        
    }, [])

    return(<>
        <Table columns={columns} dataSource={state.tasks} title={()=><Title level={4}>Tus insidencias</Title>}></Table>
    </>)

}


export default ListIncidences