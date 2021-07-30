
import clients from '../../api/clients/endpoints.js'


const reloadForm = (dispatch) =>{

    dispatch({
        type: 'SET_FORM',
        business: false,
        person: false,
        represent: false,
        is_create_represent: false,
        dni_business: null,
        legal_represent_create_enterprise: null,
        data: null
    })
}


const activeFormBusiness = async (dispatch, data=null, represent_data) =>{
    console.log(data)
    await reloadForm(dispatch)
    await dispatch({
        type: 'SET_FORM',
        business:true,
        legal_represent_create_enterprise: represent_data,
        data: data
    })
 }

const activeFormClients = async (dispatch, data=null) =>{

    await reloadForm(dispatch)
    await dispatch({
        type: 'SET_FORM',
        person: true,
        data: data
    })
}

const activeRepresentLegal = async (dispatch, business) => {
    
    await reloadForm(dispatch)

    const request_client = await clients.retrieve_client(business.represent_legal)

    let data = request_client.data

    await dispatch({
        type: 'SET_FORM',
        person: true,  
        create_represent: true,    
        data:data
    })    
}

const formCreateRepresent = async(dispatch, business) =>{
    
    await reloadForm(dispatch)

    await dispatch({
        type: 'SET_FORM',
        person: true,
        create_represent: true,
        dni_business: business
    })
}



const interfacesForm = {
    reloadForm,
    activeFormBusiness,
    activeFormClients,
    activeRepresentLegal,
    formCreateRepresent
}

export default interfacesForm
