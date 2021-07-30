import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd'
const { Title, Text }  = Typography

const ListIncidences = () => {

    const initialState = {
        page: 1,
        user: '',
        current: '',
        tasks: null
    }

    const [state, setState] = useState(initialState)


    return(<>
        <Table title={()=><Title level={4}>Tus insidencias</Title>}></Table>
    </>)

}


export default ListIncidences