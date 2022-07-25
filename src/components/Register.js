import React from 'react'
import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Register.css'
import io from "socket.io-client";

// import firebase from '../firebase';



const socket = io.connect("http://localhost:5000");

function Register() {

  const [userName,setUsername] = useState("");
  const [number,setPhoneNumber] = useState("");
  const [otp,setOtp] = useState("");

  const saveUser = (e)=>{
    e.preventDefault();
    // const userName = userName;
    // localStorage.setItem("Username","userName");
    sessionStorage.setItem("Username", JSON.stringify(userName));

    socket.emit("new-user-joined",{userName});

    setUsername("");
  }


  // const sendOtp = (e)=>{
  //   let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
  //   firebase.auth().signInWithPhoneNumber(number,recaptcha).then((e)=>{
  //     e.confirm(otp).then((result)=>{

  //     }).catch((e)=>{
  //       prompt("Invalid OTP");
  //     })
  //   });
  // }

  return (
    <div className='registerContainer'>
      <h1>Login / SignUp</h1>
      <form
      className='nameForm'
     onSubmit = {saveUser}

    >
      <input
        type="text"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        type="number"

        value={number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone No."
      />
      <button 
      type="send" 
      // onClick={sendOtp}
      className='btn btn-primary'>Send OTP</button>
      

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="OTP"
      />
      <button type="submit" className='btn btn-success'>Submit</button>
      {/* <input type="submit" value="Submit"></input> */}
    </form>
    
      <div>
        <Link to={"/"}>
        <button className='btn btn-dark mt-2'>Homepage</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Register