import React, { useRef, useState, useEffect } from "react";
import userServices from "../services/userServices";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate }from "react-router-dom"
import { Userclient } from "../models/Userclient";
export default function Login() {
  const navigate=useNavigate(); 
  const fetchUsers = async () => {
    const response = await userServices.get();
    setUsers(response.data);
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
 
  const currentUserNameRef = useRef<HTMLInputElement>(null!);
  const currentPasswordRef = useRef<HTMLInputElement>(null!);
  const[isExists, setIsExists] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const onChangeHandler=(e:any)=>{
    if(e.target.name==="username")
    setIsExists(true);
  else if(e.target.name==="password")
  {
    setIsPassword(true);
  }
  }
  const LoginHandler = () => {
    const enterdUserName=currentUserNameRef.current?.value;
    const enterdPassword=currentPasswordRef.current?.value ;
    const user = users.find((user:Userclient) => user.username === enterdUserName);
    if(!user) {
      setIsExists(false); 
  }
 if(enterdPassword.length<6){
    setIsPassword(false); 
    
  }
  else if(enterdPassword.length>6&& user){
      userServices.login(enterdUserName,enterdPassword).then((loginSucceeded) => {
       if(loginSucceeded){
       alert("loginSucceeded");
        navigate("/taskslist"); 
       }
        else
        alert("Login failed");
      } 
      );
    }
  };
  const BackHandler=() => {
    navigate("/");
  }
  return (
    <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              required
              name="username"
              className="form-control"
              id="username"
              ref={currentUserNameRef}
              onChange={onChangeHandler}
            />
          </div>
          {!isExists && <p className="text-danger">This username doesnt exist</p>}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              name="password"
              className="form-control"
              id="password"
              ref={currentPasswordRef}
              onChange={onChangeHandler}
            />
          </div>
          {!isPassword && <p className="text-danger">Invalid Password</p>}
          <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" type="button" onClick={LoginHandler}>
            Login
          </button>
              <button className="btn btn-secondary" type="button" onClick={BackHandler}>
                Back
              </button>
            </div>
         
        </form>
      </div>
    </div>
  </div>
  );
}
