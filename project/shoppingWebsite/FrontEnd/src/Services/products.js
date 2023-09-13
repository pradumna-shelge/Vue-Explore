import {ref} from 'vue'
import axios from 'axios';

const data=ref([])
const error=ref([])

export default function getApiData()
{
    data.value=[]
    error.value=[]
    const getData=async (url)=>{
        try{
            let res= await axios(url)
            data.value= res.data;
        }
        catch(err)
        {
            console.log("error", err);
            error.value=err.message;
        }
    }
    return {data, error, getData}
}