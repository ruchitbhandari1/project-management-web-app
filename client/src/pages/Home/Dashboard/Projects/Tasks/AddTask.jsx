import React from "react";
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
import { AuthContext } from "../../../../../context/AuthProvider";
import { addNewTask } from "../../../../../Fetch/Tasks";
import { toast } from "react-toastify";
import { socket } from "../../../../../constants/constants";

function AddTask({fetchTasks}) {

  const {selectedProjectId} = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")

  function handleCreate(){
    if(!name){
      toast("Please enter task name", {type: "error"})
      return
    }
    const newTask = {
      name,
      description,
      projectId: selectedProjectId
    }
    async function createTask(){
      setLoading(true)
      const response = await addNewTask(newTask);
      if(response.status !== "success"){
        setLoading(false)
        toast(response.message, {type: "error"})
        setName("")
        setDescription("")
        return
      }
      setLoading(false)
      setName("")
      setDescription("")
      setOpen(false)
      fetchTasks()
      socket.emit("insert", "insert")
    }
    createTask()
  }

  return <div className="flex">
      <Button
        color="amber"
        size="sm"
        variant="filled"
        onClick={() => setOpen(!open)}
        className="mr-2 mb-2"
      >
        Add Task
      </Button>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>
          <h4>Create New Task</h4>
        </DialogHeader>
        <DialogBody className="flex flex-col">
          <form className="w-full flex flex-col" onSubmit={handleCreate}>
            <Input
              type="text"
              label="Task Name"
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
              <Button disabled={loading} color="blue" className="mt-4" onClick={handleCreate}>
                {loading ? "Adding" : "Add"}
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
}
export default AddTask;
