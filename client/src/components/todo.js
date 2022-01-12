import React from "react";
import  { useState } from "react";
import { useEffect } from "react";
import { Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthFunctions.js";
import axios from "axios";
import { AnimatedLineProgressBar } from "@frogress/line";
import  "./homecss.css";

function Task({ task , index, completeTask , removeTask}) {
    
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through red" : "" ,textDecorationStyle:task.completed?"double":""}}>
{/* ,textDecorationColor:task.completed?"white":"" */}
            <table border="3" table-layout ="fixed">
                <tbody>
                <tr>
                    <td width="100%" style={{textDecorationColor:task.completed?"red":"red"}}>{task.title}</td>
                    <td width="auto"><button style={{ background: "black" , bordercolor:"white" , color:task.title==="a"?"white":"white" }} onClick={() => removeTask(index)}>-</button></td>
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
        <form onSubmit={handleSubmit}  className="crt">
            <input
                type="text"
                className="input"
                value={value}
                style={{color:"black"},{backgroundColor:"black"}}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
                required
            />
            <button className="btn1" type="submit" style={{fontSize:"20px"}} value="+" onSubmit={handleSubmit}>+</button>
        </form>
    );
}

const Home=(props)=>{
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [mes,setMes] = useState(" ")
    const {currentUser} = useAuth();
    const [task,setTask]=useState([
      
    ]);
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
            setMes("NEW TASK ADDED SUCCESSFULLY TO YOUR LIST !")
            setTimeout(()=>{
                setMes("");
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
            setMes("GREAT !! YOU HAVE SUCCESSFULLY COMPLETED THE TASK ")
            setTimeout(()=>{
                setMes("");
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
            setMes("TASK REMOVED  FROM THE LIST !!")
            setTimeout(()=>{
                setMes("");
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
            setMes("YOU COMPLETED ALL THE TASKS !!")
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
        console.log("Failed to log out");
        }
      }
    
    // console.log(currentUser);
    
    return(
        
    <div>
    <div className="heading">
            --------------- YOUR TODO LIST IS HERE ---------------
    </div>
    <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
    </div>
    <div className="heading">{currentUser.email}</div>
    <hr></hr>
    <div >PENDING TASKS [{tasksRemaining}]</div>
    <hr></hr>
    
    
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
        <h1 id="err">{mes}</h1>
    </div>
    <hr></hr>
    </div>
    )
}
export default Home