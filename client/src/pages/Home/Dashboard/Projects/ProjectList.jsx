import React from "react";
import {AuthContext} from "../../../../context/AuthProvider";
import { useContext, useCallback, useEffect } from "react";
import AddProject from "./AddProject";
import { getMyOrgProjects } from "../../../../Fetch/Projects";
import { useState } from "react";
import { Progress } from "@material-tailwind/react";

function ProjectList() {
  const { selectedOrgId, setSelectedProjectId } = useContext(AuthContext);
  const [projects, setProjects] = useState([])

  function handleProjectClick(projectId) {
    setSelectedProjectId(projectId);
  }

  const fetchOrgProjects = useCallback(async () => {
    if (!selectedOrgId) return;
    const response = await getMyOrgProjects(selectedOrgId);
    setProjects(response.data.projects);
  }, [selectedOrgId]);

  useEffect(() => {
    fetchOrgProjects();
  }, [fetchOrgProjects]);

  return (
    <div>
      <div className="flex">
        <AddProject fetchOrgProjects={fetchOrgProjects} />
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 pb-4">
        {projects.map((project) => {
          return (
            <div
              key={project._id}
              onClick={() => handleProjectClick(project._id)}
              className="flex flex-col justify-between h-32 rounded-md shadow-md bg-white hover:shadow-lg p-4 cursor-pointer"
            >
              <h1 className="text-black text-2xl font-bold ">{project.name}</h1>
              {project.totalTasks !== 0 && <Progress value={(project.completedTasks/project.totalTasks) * 100} color="deep-purple" label={true} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;
