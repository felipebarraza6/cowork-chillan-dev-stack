export const reducer = (state, action) => {
    switch (action.type) {                 

        case 'ADD':
            return action.payload
        
        default:
            return state
    }
}
