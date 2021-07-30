export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {...state, loading:true}
        case 'NOLOADING':
            return {...state, loading:false}
        
        case 'LIST_CLIENTS':
            return {
                ...state,
                data: action.payload.results,
                totals: action.payload.count,
                natural_person: true,
                business:false,
                loading: false                                
            }
        
        case 'LIST_BUSINESS':
            return {
                ...state,
                data: action.payload.results,
                totals: action.payload.count,
                business:true,
                natural_person: false,
                loading: false                                
            }
        
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page,
                loading: false
            }

        case 'SET_FILTERS':
            return {
                ...state,
                filter_name: action.filter_name,
                filter_dni: action.filter_dni,
                filter_last_name: action.filter_last_name
            }

        case 'SET_FORM':
            return {
                ...state,
                form_business: action.business,
                legal_represent_create_enterprise: action.legal_represent_create_enterprise,
                form_natural_person: action.person,
                form_legal_represent: action.represent,
                create_represent: action.create_represent,
                dni_business_legal_represent: action.dni_business,
                dataForm: action.data,
            }            
        
        default:
            return state
    }
}
