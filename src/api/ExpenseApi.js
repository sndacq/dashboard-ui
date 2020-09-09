import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/expense/';

export async function getExpense () {
    return axios.get(apiUrl)
    .then(res => res.data)
    .catch(err => err);
}

export async function createExpense (data) {
    return axios.post(apiUrl, data)
        .then(res => res.data)
        .catch(err => err);
}

export async function updateExpense (data) {
    return axios.put(apiUrl, data)
    .then(res => res.data)
    .catch(err => err);
}

export async function deleteExpense (data) {
    const deleteUrl = apiUrl + `${data.id}/`
    return axios.delete(deleteUrl)
    .then(res => res.data)
    .catch(err => err);
}