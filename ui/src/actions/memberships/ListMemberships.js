import memberships from '../../api/memberships/endpoints'


export const listFilterMemberships = (dispatch, filters) => {
    const request = memberships.getMemberships(filters)
        .then((response) => {
            dispatch({
                type: 'ADD_MEMBERSHIPS',
                payload: response.data
            })
        }).catch((response) => {
            console.log({response})
        })

    return request
}


