export const reducer = (state, action) => {
    switch (action.type) {

        case 'IS_SPEADING':
            return {
                ...state,
                is_speding: true
            }

        case 'IS_NOT_SPEADING':
            return {
                ...state,
                is_speding: false
            }

        case 'CHANGE_PAGE':
            return {
                ...state,
                page: action.page
            }

        case 'ADD_PAYMENTS':            
            return {
                ...state,
                payments: action.payload.results,
                count: action.payload.count                
            }
        
        default:
            return state
    }
}