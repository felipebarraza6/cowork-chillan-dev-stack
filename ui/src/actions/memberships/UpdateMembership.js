import memberships from '../../api/memberships/endpoints'
import { notification } from 'antd'

export const updateMembership = (membership, data) => {
    const request = memberships.patchMembership(membership, data)
        .then((response)=> {
            notification.open({message:'Membresia actualizada'})
        }).catch((errRes) => {
            notification.open('A ocurrido un error...')
        })

    return request
}


export const updateFileMembership = (membership, files) => {
    const request = memberships.patchFilesMembership(membership, files.file_contract, files.copy_file_contract, files.file_cancel)
        .then(()=> {
            notification.success({message:'Archivos exitosamente subidos'})
        }).catch((err)=> {
            notification.open({message:'A ocurrido en un error...'})
        }) 

    return request
}
