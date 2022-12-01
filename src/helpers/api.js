import axios from 'axios';

import * as notify from "../helpers/notify";
import { changeRouter } from "./router";

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

// 確認是否已註冊
export const userEmailCheck = (email) => userRequest.post('/email', { email });
// 註冊
export const userSignUp = (data) => userRequest.post('/signup', data);
// 登入
export const userSignIn = (data) => userRequest.post('/signin', data);
// 刷新 Token
export const userRefreshToken = (data) => userRequest.post('/refreshToken', data);
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
export const userInfo = (data) => userRequest.post('/info', data);