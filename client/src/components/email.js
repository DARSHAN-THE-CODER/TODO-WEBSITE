import { Button } from "react-bootstrap";
import React from "react";
import { useAuth } from "../contexts/AuthFunctions";

const Verify = () => {
    const {emailVeri,isve} = useAuth();
    async function send ()
    {
        try{
            const y=await emailVeri();
            console.log(y)
            const z=await isve();
            console.log(z)
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <button onClick={send}>SEND </button>
     );
}

export default Verify;