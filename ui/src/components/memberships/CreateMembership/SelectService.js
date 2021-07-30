import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import { CreateContext } from './CreateMemberships'
import { Row, Col, Select, 
        DatePicker, Card, Button } from 'antd'
import  services from '../../../api/services/endpoints'

const { Option } = Select

const SelectService = () => {

    const { dispatch } = useContext(CreateContext)

    const initialState = {
        selected_valoration: false,
        valoration: null,
        valoration_data: null,
        list_valorations: [],
        date_initial: null,
        disabled_date: true
    } 

    const [local, setLocal] = useState(initialState)

    const getValorations = async() => {
        try {
            const request = await services.valorations.list_valorations()
            setLocal({
                ...local,  
                list_valorations:request.results
            })
            return request
        } catch (error){
            console.log(error)
        }   
    }

    useEffect(() => {
        getValorations()
    }, [])


    return(<Row>
        <Col span={24}>
        <Select style={{width:'100%', marginTop:'5px', marginBottom:'5px'}} placeholder='Selecciona un servicio'
            onSelect={(value, index) => { 
                setLocal({
                    ...local, 
                    valoration: value, 
                    disabled_date: false, 
                    valoration_data: local.list_valorations[index.key]
                })
            }}>
                    {local.list_valorations.map((obj, index)=> {
                        return(<Option key={index} value={obj.id}>
                            {obj.get_service} - ${obj.price} {obj.note && <>- {obj.note}</>}
                        </Option>)
                    })}
            </Select>
        </Col>
        <Col span={24}>
            <DatePicker style={{width:'100%', marginTop:'5px', marginBottom:'5px'}} placeholder='Fecha de inicio' 
                disabled={local.disabled_date}
                format={'YYYY/MM/DD'}
        onChange={(value)=>setLocal({...local, date_initial: moment(value).format('YYYY-MM-DD'), selected_valoration: true})} />
        </Col>
        <Col span={24} style={{marginTop:'15px'}}>
                <Card title='Informacion seleccionada'>
        {local.selected_valoration  ? <>
                        <p>
                        Has seleccionado el servicio {local.valoration_data.get_service} el cual tiene una duracion de {local.valoration_data.duration}(DD-HH-MM-SS) con un valor de ${local.valoration_data.price}(CLP) por el mimso periodo.
                        </p>
                        <p>
                            La fecha de inicio seleccionada para comenzar la membresia es el dia {local.date_initial}(YYYY-MM)
                        </p>
                        <Col span={24}>
                            <Button type='primary' 
                                onClick={()=> dispatch({
                                    type:'ADD_VALORATION',
                                    date_initial: local.date_initial,
                                    valoration_selected: local.valoration,
                                    valoration_data_selected: local.valoration_data
                                })}>CONFIRMAR SELECCION</Button>
                        </Col>
                    </>:
                    <p>
                        Debes seleccionar el servicio(valorizacion) y fecha de inicio
                    </p>
        }
        </Card>
        </Col>
        </Row>)
}


export default SelectService
