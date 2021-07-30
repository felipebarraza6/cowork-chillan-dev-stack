import { notification } from 'antd'

export const reducer = (state, action) => {

    switch (action.type) {

        case 'CREATE_MEMBERSHIP':
            return {
                ...state,
                dataCreate: action.payload.results
            }

        case 'ADD_CLIENT':
            notification.success({message:'CLIENTE SELECCIONADO'})
            return {
                ...state,
                client_selected: action.client_selected,
                client_data_selected: action.client_data_selected,
                disabled_next_btn: false,
                is_person: action.is_person,
                is_enterprise: action.is_enterprise,
                client_business: action.client_business,
                client_person: action.client_person

            }

        case 'REMOVE_CLIENT':
            return {
                ...state,
                client_selected: null,
                client_data_selected: null,
                disabled_next_btn: true
            }

        case 'ADD_VALORATION':
            notification.success({
                message:'VALORIZACION Y FECHA DE INICIO SELECCIONADAS'
            })
            return {
                ...state,
                date_initial: action.date_initial,
                valoration_selected: action.valoration_selected,
                valoration_data_selected: action.valoration_data_selected,
                disabled_next_btn: false
            }

        case 'UPDATE_STEP':
            return {
                ...state,
                step: action.step,
                disabled_next_btn: true
            }

        case 'CLEAR_CREATE':
            notification.warn({message:'PROCESO REINICIADO'})
            return {
                ...state,
                disabled_next_btn: true,
                client_selected: null,
                client_data_selected: {},
                valoration_selected: null,
                valoration_data_selected: {},
                discount_import: 0,
                discount_porcent: 0,
                note_client: '',
                note_contrast: '',
                payment_fees: 1,
                comercial_info: false,
                renovation_uuid: '',
                step: 1
            }
        
        case 'ADD_COMERCIAL_INFO':
            notification.success({message:'CONDICIONES INGRESADAS'})
            return {
                ...state,
                discount_import: action.discount_import,
                discount_porcent: action.discount_porcent,
                note_client: action.note_client,
                note_contract: action.note_contract,
                payment_fees: action.payment_fees,
                comercial_info: true,
                disabled_next_btn: false
            }

        case 'ADD_RENOVATION':
            return {
                ...state,
                renovation_uuid: action.renovation_uuid 
            }

        default:
            return state
    }
}
