export const reducer = (state, action) => {
    switch (action.type) {

        case 'LOADING':
            return {
                ...state, 
                loading:true
            }
        
        case 'NOT_LOADING':
            return {
                ...state, 
                loading:false
        }

        case 'UPDATE_DATA':                        
            return {
                ...state,
                update_data: action.data
            }
        
        case 'RELOAD_FORM_SERVICES':
            return {
                ...state,
                reload_services: true
            }
                    
        case 'RELOAD_FORM_SERVICES_OFF':
            return {
                ...state,
                reload_services: false
            }
        
        case 'CLEAN_UPDATE_DATA':
            return {
                ...state,
                update_data: null
            }

        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        
        case 'SET_SERVICES':
            return {
                ...state,
                services: action.payload
            }
        
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page
            }
        
        default:
            return state
    }
}
