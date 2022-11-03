import "./Homepage.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Register from "./Register";
import axios from "axios";

const socket = io.connect("https://randombatch.herokuapp.com");
//FRONTEND

export default function Homepage() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);


    useEffect(() => {
        socket.on("chat", (payload) => {
            setChat([...chat, payload]);
            chat.scrollTop = chat.scrollHeight;
        });

        socket.on("user-joined", (payload) => {
            // console.log(JSON.stringify(payload.userName) + "has joined");
            setChat([...chat,{ message:`${payload.userName} has joined the chat`,username: payload.userName}]);
        });
    });
    
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("Token"));
        console.log(token)
        if (token) {
            //send api to backend to check the validity of token
            verifyToken(token);

        }
        // console.log(myUser);
    },[]);

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", { message, user});
        // console.log("here ff");f
        setMessage("");
    };

    const verifyToken =  async (token)=>{
        try{
            const result = await axios.post("http://localhost:5000/api/verifyToken",{token:token});
            // setUser(result.username)
            const user = result.data.user.username;
            setUser(user);
            console.log(result)
            console.log(result.user);
        }
        catch(e){
            console.log("error")
        }
    }

    const logoutHandler = ()=>{
        // clear localStorage
        localStorage.removeItem('Token');
        setUser(null);
    }
    if (!user) {
        return <Register user={user} setUser={setUser} />;
    }

    return (
        <div className="App">
            <header className="App-header">
                {/* <input type="checkbox">Sound</input> */}
                <div className = "header">
                    <span>{user.toUpperCase()}</span>
                    <h1>Let's talk  </h1>

                </div>
                <button type="button" onClick={logoutHandler} class="btn btn-light logoutBtn">Logout</button>
                <div class="container">
                    {chat.map((payload, index) => {
                        let varibaleClass = "send";
                        // console.log(payload);
                        if (payload.user === user) { 
                            varibaleClass = "send";
                        } else {
                            varibaleClass = "receive";
                        }
                        // console.log(JSON.parse(userName));
                        return (
                            <>
                                {payload.username===user?"":
                                    <p key={index} className={varibaleClass} msg>
                                        <span className="name">{payload.user}</span> 
                                    {payload.username===user?"":payload.message }
                                </p>}
                            </>
                        );
                })}
                </div>

                <form className="msgForm" onSubmit={sendChat}>
                    <input
                        type="text"
                        name="chat"
                        placeholder="send text"
                        className="messageInput"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            
                        }}
                        
                    />
                    <button className="btn btn-light sendBtn" type="submit">
                        Send
                    </button>
                </form>
             
                

                
            </header>
        </div>
    );
}
