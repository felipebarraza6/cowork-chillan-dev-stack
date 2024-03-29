import React, { useState ,useContext } from 'react'
import { Button, Tag, Col, Row,
        Typography, Modal, Input, Badge } from 'antd'
import { updateMembership, updateFileMembership } from '../../actions/memberships/UpdateMembership'
import {MembershipContext} from '../../containers/Memberships'
import ListPayments from './Payments/ListPayments'
import RenovationMembership from './RenovationMembership'
import ModalAddPaymentForMembership from './ModalAddPaymentForMembership'
const { Paragraph, Text } = Typography
const { TextArea } = Input
const user = JSON.parse(localStorage.getItem('user') || null)
var type_user = ''

if(user){
    type_user = user.type_user
}
//INVERTIR FECHAS DE CADUCADOS CUANDO LA FECHA HOY ES SUPERIOR A LA FECHA DE TERMINO DEBE MARCAR CADUCADO

var today = new Date()
var fomat_date = today.toISOString()

const ButtonUpdate = (obj) => {

    const {dispatch} = useContext(MembershipContext)
        return (
        <Button 
            onClick={()=> dispatch({type:'RETRIEVE', membership: obj})} 
            type='primary'>VER MEMBRESIA</Button>
    )
}

const ValidationFinishMembership = ({obj}) => {

    const [modal, setModal] = useState({
        visible:false,
    })

    return(<>{type_user === 'A' && 
        <Button type='primary' style={styles.btn} onClick={()=>setModal({...modal, visible:true})} >Finalizar</Button>
        }
        <Modal visible={modal.visible} width='600px' 
            onCancel={()=>
                setModal({
                    ...modal, 
                    visible:false
                })} 
            title={`Finalizar membresia ${obj.uuid}`}
            okText='CONFIRMAR'
            onOk = {()=> 
                updateMembership(obj.uuid, 
                    {'is_active': 'false', 'is_finish': 'true'}
                ).then((response)=> {
                    setModal({...modal, visible:false})
                })}>
            Estas seguro de finalizar esta membresia? una vez realizado no podras revertir el estado
        </Modal>
        </>)
}

const ModalDeactivateMembership = ({obj}) => { 

    const [modal, setModal] = useState({
        visible: false,
        file_cancel: null,
        reason: ''
    })

    return(
        <>
            <Col span={24}>
            <Button type='primary' danger style={styles.btn} 
                onClick={()=>{
                    setModal({
                        ...modal, 
                        visible:true})
                }} >Desactivar</Button>
            </Col>
        <Modal 
            width={'600px'} 
            title={`Desactivar membresia ${obj.uuid}`} 
            visible ={modal.visible} 
            onCancel={()=>setModal({...modal, visible:false})} 
            onOk={()=> { 
                updateMembership(obj.uuid, 
                    {
                        'is_active': 'false', 
                        'reason_cancel':modal.reason
                    }).then((response)=> setModal({...modal, visible:false}))
                    updateFileMembership(obj.uuid, {
                    file_cancel:modal.file_cancel 
                })
            }}>
            <Row>
                <Col span={24} style={{marginBottom:'30px'}}>
                <TextArea
                        onChange={(evt)=>setModal({...modal, reason:evt.target.value})} 
                        placeholder="Describe la razon de desactivacion..." />
                </Col>
                <Col span={24}>
                    <Text >Adjuntar documento</Text>
        <Input name='file' onChange={(evt)=>setModal({...modal,file_cancel:evt.target.files[0]})}  id='file' accept='.pdf' type='file' style={styles.upload} />
                </Col>
            </Row>
        </Modal>
        </>
    )

}


export const columns = [
    

    {
        key:'id',
        title:'Cliente',
        render: (obj) => <>
             <Tag> 
                {obj.client_business.business_name.slice(0,15)}...  
                </Tag>
        </>
    },
    {
        key: 'date_initial',
        title:'Fecha de Inicio',
            render: (obj) => <Paragraph ellipsis>{obj.date_initial.slice(0,10)}</Paragraph>
    },
    {
        key: 'date_finish',
        title: 'Fecha de Termino',
        render: (obj) => {if(obj.date_finish){
            return <Paragraph ellipsis>{obj.date_finish.slice(0,10)}</Paragraph>
        }else {
            return <Paragraph ellipsis>{obj.date_finish}</Paragraph> 
        }}
    },
    {
        key: 'id',
        title: 'Etiquetas',
        render: (obj) => { 
            var date_pro = new Date(obj.date_finish)
            var date_rest_days = date_pro.setDate(today.getDate - 35)
            return(<><Row style={{marginBottom:'50px'}}>
            <Col span={24}>
                {obj.date_finish < fomat_date ? <Badge.Ribbon color={'red'} text="CADUCADO" />:<Badge.Ribbon color={'green'} text="ACTIVO" />}
                
            </Col><Col span={24}>
                    {date_rest_days < fomat_date && <Badge.Ribbon color={'yellow'} text="POR CADUCAR" />}                 
                </Col></Row><Row>
            <Tag style={styles.tag} color='cyan'>{obj.valoration.get_service}</Tag>
            {obj.is_active && <Col span={24}><Tag style={styles.tag} color='blue'>Activo</Tag></Col>}
            {obj.is_finish && <Col span={24}><Tag style={styles.tag} color='gold' >Finalizado</Tag></Col>}
            {obj.is_renovation && <Col span={24}><Tag style={styles.tag} color='purple'>Renovacion</Tag></Col>}
            {obj.paid_out ? <Col span={24}><Tag style={styles.tag} color='green'>Total pagado</Tag></Col>:<Col span={24}><Tag style={styles.tag} color='magenta'>Total impago</Tag></Col>}
            {obj.is_cancel && <Col span={24}><Tag style={styles.tag} color='volcano'>Cancelado</Tag></Col>}
        </Row></>)}
    },
    {
        key:'id',
        title: 'Acciones',
        render: (obj) => <Row>
            <Col span={24} style={styles.colBtns} >
                {obj.is_active & obj.paid_out ? <>
                    <ValidationFinishMembership obj={obj} />
                    </>:<></>
                }
            </Col>
            <Col span={24}>    
                
                {!obj.is_active & !obj.paid_out  ? 
                    <>{type_user === 'A' ? 
                    <Button type='primary' 
                        onClick={()=> updateMembership(obj.uuid, {'is_active': 'true'})} 
                        style={styles.btn}>
                            Activar
                        </Button>:''}
                    </>:''}
            </Col>

            <Col span={24}>
                <ListPayments obj={obj} />    
                <ModalAddPaymentForMembership membership={obj} />
                {obj.is_active & !obj.paid_out ? 
                    <><Row>
                        <Col span={24}>
                        <ModalAddPaymentForMembership membership={obj} />
                        </Col>
                        <Col span={24}>
                            <Button>(+) Agregar</Button>
                        </Col>
                        <Col span={24}>
                        <ModalDeactivateMembership obj={obj} />
                        </Col>
                    </Row>
                    </>:''

                }
            </Col>
                        <Col span={24} style={styles.colBtns}>
                {obj.paid_out & obj.is_finish ? 
                    <RenovationMembership data={obj} style={styles} />:''
                }
                           </Col>
            <Col span={24} >
                <ButtonUpdate obj={obj} />
            </Col>
        </Row>
    },
]


const styles = {
    btn: {
        marginRight:'10px',
        marginBottom:'10px'
    },
    tag: {
        fontSize:'15px',
        marginBottom:'5px',
        marginTop:'5px'
    },
    colBtns: {
    },
    upload: {
        marginTop:'15px',
        border: '0px'
    }
}
