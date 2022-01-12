import React from "react";
import { Link } from "react-router-dom";
// import {Mailto} from "react-mailto";
import "./homecss.css";
import { Form, Button, Card, Alert } from "react-bootstrap"
// var Mailto = require('react-mailto');
import Mailto from 'reactv16-mailto';
const Front = () => {
    return ( 
        <div style={{width:"100%"}}>
            <div>
            <nav >
                <Link style={{fontSize:"2vw"}} className="fro" to="/signup">SIGNUP</Link>
                <Link style={{fontSize:"2vw"}} className="fro" to="/login">LOGIN</Link>
                <Link style={{fontSize:"2vw"}} className="fro" to="/todo">MY TODO-LIST</Link>
            </nav>
            </div>
            <hr style={{backgroundColor:"white",height:"4px"}}></hr>
            <div style={{font:"message box",textAlign:"center",fontFamily:"Brush Script MT",fontSize:"8vh"}}>
                MY TODO APP
            </div>
            <hr style={{backgroundColor:"white",height:"2px"}}></hr>
            <div style={{display:"flex"}}>
                <img style={{height:"80vh",width:"60%"}} src="https://i.ibb.co/mJSCJ5z/todoo.jpg" alt="todo quote"/>
                    <div style={{display:"grid",height:"30px",alignContent:"center",border:"3px solid coral",borderStyle:"solid",
                    padding:"6vw",position:"relative",overflow:"none"}}>
                        <h3 style={{fontSize:"3vh"}}>ANY SUGGESTIONS?</h3>
                        <h5 style={{fontSize:"3vh"}}>REACH ME  
                     <Mailto email="reachdarshanv@gmail.com" obfuscate={true}>
                         @DARSHAN V
                     </Mailto>
                        </h5>
                    </div>
                    {/* <Card>
            <Card.Body>
            <div style={{display:"grid",height:"30px",alignContent:"center",border:"3px solid coral",borderStyle:"solid",
                    padding:"6vw",position:"relative",overflow:"none"}}>
            <h3 style={{fontSize:"3vh"}}>ANY SUGGESTIONS?</h3>
                        <h5 style={{fontSize:"3vh"}}>REACH ME  
                     <Mailto email="reachdarshanv@gmail.com" obfuscate={true}>
                         @DARSHAN V
                     </Mailto>
                        </h5>
            </div>
            </Card.Body>
            </Card> */}
            </div>
            {/* <Card>
            <Card.Body>
            <div style={{display:"grid",height:"30px",alignContent:"center",border:"3px solid coral",borderStyle:"solid",
                    padding:"6vw",position:"relative",overflow:"none"}}>
            <h3 style={{fontSize:"3vh"}}>ANY SUGGESTIONS?</h3>
                        <h5 style={{fontSize:"3vh"}}>REACH ME  
                     <Mailto email="reachdarshanv@gmail.com" obfuscate={true}>
                         @DARSHAN V
                     </Mailto>
                        </h5>
            </div>
            </Card.Body>
            </Card> */}
        </div>
     );
}
 
export default Front;