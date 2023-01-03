import React from 'react'
import { AuthContext } from '../../../../context/AuthProvider'
import { useContext } from 'react'
import ProjectList from './ProjectList'
import ProjectDetail from './ProjectDetail'

function Projects() {

  const { selectedProjectId } = useContext(AuthContext);


  return (
    <div className="bg-gray-50">
      {selectedProjectId ? (
        <ProjectDetail />
      ) : (
        <ProjectList />
      )}
    </div>
  );
}

export default Projects