import io from "socket.io-client";

export const URL = 'http://localhost:5000';
export const socket = io(`${URL}`);