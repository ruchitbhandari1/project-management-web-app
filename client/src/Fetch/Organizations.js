import { URL } from "../constants/constants"

async function getMyOrgs() {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch(`${URL}/api/org/getMy`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => res.json());
    return response;
}

async function getOrgs(search) {
  const response = await fetch(`${URL}/api/org/getAll?search=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response;
} 

async function joinOrg(orgId){
  const jwt = localStorage.getItem("jwt");
  const response = await fetch(`${URL}/api/org/requestToJoin/${orgId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
  console.log(response);
  return response;
}

async function createOrg(name){
  const jwt = localStorage.getItem("jwt");
  const response = await fetch(`${URL}/api/org/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
  return response;
}

async function getOrgData(orgId){
  const response = await fetch(`${URL}/api/org/get/${orgId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response;
}

async function acceptRequest(orgId, userId){
  const jwt = localStorage.getItem("jwt");
  const response = await fetch(`${URL}/api/org/acceptRequest/${orgId}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
  return response;
}

async function rejectRequest(orgId, userId){
  const jwt = localStorage.getItem("jwt");
  const response = await fetch(`${URL}/api/org/rejectRequest/${orgId}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
  return response;
}

export { getMyOrgs, getOrgs, joinOrg, createOrg, getOrgData, acceptRequest, rejectRequest}