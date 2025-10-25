import { useState, useEffect } from "react";

export default function useGithubData(userName) {
    const [data, setData] = useState({});

    useEffect(() => {
        if(!userName) return;
        let ignore = false;
        fetch(`https://api.github.com/users/${userName}`)
            .then(response => response.json())
            .then(userData => {
                // console.log("User's github data");
                // console.log(userData);
                if (!ignore) {
                    setData(userData);
                }
            })
            .catch(error => console.error(error));
        return () => { ignore = true }
    }, [userName]);

    return data;
}