import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useState, useContext } from "react";
import { AuthContext } from '../../../../context/AuthProvider';
import { addNewProject } from '../../../../Fetch/Projects';
import { toast } from 'react-toastify';

function AddProject({ fetchOrgProjects }) {
  const { selectedOrgId } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!name) {
      toast("Please enter project name", { type: "error" });
      return;
    }
    async function createProject() {
      let newProject = {
        name,
        description,
        orgId: selectedOrgId,
      };
      const response = await addNewProject(newProject);
      if (response.status !== "success") {
        toast(response.message, { type: "error" });
        setName("");
        setDescription("");
        return;
      }
      toast("Project Created", { type: "success" });
      setName("");
      setDescription("");
      setOpen(false);
      fetchOrgProjects();
    }
    createProject();
  }

  return (
    <div className="m-4">
      <Button
        fullWidth
        color="amber"
        variant="gradient"
        onClick={() => setOpen(!open)}
      >
        Create New Project
      </Button>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>
          <h4>Create New Project</h4>
        </DialogHeader>
        <DialogBody className="flex flex-col">
          <form className="w-full flex flex-col" onSubmit={handleCreate}>
            <Input
              type="text"
              label="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br className="my-2" />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <Button color="blue" className="mt-4" onClick={handleCreate}>
                Create
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

export default AddProject