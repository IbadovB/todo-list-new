import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/'

const getTodoList = () => {
    return axios.get(`${baseUrl}todo`);
}

const changeStatus = (id, task) => {
    return axios.patch(`${baseUrl}todo/${id}`, task);
}

const setTask = (description) => {
    return axios.post(`${baseUrl}todo`, { description });
}

const removeTask = (id) => {
    console.log(id);

    return axios.delete(`${baseUrl}todo/${id}`);
}

const clearCompletedRequest = () => {
    return axios.post(`${baseUrl}todo/clear-completed`);
}


export { getTodoList, changeStatus, setTask, removeTask, clearCompletedRequest };
