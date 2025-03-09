// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./GameTrade.sol";

contract TradeFactory {
    using ECDSA for bytes32;

    struct TradeInfo {
        uint256 tradeID; // Auto-incremented trade ID
        address gameServerPubKey;
        address gameDeveloper;
        address tradeContract;
        uint256 serviceFeePercentage; // Fee set by game developer
        bool exists;
    }

    mapping(uint256 => TradeInfo) public trades;
    address[] public allTrades;
    uint256 public tradeCounter; // Auto-incremented trade ID

    event GameTradeCreated(uint256 tradeID, address tradeContract, uint256 serviceFeePercentage);

    function createGameTrade(address _gameServerPubKey, uint256 _serviceFeePercentage) public {
        require(_serviceFeePercentage <= 100, "Invalid service fee percentage");

        // Generate a new trade ID
        tradeCounter++;
        uint256 newTradeID = tradeCounter;

        // Deploy a new GameTrade contract
        GameTrade newTrade = new GameTrade(_gameServerPubKey,msg.sender);

        trades[newTradeID] = TradeInfo(
            newTradeID, // Store the generated trade ID
            _gameServerPubKey,
            msg.sender, // Game developer who created this trade
            address(newTrade),
            _serviceFeePercentage,
            true
        );

        allTrades.push(address(newTrade));

        emit GameTradeCreated(newTradeID, address(newTrade), _serviceFeePercentage);
    }

    function getGameTradeByID(uint256 _tradeID) public view returns (TradeInfo memory) {
        require(trades[_tradeID].exists, "Trade not found");
        return trades[_tradeID];
    }

    function getServiceFeePercentage(uint256 _tradeID) public view returns (uint256) {
        require(trades[_tradeID].exists, "Trade not found");
        return trades[_tradeID].serviceFeePercentage;
    }

    function getAllGameTrades() public view returns (address[] memory) {
        return allTrades;
    }

    function getAllGameTradeDetails() public view returns (TradeInfo[] memory) {
        TradeInfo[] memory allTradeDetails = new TradeInfo[](tradeCounter);
        uint256 index = 0;

        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].exists) {
                allTradeDetails[index] = trades[i];
                index++;
            }
        }

        return allTradeDetails;
    }

    // New function to get all trades for a particular creator
    function getGameTradesByCreator(address _creator) public view returns (address[] memory) {
        uint256 count = 0;

        // Count how many trades belong to the creator
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].gameDeveloper == _creator) {
                count++;
            }
        }

        // Create an array with the exact count
        address[] memory creatorTrades = new address[](count);
        uint256 index = 0;

        // Populate the array with trades created by the given creator
        for (uint256 i = 1; i <= tradeCounter; i++) {
            if (trades[i].gameDeveloper == _creator) {
                creatorTrades[index] = trades[i].tradeContract;
                index++;
            }
        }

        return creatorTrades;
    }
}
