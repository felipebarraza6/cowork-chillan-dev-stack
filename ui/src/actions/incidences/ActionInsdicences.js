import tasks from '../../api/tasks/endpoints'


export const getIncidences = async(state, setState) => {

    console.log(state)
    try {
        const request = await tasks.listTasks(state.page, state.user)
        setState({
            ...state,
            tasks: request.data.results
        })
        return request
    }catch (err) {
        console.log(err)
    }
}