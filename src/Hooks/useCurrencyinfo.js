import axios from "axios";
import { useEffect, useState } from "react";

function useCurrencyinfo(){
    const [data,setdata]= useState({})
    useEffect(()=>{
        (async function datafatch(){
            const res = await axios.get(`https://api.frankfurter.app/currencies`)
            const rates = res.data;
            setdata(rates)
        })();
        
    },[])
    return data;
}
export default useCurrencyinfo;



