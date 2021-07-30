import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Button, Tooltip, Input, Checkbox, Select } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { listFilterMemberships } from '../../actions/memberships/ListMemberships'
import { columns } from './columns'

const { Search } = Input
const { Option } = Select

const ListMemberships = ({ dataMemberships, dispatch }) => {

    const initialState   = {
        page: 1,
        loading: false,
        stringClient: '',
        stringBusiness: ''
    }

    const [state, setState] = useState(initialState)

    const filtersOptions = {
        is_finish: '',
        is_renovation: '',
        is_active: 'true',
        person_dni: '',
        business_dni: '',
        month: null
    }

    const [filters, setFilters] = useState(filtersOptions)
    const [for_business, setForBusiness] = useState(true)

    const getMemberships = (filters) => {
        setState({
            loading: true
        })
        listFilterMemberships(dispatch, filters).then((response)=>{
            setState({
                ...state,
                loading: false
            })
        })

    }

    const updateFilters = (filter='', status='') => {
        const update = setFilters({
            [filter]: status === 'true' ? '':!status  
        })

        return update
    }

    const strFilterUpdate = (str) => {
        if(for_business){
            setFilters({
                ...filters,
                business_dni: str
            })
        }else {
            setFilters({
                ...filters,
                person_dni: str
            })
        }
    }

    useEffect(() => {

        getMemberships(filters)

    }, [])
    

    return(
        <Table title={()=> {

            return(<Row>
                <Col span={24}>
                    <h3>Membresias</h3>
                </Col>
                <Col span={24} style={styles.textExtra}>
                <span style={{marginRight:'10px'}}>
                    AÑO
                </span>
                <Select style={{marginRight:'10px'}} 
                    placeholder={'Filtro por año...'} >
                    <Option>2021</Option>
                </Select>
                <span style={{marginRight:'10px'}}>
                MES:
                </span>
                <Select onChange={(value)=>setFilters({...filters, month:value})} style={{marginRight:'10px', width:'200px'}} 
                    placeholder={'Filtro por mes...'} >
                    <Option value={'01'} key='01'>Enero</Option>
                    <Option value={'02'}>Febrero</Option>
                    <Option value={'03'}>Marzo</Option>
                    <Option value={'04'}>Abril</Option>
                    <Option value={'05'}>Mayo</Option>
                    <Option value={'06'}>Junio</Option>
                    <Option value={'07'}>Julio</Option>
                    <Option value={'08'}>Agosto</Option>
                    <Option value={'09'}>Septiembnre</Option>
                    <Option value={'10'}>Octubre</Option>
                    <Option value={'11'}>Noviembre</Option>
                    <Option value={'12'}>Diciembre</Option>
                </Select>
                </Col>
                <Col span={24} style={styles.textExtra} >
                <Checkbox style={{marginRight:'10px'}} 
                    checked={for_business}
                    onChange={(e)=> setForBusiness(e.target.checked)}

                /> {for_business ? 'Rut por empresa' : 'Rut por persona'} 
                {for_business ? 
                    <Search 
                        size='middle' 
                        style={{ width: 200, marginRight:'10px', marginLeft:'10px' }}                        placeholder='Filtro por empresa' 
                        onBlur={(e)=>strFilterUpdate(e.target.value)}
                        />:
                    <Search 
                        size='middle' 
                        style={{ width: 200, marginRight:'10px', marginLeft:'10px' }}                        placeholder='Filtro por persona'
                        onChange={(e)=>console.log(e.target.value)}
                        onBlur={(e)=>strFilterUpdate(e.target.value)}
                        /> 
                }
                
                <Button type={filters.is_active && 'primary'} 
                    onClick={()=> { 
                        updateFilters('is_active', filters.is_active)
                    }} 
                    style={styles.btn} >ACTIVAS</Button>

                <Button type={filters.is_finish && 'primary'} 

                    onClick={()=>{
                        updateFilters('is_finish', filters.is_finish)
                    }}
                    style={styles.btn} >FINALIZADAS</Button>

                <Button type={filters.is_renovation && 'primary'}
                    onClick={()=>{
                        updateFilters('is_renovation', filters.is_renovation)
                    }}
                    style={styles.btn} >RENOVACIONES</Button>
                <Tooltip title='Aplicar cambios' color='geekblue'>                
                    <Button shape='round' style={styles.btnFilter} type='primary'
                        onClick={()=> getMemberships(filters)}
                    >
                        <ReloadOutlined />
                        Actualizar
                    </Button> 
                </Tooltip>
                </Col>
                </Row>)
            }}
            dataSource={dataMemberships}
            rowKey='id'
            columns={columns}
            loading={state.loading}
        />
    )
}


const styles = {
    btnFilter: {
        marginTop:'10px'
    },
    textExtra: {
        textAlign: 'right',
        marginTop:'15px'
    },
    btn: {
        marginRight:'10px'
    },
    search: {
        width:'400'
    }
}


export default ListMemberships
