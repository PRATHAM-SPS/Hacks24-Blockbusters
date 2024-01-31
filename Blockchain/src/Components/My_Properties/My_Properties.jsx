import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function My_Properties({ state }) {
  const [Property, setProperty] = useState("");
  const [Account, SetAccount] = useState("");
  const getData = async () => {
    const { contract, web3 } = state;
    const accounts = await web3.eth.getAccounts();
    SetAccount(accounts[0]);
    const AllAvailableProperties = await contract.methods
      .getOwnedProperties(accounts[0])
      .call();
    setProperty(AllAvailableProperties);
    console.log(AllAvailableProperties[0][9]);
    console.log(accounts[0]);
  };

  useEffect(() => {
    getData();
  }, [state]);
  return (
    <>
      <div class="container-xxl py-5 property">
        <div class="container">
          <div class="row g-0 gx-5 align-items-end">
            <div class="col-lg-6">
              <div
                class="text-start mx-auto mb-5 wow slideInLeft"
                data-wow-delay="0.1s"
              >
                <h1 class="mb-3">My Property Listing</h1>
                <p>
                  Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
                  dolore lorem kasd vero ipsum sit eirmod sit diam justo sed
                  rebum.
                </p>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div id="tab-1" class="tab-pane fade show p-0 active">
              <div class="row g-4">
                {Property !== "" &&
                  Property.map((Property) => {
                    console.log(Property);
                    return (
                      <>
                        <div
                          class="col-lg-4 col-md-6 wow fadeInUp"
                          data-wow-delay="0.1s"
                          style={{ marginBottom: "24px" }}
                        >
                          <div class="property-item rounded overflow-hidden">
                            <div class="position-relative overflow-hidden">
                              <a href="">
                                <img
                                  class="img-fluid"
                                  src={Property[1]}
                                  alt=""
                                />
                              </a>

                              {Property[9] === Account ? (
                                <div className="rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3" style={{ backgroundColor: "green" }}>
                                  Purchased
                                </div>
                              ) : Property[9] === "0x0000000000000000000000000000000000000000" ? (
                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                                  For Sell
                                </div>
                              ) : (
                                <div className="rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3" style={{ backgroundColor: "#dd1a1a" }}>
                                  Sold
                                </div>
                              )   
                              }

                              <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                                Appartment
                              </div>
                            </div>
                            <div class="p-4 pb-0">
                              <h5 class="text-primary mb-3">
                                {Property[7]} ETH
                              </h5>
                              <a class="d-block h5 mb-2" href="">
                                {Property[2]}
                              </a>
                              <p>
                                <i class="fa fa-map-marker-alt text-primary me-2"></i>
                                {Property[3]}
                              </p>
                            </div>
                            <div class="d-flex border-top">
                              <small class="flex-fill text-center border-end py-2">
                                <i class="fa fa-ruler-combined text-primary me-2"></i>
                                {Property[4]} Sqft
                              </small>
                              <small class="flex-fill text-center border-end py-2">
                                <i class="fa fa-bed text-primary me-2"></i>
                                {Property[5]} Bed
                              </small>
                              <small class="flex-fill text-center py-2">
                                <i class="fa fa-bath text-primary me-2"></i>
                                {Property[6]} Bath
                              </small>
                            </div>
                            <div
                              class="col-12 text-center wow fadeInUp"
                              data-wow-delay="0.1s"
                            >
                              <Link
                                class="btn btn-primary py-3 px-5"
                                to={`/transactions/${Property[0]}`}
                                style={{ width: "100%" }}
                              >
                                <i class="bi bi-cart4"></i> Transaction
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default My_Properties;
