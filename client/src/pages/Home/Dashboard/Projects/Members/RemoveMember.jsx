import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AuthContext } from "../../../../../context/AuthProvider";
import { useContext, useState } from "react";
import { removeMember } from "../../../../../Fetch/Projects";
import { toast } from "react-toastify";

function RemoveMember({data, fetchProjectData}) {
    const { user } = useContext(AuthContext);

    const { selectedProjectId } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleRemove(memberId){
        setIsLoading(true);
        async function insider(){
            const response = await removeMember(selectedProjectId, memberId);
            if(response.status !== "success"){
                setIsLoading(false);
                toast(response.message, {type: "error"})
                return
            }
            setIsLoading(false);
            toast("User removed successfully", {type: "success"})
            setOpen(false);
            fetchProjectData();
        }
        insider();
    }

  return (
    <div className="">
      <Button
        onClick={() => setOpen(!open)}
        size="sm"
        color="red"
        variant="text"
        className="flex bg-red-50 active:bg-red-100 ml-auto text-xs px-3 py-2"
      >
        Remove
      </Button>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>
          <h4>Remove Member</h4>
        </DialogHeader>
        <DialogBody className="flex flex-col">
          <div className="">
            {data &&
              data
                .filter((member) => member._id !== user._id)
                .map((member) => (
                  <div
                    key={member._id}
                    className="flex bg-gray-100 hover:bg-gray-200 px-3 py-1 my-1 rounded-lg justify-between items-center"
                  >
                    <p className="text-black font-bold">{member.name}</p>
                    <Button
                      color="red"
                      variant="text"
                      size="sm"
                      ripple={false}
                      onClick={() => handleRemove(member._id)}
                      disabled={isLoading}
                    >
                        {isLoading ? "Removing..." : "Remove"}
                    </Button>
                  </div>
                ))}
          </div>
        </DialogBody>
        <DialogFooter className="justify-center">
          <Button onClick={() => setOpen(!open)} color="red" variant="text">
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default RemoveMember;
