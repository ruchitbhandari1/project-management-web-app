import React from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import { AuthContext } from "../../../../../context/AuthProvider";
import { useContext, useState, useCallback, useEffect } from "react";
import { getUserByEmail } from '../../../../../Fetch/Users';
import { addNewMember, temp } from '../../../../../Fetch/Projects';
import { toast } from 'react-toastify';

function AddMember({fetchProjectData}) {

    const { selectedProjectId } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleAdd(e){
        e.preventDefault();
        if(!email) return;
        async function insider(){
            setIsLoading(true);
            const response = await getUserByEmail(email);
            if(response.status !== "success"){
                setIsLoading(false);
                toast(response.message, {type: "error"})
                setEmail("");
                return
            }
            const member = response.data.user;
            const response2 = await addNewMember(selectedProjectId, member._id);
            if(response2.status !== "success"){
                setIsLoading(false);
                toast(response2.message, {type: "error"})
                setEmail("");
                return
            }
            setIsLoading(false);
            toast("User added successfully", {type: "success"})
            setEmail("");
            setOpen(false);
            fetchProjectData();
        }
        insider();
    }

  return (
    <div className="mr-2">
      <Button
        onClick={() => setOpen(!open)}
        size="sm"
        className="flex ml-auto text-xs px-3 py-2"
      >
        Add
      </Button>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>
          <h4>Add Member</h4>
        </DialogHeader>
        <DialogBody className="flex flex-col">
          <form className="w-full flex gap-x-4" onSubmit={handleAdd}>
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Button color="blue" disabled={isLoading} onClick={handleAdd}>
                {isLoading ? "Adding..." : "Add"}
              </Button>
            </div>
          </form>
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

export default AddMember