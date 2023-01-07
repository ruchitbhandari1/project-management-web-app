import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { createOrg } from "../../../Fetch/Organizations";
import { useContext } from 'react';
import { AuthContext } from "../../../context/AuthProvider";

function CreateOrg({ fetchOrgs}) {

  const {setSelectedOrgId} = useContext(AuthContext)
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  function handleCreate(e) {
    e.preventDefault();
    if (!name) return;
    async function fetchCreateOrg() {
      const res = await createOrg(name);
      console.log(res.data.org);
      setOpen(!open);
      setName("");
      fetchOrgs();
      setSelectedOrgId(res.data.org._id);
    }
    fetchCreateOrg();
  }

  return (
    <>
      <Button
        fullWidth
        variant="text"
        className="bg-green-50 hover:bg-green-100"
        color="green"
        onClick={() => setOpen(!open)}
      >
        Create
      </Button>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>
          <h4>Create an organization</h4>
        </DialogHeader>
        <DialogBody className="flex flex-col">
          <form className="w-full flex gap-x-4" onSubmit={handleCreate}>
            <Input
              type="text"
              label="Organization name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <Button color="blue" onClick={handleCreate}>
                Create
              </Button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="justify-center">
          <Button
            onClick={() => setOpen(!open)}
            color="red"
            variant="text"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CreateOrg