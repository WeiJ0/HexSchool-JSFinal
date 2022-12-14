import axios from "axios";

import { showError } from "./notify";

const getToken = () => {
  return JSON.parse(localStorage.getItem("userInfo"))["token"];
};

const URL = 'https://wecoding-express-weij0.vercel.app';
/* const URL = "http://localhost:3001"; */

const userRequest = axios.create({
  baseURL: `${URL}/users/`,
});

const userAvatarUpload = axios.create({
  baseURL: `${URL}/users/uploadAvatar`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const postRequest = axios.create({
  baseURL: `${URL}/cases/`,
});

const collectRequest = axios.create({
  baseURL: `${URL}/collect/`,
});
const profileRequest = axios.create({
  baseURL: `${URL}/profiles/`,
});
const profileUpload = axios.create({
  baseURL: `${URL}/profiles/`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const engineerRequest = axios.create({
  baseURL: `${URL}/engineers/`,
});

const requests = [userRequest, postRequest, collectRequest, profileRequest];

requests.forEach((request) => {
  request.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log(error);
      if (error && error.response.status && error.response.status === 401) {
        showError("登入時效已過，請重新登入");
        localStorage.removeItem("userInfo");
        window.location.href = "/";
        return;
      }
      Promise.reject(error);
    }
  );
});

//#region  User

// 確認是否已註冊
export const userEmailCheck = (email) => userRequest.post("/email", { email });
// 註冊
export const userSignUp = (data) => userRequest.post("/signup", data);
// 登入
export const userSignIn = (data) => userRequest.post("/signin", data);
// 檢查 Token
export const userCheck = (data) => {
  const token = getToken();
  if (token)
    userRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return userRequest.post("/check", data);
};
// 變更暱稱及簡介
export const userEditInfo = (data) => {
  const token = getToken();
  if (token)
    userRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return userRequest.post("/updateInfo", data);
};
// 上傳大頭照
export const userUploadAvatar = (formData) => {
  const token = formData.get("token");
  formData.delete("token");

  userAvatarUpload.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return userAvatarUpload.post("", formData);
};
// 取得聯絡資訊
export const userGetContact = (data) => {
  const token = getToken();
  if (token)
    userRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return userRequest.post("/contact", data);
};
// 變更聯絡資訊
export const userEditContact = (data) => {
  const token = getToken();
  if (token)
    userRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return userRequest.post("/updateContact", data);
};

//#endregion

//#region Case

// 取得案件列表
export const CaseList = (
  cnt = 8,
  page = 1,
  query = "",
  status = "",
  type = ""
) => {
  let url = `/all?cnt=${cnt}&page=${page}`;
  if (query) url += `&query=${query}`;
  if (type) url += `&type=${type}`;

  return postRequest.get(url);
};

export const CaseListByUser = (
  cnt = 8,
  page = 1,
  query = "",
  status = "",
  type = ""
) => {
  let url = `/all/user?cnt=${cnt}&page=${page}`;
  if (query) url += `&query=${query}`;
  if (type) url += `&type=${type}`;

  const token = getToken();
  if (token)
    postRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return postRequest.get(url);
};
// 取得案件資訊
export const CaseGet = (id) => postRequest.get(`/?id=${id}`);

// 新增案件
export const CaseAdd = (data) => {
  const token = getToken();
  if (token)
    postRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return postRequest.post("/", data);
};
// 編輯案件
export const CaseEdit = (id, data) => {
  const token = getToken();
  if (token)
    postRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return postRequest.patch(`/${id}`, data);
};
//#endregion

//#region Collect
// 收藏
export const Collect = (type, id) => {
  const token = getToken();
  if (token)
    collectRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return collectRequest.post(`/${type}/${id}`);
};
export const CollectList = (type) => {
  const token = getToken();
  if (token)
    collectRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return collectRequest.get(`/${type}`);
};
//#endregion

//#region Profile

export const profileGet = (id) => profileRequest.get(`/?id=${id}`);

export const profileDetailGet = (id) => profileRequest.get(`/detail?id=${id}`);

export const profileList = (cnt = 8, page = 1, query = "", order = "") => {
  let url = `/all?cnt=${cnt}&page=${page}`;
  if (query) url += `&query=${query}`;
  if (order) url += `&order=${order}`;

  return profileRequest.get(url);
};

export const profileListByUser = (
  cnt = 8,
  page = 1,
  query = "",
  order = ""
) => {
  let url = `/all/user?cnt=${cnt}&page=${page}`;
  if (query) url += `&query=${query}`;
  if (order) url += `&order=${order}`;

  const token = getToken();
  if (token)
    profileRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return profileRequest.get(url);
};

export const profileHomeList = (order) => {
  return profileRequest.get(`/home?order=${order}`);
};

export const profileAdd = (formData) => {
  const token = formData.get("token");
  formData.delete("token");
  profileUpload.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return profileUpload.post("/", formData);
};

export const profileEdit = (formData) => {
  const id = formData.get("id");
  formData.delete("id");
  const token = formData.get("token");
  formData.delete("token");
  profileUpload.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return profileUpload.patch(`/${id}`, formData);
};

export const profileLike = (id) => {
  const token = getToken();
  if (token)
    collectRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return collectRequest.post(`/profiles/${id}`);
};
//#endregion

export const engineersList = (count = 8, query = "", page = 1) => {
  let url = `/all?count=${count}`;
  if (query) url += `&query=${query}`;

  return engineerRequest.get(url);
};

export const engineersGet = (id) => engineerRequest.get(`/?id=${id}`);
