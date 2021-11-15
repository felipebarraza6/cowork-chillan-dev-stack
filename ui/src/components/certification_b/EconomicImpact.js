import React, { useState, useContext, useEffect } from 'react'
import { Col, Row, Input, 
        Button, Select,
        Checkbox, Typography, Tag,
        notification } from 'antd'
import { PlusCircleOutlined} from '@ant-design/icons'

import { FormContext } from './FormUpdate.js'
import clients from '../../api/clients/endpoints'
import ModalLinkedYou from './ModalLinkedYou'

const { TextArea } = Input
const { Text, Paragraph } = Typography

const EconomicImpact = () => {

    
    
    const { state } = useContext(FormContext)
    console.log(state)
    const initialField = {
        isMicro: false,
        isSmall: false,
        isMedium: false,
        isBig: false,
        isSelectOption: false,
        isWorkersBenefited: false,
        numberWorkersBenefited: 0,
        isProtectionLaw: false,
        hasLinkedYou: false,
        protectionLaw: '',
        isEconomicHelp: false,
        economicsHelps: '',
        linked_enterprises: [],
        listYears: [],
        txtYear: '',
        txtAmount: '',
        selectCalculate: false,
        valueCalculate1: '',
        valueNumberCal1: 0,
        valueCalculate2: '',
        valueNumberCal2: 0, 
    }

    const [field, setField] = useState(initialField)

    const  initialData = {
        accumulated_sales: null, 
        previust_costs: null, 
        mypyme_single_entry: state.mypyme_single_entry, 
        workers_subsidy: null,
        workers_employment_law: null, 
        benefits_financial_aid: null, 
        linked_entrepreneur: null, 
        linked_enterprises: [],
        years_payment_vat: []
    }
    const [data, setData] = useState(initialData)


    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', //nullarador para los decimales
        formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft +splitRight;
        },
        new:function(num, simbol){
        this.simbol = simbol ||'';
        return this.formatear(num);
        }
    }

    useEffect(() => {

        let yearsList = state.years_payment_vat                 
        let isworkersbenefited = false
        let isprotectionlaw = false
        let iseconomichelp = false
        let islinktoyou = false

        if(state.workers_subsidy){
            isworkersbenefited = true
        }
        if(state.workers_employment_law){
            isprotectionlaw = true
        }
        if(state.benefits_financial_aid){
            iseconomichelp = true   
        }
        if(state.linked_entrepreneur){
            islinktoyou = true
        }
        

        setField({
            ...field,
            listYears: yearsList, 
            isWorkersBenefited: isworkersbenefited,
            isProtectionLaw: isprotectionlaw,
            isEconomicHelp: iseconomichelp,
            hasLinkedYou: islinktoyou         
        })
        setData({...data, years_payment_vat: yearsList, linked_enterprises: state.linked_enterprises})

    }, [])
    
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


    return(
        <div>
            <Row>    
                <Col span={12} style={styles.col}>
                <div style={styles.container}>
                    <Paragraph>Categoría empresa: Ventas acumuladas al 31 dic del año anterior</Paragraph>
                    {state.accumulated_sales && 
                        <Row style={styles.rowTag}>
                            <Tag>{state.accumulated_sales}</Tag>
                        </Row>}
                        {!field.isSelectOption ?
                        <Select placeholder='Selecciona tu categoria...' style={{width:'300px'}} onSelect={(value)=>{
                            if(value==='is_micro'){
                                setField({
                                    ...field,
                                    isMicro: true,
                                    isSelectOption: true
                                })
                            }
                            if(value==='is_small'){
                                setField({
                                    ...field,
                                    isSmall: true,
                                    isSelectOption: true
                                })
                            }
                            if(value==='is_medium'){
                                setField({
                                    ...field,
                                    isMedium: true,
                                    isSelectOption: true
                                })
                            }
                            if(value==='is_big'){
                                setField({
                                    ...field,
                                    isBig: true,
                                    isSelectOption: true
                                })
                            }
                        }}>
                            <Select.Option value='is_micro'>
                                Micro
                            </Select.Option>
                            <Select.Option value='is_small' >
                                Pequeña
                            </Select.Option>
                            <Select.Option value='is_medium' >
                                Mediana
                            </Select.Option>
                            <Select.Option value='is_big'> 
                                Grande
                            </Select.Option>
                         </Select>:<Button type='primary' style={styles.btn} onClick={()=> setField({ 
                            ...field,
                            isMicro: false,
                            isSmall: false,
                            isMedium: false,
                            isBig: false,
                            isSelectOption: false 
                          })}>Limpiar seleccion</Button>}
                        {field.isMicro && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}} 
                                onChange={(value)=>setData({...data, accumulated_sales: value})} >
                                <Select.Option value='Micro: 0 - 480 UF'>0 - 480 UF</Select.Option>
                                <Select.Option value='Micro: 481 - 960 UF'>481 - 960 UF</Select.Option>
                                <Select.Option value='Micro: 961 - 1.440 UF'>961 - 1.440 UF</Select.Option>
                                <Select.Option value='Micro: 1.441 - 1.920 UF'>1.441 - 1.920 UF</Select.Option>
                                <Select.Option value='Micro: 1.291 - 2.400 UF'>1.921 - 2.400 UF</Select.Option>
                            </Select>
                        }
                        {field.isSmall && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}}
                                onChange={(value)=>setData({...data, accumulated_sales: value})} >
                                <Select.Option value='Pequeña: 2.401 - 5.000 UF'>2.401 - 5.000 UF</Select.Option>
                                <Select.Option value='Pequeña: 5.001 - 10.000 UF'>5.001 - 10.000 UF</Select.Option>
                                <Select.Option value='Pequeña: 10.001l - 15.000 UF'>10.001 - 15.000 UF</Select.Option>
                                <Select.Option value='Pequeña: 15.001 - 20.000 UF'>15.001 - 20.000 UF</Select.Option>
                                <Select.Option value='Pequeña: 20.001 - 25.000 UF'>20.001 - 25.000 UF</Select.Option>
                            </Select>
                        }
                        {field.isMedium && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}}
                                onChange={(value)=>setData({...data, accumulated_sales: value})} >
                                <Select.Option value='Mediana: 25.001 - 40.000 UF'>25.001 - 40.000 UF</Select.Option>
                                <Select.Option value='Mediana: 40.001 - 55.000 UF'>40.001 - 55.000 UF</Select.Option>
                                <Select.Option value='Mediana: 55.001 - 70.000 UF'>55.001 - 70.000 UF</Select.Option>
                                <Select.Option value='Mediana: 70.001 - 85.000 UF'>70.001 - 85.000 UF</Select.Option>
                                <Select.Option value='Mediana: 85.001 - 100.000 UF'>85.001 - 100.000 UF</Select.Option>
                            </Select>
                        }
                        {field.isBig && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}}
                                onChange={(value)=>setData({...data, accumulated_sales: value})} >
                                <Select.Option value='Grande: 100.000 UF'>100.000+ UF</Select.Option>
                            </Select>
                        }                         
                    </div>
                    <div style={styles.container}>
                        <Paragraph>Cuanto has gastado en costos fijos de oficiina antes de llegar a cowork?</Paragraph>
                        {state.previust_costs && 
                            <Row>
                                <Tag style={styles.rowTag}>{state.previust_costs}</Tag>
                            </Row>
                        }
                        <Select placeholder='Selecciona tu rango...' style={{width:'300px'}} 
                           onChange={(value)=>setData({...data, previust_costs: value})} >
                            <Select.Option value='$0 - $100.000'>
                                $0 - $100.000
                            </Select.Option>
                            <Select.Option value='$100.000 - $200.000'>
                                $100.000 - $200.000
                            </Select.Option>
                            <Select.Option value='$201.000 -  $300.000'>
                                $201.000 -  $300.000
                            </Select.Option>
                            <Select.Option value='$301.000  - $400.000'>
                                $301.000  - $400.000
                            </Select.Option>
                            <Select.Option value='$401.000 - (+)'>
                                $401.000 - (+)
                            </Select.Option>
                        </Select>
                    </div>
                    <div style={styles.container}>
                        <Paragraph>Mipyme es el único ingreso para la famila?</Paragraph>
                        <Checkbox checked={data.mypyme_single_entry} 
                            onChange={(e)=> setData({
                                ...data, 
                                mypyme_single_entry: true,

                            })} /> SI
                        <Checkbox checked={!data.mypyme_single_entry}
                            onChange={(e)=> setData({...data, mypyme_single_entry: false})} /> NO
                    </div>
                    <div style={styles.container}>
                        <Paragraph>Los trabajadores de la Mipyme han sido beneficiados de  subsidios</Paragraph>
                        <Checkbox onChange={(value)=>{
                            if(value.target.checked){
                                setField({
                                    ...field,
                                    isWorkersBenefited: true
                                })
                            }else{
                                setField({
                                    ...field,
                                    isWorkersBenefited: false
                                }) 
                            }
                        }} checked={field.isWorkersBenefited} /> SI
                        <Checkbox onChange={(e)=> {
                            setData({...data, workers_subsidy: ''})
                            setField({...field, isWorkersBenefited: false})
                        }} checked={!field.isWorkersBenefited} /> NO
                        {field.isWorkersBenefited && <Input style={styles.input} type='number' defaultValue={state.workers_subsidy} placeholder='Cuantos?' 
                            onChange={(e)=> setData({...data, workers_subsidy: e.target.value})}
                        />}
                    </div>
                    <div style={styles.container}>
                        <Paragraph>Tu empresa se a adscrito a la ley de protección del empleo</Paragraph>
                            <Checkbox onChange={(value)=>{
                                if(value.target.checked){
                                    setField({
                                        ...field,
                                        isProtectionLaw: true
                                    })
                                }else{
                                    setField({
                                        ...field,
                                        isProtectionLaw: false
                                    }) 
                                }
                            }} checked={field.isProtectionLaw} /> SI
                             <Checkbox onChange={(e)=> {
                                setData({...data, workers_employment_law: ''})
                                setField({...field, isProtectionLaw: false})
                                }} checked={!field.isProtectionLaw} /> NO
                            {field.isProtectionLaw && <Input style={styles.input} placeholder={'Describe cuales...'} 
                                defaultValue={state.workers_employment_law}
                                onChange={(e)=> setData({...data, workers_employment_law: e.target.value})} />}
                    </div>
                    <div style={styles.container}>
                        <Paragraph>
                            Que beneficios de subsidios o ayudas economicas has recibido, de que instituciones del estado(corfo, sercotec, entre otras...) EXPLIQUE CUALES
                        </Paragraph>
                        <Checkbox onChange={(value)=>{
                            if(value.target.checked){
                                setField({
                                    ...field,
                                    isEconomicHelp: true
                                })
                            }else{
                                setField({
                                    ...field,
                                    isEconomicHelp: false
                                }) 
                            }
                        }} checked={field.isEconomicHelp} /> SI
                         <Checkbox onChange={(e)=> {
                            setData({...data, benefits_financial_aid: ''})
                            setField({...field, isEconomicHelp: false})
                        }} checked={!field.isEconomicHelp} /> NO
                        {field.isEconomicHelp && <Input style={styles.input} placeholder={'Describe cuales...'} 
                            defaultValue={state.benefits_financial_aid}
                            onChange={(e)=> setData({...data, benefits_financial_aid: e.target.value})} />}
                    </div>
                </Col>
                <Col span={12} style={styles.col}>
                    <div style={styles.container}>
                    <Paragraph>¿Te has vinculado/trabajado con algún emprendimiento que participa de la comunidad Cowork Chillán a través de prestaciones de servicios, proyectos y/o negocios? De ser así, indícanos su nombre y cuéntanos que han logrado juntos (si es más de uno, por favor, expláyate todo lo que necesites)</Paragraph>                       
                        <Checkbox onChange={(value)=>{
                            if(value.target.checked){
                                setField({
                                    ...field,
                                    hasLinkedYou: true
                                })
                            }else{
                                setField({
                                    ...field,
                                    hasLinkedYou: false
                                }) 
                            }
                        }} checked={field.hasLinkedYou} /> Si

                        <Checkbox onChange={(e)=> {
                            setData({...data, linked_entrepreneur:''})
                            setField({...field, hasLinkedYou: false})
                        }} checked={!field.hasLinkedYou} /> NO

                        {field.hasLinkedYou && <>
                            <ModalLinkedYou oldData={data} setEconomic={setData} />
                            <TextArea rows={4} defaultValue={state.linked_entrepreneur} style={styles.input} placeholder={'Describe...'} 
                                onChange={(e)=> setData({...data, linked_entrepreneur: e.target.value})}
                            />
                        </>}
                    </div>
                    <Text>ventas acumuladas por año (1 de enero al 31 de diciembre), debes incluir el año respectivo y el valor en pesos chilenos</Text>
                    <Row style={{marginTop:'10px', marginBottom:'20px'}}>                        
                                <Col span={6}>
                                    <Input placeholder='Año' onChange={(e)=>{
                                        setField({...field, txtYear:e.target.value})
                                    }} />
                                </Col>
                                <Col span={18}>
                                    <Input placeholder='Monto (CLP)' onChange={(e)=>setField({...field, txtAmount:e.target.value})} />
                                </Col>
                                <Col span={24}>
                                    {field.listYears && <>
                                    {field.listYears.map((x,index)=>{
                                        return(<Tag key={index} style={styles.tag} color={'gold'}> {x.slice(0,4)} - ${formatNumber.new(x.slice(6))} </Tag>)
                                    })}
                                    </>}
                        </Col>                                                        
                        <Col>
                            <Button style={{marginTop:'10px'}} icon={<PlusCircleOutlined />} onClick={(value)=> {
                                setField({
                                    ...field,
                                    listYears: [...field.listYears, `${field.txtYear} - ${field.txtAmount}`],
                                  })                                
                                setData({
                                    ...data,
                                    years_payment_vat: [...data.years_payment_vat, `${field.txtYear} - ${field.txtAmount}`]
                                })
                            }} type='primary' >Agregar año</Button>
                        </Col>
                        <Col>
                        <Button style={{marginTop:'10px'}} onClick={()=> {
                                setField({
                                    ...field,
                                    listYears: [],
                                    valueCalculate1: '',
                                    valueNumberCal1: 0,
                                    valueCalculate2: '',
                                    valueNumberCal2: 0
                                  })                                
                            }} type='primary' danger >Reiniciar</Button>
                        </Col>
                    </Row>
                    <Paragraph>
                        Calcula el promedio de ventas entre dos años distintos que quieras evaluar
                    </Paragraph>

                            <Row>
                                <Col span={12}>
                                    Elige el primer valor
                                    <Select placeholder='Selecciona un valor...' onChange={(value)=>setField({...field, valueCalculate1: value, valueNumberCal1: parseInt(value.slice(7))})}>
                                    {field.listYears && <>
                                    {field.listYears.map((x, index)=>{
                                        return(<Select.Option key={index} value={x}>{x.slice(0,4)} - ${formatNumber.new(x.slice(6))}</Select.Option>)
                                    })}</>}
                                    </Select>
                                </Col> 
                                <Col span={12}>
                                    Elige el segundo valor
                                    <Select placeholder='Selecciona un valor...' onChange={(value)=>setField({...field, valueCalculate2: value, valueNumberCal2: parseInt(value.slice(7))})}>
                                    {field.listYears && <>
                                    {field.listYears.map((x, index)=>{
                                        return(<Select.Option  key={index} value={x}>{x.slice(0,4)} - ${formatNumber.new(x.slice(6))}</Select.Option>)
                                    })}</>}
                                    </Select>
                                </Col>
                                <Col span={24}>
                                    {field.valueCalculate1 && field.valueCalculate2 ? <>
                                        <p style={{marginTop:'20px'}}>
                                        Se calculara: <Tag color={'gold'}>{field.valueCalculate1.slice(0,4)} - ${formatNumber.new(field.valueCalculate1.slice(7))} </Tag> y <Tag color={'gold'}>{field.valueCalculate2.slice(0,4)} - ${formatNumber.new(field.valueCalculate2.slice(7))}</Tag>
                                        </p>
                                        <p>
                                        Resultado: <Tag color={'gold'}>${formatNumber.new(Math.round((field.valueNumberCal1+field.valueNumberCal2)/2))}</Tag>
                                        </p>
                                    </>:'Selecciona los valores a calcular...' }
                                </Col>
                            </Row>
                </Col>        
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type='primary' onClick={()=> updateCertb(data)}>Guardar Impacto Economico</Button>
                </Col>
            </Row> 
        </div>
 
    )

}


const styles = {
    col: {
        paddingRight:'5px',
        paddingLeft:'5px'
    },
    btn: {
        marginRight: '10px'
    },
    input: {
        marginTop: '5px', marginBottom:'5px'
    },
    tag: {
        marginTop:'10px'
    },
    container: {
        margin: '20px 10px 20px 10px'
    },
    rowTag: {
        marginBottom: '10px'
    }
}


export default EconomicImpact
