import React, { useContext } from 'react'
import { Card, PageHeader, Tag, 
        Typography ,Row, Col,
        Descriptions, Button, Input} from 'antd'
import { MembershipContext } from '../../containers/Memberships'
import ListPayments from './Payments/ListPayments'
import {updateFileMembership} from '../../actions/memberships/UpdateMembership'
import {  SafetyCertificateTwoTone,
    RestTwoTone, CopyrightTwoTone, IdcardTwoTone, TrophyTwoTone, CrownTwoTone,
    TagsTwoTone, FilePdfTwoTone   } from '@ant-design/icons'
const { Title } = Typography


const RetrieveMembership = ({obj}) => {

    console.log(obj)

    const { dispatch } = useContext(MembershipContext)
    
    const today = new Date()
    const final = new Date(obj.date_finish)

    var diff = final.getTime() - today.getTime()
    var diff_days = diff / (1000*3600*24)


    return (
        <Card>
            <PageHeader title={<Tag style={styles.tags.primary} >{obj.uuid}</Tag>} onBack={()=> dispatch({
                type: 'LIST'
            })} />
        <Row>
             <Col span={24} style={{marginTop:'0px'}}>
                    {obj.is_renovation && <Row>
                        <Col>
                            SERVICIO RENOVADO UUID: {obj.renovation_uuid}
                        </Col>
                    </Row>}
                    <Row justify='end'>
                    {obj.is_active && <Col  style={styles.colIns} >
                            <TagsTwoTone style={{fontSize:'30px'}} />
                        <Title level={4}>Activo</Title>
                        </Col>
                    
                    }
                    {!obj.is_active & !obj.is_finish ? <Col style={styles.colIns}>
                            <RestTwoTone style={{fontSize:'30px', color:'red'}} />
                        <Title level={4}>Cancelado</Title>
                            </Col>:''
                    }        
                    {obj.is_enterprise && <Col style={styles.colIns}>
                            <CopyrightTwoTone style={{fontSize:'30px'}} />
                            <Title level={4}> Empresa</Title>
                            </Col>
                    }
                    {obj.is_person && <Col style={styles.colIns}>
                        <IdcardTwoTone style={{fontSize:'30px'}} />
                        <Title level={4}> Persona</Title>
                    </Col>}
                    {obj.is_finish && <Col style={styles.colIns}>
                            <TrophyTwoTone style={{fontSize:'30px'}} />
                            <Title level={4}> Finalizado</Title>
                    </Col>}
                    {obj.is_renovation && <Col style={styles.colIns}>
                            <CrownTwoTone style={{fontSize:'30px'}} />
                            <Title level={4}> Renovacion</Title>
                    </Col>}
                    {obj.paid_out && <Col style={styles.colIns}> 
                        <SafetyCertificateTwoTone style={{fontSize:'30px'}} />
                        <Title level={4}> Pagado</Title>
                    </Col>
                    }
        </Row>
        </Col>
            <Col span={24}>
                <Descriptions bordered layout='horizontal' title='CLIENTE'>
                    <Descriptions.Item label='TIPO'>
                        {obj.is_enterprise ? 'Empresa':'Persona'} 
                    </Descriptions.Item>
                    <Descriptions.Item label ='NOMBRE'>
                        {obj.is_enterprise ? 
                            obj.client_business.business_name : 
                            `${obj.client_person.first_name} ${obj.client_person.surname}`}
                    </Descriptions.Item>
                    <Descriptions.Item label='RUT'>
                        {obj.is_enterprise ? 
                            obj.client_business.dni_business :
                            obj.client_person.dni
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label ='TELEFONO'>
                        {obj.is_enterprise ? 
                            obj.client_business.phone_number:
                            obj.client_person.phone_number
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label='EMAIL'>
                        {obj.is_enterprise ? 
                            obj.client_business.email:
                            obj.client_person.email
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label ='REGION'>
                        {obj.is_enterprise ? 
                            obj.client_business.region:
                            obj.client_person.region
                        }
                    </Descriptions.Item>
                </Descriptions>
        </Col>
        </Row>
        <Row style={{marginTop:'20px'}}>
        <Col span={24}>
            <Descriptions title='INFORMACION GENERAL' bordered>
                <Descriptions.Item label='Servicio' span={2}>
                    {obj.valoration.get_service} 
                </Descriptions.Item>
                <Descriptions.Item label='Valor(no incluye descuentos)'>
                    $ {obj.valoration.price} (CLP)
                </Descriptions.Item>
                <Descriptions.Item label='Fecha inicial' span={2}>
                    {obj.date_initial.slice(0,10)}
                </Descriptions.Item>
                <Descriptions.Item label='Duracion(DD:HH:MM:SS)' span={3}>
                    {obj.valoration.duration} Hrs
                </Descriptions.Item>
                <Descriptions.Item label='Fecha de termino' span={2}>
                    {obj.date_finish.slice(0,10)} 
                </Descriptions.Item>
                <Descriptions.Item label='Tiempo restante'>
                    {obj &&
                        <>
                            {Math.round(diff_days)} Dias de membresia
                        </>
                    }
                </Descriptions.Item>
                <Descriptions.Item span={3} label='Nota interna'>
                    {obj.note_internal}
                </Descriptions.Item>
                <Descriptions.Item span={3} label='Nota contrato'>
                    {obj.note_client}
                </Descriptions.Item>
            </Descriptions>
        </Col>
        <Col span={24} style={{marginTop:'20px'}}>
        <Descriptions title={'CONDICIONES FINANCIERAS'} bordered layout='vertical'>
                <Descriptions.Item label='Descuento por importe'>
                    {obj.discount_import} (CLP)
                </Descriptions.Item>
                <Descriptions.Item label='Descuento por porcentaje'>
                    {obj.discount_porcent}%
                </Descriptions.Item>
                <Descriptions.Item label='Pago establecido'>
                    $ {obj.valoration.price} (CLP)
                </Descriptions.Item>
            </Descriptions>
        </Col>
        <Col span={24} style={{marginTop:'20px'}}>
            <Descriptions title={'ESTADOS DE PAGO'} bordered>
                <Descriptions.Item label='TOTAL'>
                    $ {obj.payment_final} (CLP)
                </Descriptions.Item>
                <Descriptions.Item label='CUOTAS'>
                    {obj.payment_fees}
                </Descriptions.Item>
                <Descriptions.Item label='CUOTA'>
                    $ {obj.amount_per_fees} (CLP)
                </Descriptions.Item>
                <Descriptions.Item label='PAGADO'>
                    $ {obj.payment_amount} (CLP)
                </Descriptions.Item>
                <Descriptions.Item label='FUNCIONES(EXPERIMENTAL)'>
                        <ListPayments obj={obj} />
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='DESCARGABLES' style={{marginTop:'20px'}} bordered layout='vertical' >    
                <Descriptions.Item label='Contrato autogenerado'>
                    
                    {obj.file_contract &&
                        <Button onClick={()=>window.open(`${obj.file_contract}`)} type='link' style={styles.btn}
                            icon={<FilePdfTwoTone style={{fontSize:'30px'}} />} >
                                {obj.file_contract.slice(49)}
                        </Button>
                    }
                    <Input style={{marginTop:'15px'}} type='file' accept='.pdf' name='copy' id='copy' onChange={(evt)=> updateFileMembership(obj.uuid, {file_contract: evt.target.files[0]})} />
                </Descriptions.Item>
                <Descriptions.Item label='Copia de contrato firmado'>
                        {obj.copy_file_contract &&
                            <Button onClick={()=>window.open(`${obj.copy_file_contract}`)} type='link' style={styles.btn}
                                icon={<FilePdfTwoTone style={{fontSize:'30px'}} />} >
                                {obj.copy_file_contract.slice(54)}
                            </Button>}
        <Input style={{marginTop:'15px'}} type='file' accept='.pdf' name='copy' id='copy' onChange={(evt)=> updateFileMembership(obj.uuid, {
            copy_file_contract: evt.target.files[0]
        })} />
                </Descriptions.Item>
                {obj.file_cancel &&
                <Descriptions.Item label='Comprobante de cancelacion'>
                    <Button 
                        type='link' 
                        style={styles.btn} 
                        icon={<FilePdfTwoTone style={{fontSize:'30px'}} />} 
                        onClick={()=>window.open(`${obj.file_cancel}`)}>{obj.file_cancel.slice(52)}</Button>
                </Descriptions.Item>}
            </Descriptions>
        </Col>
       
        </Row>

        </Card>
    )
}


const styles = {
    colIns: {
        marginTop:'20px',
        textAlign: 'center',
        marginLeft:'20px',
        marginRight:'20px'
    },
    divider: {
        color:'white'
    },
    icons: {
        profile: {
            fontSize:'22px',
            marginRight: '10px',
            color:'#efdbff'
        }
    },
    tags: {
        primary: {
            backgroundColor:'#531dab',
            fontSize:'17px',
            paddingRight:'10px',
            paddingLeft:'10px',
            paddingBottom:'5px',
            paddingTop:'5px'
        
        }
    }
}

export default RetrieveMembership

