import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { getMyOrgs } from "../../../Fetch/Organizations";
import JoinOrg from "./JoinOrg";
import CreateOrg from "./CreateOrg";
import { useCallback } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";
import { socket } from "../../../constants/constants";

function Organizations() {
  const [open, setOpen] = useState(true);
  const [obj, setObj] = useState([]);
  const { setSelectedOrgId, user } = useContext(AuthContext);

  const fetchOrgs = useCallback(async function () {
    const response = await getMyOrgs();
    setObj(response.data.orgs);
  }, []);

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

  function handleSelectOrg(orgId) {
    setSelectedOrgId(orgId);
    console.log("Selected Org Id:", orgId);
  }

  useEffect(() => {
    socket.on("newMember", (data) => {
      if (data.userId === user._id) {
        fetchOrgs();
      }
    })
  })

  return (
    <div className="mx-3 my-2">
      <Button
        fullWidth
        onClick={() => setOpen(!open)}
        variant="text"
        className="bg-blue-50 text-md text-left hover:bg-blue-100 text-blue-500"
      >
        Organizations
      </Button>
      {open && (
        <div className="rounded-lg mt-0.5 overflow-hidden bg-gray-100 ">
          {obj &&
            obj.map((item, index) => (
              <Button
                key={index}
                variant="text"
                onClick={() => handleSelectOrg(item._id)}
                className="px-4 text-left bg-gray-50 active:bg-gray-300 block w-full text-black hover:bg-gray-300 py-2"
              >
                {item.name}
              </Button>
            ))}
          <div className="flex justify-between p-2 gap-x-2">
            <JoinOrg />
            <CreateOrg fetchOrgs={fetchOrgs} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Organizations;
