export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_AUTH_READY":
      return { ...state, isAuthReady: true };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
