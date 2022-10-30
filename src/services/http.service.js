import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
const httService = {
  get: axios.get,
};

export default httService;
