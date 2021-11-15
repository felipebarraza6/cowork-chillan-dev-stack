import React, { useState } from 'react'
import { Modal, Button } from 'antd'

const AddSpeding = () => {

    const [visible, setVisible] = useState(false)

    return(<>
        <Modal title='(+) Agregar Costo' visible={visible} onCancel={()=>setVisible(false)} > 
        </Modal>
        <Button style={styles.btn} type='primary' onClick={()=> setVisible(true)}>(+) Agregar costo</Button>
    </>)
}


const styles = {
    btn: {
        marginRight: '10px'
    }    
}

export default AddSpeding