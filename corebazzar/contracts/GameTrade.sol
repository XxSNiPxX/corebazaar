// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract GameTrade {
    using ECDSA for bytes32;

    struct Resource {
        string resourceName;
        bool exists;
    }

    struct Trade {
        uint256 tradeID;
        address seller;
        address buyer;
        string sellerID;
        string buyerID;
        uint256 quantity;
        uint256 price;
        string resourceID;
        bool active;
    }

    address public gameServerPubKey;
    address public creator;
    uint256 public serviceFeePercentage;
    uint256 public tradeCounter = 0;
    mapping(string => Resource) public resources;
    mapping(uint256 => Trade) public trades;
    string[] public resourceList;

    event ResourceRegistered(string resourceID, string resourceName);
    event TradeCreated(uint256 tradeID, address seller, string resourceID, uint256 price);
    event TradeCompleted(uint256 tradeID, address buyer,string buyerID,uint256 quantity);
    event TradeCancelled(uint256 tradeID, address seller,string sellerID,uint256 quantity);

    constructor(address _gameServerPubKey, address _creator,uint256 _serviceFeePercentage) {
        gameServerPubKey = _gameServerPubKey;
        creator = _creator;
        serviceFeePercentage=_serviceFeePercentage;
    }

    function registerResource(string memory _resourceID, string memory _resourceName) public {
        require(msg.sender == creator, "Only contract creator can register resources");
        require(!resources[_resourceID].exists, "Resource already registered");
        resources[_resourceID] = Resource(_resourceName, true);
        resourceList.push(_resourceID);
        emit ResourceRegistered(_resourceID, _resourceName);
    }

    function createTrade(
        string memory _resourceID,
        uint256 _quantity,
        uint256 _price,
        string memory _sellerID,
        bytes memory _signature
    ) public {
        require(resources[_resourceID].exists, "Resource not registered");
        require(verifySignature(_sellerID, _quantity, _signature), "Invalid signature");

        tradeCounter++;
        trades[tradeCounter] = Trade(
            tradeCounter,
            msg.sender,
            address(0),
            _sellerID,
            "", // buyerID initially empty
            _quantity,
            _price,
            _resourceID,
            true
        );

        emit TradeCreated(tradeCounter, msg.sender, _resourceID, _price);
    }

    function buyTrade(uint256 _tradeID, string memory _buyerID, bytes memory _signature) public payable {
        Trade storage tr = trades[_tradeID];

        require(tr.active, "Trade is not active");
        require(msg.value == tr.price, "Incorrect price sent");
        require(tr.seller != msg.sender, "Seller cannot buy own listing");
        require(verifySignatureBuyer(_buyerID, _signature), "Invalid signature");

        // Calculate service fee
        uint256 serviceFee = (msg.value * (serviceFeePercentage * 100)) / 10_000;

        // Transfer funds
        payable(tr.seller).transfer(msg.value - serviceFee); // Transfer amount after fee deduction
        payable(creator).transfer(serviceFee); // Transfer service fee to game developer

        // Update trade details
        tr.buyer = msg.sender;
        tr.buyerID = _buyerID;
        tr.active = false;

        emit TradeCompleted(_tradeID, msg.sender, _buyerID, tr.quantity);
    }


    function cancelTrade(uint256 _tradeID) public {
        Trade storage tr = trades[_tradeID];
        require(tr.active, "Trade is not active or already completed");
        require(tr.seller == msg.sender, "Only seller can cancel the trade");

        tr.active = false;
        emit TradeCancelled(_tradeID, msg.sender,tr.sellerID,tr.quantity);
    }

    function getAllResources() public view returns (string[] memory) {
        return resourceList;
    }

    function getTrade(uint256 _tradeID) public view returns (Trade memory) {
        return trades[_tradeID];
    }

    function getAllActiveTrades() public view returns (Trade[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].active) {
                activeCount++;
            }
        }

        Trade[] memory activeTrades = new Trade[](activeCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].active) {
                activeTrades[index] = trades[i];
                index++;
            }
        }
        return activeTrades;
    }

    function getTradesBySeller(address _seller) public view returns (Trade[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].seller == _seller) {
                count++;
            }
        }

        Trade[] memory sellerTrades = new Trade[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].seller == _seller) {
                sellerTrades[index] = trades[i];
                index++;
            }
        }
        return sellerTrades;
    }

    function getTradesByBuyer(address _buyer) public view returns (Trade[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].buyer == _buyer) {
                count++;
            }
        }

        Trade[] memory buyerTrades = new Trade[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].buyer == _buyer) {
                buyerTrades[index] = trades[i];
                index++;
            }
        }
        return buyerTrades;
    }

    function getTradesBySellerID(string memory _sellerID) public view returns (Trade[] memory) {
            uint256 count = 0;
            for (uint256 i = 1; i <= tradeCounter; i++) {
                if (keccak256(abi.encodePacked(trades[i].sellerID)) == keccak256(abi.encodePacked(_sellerID))) {
                    count++;
                }
            }
            Trade[] memory sellerTrades = new Trade[](count);
            uint256 index = 0;
            for (uint256 i = 1; i <= tradeCounter; i++) {
                if (keccak256(abi.encodePacked(trades[i].sellerID)) == keccak256(abi.encodePacked(_sellerID))) {
                    sellerTrades[index] = trades[i];
                    index++;
                }
            }
            return sellerTrades;
        }

    function getTradesByBuyerID(string memory _buyerID) public view returns (Trade[] memory) {
              uint256 count = 0;
              for (uint256 i = 1; i <= tradeCounter; i++) {
                  if (keccak256(abi.encodePacked(trades[i].buyerID)) == keccak256(abi.encodePacked(_buyerID))) {
                      count++;
                  }
              }
              Trade[] memory tradesByBuyer = new Trade[](count);
              uint256 index = 0;
              for (uint256 i = 1; i <= tradeCounter; i++) {
                  if (keccak256(abi.encodePacked(trades[i].buyerID)) == keccak256(abi.encodePacked(_buyerID))) {
                      tradesByBuyer[index] = trades[i];
                      index++;
                  }
              }
              return tradesByBuyer;
          }
    function verifySignature(
        string memory _sellerID,
        uint256 _quantity,
        bytes memory _signature
    ) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_sellerID, _quantity));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        return ECDSA.recover(ethSignedMessageHash, _signature) == gameServerPubKey;
    }

    function verifySignatureBuyer(
        string memory _buyerID,
        bytes memory _signature
    ) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_buyerID));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        return ECDSA.recover(ethSignedMessageHash, _signature) == gameServerPubKey;
    }
}
