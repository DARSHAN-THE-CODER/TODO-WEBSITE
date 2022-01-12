import React from "react";
import { Link } from "react-router-dom";
// import {Mailto} from "react-mailto";
import "./homecss.css";
// var Mailto = require('react-mailto');
import Mailto from 'reactv16-mailto';
const Front = () => {
    return ( 
        <div>
            <div>
            <nav>
                <Link className="fro" to="/signup">SIGNUP</Link>
                <Link className="fro" to="/login">LOGIN</Link>
                <Link className="fro" to="/todo">MY TODO-LIST</Link>
            </nav>
            </div>
            <hr style={{backgroundColor:"white",height:"4px"}}></hr>
            <div style={{display:"flex"}}>
                <img style={{height:"100vh"}} src="https://i.ibb.co/mJSCJ5z/todoo.jpg" alt="todo quote"/>
                <div style={{paddingTop:"40vh"}}>
                    <div style={{display:"grid",height:"30px",alignContent:"center",border:"3px solid coral",borderStyle:"solid",padding:"6vw"}}>
                        <h3>ANY SUGGESTIONS?</h3>
                        <h5>REACH ME  
                     <Mailto email="reachdarshanv@gmail.com" obfuscate={true}>
                         @DARSHAN V
                     </Mailto>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Front;