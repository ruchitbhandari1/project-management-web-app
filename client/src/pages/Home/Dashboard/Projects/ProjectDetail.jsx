import React from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { useContext, useState, useEffect, useCallback } from "react";
import { getProjectData, deleteProject } from "../../../../Fetch/Projects";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Tasks from "./Tasks/Tasks";
import Members from "./Members/Members";
import { toast } from "react-toastify";
import { socket } from "../../../../constants/constants";

function ProjectDetail() {
  const { selectedProjectId, setSelectedProjectId, user } =
    useContext(AuthContext);
  const [project, setProject] = useState({});
  const [open, setOpen] = useState(false);

  const fetchProjectData = useCallback(
    async function () {
      if (!selectedProjectId) return;
      const response = await getProjectData(selectedProjectId);
      setProject(response.data.project);
    },
    [selectedProjectId]
  );

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  function handleBack() {
    setSelectedProjectId(null);
  }

  function handleDelete() {
    deleteProject(selectedProjectId);
    socket.emit("projectDeleted", selectedProjectId);
    setSelectedProjectId(null);
    toast.success("Project deleted");
  }

  function isAdmin() {
    if (!project.admin) return;
    return project.admin.some((curr) => curr._id === user._id);
  }

  useEffect(() => {
    socket.on("projectDeleted", (projectId) => {
      if (projectId === selectedProjectId) {
        setSelectedProjectId(null);
      }
    });
  });

  return (
    <div>
      {project && (
        <div>
          <Button
            size="sm"
            className="m-4 font-normal px-3 py-2"
            onClick={handleBack}
            color="gray"
          >
            Back
          </Button>
          <h1 className="text-4xl text-black font-extrabold ml-8">
            {project.name}
          </h1>
          <hr className="border mt-6 border-gray-400" />
          <div className="flex flex-row p-4">
            <Tasks />
            <div className="w-2/5 flex flex-col justify-between min-h-80">
              <Members data={project} fetchProjectData={fetchProjectData} />
              {isAdmin() && (
                <Button
                  fullWidth
                  variant="text"
                  color="red"
                  className="p-2 m-2"
                  onClick={() => setOpen(true)}
                >
                  Delete Project
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      <Dialog className="w-12" open={open} handler={() => setOpen(!open)}>
        <DialogBody>
          <div className="flex flex-col w-full">
            <h1 className="text-xl italic text-gray-900 mx-auto">
              Are you sure you want to delete {project.name} project?
            </h1>
            <div className="mt-4 mx-auto">
              <Button
                color="red"
                onClick={() => setOpen(false)}
                variant="text"
                className=" mr-3"
              >
                Cancel
              </Button>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default ProjectDetail;
