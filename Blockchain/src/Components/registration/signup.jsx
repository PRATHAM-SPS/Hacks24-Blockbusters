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
<div className="container-xxl py-5 predict">
  <div className="container">
    <div
      className="text-center mx-auto mb-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ maxWidth: "600px" }}
    >
      <h1 className="mb-3">Signup</h1>
      <p>
        Ready to join us? Fill out the form below to create your account.
      </p>
    </div>
    <div className="row g-4">
      <div className="col-12">
        <div className="row gy-4">
          <div className="col-md-6" style={{ width: "100%" }}>
            <div className="wow fadeInUp" data-wow-delay="0.5s">
              <form action="POST">
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      onChange={(e) => {setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      onChange={(e) => {setPassword(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      onChange={(e) => {setName(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="age"
                      placeholder="Age"
                      onChange={(e) => {setAge(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      onChange={(e) => {setAddress(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="pin"
                      placeholder="Pin Code Number"
                      onChange={(e) => {setPin(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="pan"
                      placeholder="Pan Number"
                      onChange={(e) => {setPan(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="adhar"
                      placeholder="Adhar"
                      onChange={(e) => {setAdhar(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                      onClick={submit}
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="col-md-6" style={{ width: "100%" }}>
            <div className="wow fadeInUp" data-wow-delay="0.5s">
              <br />
              <p>OR</p>
              <br />
              <Link to="/login">Login Page</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    )
}

export default Signup