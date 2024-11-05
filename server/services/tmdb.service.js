import axios from "axios";
import { Env_Vars } from '../config/envVars.js';

export const fetchFromTMDB = async (url) =>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + Env_Vars.TMDB_API_KEY
        }
    };

    const response = await axios.get(url,options);
    if(response.status !== 200) {
        throw new Error(response.statusText, "Fail to fetch Data from TMDB");
    }
    return response.data;
}