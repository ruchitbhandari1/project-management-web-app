import React from "react";
import {AuthContext} from "../../../../context/AuthProvider";
import { useContext } from "react";
import AddProject from "./AddProject";

function ProjectList({ data, fetchOrgProjects }) {
  const { setSelectedProjectId } = useContext(AuthContext);

  function handleProjectClick(projectId) {
    setSelectedProjectId(projectId);
  }

  return (
    <div>
      <div className="flex">
        <AddProject fetchOrgProjects={fetchOrgProjects} />
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 pb-4">
        {data.map((project) => {
          return (
            <div
              key={project._id}
              onClick={() => handleProjectClick(project._id)}
              className=" h-32 rounded-md shadow-md bg-white hover:shadow-lg p-4 cursor-pointer"
            >
              <h1 className="text-black">{project.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;
