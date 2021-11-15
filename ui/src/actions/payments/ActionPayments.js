import payments from '../../api/payments/endpoints'
import { notification } from 'antd'

export const ListPaymentsAction = async(is_speding, page, dispatch) => {
    try {
        const request = await payments.listPayments(is_speding, page)
        dispatch({
            type: 'ADD_PAYMENTS',
            payload: request.data
        })
        return request
    } catch (err) {
        console.log(err)
    }
}

export const updateStatusPayment = async(id, isNull, isApproved, state, dispatch) => {
    try {
        const request = await payments.updatePayment(id, 
            { is_pay: isApproved, is_null: isNull })
        notification.success({message:'Estado actualizado'})
        const update = await ListPaymentsAction(state.is_speding, state.page, dispatch)        
        return {request, update}
    } catch (err) {
        console.log(err)
    }   
}
