import { useNavigate } from "react-router-dom";
import { Taskclient } from "../../models/Taskclient";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import taskServices from "../../services/taskServices";
import { FaTrash } from 'react-icons/fa';
import "./TaskItem.css";
type Props={
task:Taskclient,
DeleteTaskHandler:(id:string) =>void,
completedTasks:(task:Taskclient,isChecked:boolean)=>void
taskNumber:number,
};
export default function taskItem({ task, DeleteTaskHandler,taskNumber,completedTasks}:Props) {
  const handleDelete=()=>{
    DeleteTaskHandler(task._id);
  }
  const CheckHandler=(event:any)=>{
    const isChecked = event.target.checked;
      completedTasks(task,isChecked);
  }
    return (
      <React.Fragment>
      <div className="task">
        <div className="col-md-2">
          <h1>{taskNumber}</h1>
        </div>
        <div className="col-md-10">
          <h5>title: {task.title}</h5>
          <h5>description: {task.description}</h5>
          <h5>priority: {task.priority}</h5>
          <button onClick={handleDelete}> <FaTrash /> </button>
          <input type="checkbox" onClick={CheckHandler}></input>
        </div>
      </div>
    </React.Fragment>
     
    );
  }