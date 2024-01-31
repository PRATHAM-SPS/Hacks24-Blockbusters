// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstateTransaction {

    struct PropertyListing {
        uint propertyId;
        string imageUrl;
        string propertyTitle;
        string propertyLocation;
        uint propertySqft;
        uint propertyBhk;
        uint propertyBath;
        uint propertyPrice;
        address seller;
        address buyer;
        bool isSold;
    }

    event registeredProperty(
        string location,
        uint total_sqft,
        uint bath,
        uint price,
        uint bhk
    );

    uint public propertyListingCount;

    PropertyListing[] public propertyListings;

    mapping(address => uint[]) public userOwnedProperties;

    function createPropertyListing(string memory imageUrl, string memory propertyTitle, string memory propertyLocation,uint propertySqft, uint propertyBhk, uint propertyBath, uint propertyPrice) public {
        PropertyListing memory newListing;
        newListing.propertyId = propertyListingCount;
        newListing.imageUrl = imageUrl;
        newListing.propertyTitle = propertyTitle;
        newListing.propertyLocation = propertyLocation;
        newListing.propertySqft = propertySqft;
        newListing.propertyBhk = propertyBhk;
        newListing.propertyBath = propertyBath;
        newListing.propertyPrice = propertyPrice;
        newListing.seller = msg.sender;
        propertyListings.push(newListing);
        userOwnedProperties[msg.sender].push(propertyListingCount);
        propertyListingCount++;
        emit registeredProperty(newListing.propertyLocation, newListing.propertySqft, newListing.propertyBath, newListing.propertyPrice, newListing.propertyBhk);
    }

    function buyProperty(uint propertyListingId) public payable {
        require(!propertyListings[propertyListingId].isSold, "Property already sold");
        payable(propertyListings[propertyListingId].seller).transfer(msg.value);
        propertyListings[propertyListingId].buyer = msg.sender;
        propertyListings[propertyListingId].isSold = true;
        userOwnedProperties[msg.sender].push(propertyListingId);
    }

    function getAllAvailableProperties() public view returns (PropertyListing[] memory) {
        uint availablePropertiesCount = 0;

        // Count available (not sold) properties
        for (uint i = 0; i < propertyListings.length; i++) {
            if (!propertyListings[i].isSold) {
                availablePropertiesCount++;
            }
        }

        PropertyListing[] memory availableProperties = new PropertyListing[](availablePropertiesCount);
        uint currentIndex = 0;

        // Populate available properties
        for (uint i = 0; i < propertyListings.length; i++) {
            if (!propertyListings[i].isSold) {
                availableProperties[currentIndex] = propertyListings[i];
                currentIndex++;
            }
        }

        return availableProperties;
    }

    function getOwnedProperties(address _ownerAddress) public view returns (PropertyListing[] memory) {
        uint[] memory propertyIds = userOwnedProperties[_ownerAddress];
        PropertyListing[] memory ownedProperties = new PropertyListing[](propertyIds.length);

        // Retrieve owned properties for the given owner address
        for (uint i = 0; i < propertyIds.length; i++) {
            ownedProperties[i] = propertyListings[propertyIds[i]];
        }

        return ownedProperties;
    }
}
