// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BPass
 * @author Abdulazeez Salihu
 * @notice This contract is for creating and managing block passes.
 * @dev The contract implements the Chainlink PriceFeed AggregatorV3Interface 
 */
contract BPass is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    // Struct to store details of each block pass
    struct BPassDetails {
        address organizer;
        string metadata;
        string category;
        uint256 bPassId;
        uint256 passesSold;
        uint256 max_passes;
        uint256 passPrice;
        uint256 startTime;
        uint256 salesEndTime;
        bool bpEnded;
    }

    uint256 private bPass_count = 0;

    AggregatorV3Interface public s_priceFeed;
    BPassDetails[] public bPassList;

    mapping(uint256 => BPassDetails) public getPassById;
    mapping(address => BPassDetails[]) public bookedPassByUser;
    mapping(address => uint256[]) public tokenOfOwnerByIndex;

    // Events
    event bPassCreated(
        address indexed organizer,
        uint256 indexed creationTime,
        uint256 bPassId
    );
    event passBooked(
        address indexed buyer,
        uint256 tokenId,
        uint256 bPassId
    );

    constructor(
        address initial_owner,address priceFeedAddress
    ) Ownable(initial_owner) ERC721("BPass", "BP") {
        tokenId.increment();
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     * @dev Allows a user to purchase a block pass.
     * @param _bPassId The ID of the block pass to be purchased.
     */
    function purchasePass(uint256 _bPassId) public payable {
        BPassDetails storage _pass = getPassById[_bPassId];
        uint256 currentPrice = updateFeedPrice(_pass.passPrice); // Update pass price dynamically
        require(msg.value >= currentPrice, "Insufficient payment");
        require(block.timestamp <= _pass.salesEndTime, "Sales ended");
        require(_pass.passesSold < _pass.max_passes, "Sold out");

        // Mint a new NFT representing the purchased block pass
        string memory tokenURI = string(abi.encodePacked(_pass.metadata));
        _safeMint(msg.sender, tokenId.current());
        _setTokenURI(tokenId.current(), tokenURI);

        // Calculate fees and transfer funds to the organizer
        uint256 fee = (msg.value * 10) / 1000;
        uint256 amountToOrganizer = msg.value - fee;
        (bool success, ) = payable(_pass.organizer).call{
            value: amountToOrganizer
        }("");
        require(success);

        _pass.passesSold++;
        bookedPassByUser[msg.sender].push(_pass);
        tokenOfOwnerByIndex[msg.sender].push(tokenId.current());

        emit passBooked(msg.sender, tokenId.current(), _pass.bPassId);
        tokenId.increment();
    }

    /**
     * @dev Allows an organizer to create a new bpass.
     * @param _max_pass_count The maximum number of passes available for the new bpass ticket.
     * @param _startTime The start time of the bpass.
     * @param _salesEndTime The end time of sales for the bpass.
     * @param _initialPassPrice The first price for each block pass.
     * @param _metadata Additional metadata for the bpass.
     * @param _category The category of the bpass.
     */
    function createNewPass(
        uint256 _max_pass_count,
        uint256 _startTime,
        uint256 _salesEndTime,
        uint256 _initialPassPrice,
        string memory _metadata,
        string memory _category
    ) external {
        BPassDetails memory _pass = BPassDetails({
            organizer: msg.sender,
            bPassId: bPass_count,
            startTime: _startTime,
            max_passes: _max_pass_count,
            passPrice: _initialPassPrice,
            passesSold: 0,
            metadata: _metadata,
            category: _category,
            salesEndTime: block.timestamp + _salesEndTime,
            bpEnded: false
        });

        // Update mappings and arrays with the new block pass
        getPassById[bPass_count] = _pass;
        bPassList.push(_pass);

        bPass_count++;
        emit bPassCreated(
            _pass.organizer,
            block.timestamp,
            _pass.bPassId
        );
    }

    /**
     * @dev Allows the owner to update the address of the Chainlink Price Feed.
     * @param _newPriceFeedAddress The new address of the Chainlink Price Feed.
     */
    function updatePriceFeedAddress(address _newPriceFeedAddress) external onlyOwner {
        s_priceFeed = AggregatorV3Interface(_newPriceFeedAddress);
    }

    // GETTERS

    /**
     * @dev Retrieves the NFT tokens owned by a specific user.
     * @param _user The address of the user.
     * @return An array of NFT token IDs owned by the user.
     */
    function getUserTokens(
        address _user
    ) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(_user);
        uint256[] memory result = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            result[i] = tokenOfOwnerByIndex[_user][i];
        }
        return result;
    }

    /**
     * @dev Retrieves the block passes booked by a specific user.
     * @param _user The address of the user.
     * @return An array of block passes booked by the user.
     */
     function bPassesBookedByUser(
        address _user
    ) public view returns (BPassDetails[] memory) {
        return bookedPassByUser[_user];
    }

    /**
     * @dev Retrieves an array of all bpasses in the contract.
     * @return An array of block passes.
     */
    function allBPassList()
        public
        view
        returns (BPassDetails[] memory)
    {
        return bPassList;
    }

    /**
     * @dev Retrieves an array of block passes belonging to a specific category.
     * @param _category The category of block passes to retrieve.
     * @return An array of block passes in the specified category.
     */
    function getByCategory(
        string memory _category
    ) public view returns (BPassDetails[] memory) {
        uint256 i = 0;
        uint256 arrayCount = 0;
        BPassDetails[] memory bPassCategory = new BPassDetails[](
            bPassList.length
        );

        // Iterate through all block passes and filter by category
        for (; i < bPassList.length; i++) {
            BPassDetails memory currentBPass = bPassList[i];

            if (
                keccak256(abi.encodePacked(currentBPass.category)) ==
                keccak256(abi.encodePacked(_category))
            ) {
                bPassCategory[arrayCount] = currentBPass;
                arrayCount++;
            }
        }

        return bPassCategory;
    }
   
    /**
     * @notice Updates the price of a block pass based on the latest asset price from the Chainlink price feed.
     * @dev This function retrieves the latest asset price from the Chainlink price feed and calculates the price in USD for the specified USDT amount.
     * @param usdtAmount The amount of USDT for which the price needs to be calculated.
     * @return The equivalent amount in USD.
     */
    function updateFeedPrice(uint256 usdtAmount) internal view returns (uint256) {
        (, int256 answer, , , ) = s_priceFeed.latestRoundData();
        uint256 newPrice = uint256(answer * 10000000000);
        uint256 usdtAmountInUsd = (newPrice * usdtAmount) / 1000000000000000000;
        return usdtAmountInUsd;
    }
}
