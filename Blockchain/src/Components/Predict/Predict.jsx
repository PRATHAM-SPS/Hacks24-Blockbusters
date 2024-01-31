import React, { useState, useEffect } from "react";
import axios from "axios";

function Predict() {
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("");
  const [bath, setBath] = useState("");
  const [prediction, setPrediction] = useState("");

  const [locations, setLocations] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/location");
        console.log("Response:", response);
        setLocations(response.data); // Assuming the API response is an array of locations
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getLocations();
  }, []); // Empty dependency array ensures useEffect runs only once, after initial render

  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handlePrediction = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/prediction/${selectedLocation}/${sqft}/${bhk}/${bath}`
      );
      console.log("Response:", response);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
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
                        <div className="col-md-6">
                          <div className="form-floating">
                            <select
                              value={selectedLocation}
                              onChange={handleLocationChange}
                              className="form-control"
                              style={{ backgroundColor: "white" }}
                            >
                              <option value="">Select a location</option>
                              {locations.map((location, index) => (
                                <option key={index} value={location}>
                                  {location}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="name">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="number"
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
                          <button
                            className="btn btn-primary w-100 py-3"
                            type="submit"
                            onClick={handlePrediction}
                          >
                            Predict
                          </button>

                          <div
                            className="text-center mx-auto mb-5 wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{ maxWidth: "600px" }}
                          >
                            {prediction && (
                              <h1
                                className="mb-3"
                                style={{ marginTop: "2rem" }}
                              >
                                Predicted Price: {prediction} ETH
                              </h1>
                            )}
                          </div>
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

export default Predict;
