import { POST, GET, PATCH } from '../api'


const postTask = async(data)=> {
    const request = await POST('tasks_users/', data)
    return request
}


const getTasks = async(page, user) => {
    const request = await GET(`tasks_users/?page=${page}&user=${user}`)
    return request
}

const updateTask = async(task, data) => {
    const request = await PATCH(`tasks_users/${task}/`, data)
    return request
}

const tasks = {
    postTaks: postTask,
    listTasks: getTasks,
    patchTask: updateTask
}


export default tasks
