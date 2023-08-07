import React,{useEffect,useState,useRef} from "react";
import userServices from "../services/userServices";
import { Userclient } from "../models/Userclient";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate=useNavigate();
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await userServices.get();
    if(response)
     setUsers(response.data);
     else
     console.error("sign up failed");
  };

    useEffect(() => {
      fetchUsers()
    }, []);
    
    const currentUserNameRef = useRef<HTMLInputElement>(null!);
    const currentPasswordRef = useRef<HTMLInputElement>(null!);
    const currentEmailRef = useRef<HTMLInputElement>(null!);
    const currentFullNameRef = useRef<HTMLInputElement>(null!);
    const[isExists, setIsExists] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const onChangeHandler=(e:any)=>{
      if(e.target.name==="username")
      setIsExists(false);
    else if(e.target.name==="password")
    {
      setIsPassword(true);
    }
    }
    const signupHandler = () => {
      let enterdUserName=currentUserNameRef.current?.value ;
      const enterdEmail=currentEmailRef.current?.value;
      const enterdFullName= currentFullNameRef.current?.value
      const enterdPassword= currentPasswordRef.current?.value;
      const user = users.find((user:Userclient) => user.username === enterdUserName);
      if(user) {
          setIsExists(true); 
      }
      if(enterdPassword.length<6){
        setIsPassword(false); 
      }
      else if(enterdPassword.length>6&& !user) {
        setIsExists(false);
        setIsPassword(true);
          enterdUserName=currentUserNameRef.current?.value ;
          console.log(enterdEmail,enterdFullName,enterdUserName,enterdPassword)
          userServices.post(new Userclient(enterdUserName, enterdPassword,enterdEmail,enterdFullName));
          alert("signed up successfully")
          navigate("/");
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
                required
                name="username"
                type="text"
                className="form-control"
                id="username"
                ref={currentUserNameRef}
                onChange={onChangeHandler}
              />
            </div>
            {isExists && <p className="text-danger">This username already exists</p>}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                required
                name="password"
                type="password"
                className="form-control"
                id="password"
                ref={currentPasswordRef}
                onChange={onChangeHandler}
              />
            </div>
            {!isPassword && <p className="text-danger">Invalid Password</p>}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                ref={currentEmailRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullname">Fullname:</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                ref={currentFullNameRef}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" type="button" onClick={signupHandler}>
                Sign up
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
