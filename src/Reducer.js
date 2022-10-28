const LOGIN_USER = "LOGIN_USER";
const OPEN_USER_MODAL = "OPEN_USER_MODAL";
const CLOSE_USER_MODAL = "CLOSE_USER_MODAL";

const initState = {
  userInfo: {
    email: "",
    userId: "",
  },
  userModalOpen: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      state.userInfo.email = action.payload.email;
      state.userInfo.userId = action.payload.userId;
      return { ...state, userInfo };
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
