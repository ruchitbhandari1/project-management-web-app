import React from 'react'
import { AuthContext } from '../../../../context/AuthProvider'
import { useContext, useState, useCallback, useEffect } from 'react'
import {getMyOrgProjects} from '../../../../Fetch/Projects'
import ProjectList from './ProjectList'
import ProjectDetail from './ProjectDetail'

function Projects() {

  const { selectedOrgId, selectedProjectId } = useContext(AuthContext);
  const [projects, setProjects] = useState([])

  const fetchOrgProjects = useCallback(async () => {
    if (!selectedOrgId) return
    const response = await getMyOrgProjects(selectedOrgId)
    setProjects(response.data.projects)
  }, [selectedOrgId])

  useEffect(() => {
    fetchOrgProjects()
  }, [fetchOrgProjects])

  const tempProjects = [
    {
      _id: 1,
      name: 'Project 1'
    },
    {
      _id: 2,
      name: 'Project 2'
    },
    {
      _id: 3,
      name: 'Project 3'
    }]

  return (
    <div className="bg-gray-50">
      {selectedProjectId ? (
        <ProjectDetail />
      ) : (
        tempProjects && <ProjectList data={projects} />
      )}
    </div>
  );
}

export default Projects