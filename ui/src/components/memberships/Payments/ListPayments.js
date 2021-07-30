import React, {useState} from 'react'
import { Modal, Button, Table,
            Tag} from 'antd'
import { FilePdfTwoTone } from '@ant-design/icons'
import {BASE_URL} from '../../../api/api'

import ModalIncidence from '../ModalIncidence'

const ListPayments = ({obj}) => {
    
    const [modal, setModal] = useState({
        visible: false
    })
    

    
    const columns = [
        {
            title:'id pago',
            dataIndex: 'id',
            key:'id'
        },{
            title:'monto',
            dataIndex: 'amount',
            key:'amount',
            render: (pay)=><Tag color='gold' style={{fontSize:'17px'}}>$ {pay}</Tag>
        },{
            title:'tipo de pago',
            dataIndex: 'method'
        },{
            title:'',
            render: (obj) => {
                return(<>
                    {console.log( obj)}
                {obj.is_invoice & obj.comprobant_file !== null ?
                    <Button style={{margin:'10px'}}
                        icon ={<FilePdfTwoTone style={{fontSize:'17px', color:'white'}} />}
                    type='primary' onClick={()=> window.open(`${BASE_URL}${obj.comprobant_file.slice(1)}`)}>Descargar factura</Button>:''
                }
                {obj.is_ticket & obj.comprobant_file !== null ?
                        <Button style={{margin:'10px'}}
                        icon={<FilePdfTwoTone style={{fontSize:'17px', color:'white'}} />}
                    type='primary' onClick={()=> window.open(`${BASE_URL}${obj.comprobant_file.slice(1)}`)}>Descargar Boleta</Button>:''
                }
                <ModalIncidence payment={obj} />
                </>)
            }
        }
    ]

    return(<>
        <Button 
            type='primary'
            onClick = {()=> setModal({...modal, visible:true})}
            style={styles.btn}>
                ($) Ver pagos
        </Button>
        <Modal visible={modal.visible}
            width='1000px'
            title={`Pagos de la membresia ${obj.uuid}`}
            onCancel = {()=> {setModal({...modal, visible: false})}}        
            okText={<></>}
            cancelText={'Volver'}
        >
            <Table dataSource={obj.payments_memberships} columns={columns}  />
        </Modal>
    </>)

}


const styles = {
    btn: {
        marginBottom:'10px'
    }
}


export default ListPayments
