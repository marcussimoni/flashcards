import axios from "axios";
import { getToken, logout } from "./auth";
import PubSub from 'pubsub-js'

const api = axios.create({
  baseURL: "http://localhost:8080/flashcards/resources"
});

api.interceptors.response.use(response => {
  
  publish(false)
  
  return response;
  
}, error => {
  
  publish(false)

  if(!error.response){
    logout()
    window.href = "/"
    return
  }

  if(error.response.status === 403){
    logout()
    window.href = "/"
  }

  return Promise.reject(error.response)
})

api.interceptors.request.use(async config => {
  
  publish(true)

  const token = getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const publish = (value) => {
  PubSub.publish('loading', value)
}

export default api;