import React, { useState } from 'react'
import { Modal, Button } from 'antd'

const AddPayment = () => {

    const [visible, setVisible] = useState(false)

    return(<div>
        <Modal visible={visible} onCancel={()=>setVisible(false)} > 
        </Modal>
        <Button type='primary' onChange={()=> setVisible(true)}>(+) Agregar pagos</Button>
    </div>)
}


export default AddPayment