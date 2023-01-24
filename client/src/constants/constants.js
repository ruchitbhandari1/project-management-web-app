import io from "socket.io-client";

// export const URL = 'http://localhost:5000';
export const URL = "https://project-management-web-app.onrender.com";
export const socket = io(`${URL}`);