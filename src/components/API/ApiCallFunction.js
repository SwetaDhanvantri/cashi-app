import axios from 'axios';
import { API_URL_PATH, AUTHORIZATION_KEY, CALLING_APP, CALLING_SOURCE } from './config';
export async function callPostApi(fileName, requestData) 
{
    let url  = API_URL_PATH + fileName;
    


    // Define your headers
    const headers = { 'Content-Type': 'application/json','Authorization': AUTHORIZATION_KEY,
                      'calling_source': CALLING_SOURCE,'calling_app': CALLING_APP };
    try 
    {
        const result = await axios.post(url, requestData, { headers });
       return result.data;
    } 
    catch (err) 
    {
        
        console.error('API POST Error:', err.message);

        if (err.response && err.response.data) { return err.response.data; }

        // It's a good practice to return something when an error occurs
        return { status: false, message: err.message || 'Unknown error occurred' };
    }

    
}

export async function callGetApi(fileName,dataInputArr)
{
    const queryParams = new URLSearchParams(dataInputArr).toString();
      
    let url = API_URL_PATH + fileName;  
        url = queryParams ? `${url}?${queryParams}` : url;

    // Define your headers
    const headers = { 'Content-Type': 'application/json','Authorization': AUTHORIZATION_KEY,
                    'calling_source': CALLING_SOURCE,'calling_app': CALLING_APP };

    try 
    {
      const result = await axios.get(url,{ headers });
      return result.data;
    } 
    catch (err) 
    { 
        console.error('API POST Error:', err.message);

        if (err.response && err.response.data) { return err.response.data; }

        // It's a good practice to return something when an error occurs
        return { status: false, message: err.message || 'Unknown error occurred' };
    }

}
