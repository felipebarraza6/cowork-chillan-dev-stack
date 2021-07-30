export const reducer = (state, action)=> {

    switch(action.type) {

        case 'ADD_MEMBERSHIPS':
            return {
                ...state,
                memberships: action.payload.results,
                count: action.payload.count
            }
        
        case 'RETRIEVE':
            return {
                ...state,
                membershipSelected: action.membership,
                retrieve_membership: true
            }
        case 'LIST':
            return {
                ...state,
                membershipSelected: {},
                retrieve_membership: false
            }
        default:
            return state

    }

} 
