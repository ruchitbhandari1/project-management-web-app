import React from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { useContext, useState, useEffect, useCallback } from "react";
import { getProjectData } from "../../../../Fetch/Projects";
import { Button } from "@material-tailwind/react";
import Tasks from "./Tasks/Tasks";
import Members from "./Members/Members";

function ProjectDetail() {
  const { selectedProjectId, setSelectedProjectId } = useContext(AuthContext);
  const [project, setProject] = useState({});

  const fetchProjectData = useCallback(async function () {
    if (!selectedProjectId) return;
    const response = await getProjectData(selectedProjectId);
    setProject(response.data.project);
  }, [selectedProjectId])

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  function handleBack() {
    setSelectedProjectId(null);
  }

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
            <div className="w-2/5">
                <Members data={project} fetchProjectData={fetchProjectData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
