import { URL } from "../constants/constants";

async function getAllTasks(projectId){
    const response = await fetch(`${URL}/api/task/getAll/${projectId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    }).then(res => res.json());
    return response;
}

async function addNewTask(newTask){
    const response = await fetch(`${URL}/api/task/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(newTask)
    }).then(res => res.json())
    return response
}

async function toggleCompleted(taskId){
    const response = await fetch(`${URL}/api/task/toggleCompleted/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(res => res.json())
    return response;
}

async function deleteTask(taskId){
    const response = await fetch(`${URL}/api/task/delete/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    }).then(res => res.json())
    return response
}

export {getAllTasks, addNewTask, toggleCompleted, deleteTask}