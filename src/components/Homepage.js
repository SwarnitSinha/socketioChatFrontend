import '../components/Homepage.css'

import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
// import {nanoid} from "nanoid";

const socket = io.connect("http://localhost:5000");
// const userName = nanoid(4);
const userName = JSON.parse(sessionStorage.getItem("Username"));

export default function Homepage(){

  

  const [message,setMessage] = useState("");
  const [chat,setChat] = useState([]); //we will put value to the array
  

  const sendChat = (e)=>{
    e.preventDefault();
    socket.emit("chat",{message,userName});
    // console.log("here ff");f
    setMessage("");
  }

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setChat([...chat,payload]);
    })

    socket.on("user-joined",(payload)=>{
      console.log(JSON.stringify(payload.userName)+'has joined')
      setChat([...chat,payload]);
    })

  })


    return (

      

      <div className="App">
      <header className="App-header">

        <h1>Let's talk</h1>
        <div class="container">
            
            {chat.map( (payload,index) =>{
              let varibaleClass = "send";
           
              if(payload.userName===userName){
                varibaleClass = "send";
                
              }
              else{
                varibaleClass = "receive";
              }
              // console.log(JSON.parse(userName));
              return (
                

                
                <p key={index} className={varibaleClass} msg>
                  <span className='name'>{payload.userName}</span><br/>
                  {payload.message}
                </p>

              
              );
            })}

        </div>
        
        
        <form onSubmit={sendChat}>

            <input 
              type="text" 
              name="chat" 
              placeholder='send text' 
              className="messageInput" 
              value={message} 
              onChange={(e)=>{
              setMessage(e.target.value)
            }}/>
            <button className="sendBtn btn btn-light p-3 ms-4" type="submit">Send</button>

        </form>

      </header>
      </div>
    )
  
}
