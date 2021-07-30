import { POST, GET } from '../api'


const postTask = async(data)=> {
    const request = await POST('tasks_users/', data)
    return request
}


const getTasks = async({page, user, operator}) => {
    const request = await GET(`tasks_users/?page=${page}&user=${user}&operator=${operator}/`)
    return request
}

const tasks = {
    postTaks: postTask,
    listTasks: getTasks
}


export default tasks
