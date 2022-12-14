# auction-backend
## Product Schema ##
- Product Name
    - Not null, min 5, max 30
- Short Description
- Detailed Description
- Category
    - Painting
    - Sculptor
    - Ornament
- Starting Price
    - Number
- Bid End Date

## Seller Information ##
- First Name
    - Not null, min 5, max 30
- Last Name
    - Not null, min 3, max 25
- Address
- City
- State
- Pin
- Phone
    - not null, min 10, max 10 
- Email
    - Not null, valid email with @

## Buyer Information ##
- First Name
    - Not null, min 5, max 30
- Last Name
    - Not null, min 3, max 25
- Address
- City
- State
- Pin
- Phone
    - not null, min 10, max 10 
- Email
    - Not null, valid email with @
- Product Id
    - Must be existing before bid. 
- Bid Amount
    - When bid after end date, throw custom exception. 
    - When bid more than once on the product, throw custom exception. 

# User Stories #
1. As a seller, I can add anew product for auction.
2. As a seller, I can delete a product added for auction.
3. As a buyer, I am able to bid for a product
4. As a seller, I can list all bids received on prodcut put for auction.
    - when shown, must show all details of the product. 
    - bid amounts must be in descending order.
5. As a buyer, I am able to update the Bid amount of my bidding. 


## URL Exposed ##
1. adds a new product
    - /e-auction/api/v1/seller/add-product 
2. fetches details of all bids on product with product details
    - /e-auction/api/v1/seller/show-bids/{productId} 
3. deletes the product
    - /e-auction/api/v1/seller/delete/{productId}
4. places a bid for a product
    - /e-auction/api/v1/buyer/place-bid
5. updates the bid amount
    - /e-auction/api/v1/buyer/update-bid/{productId}/{buyerEmailld}/{newBidAmount} 
