import axios from 'axios';

import { showError } from './notify';


const getToken = () => {
    return JSON.parse(localStorage.getItem('userInfo'))['token'];
}

const userRequest = axios.create({
    /* baseURL: 'https://weij0-app.herokuapp.com/users/' */
    baseURL: 'http://localhost:3001/users/'
});

const userAvatarUpload = axios.create({
    baseURL: 'http://localhost:3001/users/uploadAvatar',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

const postRequest = axios.create({
    baseURL: 'http://localhost:3001/cases/'
});

userRequest.interceptors.response.use(
    config => {
        return config;
    },
    error => {
        if (error && error.response.status === 401) {
            showError('登入時效已過，請重新登入');
            localStorage.removeItem('userInfo');
            window.location.href = '/';
            return;
        }
        Promise.reject(error);
    }
);

//#region  User

// 確認是否已註冊
export const userEmailCheck = (email) => userRequest.post('/email', { email });
// 註冊
export const userSignUp = (data) => userRequest.post('/signup', data);
// 登入
export const userSignIn = (data) => userRequest.post('/signin', data);
// 檢查 Token
export const userCheck = (data) => {
    const token = getToken();
    if (token)
        userRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return userRequest.post('/check', data);
}
// 變更暱稱及簡介
export const userEditInfo = (data) => userRequest.post('/editInfo', data);
// 上傳大頭照
export const userUploadAvatar = (formData) => {

    const token = formData.get('token');
    formData.delete('token');

    userAvatarUpload.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return userAvatarUpload.post('', formData);
}
// 取得聯絡資訊
export const userGetContact = (data) => {
    const token = getToken();
    if (token)
        userRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return userRequest.post('/contact', data);
}
// 變更聯絡資訊
export const userEditContact = (data) => {
    const token = getToken();
    if (token)
        userRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return userRequest.post('/editContact', data)
};

//#endregion


//#region Case

// 取得案件列表
export const CaseList = (cnt = 8, page = 1, query = '', status = '', type = '') => {
    let url = `/all?cnt=${cnt}&page=${page}`;
    if (query)
        url += `&query=${query}`;
    if (type)
        url += `&type=${type}`;

    return postRequest.get(url);
};

// 取得案件資訊
export const CaseGet = (id) => postRequest.get(`/?id=${id}`);

// 新增案件
export const CaseAdd = (data) => {
    const token = getToken();
    if (token)
        postRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return postRequest.post('/', data);
};
//#endregion