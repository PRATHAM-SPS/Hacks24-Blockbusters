import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";

function Add_Property({ state }) {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [locations, setLocations] = useState("");
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("");
  const [bath, setBath] = useState("");
  const [price, setPrice] = useState("");
  const [hasBroker, setHasBroker] = useState(false); // Initially set to false
  const [brokerId, setBrokerId] = useState('');
  const [percentageCut, setPercentageCut] = useState('');

  const Reckoner_Rate = 3;

  const submitImage = async (event) => {
    // Your existing code for submitting image
    try {
      event.preventDefault();
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "event_nft");
      data.append("cloud_name", "darrqmepw");
  
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/darrqmepw/image/upload",
        {
          method: "post",
          body: data,
        }
      );
  
      const imageData = await response.json();
      console.log(imageData);
      console.log(imageData.secure_url);
      setImg(imageData.secure_url);
  
      return imageData.secure_url; // Return the secure URL
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error
    }
  };
  
  const block = async (imageUrl) => {
    try {
      const { contract } = state;
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      if(hasBroker == false) {
        await contract.methods
        .createPropertyListingWithoutBroker(imageUrl, name, locations, sqft, bhk, bath, price)
        .send({ from: accounts[0] });
        toast.success("Your property is now registered.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if(hasBroker == true && percentageCut < 100) {
        await contract.methods
        .createPropertyListingWithBroker(imageUrl, name, locations, sqft, bhk, bath, price, brokerId, percentageCut)
        .send({ from: accounts[0] });
        toast.success("Your property is now registered.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Brokerage Cut cannot exceed 100", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      console.log("Hiii1");
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error
    }
  };
  

  const submitAndBlock = async (event) => {
    try {
      const imageUrl = await submitImage(event);
      await block(imageUrl);
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };  

  return (
    <>
      <ToastContainer />
      <div className="container-xxl py-5 predict">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3">ADD A PROPERTY </h1>

            
            <p>
            Ready to captivate potential buyers or renters? This is your canvas to showcase 
            the essence of your property. Let's craft an irresistible listing! Take the lead and share 
            the details below.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-12">
              <div className="row gy-4">
                {/* Contact Form */}
                <div className="col-md-6" style={{ width: "100%" }}>
                  <div className="wow fadeInUp" data-wow-delay="0.5s">
                    <form>
                      <div className="row g-3">
                        {/* Your existing form fields */}
                        <div className="col-12">
                          <input
                            type="file"
                            className="form-control"
                            id="subject"
                            placeholder="Image"
                            style={{ backgroundColor: "white" }}
                            onChange={(e) => setImg(e.target.files[0])}
                            accept="image/*"
                          />
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="subject"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="subject">Name</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="subject"
                              placeholder="Location"
                              value={locations}
                              onChange={(e) => setLocations(e.target.value)}
                            />
                            <label htmlFor="subject">Location</label>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              id="email"
                              className="form-control"
                              placeholder="Area Square Feet"
                              value={sqft}
                              onChange={(e) => setSqft(e.target.value)}
                            />
                            <label htmlFor="email">Area Square Feet</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control"
                              id="subject"
                              value={bhk}
                              onChange={(e) => setBhk(e.target.value)}
                              placeholder="BHK"
                            />
                            <label htmlFor="subject">BHK</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="subject"
                              placeholder="Bathroom"
                              value={bath}
                              onChange={(e) => setBath(e.target.value)}
                            />
                            <label htmlFor="subject">Bathroom</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="subject"
                              placeholder="Price"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                            <label htmlFor="subject">Price</label>
                          </div>
                        </div>




                        {/* Add radio buttons for selecting whether there is a broker */}
                        <div className="col-12">
                          <div className="form-check">
                          <p><h4>Is there a broker involved with this property ?</h4></p>
                            <input
                              type="radio"
                              className="form-check-input"
                              id="hasBrokerYes"
                              checked={hasBroker === true} // Check if hasBroker is true
                              onChange={() => setHasBroker(true)} // Set hasBroker to true when selected
                            />
                            <label className="form-check-label" htmlFor="hasBrokerYes">Yes</label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="hasBrokerNo"
                              checked={hasBroker === false} // Check if hasBroker is false
                              onChange={() => setHasBroker(false)} // Set hasBroker to false when selected
                            />
                            <label className="form-check-label" htmlFor="hasBrokerNo">No</label>
                          </div>
                        </div>

                        {/* Broker related fields */}
                        {hasBroker && (
                          <>
                            <div className="col-12">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="brokerId"
                                  placeholder="Broker Address"
                                  value={brokerId}
                                  onChange={(e) => setBrokerId(e.target.value)}
                                />
                                <label htmlFor="brokerId">Seller Address</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="percentageCut"
                                  placeholder="Broker Cut"
                                  value={percentageCut}
                                  onChange={(e) => setPercentageCut(e.target.value)}
                                />
                                <label htmlFor="percentageCut">Broker Cut</label>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Your existing submit button */}
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100 py-3"
                            type="submit"
                            onClick={submitAndBlock}
                          >
                            Add Property
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add_Property;