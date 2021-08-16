import React from 'react'
import { Button } from 'antd'

const ModalAddPaymentForMembership = ({ membership }) => {

    return(<>
        <Button style={styles.btn} type='primary'>(+) Agregar Pago</Button>
    </>)

}


const styles = {
    btn: {
        marginBottom: '10px'
    }
}

export default ModalAddPaymentForMembership