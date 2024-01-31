import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Transactions = ({ state }) => {
  const params = useParams();
  const userId = params.userId;
  const { contract } = state;
  const [Detail, setDetail] = useState("");

  useEffect(() => {
    if (!contract || !userId) {
      return; // Exit if contract or userId is not available
    }

    async function getDetail() {
      try {
        const nameText = await contract.methods.propertyListings(userId).call();
        setDetail(nameText);
        console.log(nameText);
        console.log(userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getDetail();
  }, [contract, userId]);
  return (
    <>
      <div class="container-xxl py-5 about">
        <div class="container">
          <div class="row g-5 align-items-center">
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div class="about-img position-relative overflow-hidden p-5 pe-0">
                <img class="img-fluid w-100" src={Detail[1]} />
              </div>
            </div>
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 class="mb-4">{Detail[2]}</h1>
              <p class="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p>
                <i class="fa fa-map-marker-alt text-primary me-2"></i>
                {Detail[3]}
              </p>
              <p>
                <i class="fa fa-ruler-combined text-primary me-2"></i>
                {Detail[4]} Sqft
              </p>
              <p>
                <i class="fa fa-bed text-primary me-2"></i>
                {Detail[5]} Bed
              </p>
              <p>
                <i class="fa fa-bath text-primary me-2"></i>
                {Detail[6]} Bath
              </p>
              <p>
              <i class="bi bi-person-fill text-primary me-2"></i>
              From: {Detail[8]} 
              </p>
              <p>
              <i class="bi bi-person-fill text-primary me-2"></i>
              To: {Detail[9] === "0x0000000000000000000000000000000000000000" ? "Not Sold" : Detail[9]} 
              </p>
              <p>
              <i class="bi bi-tag-fill text-primary me-2"></i>
                {Detail[7]} ETH
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
