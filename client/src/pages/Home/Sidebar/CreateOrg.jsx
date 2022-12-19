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

function CreateOrg({ fetchOrgs}) {

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  function handleCreate(e) {
    e.preventDefault();
    if (!name) return;
    async function fetchCreateOrg() {
      await createOrg(name);
      setOpen(!open);
      setName("");
      fetchOrgs();
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