import axios from "axios";
import keys from './keys';

const instance = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(keys.storageTokenKey)
    }
  });

export default instance;