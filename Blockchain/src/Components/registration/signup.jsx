import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import validator from 'aadhaar-validator';
import isValid from 'pancardjs';

function Signup({ state }) {

  const [isValidAdhar, setIsValidAdhar] = useState(true);

  const handleAdharChange = (e) => {
    const inputValue = e.target.value;
    setAdhar(inputValue);

    // Validate Aadhaar number
    const isValid = validator.isValidNumber(inputValue);
    setIsValidAdhar(isValid);
  };

  const [isValidPan, setIsValidPan] = useState(true);

  const handlePanChange = (e) => {
    const inputValue = e.target.value;
    setPan(inputValue);

    // Validate Aadhaar number
    const isValid1 = isValid.pan(inputValue);
    setIsValidPan(isValid1);
  };

  async function getUser() {
    try {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      
      // Check if there are accounts available
      if (accounts.length === 0) {
        console.error("No Ethereum accounts available");
        return;
      }
      setAddress(accounts[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error (e.g., show a message to the user)
    }
  }


  useEffect(()=>{
    getUser();
  }, [state])

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [address,setAddress]=useState('')
    const [pin,setPin]=useState('')
    const [pan,setPan]=useState('')
    const [adhar,setAdhar]=useState('')
    const [haddress, setHaddress]=useState('')
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:5000/signup",{
                email,password,name,age,address,pin,pan,adhar,haddress
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
                    required
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      onChange={(e) => {setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                    required
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      onChange={(e) => {setPassword(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                    required
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      onChange={(e) => {setName(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                    required
                      type="text"
                      className="form-control"
                      id="age"
                      placeholder="Age"
                      onChange={(e) => {setAge(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                    required
                      type="text"
                      className="form-control"
                      id="haddress"
                      placeholder="Home Address"
                      onChange={(e) => {setHaddress(e.target.value)}}
                    />
                  </div>
                  <div className="col-12">
                    <input
                    readonly
                    required
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Click on Connect Metamask to fetch Account Address automaticaly"
                      value={address}
                    />
                  </div>
                  <div className="col-12">
                    <input
                    required
                      type="text"
                      className="form-control"
                      id="pin"
                      placeholder="Pin Code Number"
                      onChange={(e) => {setPin(e.target.value)}}
                    />
                  </div>
                  <div>
                    <input
                    required
                      type="text"
                      className={`form-control ${isValidPan ? '' : 'is-invalid'}`}
                      id="pan"
                      placeholder="Pan"
                      value={pan}
                      onChange={handlePanChange}
                    />
                    {!isValidPan && <div className="invalid-feedback">Invalid Pan number</div>}
                  </div>
                  {/* <div className="col-12">
                    <input
                    required
                      type="text"
                      className="form-control"
                      id="adhar"
                      placeholder="Adhar"
                      onChange={(e) => {setAdhar(e.target.value)}}
                    />
                  </div> */}
                  <div>
                    <input
                      type="text"
                      className={`form-control ${isValidAdhar ? '' : 'is-invalid'}`}
                      id="adhar"
                      placeholder="Adhar"
                      value={adhar}
                      onChange={handleAdharChange}
                    />
                    {!isValidAdhar && <div className="invalid-feedback">Invalid Aadhaar number</div>}
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