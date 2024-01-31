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

  const submitImage = async (event) => {
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
      await contract.methods
        .createPropertyListing(imageUrl, name, locations, sqft, bhk, bath, price)
        .send({ from: accounts[0] });
        toast.success(`Your property is now registered.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
            <h1 className="mb-3">Predict Now</h1>
            <p>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
              dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
              rebum vero dolor duo.
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
                {/* End Contact Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add_Property;
