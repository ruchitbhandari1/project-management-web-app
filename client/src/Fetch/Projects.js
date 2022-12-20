import { URL } from "../constants/constants";

async function getMyOrgProjects(orgId) {
    const response = await fetch(`${URL}/api/project/getMyOrgProjects/${orgId}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    }).then((res) => res.json());
    return response;
}

async function getProjectData(projectId) {
  const response = await fetch(`${URL}/api/project/get/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response;
}

async function addNewMember(projectId, memberId) {
  const response = await fetch(`${URL}/api/project/addMember`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      projectId,
      memberId,
    }),
  }).then((res) => res.json());
  return response;
}

async function removeMember(projectId, memberId) {
  const response = await fetch(`${URL}/api/project/removeMember`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      projectId,
      memberId,
    }),
  }).then((res) => res.json());
  return response;
}

async function addNewProject({ name, description, orgId }) {
  const response = await fetch(`${URL}/api/project/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      name,
      description,
      orgId,
    }),
  }).then((res) => res.json());
  return response;
}

export { getMyOrgProjects, getProjectData, addNewMember, removeMember, addNewProject };