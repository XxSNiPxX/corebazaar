import { Components, RpgPlayer,Components } from '@rpgjs/server'
import { ethers } from "ethers"; // Import ethers.js


const CONTRACT_ADDRESS = "0x1EB42a77f2c9394025c54F5922A7E9e6F28Ce0cd"
const CONTRACT_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tradeID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "tradeContract",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "serviceFeePercentage",
          "type": "uint256"
        }
      ],
      "name": "GameTradeCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allTrades",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_gameServerPubKey",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_serviceFeePercentage",
          "type": "uint256"
        }
      ],
      "name": "createGameTrade",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllGameTradeDetails",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "gameServerPubKey",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "gameDeveloper",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tradeContract",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "serviceFeePercentage",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "exists",
              "type": "bool"
            }
          ],
          "internalType": "struct TradeFactory.TradeInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllGameTrades",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tradeID",
          "type": "uint256"
        }
      ],
      "name": "getGameTradeByID",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "gameServerPubKey",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "gameDeveloper",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tradeContract",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "serviceFeePercentage",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "exists",
              "type": "bool"
            }
          ],
          "internalType": "struct TradeFactory.TradeInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_creator",
          "type": "address"
        }
      ],
      "name": "getGameTradesByCreator",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tradeID",
          "type": "uint256"
        }
      ],
      "name": "getServiceFeePercentage",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tradeCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "trades",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tradeID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "gameServerPubKey",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "gameDeveloper",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tradeContract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "serviceFeePercentage",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
