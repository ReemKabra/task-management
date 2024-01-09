import React, { useState, useRef } from "react";
import taskServices from "../../services/taskServices";
import "./NewTask.css"
import { Taskclient } from "../../models/Taskclient";
import { useNavigate } from "react-router-dom";
type Props = {
  isTaskAdd: (bol: boolean) => void;
  addTaskHandler: (task: Taskclient) => void;
};
const NewTask = ({ isTaskAdd, addTaskHandler }: Props) => {
  const navigate = useNavigate();
  const enterdTitleRef = useRef<HTMLInputElement>(null!);
  const enterdPriorityRef = useRef<HTMLInputElement>(null!);
  const enterdDescriptonRef = useRef<HTMLInputElement>(null!);
  const[isTitle,setIsTitle]=useState(true);
  const[isPriority,setIsPriority]=useState(true);
  const onChangeHandler=(e:any)=>{
    if(e.target.name==="title")
    {
      setIsTitle(true);
    }
    if(e.target.name==="priority"){
      setIsPriority(true); 
    }
  }
  const AddHandle = () => {
    const enterdTitle = enterdTitleRef.current?.value;
    const enterdDescription = enterdDescriptonRef.current?.value;
    const enterdPriority = enterdPriorityRef.current?.value;
    const task = new Taskclient(
      "",
      enterdTitle,
      enterdDescription,
      Number(enterdPriority)
    );
    if(enterdTitle===""){
      setIsTitle(false);
    }
    if(Number(enterdPriority)<1||Number(enterdPriority)>5)
    {
      setIsPriority(false);
    }
    else if(Number(enterdPriority)>=1||Number(enterdPriority)<=5&&enterdTitle!=""){
    setIsPriority(true);
    setIsTitle(true);
    addTaskHandler(task);
    alert("added tasks succesfully");
    isTaskAdd(false);
    }
  };
  const BackHandler = () => {
    isTaskAdd(false);
  };
  return (
    <React.Fragment>
      <label className="custom-label" >Title:</label>
      <input
        className="form-control"
        name="title"
        required
        type="text"
        ref={enterdTitleRef}
        onChange={onChangeHandler}
      />
      {!isTitle&&<p className="text-danger">Title is required</p>}
      <label className="custom-label">Priority:</label>
      <input
        required
        name="priority"
        min={1}
        max={5}
        className="form-control"
        type="number"
        ref={enterdPriorityRef}
        onChange={onChangeHandler}
      />
      {!isPriority&&<p className="text-danger">Priority needs to be between 1 to 5</p>}
      <label className="custom-label">Description:</label>
      <input className="form-control" type="text" ref={enterdDescriptonRef} />
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" type="button" onClick={AddHandle}>
          Add
        </button>
        <button onClick={BackHandler}>Back</button>
      </div>
    </React.Fragment>
  );

};
export default NewTask;
