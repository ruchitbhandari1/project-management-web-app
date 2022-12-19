import React from "react";
import {AuthContext} from "../../../../context/AuthProvider";
import { useContext } from "react";

function ProjectList({ data }) {

  const { setSelectedProjectId } = useContext(AuthContext);

  function handleProjectClick(projectId) {
    setSelectedProjectId(projectId);
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
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
  );
}

export default ProjectList;
