import InvoiceModal from '../Agreement/Agreement'
import { useState, useEffect } from "react";

function Properties({ state }) {
  const [Property, setProperty] = useState("");
  const getData = async () => {
    const { contract } = state;
    const AllAvailableProperties = await contract.methods
      .getAllAvailableProperties()
      .call();
    setProperty(AllAvailableProperties);
    console.log(AllAvailableProperties);
  };

  const [transaction, SetTransaction] = useState([]);

  async function getDonor(id) {
    try {
      const { contract, web3 } = state;
      const transaction = await contract.methods
      .getPropertyTransactions(id)
      .call();
      console.log("Hello getDonor");
      console.log(transaction);
      SetTransaction(transaction);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const Buy = async(id, value) => {
    const { contract, web3 } = state;
    const accounts = await web3.eth.getAccounts();

    const lastOwners = await getDonor(id)
    
    const property = await contract.methods.propertyListings(id)
      .call();

    console.log(property)

    setStates({
      dateOfIssue: new Date().toLocaleDateString(),
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      propertyAddress: property.propertyLocation,
      propertyPrice: property.propertyPrice,
      propertySqft: property.propertySqft,
      propertyTitle: property.propertyTitle,
      propertyBhk: property.propertyBhk,
      propertyBath: property.propertyBath,
      brokerCut: property.brokerCut,
      lastOwner: lastOwners ? lastOwners[lastOwners.length - 1].to : ''
    })

    setIsOpen(true);
    await contract.methods
          .buyProperty(Number(id))
          .send({ from: accounts[0], value: value, gas: 480000 });

  }

  const [isOpen, setIsOpen] = useState(false); 
  const [states, setStates] = useState({
      currentDate: '',
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      propertyAddress: '',
      propertyPrice: '',
      propertySqft: '',
      propertyTitle: '',
      propertyBhk: '',
      propertyBath: '',
      brokerCut: '',
      lastOwner: ''
  }); 

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
                <h1 class="mb-3">Property Listing</h1>
                <p>
                Welcome to our listings! Explore a curated collection of properties that could be your next dream home
                 or investment opportunity. Browse through the listings below and find the perfect match for your
                  needs and desires. 
                  Happy searching !!!
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
            <InvoiceModal showModal={isOpen} closeModal={false} info={states} />
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

export default Properties;
