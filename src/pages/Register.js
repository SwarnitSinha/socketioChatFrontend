import React from 'react'
import {useState} from 'react';
import './Register.css'
import axios from 'axios';


function Register({user,setUser}) {

    const [userName,setUsername] = useState("");
    const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [login,setLogin] = useState(true);


	const logHandler = async(e)=>{
		e.preventDefault();
		if(!email || !password) return;
		if(login){
			const result = await axios.post("https://socketio-chat-backend.vercel.app/api/signIn",{email,password})
			if(!result.data.error){

				const token = result.data.token;
				localStorage.setItem("Token",JSON.stringify(token));
				setUser(result.data.username)


			}
			else{
				alert(result.data.message);
			}
			// console.log(result.data);
		}
		else{
			if(!userName) return;
			const result = await axios.post("https://socketio-chat-backend.vercel.app/api/signUp",{username:userName,email,password})
			// console.log(result.data);
			if(result.data.error){
				alert(result.data.message);
			}
			else{
				alert(result.data.message)
				setLogin(true);
			}
		}
	}

  return (

    <div className='registerContainer'>
		<h1 className='page-heading'>Let's Talk</h1>
		<h1 className='login-heading'>{login?"Login":"SignUp"}</h1>
		<div className='nameForm'>
			{!login && <input
				type="text"
				value={userName}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			
		}
			

			<input
				type="email"

				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>

			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button className='btn btn-primary my-2' type="submit" onClick={logHandler}>{(login)?"Sign In":"Sign Up"}</button>
			
			<button className='btn btn-primary my-2' onClick={()=>setLogin(!login)}>{login?"New User? Register here":"Already have an account?"}</button>
			
		</div>
		
		{/* <div>
			<Link to={"/"}>
			<button className='btn btn-dark mt-2'>Homepage</button>
			</Link>
			
		</div> */}
    </div>
  )
}

export default Register