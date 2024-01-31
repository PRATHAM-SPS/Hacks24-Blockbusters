import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Signup() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [address,setAddress]=useState('')
    const [pin,setPin]=useState('')
    const [pan,setPan]=useState('')
    const [adhar,setAdhar]=useState('')
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:5000/signup",{
                email,password,name,age,address,pin,pan,adhar
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/home",{state:{id:email}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="name" onChange={(e) => { setName(e.target.value) }} placeholder="Name" />
                <input type="age" onChange={(e) => { setAge(e.target.value) }} placeholder="Age" />
                <input type="address" onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" />
                <input type="pin" onChange={(e) => { setPin(e.target.value) }} placeholder="Pin Code Number" />
                <input type="pan" onChange={(e) => { setPan(e.target.value) }} placeholder="Pan Number" />
                <input type="adhar" onChange={(e) => { setAdhar(e.target.value) }} placeholder="Adhar" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default Signup