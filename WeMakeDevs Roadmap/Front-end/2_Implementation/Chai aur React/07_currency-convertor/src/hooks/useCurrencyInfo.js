// Creating a custom hook

import {useEffect, useState} from "react";

// API URL -> 
const apiURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

// an unspoken rule: start hook names with 'use'
function useCurrencyInfo(currency='usd') { 
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`${apiURL + currency}.json`)
        .then(response => response.json())
        .then(data => {
            setData(data[currency]);
        });
    }, [currency]);
    return data;
}

export default useCurrencyInfo;