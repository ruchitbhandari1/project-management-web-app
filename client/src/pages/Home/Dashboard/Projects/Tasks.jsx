import React from 'react'

function Tasks() {

    const tempTasks = [
        {
            name: 'Design a website',
        },
        {
            name: 'Fix bug',
        },{
            name: 'Improve performance',
        },{
            name: 'Deploy',
        }
    ]

  return (
    <div className=''>{
        tempTasks && tempTasks.map((task) => {
            return (
                <div key={task.name} className="bg-white rounded-md shadow-md p-2 m-1">
                    <h1 className="text-black">{task.name}</h1>
                </div>
            )
        })
    }</div>
  )
}

export default Tasks