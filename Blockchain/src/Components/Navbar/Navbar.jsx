import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ABI from "./ABI.json";
import Web3 from "web3";
// import { v4 as uuidv4 } from 'uuid';

function Navbar({ saveState }) {
  const [connected, setConnected] = useState(true);

  const init = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const contract = new web3.eth.Contract(
        ABI,
        "0xb64852C4755977E9132Cc1bE8670E8609e77A5c1"
      );
      saveState({ web3: web3, contract: contract });
      setConnected(false);
      // console.log("QR",uuidv4());
      // console.log(contract);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(()=>{
  //   init();
  // })

  return (
    <div className="container-fluid nav-bar bg-transparent" style={{ zIndex: "1" }}>
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
        <Link
          to="/home"
          className="navbar-brand d-flex align-items-center text-center"
        >
          <div className="icon p-2 me-2">
            <img
              className="img-fluid"
              src="./src/img/icon-deal.png"
              alt="Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
          <h1 className="m-0 text-primary">Makaan</h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto">
            <Link to="/home" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/properties" className="nav-item nav-link">
              Explore
            </Link>
            <Link to="/add" className="nav-item nav-link">
              Add Property
            </Link>
            <Link to="/my_properties" className="nav-item nav-link">
              My Property
            </Link>
            <Link to="/predict" className="nav-item nav-link">
              Predict
            </Link>
          </div>
          <Link
            className="btn btn-primary px-3 d-none d-lg-flex"
            onClick={init}
            disabled={!connected}
          >
            {connected ? "Connect Metamask" : "Connected"}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
