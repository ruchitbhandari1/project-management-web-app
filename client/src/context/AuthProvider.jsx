import { createContext } from "react";
import { useReducer } from "react";
import { initialState } from "./states";
import { authReducer } from "./reducers";
import { useEffect } from "react";
import { URL } from "../constants/constants";
import { toast } from "react-toastify";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verify user on page load
  async function verifyUser(jwt) {
    const response = await fetch(`${URL}/api/auth/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => res.json());
    if (response.status === "success") {
      dispatch({ type: "SET_USER", payload: response.data.user });
    }
    dispatch({ type: "SET_IS_AUTH_READY" });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      dispatch({ type: "SET_IS_AUTH_READY" });
      return;
    }
    verifyUser(jwt);
  }, []);

  // login
  async function login(userData) {
    const response = await fetch(`${URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => res.json());

    if (response.status === "success") {
      localStorage.setItem("jwt", response.token);
      dispatch({ type: "SET_USER", payload: response.data.user });
    } else {
      toast.error(response.message, {
        toastId: "loginError",
      });
    }
  }

  // signup
  async function signup(userData) {
    const response = await fetch(`${URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => res.json());

    if (response.status === "success") {
      localStorage.setItem("jwt", response.token);
      dispatch({ type: "SET_USER", payload: response.data.user });
    } else {
      toast.error(response.message, {
        toastId: "signupError",
      });
    }
  }

  // logout
  async function logout() {
    await fetch(`${URL}/api/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("jwt");
    dispatch({ type: "SET_USER", payload: null });
  }

  function setSelectedOrgId(orgId) {
    dispatch({ type: "SET_SELECTED_ORG_ID", payload: orgId });
  }

  function setSelectedProjectId(projectId){
    dispatch({type: "SET_SELECTED_PROJECT_ID", payload: projectId});
  }

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, setSelectedOrgId, setSelectedProjectId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
