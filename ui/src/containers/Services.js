import React, { useReducer, useEffect } from 'react'
import { Row, Col, Typography } from 'antd'
import { reducer } from '../reducers/services/reducer'

import TableContent from '../components/services/TableContents'

import { getCategories } from '../actions/services/services_categories'
import { getServices } from '../actions/services/services_manager'
import { columnsCategories, columnsServices } from '../components/services/columns'

import FormCategories from '../components/services/FormCategories'
import FormServices from '../components/services/FormServices'

const { Title } = Typography


const Services = () => {
    
    const initialState = {
        categories:null,
        page_categories: 1,
        services: null,
        page_services: 1,
        valorations:null,
        page_valorations: 1,
        loading: false,
        update_data:null,
        reload_services: true
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(()=> {

        if(state){
            getCategories(dispatch, state.page_categories)
            getServices(dispatch, state.page_services)
        }        

    },[])

    return (
        <React.Fragment>
            <Row>
                <Col span={6}>
                    <Title level={4}>Categorias</Title>
                    <FormCategories dispatch={dispatch} />
                    <TableContent 
                        title='Listado de categorias' 
                        columns={columnsCategories(dispatch)} 
                        data={state.categories} 
                        loading={state.loading} />
                </Col>
                <Col span={18} style={styles.col}>
                    <Title level={4}>Servicios</Title>  
                    {state.reload_services && 
                        <FormServices dispatch={dispatch} types_categories={state.categories} initial_data={state.update_data} state={state} />          
                    }
                    {state.services && 
                    <TableContent 
                        title='Listado de servicios'
                        columns={columnsServices(dispatch, state)}
                        data={state.services} 
                        loading={state.loading} />        
                    }
                </Col>                
            </Row>        
        </React.Fragment>
    )
}

const styles = {
    col: {
        paddingLeft:'2px'
    }
}


export default Services
