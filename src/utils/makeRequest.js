import axios from 'axios';


const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// const AUTH_TOKEN =
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MjMwNDEwNiwiZXhwIjoxNjc0ODk2MTA2LCJuYmYiOjE2NzIzMDQxMDYsImp0aSI6Ik5MVVpJckJWRmdxcTI5amgiLCJzdWIiOjQ3NDMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nEv3GExcco5ENGsJGEJR6LoAT1zLRY-mFdHgyrlc4as';
// request.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;

export const setAuthToken = (token) => {
    if (token) {
        request.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete request.defaults.headers.common['Authorization'];
    } 
};

export const get = async (path, object = {}) => {
    const response = await request.get(path, object);
    return response.data;
};

export const post = async (path, object = {}) => {
    const response = await request.post(path, object);
    return response;
};

export default request;
