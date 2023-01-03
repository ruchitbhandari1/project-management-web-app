import React from "react";
import { AuthContext } from "../../../../../context/AuthProvider";
import { useContext, useState, useEffect, useCallback } from "react";
import { getAllTasks, toggleCompleted, deleteTask } from "../../../../../Fetch/Tasks";
import AddTask from "./AddTask";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { socket } from "../../../../../constants/constants";

function Tasks() {
  const { selectedProjectId } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(
    async function fetchTasks() {
      if (!selectedProjectId) return;
      const response = await getAllTasks(selectedProjectId);
      setTasks(response.data.tasks);
    },
    [selectedProjectId]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    socket.on("insert", (data) => {
      fetchTasks();
    });
    socket.on("update", (data) => {
      fetchTasks();
    });
    socket.on("delete", (data) => {
      fetchTasks();
    });
  });

  async function handleChange(taskId) {
    setTasks((prev) => {
      const newTasks = prev.map((task) => {
        if (task._id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      newTasks.sort((a, b) => {
        if (a.completed && !b.completed) {
          return 1;
        }
        if (!a.completed && b.completed) {
          return -1;
        }
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 0;
      });
      
      return newTasks;
    })
    await toggleCompleted(taskId);
    socket.emit("update", "update");
  }

  async function handleDelete(event, taskId) {
    event.stopPropagation();
    setTasks((prev) => {
      return prev.filter((task) => task._id !== taskId);
    })
    await deleteTask(taskId);
    socket.emit("delete", "delete");
  }

  return (
    <div className="w-3/5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-md font-extralight italic pl-3">Tasks</h1>
        <AddTask fetchTasks={fetchTasks} />
      </div>
      <div className="">
        {tasks &&
          tasks.map((task) => {
            return (
              <div
                key={task.name}
                onClick={() => handleChange(task._id)}
                className="bg-white cursor-pointer hover:bg-gray-100 active:bg-gray-200  items-center flex flex-row justify-between rounded-md shadow-md p-2 m-1"
              >
                {/* <Checkbox
                  defaultChecked={task.completed}
                  onChange={() => handleChange(task._id)}
                /> */}
                <h1
                  className={`text-black decoration-gray-700 decoration-2 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.name}
                </h1>
                <IconButton onClick={(e) => handleDelete(e, task._id)} size="sm" variant="text" color="gray" >
                  X
                </IconButton>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Tasks;
