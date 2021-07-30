import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd'
import { getIncidences } from '../../actions/incidences/ActionInsdicences'
const { Title, Text }  = Typography

const ListIncidences = () => {

    const initialState = {
        page: 1,
        user: '',
        current: '',
        tasks: null
    }

    const [state, setState] = useState(initialState)
    console.log(state)

    useEffect(() =>{
        async function GetInsidences(){
            const request = await getIncidences(state, setState)
            console.log(request)
            
        }

        GetInsidences()
        
    }, [])

    return(<>
        <Table title={()=><Title level={4}>Tus insidencias</Title>}></Table>
    </>)

}


export default ListIncidences