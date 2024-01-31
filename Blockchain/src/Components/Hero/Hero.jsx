import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Hero({ state }) {
  const [Property, setProperty] = useState("");
  const getData = async () => {
    const { contract } = state;
    const AllAvailableProperties = await contract.methods
      .getAllAvailableProperties()
      .call();
    setProperty(AllAvailableProperties);
    console.log(AllAvailableProperties);
  };

  const Buy = async(id, value) => {
    const { contract, web3 } = state;
    const accounts = await web3.eth.getAccounts();
    await contract.methods
          .buyProperty(Number(id))
          .send({ from: accounts[0], value: value, gas: 480000 });
  }

  useEffect(() => {
    getData();
  }, [state]);
  return (
    <>
      {/* Header Start */}
      <div className="container-fluid header bg-white p-0 home">
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 animated fadeIn mb-4">
              Find A <span className="text-primary">Perfect Home</span> To Live
              With Your Family
            </h1>
            <p className="animated fadeIn mb-4 pb-2">
              Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no.
              Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.
            </p>
            <a
              href=""
              className="btn btn-primary py-3 px-5 me-3 animated fadeIn"
            >
              Get Started
            </a>
          </div>
          <div className="col-md-6 animated fadeIn">
            <div className="owl-carousel-item">
              <img
                className="img-fluid"
                src="./src/img/carousel-1.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      <div class="container-xxl py-5">
        <div class="container type">
          <div
            class="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 class="mb-3">Property Types</h1>
            <p>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
              dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
              rebum vero dolor duo.
            </p>
          </div>
          <div class="row g-4">
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-apartment.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Apartment</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-villa.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Villa</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-house.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Home</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-housing.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Office</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-building.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Building</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-neighborhood.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Townhouse</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-condominium.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Shop</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a
                class="cat-item d-block bg-light text-center rounded p-3"
                href=""
              >
                <div class="rounded p-4">
                  <div class="icon mb-3">
                    <img
                      class="img-fluid"
                      src="./src/img/icon-luxury.png"
                      alt="Icon"
                    />
                  </div>
                  <h6>Garage</h6>
                  <span>123 Properties</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container-xxl py-5 about">
        <div class="container">
          <div class="row g-5 align-items-center">
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div class="about-img position-relative overflow-hidden p-5 pe-0">
                <img class="img-fluid w-100" src="./src/img/about.jpg" />
              </div>
            </div>
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 class="mb-4">#1 Place To Find The Perfect Property</h1>
              <p class="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p>
                <i class="fa fa-check text-primary me-3"></i>Tempor erat elitr
                rebum at clita
              </p>
              <p>
                <i class="fa fa-check text-primary me-3"></i>Aliqu diam amet
                diam et eos
              </p>
              <p>
                <i class="fa fa-check text-primary me-3"></i>Clita duo justo
                magna dolore erat amet
              </p>
              <a class="btn btn-primary py-3 px-5 mt-3" href="">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container-xxl py-5 property">
        <div class="container">
          <div class="row g-0 gx-5 align-items-end">
            <div class="col-lg-6">
              <div
                class="text-start mx-auto mb-5 wow slideInLeft"
                data-wow-delay="0.1s"
              >
                <h1 class="mb-3">Property Listing</h1>
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
                              <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                                For Sell
                              </div>
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
                              <button
                                class="btn btn-primary py-3 px-5"
                                style={{ width: "100%" }}
                                onClick={(e)=>{Buy(Property[0], Property[7])}}
                              >
                                <i class="bi bi-cart4"></i> Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>

              <div class="col-12 text-center">
                <Link class="btn btn-primary py-3 px-5" to="/properties">
                  Browse More Property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
