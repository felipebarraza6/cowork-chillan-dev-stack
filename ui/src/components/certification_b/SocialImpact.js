import React, { useState, useContext, useEffect } from 'react'

import { Col, Row, Input, Tag,
        Form, Button, Typography,
        Select, notification } from 'antd'
import { geo } from './geo'
import { FormContext } from './FormUpdate'
import clients from '../../api/clients/endpoints'

const {Item:ItemForm} = Form
const {TextArea}=Input
const {Text, Paragraph}=Typography
const {Option}=Select


const SocialImpact = () => {

    const { state } = useContext(FormContext)
    console.log(state)

    const initialField = {
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

    const initialData = {
        total_partners: null,        
        woman_partners: null,
        inmigrant_partners: null,
        marginal_partners: null,
        partners_etnia: null,
        total_workers: null,
        woman_workers: null,
        marginal_workers: null,
        workers_etnia: null,
        workers_inmigrant: null,
        workers_diferent: null,
        vendors_list: null,
        vendors_description: null,
        performed_activities: null
    }

    const [field, setField] = useState(initialField)
    const [data, setData] = useState(initialData)

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

    

    console.log(field)
    console.log(data)

    const updateCertb = async(data) => {
        let validated_data = {}

        for (var [key, value] of Object.entries(data)) {
            if(value != null){
                validated_data[key] = value
            }
            
        }
        
        try {
            const request = await clients.update_profileb(state.id, validated_data)
            notification.success({message:'DATOS ACTUALIZADOS, EN EL PROXIMO INGRESO VERAS LOS CAMBIOS'})
            return request
        }catch(e) {
            notification.error({message: 'ERROR AL ACTUALIZAR TUS DATOS CONTACTA AL ADMINISTRADOR'})
        }
    }

    useEffect(() => {
        setField({
            ...field,  
            ethnicityPartners: state.partners_etnia,
            ethnicityWorkers: state.workers_etnia,
            immigrantsWorkers: state.workers_inmigrant,
            workersDifferentCapacities: state.workers_diferent,
            vendors: state.vendors_list,            
        })
        setWorkers({
            ...workers,
            totalWorkers: state.total_workers
        })
        setPartners({
           ...patners,
           totalPatners: state.total_partners,
           womanPartners: state.total_partners 
        })
    }, [])
    return(
        <Form layout={'vertical'} >
            <Row>
                <Col span={24}>
                    <h1>Socios</h1>
                </Col> 
                <Col span={4} style={{margin:'10px'}}>
                    <Paragraph> Número de socios de la empresa</Paragraph>                    
                    <Input type='number' style={{width:'200px'}} defaultValue={state.total_partners}
                        onChange = {(e)=> {
                            setPartners({
                                ...patners, 
                                totalPatners: parseInt(e.target.value)
                            })
                            setData({...data, total_partners: parseInt(e.target.value)})
                        }
                        } />
                    
                </Col>
                <Col span={4} style={{margin:'10px'}}>
                    <Paragraph>Número de socias mujeres</Paragraph>
                        <Input type='number' defaultValue={state.woman_partners} style={{width:'200px'}} onChange = {(e)=> {
                            if(patners.totalPatners < e.target.value){
                                notification.error({message:'La cantidad debe ser menor al total de socios'})
                            }else{
                                setPartners({
                                    ...patners, 
                                    womanPartners: parseInt(e.target.value)
                                })
                                setData({...data, woman_partners: parseInt(e.target.value)})
                            }}
                            } />                    
                </Col>
                <Col span={4} style={{margin:'10px'}}>
                    <Paragraph>Número de socios inmigrantes</Paragraph>
                        <Input type='number' defaultValue={state.inmigrant_partners} style={{width:'200px'}} onChange = {(e)=> {
                            if(patners.totalPatners < e.target.value){
                                notification.error({message:'La cantidad debe ser menor al total de socios'})
                            }else{
                                setPartners({
                                    ...patners, 
                                    inmigrantPartners: parseInt(e.target.value)
                                })
                                setData({...data, inmigrant_partners: parseInt(e.target.value)})
                            }
                        }} />                    
                </Col>
                <Col span={8} style={{margin:'10px'}}>
                    <Paragraph>Número de soci@s que se consideren marginados socialmente</Paragraph>
                        <Input type='number' defaultValue={state.marginal_partners} style={{width:'200px'}} onChange = {(e)=> {
                            if(patners.totalPatners < e.target.value){
                                notification.error({message:'La cantidad debe ser menor al total de socios'})
                            }else{
                                setPartners({
                                    ...patners, 
                                    patenrsMargins: parseInt(e.target.value)
                                })
                                setData({...data, marginal_partners: parseInt(e.target.value)})
                            }
                        }} />                    
                </Col>
                <Col span={8} style={{margin:'10px'}}>                    
                    <Form.Item label='Número de soci@s que pertenezcan a una etnia originaria(especifique) '>
                        <Row>
                            <Col span={24}>
                                <Input value={field.input_quantity_ethnicityPartners} 
                                    onChange={(e)=>{
                                        
                                        if(patners.totalPatners < e.target.value){
                                            notification.error({message:'La cantidad debe ser menor al total de socios'})
                                        }else{
                                            setField({...field, input_quantity_ethnicityPartners: e.target.value})
                                        }
                                    }
                                    }
                                    type='number' style={{width:'200px'}} />
                                <Input value={field.input_str_ethnicityPartners} 
                                    onChange={(e)=>setField({...field, input_str_ethnicityPartners: e.target.value})}
                                    placeholder='Etnia' style={{width:'200px'}} />
                            </Col>
                            <Col span={24}>
                                {field.ethnicityPartners && <> 
                                    {field.ethnicityPartners.map((x, index)=> {                                    
                                            return(<> {field.ethnicityPartners && 
                                                <Tag style={styles.tag} key={index} color={'green'}>
                                                    {x.quantity} - {x.ethnicity}
                                                </Tag>
                                            } </>)                                                                       
                                    })}
                                 </>}
                                
                            </Col>
                            <Col span={24}>
                                <Button onClick={()=> {
                                    setField({
                                        ...field, 
                                        input_quantity_ethnicityPartners: 0, 
                                        input_str_ethnicityPartners: '', 
                                        ethnicityPartners: [...field.ethnicityPartners, {
                                            quantity: field.input_quantity_ethnicityPartners,
                                            ethnicity: field.input_str_ethnicityPartners
                                    }]
                                })
                                    setData({
                                        ...data,
                                        partners_etnia: [...field.ethnicityPartners, {
                                            quantity: field.input_quantity_ethnicityPartners,
                                            ethnicity: field.input_str_ethnicityPartners
                                    }]
                                    })
                                }} type='primary' style={styles.btn}>Agregar</Button>
                                <Button onClick={()=> {
                                    setField({...field, ethnicityPartners: []})
                                    setData({...data, partners_etnia: []})
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
                <Col span={4} style={{margin:'10px'}}>
                    <Paragraph>Número de trabajadores totales</Paragraph>
                        <Input type='number' style={{width:'200px'}} defaultValue={state.total_workers} onChange ={(e)=>{
                            setWorkers({...workers, totalWorkers: parseInt(e.target.value)})
                            setData({...data, total_workers: parseInt(e.target.value)})
                        }} />                    
                </Col>
                <Col span={4} style={{margin:'10px'}}>
                    <Form.Item label='Número de trabajadores mujeres.'>
                        <Input type='number' defaultValue={state.woman_workers} style={{width:'200px'}} onChange ={(e)=>{
                            if(workers.totalWorkers < e.target.value){
                               notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                            } else{
                                setWorkers({...workers, womanWorkers: parseInt(e.target.value)})
                                setData({...data, woman_workers: parseInt(e.target.value)})
                            }                            
                        }} />
                    </Form.Item>
                </Col>
                <Col span={4} style={{margin:'10px'}}>
                    <Form.Item label='Número de trabajadores que se consideren marginados socialmente.'>
                        <Input defaultValue={state.marginal_workers} type='number' style={{width:'200px'}} onChange ={(e)=>{
                            if(workers.totalWorkers < e.target.value){
                               notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                            } else{
                                setWorkers({...workers, marginWokers: parseInt(e.target.value)})                                
                                setData({...data, marginal_workers: parseInt(e.target.value)})
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
                                <Input value={field.input_quatity_ethnicityWorkers} 
                                    onChange={(e)=>{
                                        if(workers.totalWorkers < e.target.value){
                                            notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                                         } else{
                                            setField({...field, input_quatity_ethnicityWorkers: e.target.value})
                                            
                                         }   
                                        
                                    }}                                      
                                    type='number' style={{width:'200px'}} />
                                <Input value={field.input_str_ethnicityWorkers} 
                                    onChange={(e)=>setField({...field, input_str_ethnicityWorkers: e.target.value})}
                                    placeholder='Etnia' style={{width:'200px'}} />
                            </Col>
                            <Col>
                                {field.ethnicityWorkers && <>
                                    {field.ethnicityWorkers.map((x, index)=> {
                                        return(
                                            <Tag key={index} style={styles.tag} color={'green'}>
                                            {x.quantity} - {x.ethnicity}
                                        </Tag>
                                        )
                                    })}
                                </>}
                            </Col>
                            <Col span={24}>
                                <Button onClick={()=>{
                                    setField({...field, 
                                        input_quatity_ethnicityWorkers: 0,
                                        input_str_ethnicityWorkers: '',
                                        ethnicityWorkers: [...field.ethnicityWorkers, {
                                            quantity: field.input_quatity_ethnicityWorkers,
                                            ethnicity: field.input_str_ethnicityWorkers
                                        }] 
                                    })
                                    setData({
                                        ...data,
                                        workers_etnia: [...field.ethnicityWorkers, {
                                            quantity: field.input_quatity_ethnicityWorkers,
                                            ethnicity: field.input_str_ethnicityWorkers
                                    }]
                                    })
                                }} type='primary' style={styles.btn}>Agregar</Button>
                                <Button onClick={()=> {
                                    setField({...field, ethnicityWorkers: []})
                                    setData({
                                        ...data,
                                        workers_etnia: []
                                    })
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
                                <Input value={field.input_quatity_inmigrantWorkers} 
                                    onChange={(e)=>{
                                        if(workers.totalWorkers < e.target.value){
                                            notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                                         } else{
                                            setField({...field, input_quatity_inmigrantWorkers: e.target.value})                                            
                                         }                                         
                                    }}
                                    type='number' placeholder='Cantidad' style={{width:'140px'}}/>    
                            </Col>
                            <Col>
                                <Input value={field.input_str_inmigrantWorkers} 
                                    onChange={(e)=>setField({...field, input_str_inmigrantWorkers: e.target.value})} 
                                    type='text' placeholder='Pais' style={{width:'200px'}}/>    
                            </Col>       
                            <Col span={24}>
                                    {field.immigrantsWorkers && <>
                                        {field.immigrantsWorkers.map((x, index)=> {
                                            return(
                                                <Tag key={index} style={styles.tag} color={'green'}>
                                            {x.quantity} - {x.ethnicity}
                                        </Tag>                                                
                                            )
                                    })}
                                </>}
                            </Col>                     
                            <Col span={24}>
                                <Button onClick={()=>{
                                    setField({...field, 
                                        input_quatity_inmigrantWorkers: 0,
                                        input_str_inmigrantWorkers: '',
                                        immigrantsWorkers: [...field.immigrantsWorkers, {
                                            quantity: field.input_quatity_inmigrantWorkers,
                                            ethnicity: field.input_str_inmigrantWorkers
                                        }] 
                                    })
                                    setData({...data,
                                        workers_inmigrant: [...field.immigrantsWorkers, {
                                            quantity: field.input_quatity_inmigrantWorkers,
                                            ethnicity: field.input_str_inmigrantWorkers
                                        }] 
                                    })
                                }}  style={styles.btn} type='primary' >Agregar</Button>
                                <Button onClick={()=> {
                                    setField({...field, immigrantsWorkers: []})
                                    setData({
                                        ...data,
                                        workers_inmigrant: []
                                    })
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
                            <Input value={field.input_quatity_differentCapacities} 
                                onChange={(e)=>{                                    
                                    if(workers.totalWorkers < e.target.value){
                                        notification.error({message: 'No puede superar el total de trabajadores ingresado'}) 
                                     } else{
                                        setField({...field, input_quatity_differentCapacities: e.target.value})
                                     }
                                }}
                                type='number' placeholder='Cantidad' style={{width:'140px'}}/>    
                        </Col>
                        <Col>
                            <Input value={field.input_str_differentCapacities} 
                                onChange={(e)=>setField({...field, input_str_differentCapacities: e.target.value})} 
                                type='text' placeholder='Descripcion' style={{width:'200px'}} />
                        </Col>
                        <Col span={24}>
                                    {field.workersDifferentCapacities && <>
                                        {field.workersDifferentCapacities.map((x, index)=> {
                                            return(
                                                <Tag key={index} style={styles.tag} color={'blue'}> {x.quantity} - {x.ethnicity} </Tag>
                                            )
                                    })}
                                </>}
                            </Col>
                        <Col span={24}>
                            <Button type='primary' onClick={()=>{
                                    setField({...field, 
                                        input_quatity_differentCapacities: 0,
                                        input_str_differentCapacities: '',
                                        workersDifferentCapacities: [...field.workersDifferentCapacities, {
                                            quantity: field.input_quatity_differentCapacities,
                                            ethnicity: field.input_str_differentCapacities
                                        }] 
                                    })
                                    setData({...data,
                                        workers_diferent: [...field.workersDifferentCapacities, {
                                            quantity: field.input_quatity_differentCapacities,
                                            ethnicity: field.input_str_differentCapacities
                                        }] 
                                    })
                                }} style={styles.btn}>Agregar</Button>
                                <Button onClick={()=> {
                                    setField({...field, workersDifferentCapacities: []})
                                    setData({...data,
                                        workers_diferent: [] 
                                    })
                                }} type='primary' danger style={styles.btn}>Reiniciar</Button>
                        </Col>
                        
                    </Row>
                </Col>
                <Col span={12} style={{marginTop:'20px', marginBottom:'20px', paddingRight:'15px'}} >
                    <Paragraph>Dónde se encuentran tus proveedores? Seleccina su region, comuna y provincia. Debes completar el 100%</Paragraph>
                        <Row>
                            <Col span={7}>
                                <p>Region</p>
                                <Select placeholder='Region' width='100px' value={field.str_region} style={{width:'200px'}} onSelect={(index, value) =>{                                
                                setField({...field, str_region: value.value})
                                
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
                                <Select placeholder='Provincia' value={field.str_province} style={{width:'200px'}} width='100px' onSelect={(index,value)=>{
                                setField({...field, str_province: value.value})
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
                                <Select placeholder='Comuna' value={field.str_commune} style={{width:'200px'}} onSelect={(index, value) => {
                                    setField({...field, str_commune: value.value})
                                }}>
                                {geography.commune.map((value, index)=><Option key={index} value={value.name} >{value.name}</Option>)}
                                </Select>
                            </Col>
                            <Col span={3}>
                                <p>%</p>
                                <Input value={field.porcent_vendors} placeholder='%' onChange={(e)=> setField({...field, porcent_vendors: parseInt(e.target.value)})} />
                            </Col>
                            <Col span={24}>
                                {field.vendors && <Row>
                                {field.vendors.map((x, index)=> {                                    
                                    return(<Col span={24}>            
                                        <Tag key={index} style={styles.tag} color={'magenta'} closable onClose={() => {                                            
                                            const elements = field.vendors.filter((x, i) => {console.log(x, i)})
                                            console.log(elements)
                                            setField({...field, sum_porcent_vendors: field.sum_porcent_vendors - x.porcent})                                                                                                                                    
                                        }}>                                        
                                            {x.region} - {x.province} - {x.commune} ({x.porcent}%)
                                        </Tag>
                                    </Col>)
                                })}
                            <Col span={24} style={{top:'10px', margin:'10px'}}>                                                                                     
                                TOTAL PORCENTAJE INGRESADO: {field.sum_porcent_vendors}%
                            </Col>
                            
                                </Row>}
                            </Col>                            
                            <Col span={24}>
                                <Button style={styles.btn} type='primary' disabled={field.sum_porcent_vendors >= 100} onClick={()=> {                                    
                                    setField({
                                        ...field,
                                        vendors: [...field.vendors, 
                                            { 
                                                region: field.str_region, 
                                                province: field.str_province,
                                                commune: field.str_commune,
                                                porcent: field.porcent_vendors
                                            }],
                                        str_region: '',
                                        str_commune: '',
                                        str_province: '',
                                        porcent_vendors: 0,
                                        sum_porcent_vendors: field.sum_porcent_vendors + field.porcent_vendors                                                                                
                                    })
                                    setData({
                                        ...data,
                                        vendors_list: [...field.vendors,  { 
                                            region: field.str_region, 
                                            province: field.str_province,
                                            commune: field.str_commune,
                                            porcent: field.porcent_vendors
                                        }]
                                    })                                
                                }} >Agregar</Button>
                                <Button style={styles.btn} type='primary' onClick={()=> {
                                    setField({
                                        ...field,
                                        vendors: [],
                                        sum_porcent_vendors: 0                                       
                                    })
                                    setData({
                                        ...data,
                                        vendors_list: []
                                    })
                                }} danger >Reiniciar</Button>
                            </Col>
                            <Col span={24}>
                                <TextArea  defaultValue={state.vendors_description} onChange={(e)=> {                                    
                                    setData({
                                        ...data,
                                        vendors_description: e.target.value 
                                    })                                    
                                }}
                                    style={{marginTop:'15px'}} rows={4} placeholder='Agrega una descripcion y explicanos porque utilizas esos proveedores...' />
                            </Col>
                        </Row>                                            
                </Col>
                <Col span={12} style={{marginTop:'20px', marginBottoma:'20px', paddingRight:'5px'}} name='values'>
                    <Paragraph>Que actividades(talleres, cursos,  capacitaciones y entre otros) has realizado tu y/o tu equipo humano para mejorar sus capacidades (competencias y habilidades)</Paragraph>
                        <TextArea rows='4' defaultValue={state.performed_activities} onChange={(e)=> {
                                    setData({
                                        ...data,
                                        performed_activities: e.target.value
                                    })                                    
                                }} />                
                </Col>
                <Col style={{textAlign: 'right'}} span={24} >
                    <Button type='primary' onClick={()=> updateCertb(data)}>Guardar Impacto Social</Button>
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
