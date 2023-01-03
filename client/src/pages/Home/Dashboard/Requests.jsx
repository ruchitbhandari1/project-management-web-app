import React from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";
import { useEffect, useState, useCallback } from "react";
import { acceptRequest, rejectRequest, getRequests } from "../../../Fetch/Organizations";
import { Button } from "@material-tailwind/react";
import { socket } from "../../../constants/constants";

function Requests() {
  const { selectedOrgId } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const fetchRequests = useCallback(
    async function () {
      if (!selectedOrgId) return;
      const response = await getRequests(selectedOrgId);
      if(response.status !== "success"){
        return;
      }
      setRequests(response.data.requests);
    },
    [selectedOrgId]
  );
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  function handleAccept(userId) {
    async function accept() {
      const response = await acceptRequest(selectedOrgId, userId);
      if (response.status === "success") {
        fetchRequests();
      }
      socket.emit("newMember", { orgId: selectedOrgId, userId });
    }
    accept();
  }

  function handleReject(userId) {
    async function reject() {
      const response = await rejectRequest(selectedOrgId, userId);
      if (response.status === "success") {
        fetchRequests();
      }
    }
    reject();
  }

  useEffect(() => {
    socket.on("newRequest", (data) => {
      if (data.orgId === selectedOrgId) {
        fetchRequests();
      }
    });
  }, [fetchRequests, selectedOrgId])
  
  return (
    <div className="p-0">
      {requests &&
        requests.map((item, index) => (
          <div key={index} className="flex justify-between bg-gray-50 rounded-md border border-gray-300 p-3 m-2">
            <div className="flex flex-col">
              <div className="text-sm">{item.name}</div>
              <div className="text-xs">{item.email}</div>
            </div>
            <div className="flex gap-x-2">
              <Button color="green" onClick={() => handleAccept(item.userId)}>
                Accept
              </Button>
              <Button onClick={() => handleReject(item.userId)} color="red" variant="text" className="bg-red-50 active:bg-red-100 hover:bg-red-100">
                Reject
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Requests;
