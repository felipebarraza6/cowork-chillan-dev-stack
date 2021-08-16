import React, { useState } from 'react'

import { Col, Row, Input, Tag,
        Form, Button, Typography,
        Select, notification } from 'antd'
import {geo} from './geo'

const {Item:ItemForm} = Form
const {TextArea}=Input
const {Text}=Typography
const {Option}=Select


const SocialImpact = () => {

    const initialState = {
        ethnicityPartners: [],
        ethnicityWorkers: [],
        immigrantsWorkers: [],
        workersDifferentCapacities: [],
        vendors: [],
        str_region: '',
        str_province: '',
        str_commune: '',
        porcent_vendors: 0,
        sum_porcent_vendors: 0,

        input_quantity_ethnicityPartners: 0,
        input_str_ethnicityPartners: '', 
        
        input_quatity_ethnicityWorkers: 0,
        input_str_ethnicityWorkers: '', 

        input_quatity_inmigrantWorkers: 0,
        input_str_inmigrantWorkers: '', 

        input_quatity_differentCapacities: 0,
        input_str_differentCapacities: '', 
    }

    const [state, setState] = useState(initialState)

    const [geography, setGeography] = useState({
        region: [],
        province: [],
        id_region: null,
        commune: [],        
    })

    const [patners, setPartners] = useState({
        totalPatners: 0,
        womanPartners: 0,
        inmigrantPartners: 0,
        patenrsMargins: 0,
        patenrsEthnicity: 0
    })

    const [workers, setWorkers] = useState({
        totalWorkers: 0,
        womanWorkers: 0,
        marginWokers: 0,
        ethnicityWorkers: 0,
        inmigrantsWorkers: 0,
        wokersCapacities: 0
    })

    console.log(state)

    return(
        <Form layout={'vertical'} >
            <Row>
                <Col span={24}>
                    <h1>Socios</h1>
                </Col> 
                <Col span={4}>
                    <Form.Item label='Número de socios de la empresa'>
                        <Input type='number' style={{width:'200px'}} onChange = {(e)=> setPartners({...patners, totalPatners: parseInt(e.target.value)})} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Número de socias mujeres'>
                        <Input type='number' style={{width:'200px'}} onChange = {(e)=> {
                            if(patners.totalPatners < e.target.value){
                                notification.error({message:'La cantidad debe ser menor al total de socios'})
                            }else{
                                setPartners({
                                    ...patners, 
                                    womanPartners: parseInt(e.target.value)
                                })
                            }}
                            } />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Número de socios inmigrantes'>
                        <Input type='number' style={{width:'200px'}} onChange = {(e)=> {
                            if(patners.totalPatners < e.target.value){
                                notification.error({message:'La cantidad debe ser menor al total de socios'})
                            }else{
                                setPartners({
                                    ...patners, 
                                    inmigrantPartners: parseInt(e.target.value)
                                })
                            }
                        }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label='Número de soci@s que se consideren marginados socialmente'>
                        <Input type='number' style={{width:'200px'}} onChange = {(e)=> {
                            if(patners.totalPatners < e.target.value){
                                notification.error({message:'La cantidad debe ser menor al total de socios'})
                            }else{
                                setPartners({
                                    ...patners, 
                                    patenrsMargins: parseInt(e.target.value)
                                })
                            }
                        }} />
                    </Form.Item>
                </Col>
                <Col span={8}>                    
                    <Form.Item label='Número de soci@s que pertenezcan a una etnia originaria(especifique) '>
                        <Row>
                            <Col span={24}>
                                <Input value={state.input_quantity_ethnicityPartners} 
                                    onChange={(e)=>{
                                        
                                        if(patners.totalPatners < e.target.value){
                                            notification.error({message:'La cantidad debe ser menor al total de socios'})
                                        }else{
                                            setState({...state, input_quantity_ethnicityPartners: e.target.value})
                                        }
                                    }
                                    }
                                    type='number' style={{width:'200px'}} />
                                <Input value={state.input_str_ethnicityPartners} 
                                    onChange={(e)=>setState({...state, input_str_ethnicityPartners: e.target.value})}
                                    placeholder='Etnia' style={{width:'200px'}} />
                            </Col>
                            <Col span={24}>
                                {state.ethnicityPartners.map((x)=> {
                                    return(<> {state.ethnicityPartners && 
                                        <Tag style={styles.tag} color={'green'}>
                                            {x.quantity} - {x.ethnicity}
                                        </Tag>
                                    } </>)
                                })}
                            </Col>
                            <Col span={24}>
                                <Button onClick={()=> {
                                    setState({...state, input_quantity_ethnicityPartners: 0, input_str_ethnicityPartners: '', ethnicityPartners: [...state.ethnicityPartners, {
                                        quantity: state.input_quantity_ethnicityPartners,
                                        ethnicity: state.input_str_ethnicityPartners
                                    }]})
                                }} type='primary' style={styles.btn}>Agregar</Button>
                                <Button onClick={()=> {
                                    setState({...state, ethnicityPartners: []})
                                }} type='primary' danger style={styles.btn}>Reiniciar</Button>
                            </Col>                                                    
                        </Row>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <h1>Trabajadores</h1>
                </Col>
                <Col span={4}>
                    <Form.Item label='Número de trabajadores totales.'>
                        <Input type='number' style={{width:'200px'}} onChange ={(e)=>{
                            setWorkers({...workers, totalWorkers: parseInt(e.target.value)})
                        }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Número de trabajadores mujeres.'>
                        <Input type='number' style={{width:'200px'}} onChange ={(e)=>{
                            if(workers.totalWorkers < e.target.value){
                               notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                            } else{
                                setWorkers({...workers, womanWorkers: parseInt(e.target.value)})
                            }                            
                        }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Número de trabajadores que se consideren marginados socialmente.'>
                        <Input type='number' style={{width:'200px'}} onChange ={(e)=>{
                            if(workers.totalWorkers < e.target.value){
                               notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                            } else{
                                setWorkers({...workers, marginWokers: parseInt(e.target.value)})
                            }                            
                        }} />
                    </Form.Item>
                </Col>
                </Row>                
            <Row style={{marginBottom:'30px'}}>
            <Col span={8}>
                    <Form.Item label='Número de trabajadores que pertenezcan a una etnia originaria (especifique cual).'>
                    <Row>
                            <Col span={24}>
                                <Input value={state.input_quatity_ethnicityWorkers} 
                                    onChange={(e)=>{
                                        if(workers.totalWorkers < e.target.value){
                                            notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                                         } else{
                                            setState({...state, input_quatity_ethnicityWorkers: e.target.value})
                                         }   
                                        
                                    }}                                      
                                    type='number' style={{width:'200px'}} />
                                <Input value={state.input_str_ethnicityWorkers} 
                                    onChange={(e)=>setState({...state, input_str_ethnicityWorkers: e.target.value})}
                                    placeholder='Etnia' style={{width:'200px'}} />
                            </Col>
                            <Col>
                                {state.ethnicityWorkers && <>
                                    {state.ethnicityWorkers.map((x)=> {
                                        return(
                                            <Tag style={styles.tag} color={'green'}>
                                            {x.quantity} - {x.ethnicity}
                                        </Tag>
                                        )
                                    })}
                                </>}
                            </Col>
                            <Col span={24}>
                                <Button onClick={()=>{
                                    setState({...state, 
                                        input_quatity_ethnicityWorkers: 0,
                                        input_str_ethnicityWorkers: '',
                                        ethnicityWorkers: [...state.ethnicityWorkers, {
                                            quantity: state.input_quatity_ethnicityWorkers,
                                            ethnicity: state.input_str_ethnicityWorkers
                                        }] 
                                    })
                                }} type='primary' style={styles.btn}>Agregar</Button>
                                <Button onClick={()=> {
                                    setState({...state, ethnicityWorkers: []})
                                }} type='primary' danger style={styles.btn}>Reiniciar</Button>
                            </Col>                        
                        </Row>
                   </Form.Item>
                </Col>
                <Col span={6} style={styles.col}>
                        <Row>
                            <Col span={24} style={{marginBottom:'10px'}}>
                                <Text>Número de trabajadores inmigrantes.</Text> 
                            </Col>
                            <Col>
                                <Input value={state.input_quatity_inmigrantWorkers} 
                                    onChange={(e)=>{
                                        if(workers.totalWorkers < e.target.value){
                                            notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                                         } else{
                                            setState({...state, input_quatity_inmigrantWorkers: e.target.value})
                                         }                                         
                                    }}
                                    type='number' placeholder='Cantidad' style={{width:'140px'}}/>    
                            </Col>
                            <Col>
                                <Input value={state.input_str_inmigrantWorkers} 
                                    onChange={(e)=>setState({...state, input_str_inmigrantWorkers: e.target.value})} 
                                    type='text' placeholder='Pais' style={{width:'200px'}}/>    
                            </Col>       
                            <Col span={24}>
                                    {state.immigrantsWorkers && <>
                                        {state.immigrantsWorkers.map((x)=> {
                                            return(
                                                <Tag style={styles.tag} color={'green'}>
                                            {x.quantity} - {x.ethnicity}
                                        </Tag>                                                
                                            )
                                    })}
                                </>}
                            </Col>                     
                            <Col span={24}>
                                <Button onClick={()=>{
                                    setState({...state, 
                                        input_quatity_inmigrantWorkers: 0,
                                        input_str_inmigrantWorkers: '',
                                        immigrantsWorkers: [...state.immigrantsWorkers, {
                                            quantity: state.input_quatity_inmigrantWorkers,
                                            ethnicity: state.input_str_inmigrantWorkers
                                        }] 
                                    })
                                }}  style={styles.btn} type='primary' >Agregar</Button>
                                <Button onClick={()=> {
                                    setState({...state, immigrantsWorkers: []})
                                }} type='primary' danger style={styles.btn}>Reiniciar</Button>
                            </Col>
                            
                        </Row>
                </Col>
                <Col span={6} style={styles.col}>
                    <Row>
                        <Col span={24} style={{marginBottom:'10px'}}>
                            <Text>Número de trabajadores con capacidades diferentes.</Text>
                        </Col>
                        <Col>
                            <Input value={state.input_quatity_differentCapacities} 
                                onChange={(e)=>{                                    
                                    if(workers.totalWorkers < e.target.value){
                                        notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                                     } else{
                                        setState({...state, input_quatity_differentCapacities: e.target.value})
                                     }
                                }}
                                type='number' placeholder='Cantidad' style={{width:'140px'}}/>    
                        </Col>
                        <Col>
                            <Input value={state.input_str_differentCapacities} 
                                onChange={(e)=>setState({...state, input_str_differentCapacities: e.target.value})} 
                                type='text' placeholder='Descripcion' style={{width:'200px'}} />
                        </Col>
                        <Col span={24}>
                                    {state.workersDifferentCapacities && <>
                                        {state.workersDifferentCapacities.map((x)=> {
                                            return(
                                                <Tag style={styles.tag} color={'blue'}> {x.quantity} - {x.ethnicity} </Tag>
                                            )
                                    })}
                                </>}
                            </Col>
                        <Col span={24}>
                            <Button type='primary' onClick={()=>{
                                    setState({...state, 
                                        input_quatity_differentCapacities: 0,
                                        input_str_differentCapacities: '',
                                        workersDifferentCapacities: [...state.workersDifferentCapacities, {
                                            quantity: state.input_quatity_differentCapacities,
                                            ethnicity: state.input_str_differentCapacities
                                        }] 
                                    })
                                }} style={styles.btn}>Agregar</Button>
                                <Button onClick={()=> {
                                    setState({...state, workersDifferentCapacities: []})
                                }} type='primary' danger style={styles.btn}>Reiniciar</Button>
                        </Col>
                        
                    </Row>
                </Col>
                <Col span={12} style={{marginTop:'20px', marginBottom:'20px', paddingRight:'15px'}} >
                    <ItemForm label='Dónde se encuentran tus proveedores? Seleccina su region, comuna y provincia. Debes completar el 100%' name='vision'>
                        <Row>
                            <Col span={7}>
                                <p>Region</p>
                                <Select placeholder='Region' width='100px' value={state.str_region}  onSelect={(index, value) =>{                                
                                setState({...state, str_region: value.value})
                                setGeography({
                                    ...geography,
                                    province: geo[value.key].provincias,
                                    id_region: value.key,                                    
                                })
                            }}>
                                {geo.map((index, value) => <Option key={value} value={index.region}>{index.region}</Option>)}
                                </Select>
                            </Col>
                            <Col span={7}>
                                <p>Provincia</p>
                                <Select placeholder='Provincia' value={state.str_province} width='100px' onSelect={(index,value)=>{
                                setState({...state, str_province: value.value})
                                setGeography({
                                    ...geography,
                                    commune: geo[geography.id_region].provincias[value.key].comunas
                                })
                            }}>
                                {geography.province.map((value, index)=><Option key={index} value={value.name} >{value.name}</Option>)}
                                </Select>
                            </Col>
                            <Col span={7}>
                                <p>Comuna</p>
                                <Select placeholder='Comuna' value={state.str_commune} width='100px' onSelect={(index, value) => {
                                    setState({...state, str_commune: value.value})
                                }}>
                                {geography.commune.map((value, index)=><Option key={index} value={value.name} >{value.name}</Option>)}
                                </Select>
                            </Col>
                            <Col span={3}>
                                <p>%</p>
                                <Input value={state.porcent_vendors} placeholder='%' onChange={(e)=> setState({...state, porcent_vendors: parseInt(e.target.value)})} />
                            </Col>
                            <Col span={24}>
                                {state.vendors && <Row>
                                {state.vendors.map((x, index)=> {                                    
                                    return(<Col span={24}>            
                                        <Tag style={styles.tag} color={'magenta'} closable onClose={() => {                                            
                                            const elements = state.vendors.filter((x, i) => {console.log(x, i)})
                                            console.log(elements)
                                            setState({...state, sum_porcent_vendors: state.sum_porcent_vendors - x.porcent})                                                                                        
                                        }}>                                        
                                            {x.region} - {x.province} - {x.commune} ({x.porcent}%)
                                        </Tag>
                                    </Col>)
                                })}
                            <Col span={24} style={{top:'10px'}}>                                                                                     
                                TOTAL PORCENTAJE INGRESADO: {state.sum_porcent_vendors}%
                            </Col>
                            <Col span={24}>
                                <TextArea style={{marginTop:'15px'}} rows={4} placeholder='Agrega una descripcion y explicanos porque utilizas esos proveedores...' />
                            </Col>
                                </Row>}
                            </Col>                            
                            <Col span={24}>
                                <Button style={styles.btn} type='primary' disabled={state.sum_porcent_vendors >= 100} onClick={()=> {                                    
                                    setState({
                                        ...state,
                                        vendors: [...state.vendors, 
                                            { 
                                                region: state.str_region, 
                                                province: state.str_province,
                                                commune: state.str_commune,
                                                porcent: state.porcent_vendors
                                            }],
                                        str_region: '',
                                        str_commune: '',
                                        str_province: '',
                                        porcent_vendors: 0,
                                        sum_porcent_vendors: state.sum_porcent_vendors + state.porcent_vendors                                        
                                    })                                
                                }} >Agregar</Button>
                                <Button style={styles.btn} type='primary' onClick={()=> {
                                    setState({
                                        ...state,
                                        vendors: [],
                                        sum_porcent_vendors: 0                                       
                                    })
                                }} danger >Reiniciar</Button>
                            </Col>
                        </Row>                        
                    </ItemForm>
                </Col>
                <Col span={12} style={{marginTop:'20px', marginBottoma:'20px', paddingRight:'5px'}} name='values'>
                    <ItemForm label='Que actividades(talleres, cursos,  capacitaciones y entre otros) has realizado tu y/o tu equipo humano para mejorar sus capacidades (competencias y habilidades).'>
                        <TextArea rows='4' />
                    </ItemForm>
                </Col>
                <Col style={{textAlign: 'right'}} span={24} >
                    <Button type='primary'>Guardar</Button>
                </Col>
        </Row>
        </Form>

    )

}

const styles={
    col:{
        paddingRight:'5px'
    },
    btn: {
        marginTop:'10px', 
        marginLeft: '5px',
        marginRight:'5px'
    },
    tag: {
        marginTop:'10px'
    }
}

export default SocialImpact
