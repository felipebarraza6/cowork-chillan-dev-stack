import tasks from '../../api/tasks/endpoints'
import { notification } from 'antd'

export const getIncidences = async(state, setState) => {

    try {
        const request = await tasks.listTasks(state.page, state.user)
        setState({
            ...state,
            tasks: request.data.results,
            count: request.data.count
        })
        return request
    }catch (err) {
        console.log(err)
    }
}

export const updateIncidence = async(state, setState, task, data) => {
    try {
        const request = await tasks.patchTask(task, data)
        notification.success({message: 'Insidencia actualizada'})
        getIncidences(state, setState)
        return request
    }catch (err) {
        console.log(err)
    }
}
