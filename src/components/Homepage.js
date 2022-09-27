import "../components/Homepage.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Register from "./Register";
// import {nanoid} from "nanoid";

const socket = io.connect("http://localhost:5000");
// const userName = nanoid(4);

export default function Homepage() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]); //we will put value to the array

    
    const sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", { message, user});
        // console.log("here ff");f
        setMessage("");
    };

    useEffect(() => {
        socket.on("chat", (payload) => {
            updateScroll();
            setChat([...chat, payload]);
        });

        socket.on("user-joined", (payload) => {
            console.log(JSON.stringify(payload.userName) + "has joined");
            setChat([...chat,{ message:`${payload.userName} has joined the chat`,username: payload.userName}]);
        });
    });

    useEffect(() => {
        const myUser = JSON.parse(sessionStorage.getItem("Username"));
        if (myUser) {
            setUser(myUser);
            //emit joining message
        }
        console.log(myUser);
    },[]);

    function updateScroll(){
        var element = document.getElementsByClassName(".container");
        element.scrollTop = element.scrollHeight;
    }

    if (!user) {
        return <Register user={user} setUser={setUser} />;
    }

    return (
        <div className="App">
            <header className="App-header">
                <span>{user}</span>
                <h1>Let's talk  </h1>
                <div class="container">
                    {chat.map((payload, index) => {
                        let varibaleClass = "send";
                        console.log(payload);
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
                                        <span className="name">{payload.user}</span>: 
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
