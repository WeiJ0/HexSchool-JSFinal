import { createSlice } from '@reduxjs/toolkit'

// 將 user 資料存入 localStorage
const setLocalStorage = (data) => {
    window.localStorage.setItem('userInfo', JSON.stringify(data))
}

// 從 localStorage 取得 user 資料若沒有則定義空物件
const initialUserInfo =
    (typeof window !== "undefined" && JSON.parse(window.localStorage.getItem('userInfo'))) ||
    {
        id: '',
        email: '',
        intro: '',
        nickname: '',
        token: '',
        avatar: '',
    };

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: initialUserInfo,
        userModalOpen: false,
    },
    reducers: {
        // 打開 user modal
        openModal: (state) => {
            state.userModalOpen = true
        },
        // 關閉 user modal
        closeModal: (state) => {
            state.userModalOpen = false
        },
        // 登入
        signin: (state, action) => {
            console.log(action);
            state.user = action.payload;
            setLocalStorage(action.payload);
        },
        // 登出
        signout: (state) => {
            Object.keys(state.user).forEach(key => {
                state.user[key] = '';
            })
            setLocalStorage(state.user);
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer