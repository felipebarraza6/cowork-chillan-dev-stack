import { GET, POST, PATCH } from '../api'

const get_payments = async(is_speding, page) => {
    const request = GET(`payments/?is_spending=${is_speding}&page=${page}`)
    return request
}

const get_banks = async() => {
    const request = GET('banks/')
    return request
}

const post_payment = async(data) => {
    const request = POST(`payments/`, data)
    return request 
}


const add_payment = async(fields) => {
    let data = new FormData()
    data.append('membership', fields.membership)
    data.append('method', fields.method)
    data.append('bank_account', fields.bank_account)
    data.append('amount', fields.amount)
    data.append('description', fields.description)
    data.append('is_invoice', fields.is_invoice)
    data.append('is_ticket', fields.is_ticket)
    data.append('comprobant_file', fields.comprobant_file)
    data.append('pay_for_service', 'true')
    

    try{
        const request = await POST(`payments/`, data)
        return request
    }catch(error){
        console.log(error)
    }
}

const add_is_speading = async(fields) => {
    
}

const post_payment_for_membership = async(membership, data) => {
    const request = POST(`memberships/${membership}/add_payment/`, data)
    return request
}

const update_payment = async(payment, data) => {
    const request = PATCH(`payments/${payment}/`, data)
    return request
}

const payments = {
    listPayments: get_payments,
    postPayment: post_payment,
    addPaymentMembership: post_payment_for_membership,
    listBanks: get_banks,
    addPaymemtForMembership: add_payment,
    updatePayment: update_payment,
}


export default payments