import React from "react";
import  { useState } from "react";
import { useEffect } from "react";
import { Button , Alert} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthFunctions.js";
import axios from "axios";
import { AnimatedLineProgressBar } from "@frogress/line";
import  "./homecss.css";

function Task({ task , index, completeTask , removeTask}) {
    
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" ,textDecorationStyle:task.completed?"single":""}}>
{/* ,textDecorationColor:task.completed?"white":"" */}
            <table border="3" table-layout ="fixed">
                <tbody>
                <tr>
                    <td width="100%" style={{textDecorationColor:task.completed?" ":" ",color:task.completed?"green":" "}}>{task.title}</td>
                    <td width="auto"><button style={{ background: "black" , bordercolor:"white" , color:task.title==="l"?"white":"white" }} onClick={() => removeTask(index)}>-</button></td>
                    <td width="auto" bordercolor="white"><button onClick={() => completeTask(index)} >COMPLETE</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

function CreateTask({ addTask }) {
    window.scrollTo("",window.screen.height);
    const [value, setValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        if(value===" "){
            console.log("NULL")
        }
        addTask(value);
        setValue("");
    }
    
    return (
        <div style={{width:"100vw"}}>
        <form onSubmit={handleSubmit}  >
            <input
                type="text"
                className="inputk"
                value={value}
                style={{color:"black"},{backgroundColor:"black"}}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
                required
            />
            <input className="btinp" type="submit" />
            {/* <button className="btn1" type="submit" style={{fontSize:"20px"}} value="+" onSubmit={handleSubmit}>+</button> */}
        </form>
        </div>
    );
}

const Home=(props)=>{
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [mes,setMes] = useState("")
    const {currentUser} = useAuth();
    const [task,setTask]=useState([

    ]);
    const [done,setDone]=useState("");
    const uid=currentUser.uid;
    useEffect(()=>{
        window.scrollTo("",window.screen.height);
        axios(
            {
            method:"GET",
            url:`/api/getlist/${uid}`,
            }
        )
        .then((res)=>{
            setTask(res.data);
            })
        .catch((e)=>{
            setMes("CANT FETCH YOUR TODO LIST !! PLEASE REFRESH THE PAGE TO TRY AGAIN ")
            // setTimeout(()=>{
            //     setMes("");
            // },3000);
        })
    },[uid])
    
// ---------------------- TO ADD TASK -------------------------------------
    const addTask = title => {
        const newTasks = [...task, { title, completed: false }];
        const x={uid:currentUser.uid,add:newTasks}
        axios(
            {
            method:"POST",
            url:'/api/addtask',
            data:x
            }
        )
        .then((res)=>{
            setTask(newTasks);
            window.scrollTo("",window.screen.height);
            setDone("NEW TASK ADDED SUCCESSFULLY TO YOUR LIST !")
            setTimeout(()=>{
                setDone("");
            },3000);
        })
        .catch((e)=>{
            window.scrollTo("",window.screen.height);
            setMes("KINDLY REFRESH THE PAGE AND TRY AGAIN !")
            setTimeout(()=>{
                setMes("");
            },3000);
            history.push("/todo")
        })
        
    };

// ----------------------TO COMPLETE TASK --------------------------------
    const completeTask = index => {
        const newTasks = [...task];
        newTasks[index].completed = true;
        const z={uid:currentUser.uid,add:newTasks};
        axios(
            {
            method:"POST",
            url:'/api/addtask',
            data:z
            }
        )
        .then((res)=>{
            setTask(newTasks);
            window.scrollTo("",window.screen.height);
            setDone("GREAT !! YOU HAVE SUCCESSFULLY COMPLETED THE TASK ")
            setTimeout(()=>{
                setDone("");
            },3000);
        })
        .catch((e)=>{
            window.scrollTo("",window.screen.height);
            setMes("KINDLY REFRESH THE PAGE AND TRY AGAIN !! ")
            setTimeout(()=>{
                setMes("");
            },3000);
        })

    };
// -----------------------TO REMOVE TASK ---------------------------------
    const removeTask = index => {
        const newTasks = [...task];
        newTasks.splice(index, 1);
        const p={uid:currentUser.uid,add:newTasks}
        axios(
            {
            method:"POST",
            url:'/api/addtask',
            data:p
            }
        )
        .then((res)=>{
            setTask(newTasks);
            window.scrollTo("",window.screen.height);
            setDone("TASK REMOVED  FROM THE LIST !!")
            setTimeout(()=>{
                setDone("");
            },3000);
        })
        .catch((e)=>{
            window.scrollTo("",window.screen.height);
            setMes("KINDLY REFRESH THE PAGE AND TRY AGAIN !! ")
            setTimeout(()=>{
                setMes("");
            },3000);
        })
     
    };

    // console.log(task.length);

//--------------------------IT KEEPS TRACK ON REMAINING TASKS ----------------------
    useEffect(() => { 
        setTasksRemaining(task.filter(task => !task.completed).length);
        if(task.length>0){
            setPer(tasksRemaining*100/task.length);
        }
        else{
            setPer(0);
        }
    },[task,tasksRemaining]);
    useEffect(()=>{
        window.scrollTo("",window.screen.height);
        if(tasksRemaining===0){
            window.scrollTo("",window.screen.height);
            setDone("YOU COMPLETED ALL THE TASKS !!")
        }
        else{
            setDone("")
        }
    },[tasksRemaining])

    const [per,setPer]=useState(0);
    const history=useHistory();
    const { logout } = useAuth()

    // console.log(currentUser.uid);
    async function handleLogout() {
        // setError("")
    
        try {
          await logout()
            history.push("/login")
          } catch(e) {
          setMes("Failed to log out")
        }
      }
    // const [noo,setNoo]=useState(" ");

    // if(!navigator.onLine){
    //         setNoo("OOPS !! YOU ARE OFFLINE")
    // }
    // else{
    //         setNoo()
    // }
    
    return(
    <div>
    <div className="heading">
             -------------- YOUR TODO LIST IS HERE --------------
    </div>
    <hr style={{backgroundColor:"white",height:"2px"}}></hr>
    <div className="w-100 text-center mt-2" >
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        <div className="heading2">{currentUser.email}</div>
    </div>
    {/* <div className="heading2">{currentUser.email}</div> */}
    <hr style={{backgroundColor:"white",height:"2px"}}></hr>
    <div >PENDING TASKS [{tasksRemaining}]</div>
    <hr style={{backgroundColor:"white",height:"2px"}}></hr>    

    <div className="home1">

        {task.map((task, index) => (
                        <Task
                            task={task}
                            index={index}
                            removeTask={removeTask}
                            completeTask={completeTask}
                            key={index}
                        /> ))}
    </div>

    <div className="create-task" >
                    <CreateTask addTask={addTask} />
    </div>

    <hr></hr>
    <div className="op">
        YOUR PROGRESS !!
        <AnimatedLineProgressBar percent={100-per} 
        transition={{ easing: 'backIn'}} 
        progressColor="linear-gradient(to right, #78abe9, #74dad8, #ec7cac)" 
        />
    </div>
    <div>
        {/* <h1 id="err">{mes}</h1> */}
        {done && <Alert variant="success">{done}</Alert>}
        {mes && <Alert variant="danger">{mes}</Alert>}
        {/* {noo && <Alert variant="danger">{noo}</Alert>} */}
    </div>
    <hr></hr>
    </div>
    )
}
export default Home