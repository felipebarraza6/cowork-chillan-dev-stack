import payments from '../../api/payments/endpoints'


export const ListPaymentsAction = async(is_speding) => {
    try {
        const request = await payments.listPayments(is_speding)
        console.log(request)
    } catch (err) {
        console.log(err)
    }
}