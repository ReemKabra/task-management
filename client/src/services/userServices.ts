import React from "react";
import { Userclient } from "../models/Userclient";
import axios from "axios";
const URL="http://localhost:8080/users/";
class userService{
    get(){
        return axios.get(URL);
    }
    delete(id:number){
        return axios.delete(`${URL}/${id}`);
    }
    post(user:Userclient){
        return axios.post(URL+"post", user);
    }
    getById(id: number) {
        return axios.get(`${URL}/${id}`);
      }
      async login(username: string, password: string){
        try {
              const response = await axios.post(URL+"trylogin", { username: username, password: password });
              const token = response.data.token;
              this.storeToken(token);
              return true;
          } catch (error) {
              console.error("Login failed:", error);
              return false;
          }
      }
      storeToken(token:string) {
        sessionStorage.setItem("token", token);
      }
      getToken(){
        return sessionStorage.getItem("token");
      }
}
export default new userService;