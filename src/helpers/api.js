import axios from 'axios';

const userRequest = axios.create({
    /* baseURL: 'https://weij0-app.herokuapp.com/users/' */
    baseURL: 'http://localhost:3001/users/'
});

// 確認是否已註冊
export const userEmailCheck = (email) => userRequest.post('/email', { email });
// 註冊
export const userSignUp = (data) => userRequest.post('/signup', data);
// 登入
export const userSignIn = (data) => userRequest.post('/signin', data);