import axios from "axios";

//create an axios instance

export const request = axios.create({
  baseURL: process.env.REACT_APP_RESOURCE_URI,
});
