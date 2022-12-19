import { URL } from "../constants/constants";

async function getUserByEmail(email){
    const response = await fetch(`${URL}/api/user/getByEmail/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => res.json());
    return response;
}

export { getUserByEmail };