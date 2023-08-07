import React from "react";
import { Taskclient } from "../models/Taskclient";
import axios from "axios";
import userServices from "./userServices";
const URL="http://localhost:8080/tasks/";
class taskService{
    get(){
        return axios.get(URL,{
            headers: {
                "Authorization":userServices.getToken()
            }
        }).catch(err => {
            console.error(err) 
         } )
    }
    delete(id:string){
        return axios.delete(URL+id,{
            headers: {
                "Authorization":userServices.getToken()
            }
        });
    }
    post(task:Taskclient){
        return axios.post(URL+"post", task,{
            headers: {
                "Authorization":userServices.getToken()
            }
        });
    }
    getById(id: string) {
        return axios.get(URL+id,{
            headers: {
                "Authorization":userServices.getToken()
            }
        });
      }
}
export default new taskService