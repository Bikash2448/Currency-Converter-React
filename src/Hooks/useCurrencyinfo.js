import axios from "axios";
import { useEffect, useState } from "react";

function useCurrencyinfo(currency){
    const [data,setdata]= useState({})
    useEffect(()=>{
        (async function datafatch(){
            const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`)
            const rates = res.data.rates;

            setdata(rates)
        })();
        
    },[currency])
    return data;
}
export default useCurrencyinfo;



