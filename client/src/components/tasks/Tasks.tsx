import React,{useEffect,useState} from "react";
import taskServices from "../../services/taskServices";
import TaskItem from "./TaskItem";
import { Taskclient } from "../../models/Taskclient";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import NewTask from "./NewTask";
const socket = io("http://localhost:3001");
const Tasks=()=>{
  const navigate=useNavigate();
  const [isTaskAdd,setIsTaskAdd] =useState(false);
const [tasks,setTasks]=useState([]);
const [isTask,setIsTask]=useState(false);
const deleteTaskHandler = (id:string) => {
  taskServices.delete(id)
    .then(() => {
      setTasks((prevTasks) => prevTasks.filter((task:Taskclient) => task._id !== id));
    })
    .catch((error) => {
    });
    socket.emit("task_delete",tasks);
};
const fetchTasks= async ()=>{
  const response= await taskServices.get();
  if(response){
  setTasks(response.data);
  setIsTask(true);
  }
  else{
    navigate("/");
  }

}
useEffect(()=>{
  fetchTasks();
  socket.on("receive_taskDelete",(data)=>{
    fetchTasks();
  })
  socket.on("receive_taskAdd",(data)=>{
    fetchTasks();
  });  
},[socket]);
useEffect(() => {
  setTasks((prevTasks) => [...prevTasks].sort((a:Taskclient, b:Taskclient) => b.priority - a.priority));
}, [tasks]);

const AddTaskHandler=(task:Taskclient)=>
{
  taskServices.post(task);
  fetchTasks();
  socket.emit("task_add",tasks);
}
const changeIsTaskAddT=()=>{
  setIsTaskAdd(true);
}
const changeIsTaskAddF=(bol:boolean)=>{
  setIsTaskAdd(bol);
}
return(
  <React.Fragment>
      {isTask && !isTaskAdd && (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              {tasks.map((task:Taskclient, index:number) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  DeleteTaskHandler={deleteTaskHandler}
                  taskNumber={index + 1}
                />
              ))}
              <button className="btn btn-primary mt-3" onClick={changeIsTaskAddT}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {isTaskAdd && (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <NewTask isTaskAdd={changeIsTaskAddF} addTaskHandler={AddTaskHandler} />
            </div>
          </div>
        </div>
      )}

      {!isTask && <p>You didn't logged in please back home</p>}
    </React.Fragment>
  );
}
export default Tasks