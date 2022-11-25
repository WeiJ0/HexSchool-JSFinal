const LOGIN_USER = "LOGIN_USER";
const OPEN_USER_MODAL = "OPEN_USER_MODAL";
const CLOSE_USER_MODAL = "CLOSE_USER_MODAL";

const initState = {
  userInfo: {
    email: "",
    userId: "",
    nickname: "",
    token: "",
    avatar: ""
  },
  userModalOpen: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      state.userInfo.email = action.payload.email;
      state.userInfo.userId = action.payload.id;
      state.userInfo.nickname = action.payload.nickname;
      state.userInfo.token = action.payload.token;
      state.userInfo.avatar = action.payload.avatar;
      console.log(state);
      return { ...state };
    }

    case OPEN_USER_MODAL: {
      return { ...state, userModalOpen: true };
    }

    case CLOSE_USER_MODAL: {
      return { ...state, userModalOpen: false };
    }
    default:
      return state;
  }
};

export default reducer;
