import './App.css';

import {useState,useEffect} from "react";
import io from "socket.io-client";
import {nanoid} from "nanoid";



const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);

function App() {

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
      console.log("here ");
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
              if(payload.userName==userName){
                varibaleClass = "send";
              }
              else{
                varibaleClass = "receive";
              }
              return (
                
                <p key={index} className={varibaleClass} msg>
                  {payload.message} : 
                  <span>id : {payload.userName}</span>
                </p>
              );
            })}

        </div>
        {/* {chat.map((payload,index) =>{
          return (
            <p key={index}>
              {payload.message} :
              <span>id : {payload.userName}</span>
            </p>
          );
        })} */}
        
        <form onSubmit={sendChat}>

            <input 
              type="text" 
              name="chat" 
              placeholder='send text' 
              class="messageInput" 
              value={message} 
              onChange={(e)=>{
              setMessage(e.target.value)
            }}/>
            <button class="sendBtn" type="submit">Send</button>

        </form>

      </header>
    </div>
  );
}

export default App;
