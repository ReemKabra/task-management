import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link, useNavigate }from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import Tasks from './components/tasks/Tasks';
import { Home } from './components/Home';
function App() {
  const [isLogin,setIsLogIn]=useState(false);
  useEffect(() =>{
    if(sessionStorage.getItem("token")){
      setIsLogIn(true);
    }
    else{
      setIsLogIn(false);
    }
   

  },[])
  const LogOutHandler=()=>{
    sessionStorage.removeItem('token'); 
    setIsLogIn(false);
  }
  const LogInHandler=()=>{
    setIsLogIn(true);
  }
  return (
    <div
    className="app-container"
  >
    <Router>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Reem's
          </Link>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/signup" >
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={LogInHandler} >
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                {isLogin&&<Link className="nav-link" to="/"  onClick={LogOutHandler}>
                  Logout
                </Link>}
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/taskslist" element={<Tasks />} />
        <Route path='/' element={<Home />} />
      </Routes>
   
    </Router>
    </div>
);
}

export default App;