const PRIVATE_KEY="78ab46bbcdaeb7cc841c619944c23691e63d2ff23df40e0c77c693203ec90d89"
const GAME_TRADE_ABI=[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_gameServerPubKey",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_creator",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ECDSAInvalidSignature",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "length",
          "type": "uint256"
        }
      ],
      "name": "ECDSAInvalidSignatureLength",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "ECDSAInvalidSignatureS",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "resourceID",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "resourceName",
          "type": "string"
        }
      ],
      "name": "ResourceRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tradeID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "sellerID",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "TradeCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tradeID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "buyerID",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "TradeCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tradeID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "resourceID",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "TradeCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tradeID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_buyerID",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "buyTrade",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tradeID",
          "type": "uint256"
        }
      ],
      "name": "cancelTrade",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_resourceID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_sellerID",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "createTrade",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "creator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gameServerPubKey",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllActiveTrades",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "sellerID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "buyerID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "resourceID",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct GameTrade.Trade[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllResources",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tradeID",
          "type": "uint256"
        }
      ],
      "name": "getTrade",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "sellerID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "buyerID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "resourceID",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct GameTrade.Trade",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        }
      ],
      "name": "getTradesByBuyer",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "sellerID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "buyerID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "resourceID",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct GameTrade.Trade[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_buyerID",
          "type": "string"
        }
      ],
      "name": "getTradesByBuyerID",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "sellerID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "buyerID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "resourceID",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct GameTrade.Trade[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_seller",
          "type": "address"
        }
      ],
      "name": "getTradesBySeller",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "sellerID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "buyerID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "resourceID",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct GameTrade.Trade[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_sellerID",
          "type": "string"
        }
      ],
      "name": "getTradesBySellerID",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tradeID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "sellerID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "buyerID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "resourceID",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct GameTrade.Trade[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_resourceID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_resourceName",
          "type": "string"
        }
      ],
      "name": "registerResource",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "resourceList",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "resources",
      "outputs": [
        {
          "internalType": "string",
          "name": "resourceName",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tradeCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "trades",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tradeID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "sellerID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "buyerID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "resourceID",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_sellerID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "verifySignature",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_buyerID",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "verifySignatureBuyer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]



export default {
    async onConnected(player: RpgPlayer) {
          player.setComponentsTop(Components.text(player.web3.walletAdress))
          player.emit("hello",10)
          player.gold+=1000

        //   const RPC_URL = "https://rpc.test2.btcs.network";
        //   const provider = new ethers.JsonRpcProvider(RPC_URL);
        //
        //   // If the contract requires a signer (i.e., transactions), use a private key
        //   const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        //
        //   const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
        //   let allTrades
        //   let allResources
        //   try {
        //         const tradeInfo = await contract.getAllGameTrades();
        //         console.log(tradeInfo[tradeInfo.length-1],"HEREE");
        //         const GAME_TRADE_CONTRACT=tradeInfo[tradeInfo.length-1]
        //         const contract_game = new ethers.Contract(GAME_TRADE_CONTRACT, GAME_TRADE_ABI, wallet);
        //         allTrades = await contract_game.getAllActiveTrades();
        //         allResources = await contract_game.getAllResources();
        //         console.log(allTrades,allResources)
        //         console.log(player.gold)
        //
        //
        //     } catch (error) {
        //         console.error("Error fetching trade info:", error);
        //     }
        //
        //     try {
        //           const tradeInfo = await contract.getAllGameTrades();
        //           console.log(tradeInfo[tradeInfo.length-1],"HEREE");
        //           const GAME_TRADE_CONTRACT=tradeInfo[tradeInfo.length-1]
        //           const contract_game = new ethers.Contract(GAME_TRADE_CONTRACT, GAME_TRADE_ABI, wallet);
        //           allTrades = await contract_game.getAllActiveTrades();
        //           allResources = await contract_game.getAllResources();
        //       //     contract_game.on("TradeCompleted", (tradeID, buyer) => {
        //       //   console.log(`🔥 Trade Completed!`);
        //       //   console.log(`✅ Trade ID: ${tradeID}`);
        //       //   console.log(`👤 Buyer: ${buyer}`);
        //       // });
        //
        //
        //       } catch (error) {
        //           console.error("Error fetching trade info:", error);
        //       }
        //
        //
        //
        // const guiNameScreen = player.gui('NameScreenGui')

 //        guiNameScreen.on('sellItem', async ({ item_name, item_price, quantity }) => {
 //     console.log(item_name, item_price, quantity);
 //
 //     const RPC_URL = "https://rpc.test2.btcs.network";
 //     const provider = new ethers.JsonRpcProvider(RPC_URL);
 //
 //     // Move function outside or use an arrow function
 //     const signMessage = async (signer, sellerID, quantity) => {
 //         const messageHash = ethers.solidityPackedKeccak256(
 //             ["string", "uint256"],
 //             [sellerID, quantity]
 //         );
 //         const signature = await signer.signMessage(ethers.getBytes(messageHash));
 //         return signature;
 //     };
 //
 //     // Use a private key to sign transactions
 //     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
 //
 //     if (item_name === 'ingame-gold') {
 //         if (quantity > player.gold) {  // Fix missing block
 //           let tmp=player.gold
 //           console.log(quantity)
 //           player.gold+=1000
 //           player.setComponentsTop(Components.text('{gold} Gold'))
 //
 //           console.log(player.gold)
 //           player.save()
 //             const signature = await signMessage(wallet, player.id, quantity);
 //             console.log(signature);
 //             player.emit("SendSignature",{item_name:item_name,quantity:quantity,item_price:item_price,sellerid:player.id,signature:signature})
 //
 //         }
 //     }
 // });
//         guiNameScreen.on('buyItem', async ({ item_name, item_price, quantity,seller,trade_id }) => {
//               console.log(item_name, item_price, quantity,seller,trade_id);
//
//               const RPC_URL = "https://rpc.test2.btcs.network";
//               const provider = new ethers.JsonRpcProvider(RPC_URL);
//
//               // Move function outside or use an arrow function
//               async function signMessageBuyer(signer, buyerID) {
//                   const messageHash = ethers.solidityPackedKeccak256(
//                       ["string"],
//                       [buyerID]
//                   );
//                   const signature = await signer.signMessage(ethers.getBytes(messageHash));
//                   return signature;
//               }
//
//               // Use a private key to sign transactions
//               const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//
//               if (item_name === 'ingame-gold') {
//                     const signature = await signMessageBuyer(wallet, player.id);
//                     console.log(signature);
//                     player.emit("SendBuySignature",{item_name:item_name,quantity:quantity,item_price:item_price,sellerid:seller,buyerid:player.id,trade_id:trade_id,signature:signature})
//
//               }
// });



 // const convertTradesToEth = (trades) => {
 //
 //     return trades.map(trade => {
 //         if (trade.length >= 6) { // Ensure trade has at least 6 elements
 //           console.log(trade[6],"YOOOOOO")
 //           const weiToEthString = (wei) => {
 //               return (Number(wei) / 1e18).toString();
 //           };
 //             return [
 //               Number(trade[0]),  // Convert 5th element (Gwei to ETH)
 //                 ...trade.slice(1, 5),  // Keep first 4 elements unchanged
 //                 Number(trade[5]),  // Convert 5th element (Gwei to ETH)
 //                 weiToEthString(trade[6]), // Convert 6th element (Wei to ETH)
 //                 ...trade.slice(7) // Keep remaining elements unchanged
 //             ];
 //         }
 //         return trade; // If trade has less than 6 elements, return it unchanged
 //     });
 // };
 //
 // const convertedTrades = convertTradesToEth(allTrades);
 // console.log(convertedTrades)
 //    //    guiNameScreen.open({
 //    //   allTrades: convertedTrades, // You can send props to the GUI
 //    //   allResources:allResources
 //    // })
 //    console.log("allTrades","allResources")

    },
    onInput(player: RpgPlayer, { input }) {
        const map = player.getCurrentMap()
        if (input == 'action') {

            // const event = map?.createDynamicEvent({
            //     x: player.position.x + 5,
            //     y: player.position.y + 5,
            //     event: CharaEvent,
            // });
            gui.on('buyItem', (data) => {
              console.log(data.amount) // 100
          })

        }
        if (input == 'back') {
           player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
      // const gui = player.gui('test')
      // gui.open({ gold: player.gold })

    }
}
