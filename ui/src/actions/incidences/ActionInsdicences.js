import tasks from '../../api/tasks/endpoints'


export const getIncidences = async(state, setState) => {

    console.log(state)
    try {
        const request = await tasks.getTasks(state.page, state.user, state.operator)
        setState({
            ...state,
            tasks: request
        })
        console.log(request)
        return request
    }catch (err) {
        console.log(err)
    }
}