import { GET, POST } from '../api'

const get_payments = async(is_speding) => {
    const request = GET(`payments/?is_speding=${is_speding}`)
    return request
}

const post_payment = async(data) => {
    const request = POST(`payments/`, data)
    return request 
}

const post_payment_for_membership = async(membership, data) => {
    const request = POST(`memberships/${membership}/add_payment/`, data)
    return request
}

const payments = {
    listPayments: get_payments,
    postPayment: post_payment,
    addPaymentMembership: post_payment_for_membership
}


export default payments