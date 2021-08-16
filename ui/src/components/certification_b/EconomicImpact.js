import React, { useState } from 'react'
import { Col, Row, Input, 
        Form, Button, Select,
        Checkbox, Typography, Tag } from 'antd'
import { PlusCircleOutlined} from '@ant-design/icons'

const {TextArea}=Input
const {Item:ItemForm}=Form
const {Text} = Typography

const EconomicImpact = () => {

    const initialState = {
        isMicro: false,
        isSmall: false,
        isMedium: false,
        isBig: false,
        isSelectOption: false,
        isWorkersBenefited: false,
        numberWorkersBenefited: 0,
        isProtectionLaw: false,
        protectionLaw: '',
        isEconomicHelp: false,
        economicsHelps: '',
        listYears: [],
        txtYear: '',
        txtAmount: '',
        selectCalculate: false,
        valueCalculate1: '',
        valueNumberCal1: 0,
        valueCalculate2: '',
        valueNumberCal2: 0, 
    }

    const [state, setState] = useState(initialState)
    console.log(state)

    const calculateValues = (val1,val2) => {
        const value1 = state.valueNumberCal1
        const value2 = state.valueNumberCal2
    }

    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
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

    return(
        <Form layout={'vertical'}>
            <Row>    
                <Col span={12} style={styles.col}>
                    <ItemForm label='Categoría empresa: Ventas acumuladas al 31 dic del año anterior' name='accumulated_salves'>
                        {!state.isSelectOption ?
                        <Select placeholder='Selecciona tu categoria...' style={{width:'300px'}} onSelect={(value)=>{
                            if(value==='is_micro'){
                                setState({
                                    ...state,
                                    isMicro: true,
                                    isSelectOption: true
                                })
                            }
                            if(value==='is_small'){
                                setState({
                                    ...state,
                                    isSmall: true,
                                    isSelectOption: true
                                })
                            }
                            if(value==='is_medium'){
                                setState({
                                    ...state,
                                    isMedium: true,
                                    isSelectOption: true
                                })
                            }
                            if(value==='is_big'){
                                setState({
                                    ...state,
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
                         </Select>:<Button type='primary' style={styles.btn} onClick={()=> setState({ 
                            ...state,
                            isMicro: false,
                            isSmall: false,
                            isMedium: false,
                            isBig: false,
                            isSelectOption: false 
                          })}>Limpiar seleccion</Button>}
                        {state.isMicro && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}} >
                                <Select.Option>0 - 480 UF</Select.Option>
                                <Select.Option>481 - 960 UF</Select.Option>
                                <Select.Option>961 - 1.440 UF</Select.Option>
                                <Select.Option>1.441 - 1.920 UF</Select.Option>
                                <Select.Option>1.921 - 2.400 UF</Select.Option>
                            </Select>
                        }
                        {state.isSmall && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}} >
                                <Select.Option>2.401 - 5.000 UF</Select.Option>
                                <Select.Option>5.001 - 10.000 UF</Select.Option>
                                <Select.Option>10.001 - 15.000 UF</Select.Option>
                                <Select.Option>15.001 - 20.000 UF</Select.Option>
                                <Select.Option>20.001 - 25.000 UF</Select.Option>
                            </Select>
                        }
                        {state.isMedium && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}} >
                                <Select.Option>25.001 - 40.000 UF</Select.Option>
                                <Select.Option>40.001 - 55.000 UF</Select.Option>
                                <Select.Option>55.001 - 70.000 UF</Select.Option>
                                <Select.Option>70.001 - 85.000 UF</Select.Option>
                                <Select.Option>85.001 - 100.000 UF</Select.Option>
                            </Select>
                        }
                        {state.isBig && 
                            <Select placeholder='Selecciona una rango' style={{width:'300px'}} >
                                <Select.Option>100.000+ UF</Select.Option>
                            </Select>
                        }                         
                    </ItemForm>
                    <ItemForm label='Cuanto has gastado en costos fijos de oficiina antes de llegar a cowork?'>
                        <Select placeholder='Selecciona tu rango...' style={{width:'300px'}}>
                            <Select.Option>
                                $0 - $100.000
                            </Select.Option>
                            <Select.Option>
                                $100.000 - $200.000
                            </Select.Option>
                            <Select.Option>
                                $201.000 -  $300.000
                            </Select.Option>
                            <Select.Option>
                                $301.000  - $400.000
                            </Select.Option>
                            <Select.Option>
                                $401.000 - (+)
                            </Select.Option>
                        </Select>
                    </ItemForm>
                    <ItemForm label='Mipyme es el único ingreso para la famila?' >
                        <Checkbox /> SI
                    </ItemForm>
                    <ItemForm label='Los trabajadores de la Mipyme han sido beneficiados de  subsidios'>
                        <Checkbox onChange={(value)=>{
                            if(value.target.checked){
                                setState({
                                    ...state,
                                    isWorkersBenefited: true
                                })
                            }else{
                                setState({
                                    ...state,
                                    isWorkersBenefited: false
                                }) 
                            }
                        }} /> SI
                        {state.isWorkersBenefited && <Input style={styles.input} type='number' placeholder='Cuantos?' />}
                    </ItemForm>
                    <ItemForm label='Tu empresa se a adscrito a la ley de protección del empleo' >
                        <Checkbox onChange={(value)=>{
                            if(value.target.checked){
                                setState({
                                    ...state,
                                    isProtectionLaw: true
                                })
                            }else{
                                setState({
                                    ...state,
                                    isProtectionLaw: false
                                }) 
                            }
                        }}  /> SI
                        {state.isProtectionLaw && <Input style={styles.input} placeholder={'Describe cuales...'} />}
                    </ItemForm>
                    <ItemForm label='Que beneficios de subsidios o ayudas economicas has recibido, de que instituciones del estado(corfo, sercotec, entre otras...) EXPLIQUE CUALES' >
                        <Checkbox onChange={(value)=>{
                            if(value.target.checked){
                                setState({
                                    ...state,
                                    isEconomicHelp: true
                                })
                            }else{
                                setState({
                                    ...state,
                                    isEconomicHelp: false
                                }) 
                            }
                        }} /> SI
                        {state.isEconomicHelp && <Input style={styles.input} placeholder={'Describe cuales...'} />}
                    </ItemForm>
                </Col>
                <Col span={12} style={styles.col}>
                    <Text>Pago de iva al 31 diciembre del año anterior (incluir años para individualizar a qué año se refiere)</Text>
                    <Row style={{marginTop:'10px', marginBottom:'20px'}}>                        
                        
                                <Col span={6}>
                                    <Input placeholder='Año' onChange={(e)=>{

                                        setState({...state, txtYear:e.target.value})
                                    }} />
                                </Col>
                                <Col span={18}>
                                    <Input placeholder='Monto (CLP)' onChange={(e)=>setState({...state, txtAmount:e.target.value})} />
                                </Col>
                                <Col span={24}>
                                    {state.listYears.map((x)=>{
                                        return(<Tag style={styles.tag} color={'gold'}> {x.slice(0,4)} - ${formatNumber.new(x.slice(6))} </Tag>)
                                    })}
                                </Col>                                                        
                        <Col>
                            <Button style={{marginTop:'10px'}} icon={<PlusCircleOutlined />} onClick={(value)=> {
                                setState({
                                    ...state,
                                    listYears: [...state.listYears, `${state.txtYear} - ${state.txtAmount}`],

                                      
                                  })                                
                            }} type='primary' >Agregar año</Button>
                        </Col>
                        <Col>
                        <Button style={{marginTop:'10px'}} onClick={()=> {
                                setState({
                                    ...state,
                                    listYears: [],
                                    valueCalculate1: '',
                                    valueNumberCal1: 0,
                                    valueCalculate2: '',
                                    valueNumberCal2: 0

                                      
                                  })                                
                            }} type='primary' danger >Reiniciar</Button>
                        </Col>
                    </Row>
                    <ItemForm label='% de variación ventas en relación al año anterior (selecciona 2 años para realizar el caculo):' name='percentage variation'>
                            <Row>
                                <Col span={12}>
                                    Elige el primer valor
                                    <Select placeholder='Selecciona un valor...' onChange={(value)=>setState({...state, valueCalculate1: value, valueNumberCal1: parseInt(value.slice(7))})}>
                                    {state.listYears.map((x)=>{
                                        return(<Select.Option value={x}>{x.slice(0,4)} - ${formatNumber.new(x.slice(6))}</Select.Option>)
                                    })}
                                    </Select>
                                </Col> 
                                <Col span={12}>
                                    Elige el segundo valor
                                    <Select placeholder='Selecciona un valor...' onChange={(value)=>setState({...state, valueCalculate2: value, valueNumberCal2: parseInt(value.slice(7))})}>
                                    {state.listYears.map((x)=>{
                                        return(<Select.Option value={x}>{x.slice(0,4)} - ${formatNumber.new(x.slice(6))}</Select.Option>)
                                    })}
                                    </Select>
                                </Col>
                                <Col span={24}>
                                    {state.valueCalculate1 && state.valueCalculate2 ? <>
                                        <p style={{marginTop:'20px'}}>
                                        Se calculara: <Tag color={'gold'}>{state.valueCalculate1.slice(0,4)} - ${formatNumber.new(state.valueCalculate1.slice(7))} </Tag> y <Tag color={'gold'}>{state.valueCalculate2.slice(0,4)} - ${formatNumber.new(state.valueCalculate2.slice(7))}</Tag>
                                        </p>
                                        <p>
                                        Resultado: <Tag color={'gold'}>${formatNumber.new(Math.round((state.valueNumberCal1+state.valueNumberCal2)/2))}</Tag>
                                        </p>
                                    </>:'Selecciona los valores a calcular...' }
                                </Col>
                            </Row>
                    </ItemForm>                                                        
                </Col>        
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type='primary'>Guardar</Button>
                </Col>
            </Row> 
        </Form>
 
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
    }
}


export default EconomicImpact
