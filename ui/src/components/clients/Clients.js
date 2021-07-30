import React, { useReducer, useEffect } from 'react'

//antd
import { Row, Col, Radio, Input, Tooltip } from 'antd'
import { BuildOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons'

//Componenet
import MasterTable from './MasterTable'


//FormsComponents
import FormBusiness from './FormBusiness'
import FormClients from './FormClients'

//Redcuer
import { reducer } from '../../reducers/clients/reducer'

//Actions
import { getClients, getBusiness } from '../../actions/clients/master_table'
import interfacesForm from '../../actions/clients/form_business_clients'

//Columns
import { columnsClients, columnsBusiness} from './columns'



const { Search } = Input

const Clients = () =>{

    const initialState = {
        data: null,
        page: 1,
        loading: false,
        totals: 0,
        
        filter_name: '',
        filter_last_name:'',
        filter_dni: '',

        form_business:true,
        legal_represent_create_enterprise: null,
        form_natural_person: false,
        form_legal_represent: false,
        create_represent: false,

        dni_business_legal_represent: null,

        natural_person:false,
        business:false,

        dataForm: null
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const paginationPerson = (page) =>{
        dispatch({type:'LOADING'})
        dispatch({
            type:'SET_PAGE',
            page: page
        })
        getClients(dispatch, page, state.filter_name, state.filter_last_name, state.filter_dni)
    }

    const paginationBusiness = (page) =>{
        dispatch({type:'LOADING'})
        dispatch({
            type:'SET_PAGE',
            page: page
        })
        getBusiness(dispatch, page)
    }


    useEffect(() => {                        
        
        getBusiness(dispatch, 1)
        
    }, [])

    return(
        <Row>
            <Col span={12}>
            <Row>
            <Radio.Group style={{marginBottom:'10px'}}>                
                <Radio.Button 
                    onClick={() => {
                        dispatch({
                            type:'SET_PAGE',
                            page:1
                        })

                        getBusiness(dispatch, 1)
                    }
                        
                        }
                >Empresas
                </Radio.Button>
                <Radio.Button 
                    onClick={() => {
                        dispatch({
                                type:'SET_PAGE',
                                page:1
                        })
                        getClients(dispatch, 1)}
                        }
                    >Personas
                </Radio.Button>
            </Radio.Group>
            </Row>
                {state.natural_person &&
                <>
                  <Row style={{marginBottom:'10px'}}>
                    <Search placeholder='Nombre' value={state.filter_name} style={{width:'200px' }}
                        onChange={(e)=>{
                            getClients(dispatch, 1, e.target.value, state.filter_last_name,state.filter_dni)
                        }}                                               
                    />
                    <Search placeholder='Apellido' value={state.filter_last_name} style={{marginLeft:'5px', width:'200px' }}
                        onChange={(e)=>{
                            getClients(dispatch, 1, state.filter_name, e.target.value, state.filter_dni)
                        }}                                               
                    />
                    
                    <Search placeholder='RUT' value={state.filter_dni} style={{marginLeft:'5px', width:'250px' }}
                        onChange={(e)=>{
                            getClients(dispatch, 1, state.filter_name, state.filter_last_name, e.target.value)
                        }}
                    />
                    </Row>
                    <MasterTable 
                        title={'PERSONAS'} 
                        icon={<UserOutlined style={{fontSize: '25px', marginRight:'10px'}}/>}
                        columns={columnsClients(dispatch, state)}
                        data={state.data}
                        loading={state.loading}
                        totals={state.totals}
                        page={state.page}
                        pagination={paginationPerson}
                    />
                </>
                }
                {state.business &&
                <>
                    <Row style={{marginBottom:'10px'}}>
                    <Search value={state.filter_name} placeholder='Nombre' style={{width:'280px' }}
                        onChange={(e)=>{
                            getBusiness(dispatch, state.page=1, e.target.value, state.filter_dni)
                        }}                                               
                    />
                    <Search value={state.filter_dni} placeholder='RUT' style={{marginLeft:'10px', width:'170px' }}
                        onChange={(e)=>{
                            getBusiness(dispatch, state.page=1, state.filter_name, e.target.value)
                        }}
                    />
                    </Row>
                    <MasterTable 
                        title={'EMPRESAS'}
                        icon={<BuildOutlined style={{fontSize: '25px', marginRight:'10px'}}/>}
                        columns={columnsBusiness(dispatch, state)}
                        data={state.data}
                        loading={state.loading}
                        page={state.page}
                        totals={state.totals}
                        pagination={paginationBusiness}
                    />
                </>
                }
            </Col>
            <Col span={12} style={{textAlign:'right'}}>
            <Radio.Group style={{marginBottom:'10px', marginRight:'25px'}} buttonStyle="solid">
                <Tooltip title="Crea una nueva empresa">
                    <Radio.Button onClick={ () => {                        
                        interfacesForm.activeFormBusiness(dispatch)                    
                    }}>
                        <PlusOutlined /> Empresa
                    </Radio.Button>
                </Tooltip>
                <Tooltip title="Crea una nueva persona">
                    <Radio.Button onClick={() => {
                        interfacesForm.activeFormClients(dispatch)
                    }}>
                        <PlusOutlined /> Persona
                    </Radio.Button>               
                </Tooltip>
                             
            </Radio.Group>
                <Row>
                    <>
                    {state.form_business && 
                        <FormBusiness initial={state.dataForm} dispatch={dispatch} state={state} />
                    }
                    {state.form_natural_person &&
                        <FormClients initial={state.dataForm} is_represent={state.create_represent}
                        business={state.dni_business_legal_represent} dispatch={dispatch} state={state} />
                    }                    
                    </>
                </Row>            
            </Col>
        </Row>
    )
}

export default Clients
