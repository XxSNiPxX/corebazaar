import { type RpgClientEngineHooks, RpgClientEngine } from "@rpgjs/client";
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

const client: RpgClientEngineHooks = {
    onStart(engine: RpgClientEngine) {

    },
    onConnected(engine: RpgClientEngine, socket: any) {
        console.log("Client successfully connected to the server");
        // Listen for "hello" event from the server

        // socket.on("hello", (data: any) => {
        //     console.log(`Received "hello" event from server:`, data);
        // });
        socket.on("SendSignature", async (data: any) => {
            console.log(`Received "hello" event from server:`, data);
            const RPC_URL = "https://rpc.test2.btcs.network";
            if (!window.ethereum) {
              throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);;
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            let allTrades
            let allResources
            try {
                  console.log(contract)
                  const tradeInfo = await contract.getAllGameTrades();
                  console.log(tradeInfo);
                  const GAME_TRADE_CONTRACT=tradeInfo[tradeInfo.length-1]
                  const contract_game = new ethers.Contract(GAME_TRADE_CONTRACT, GAME_TRADE_ABI, signer);
                  allTrades = await contract_game.getAllActiveTrades();
                  allResources = await contract_game.getAllResources();
                  console.log(typeof data.item_price,ethers.parseEther(data.item_price.toString()),Number(data.item_price), "GOLD IASSS")
                  const tx = await contract_game.createTrade(data.item_name, data.quantity, ethers.parseEther(data.item_price.toString()), data.sellerid, data.signature);
                  await tx.wait();  // Wait for transaction confirmation


              } catch (error) {
                  console.error("Error fetching trade info:", error);
              }



        });

        socket.on("SendBuySignature", async (data: any) => {
            console.log(`Received "hello" event from server:`, data);
            const RPC_URL = "https://rpc.test2.btcs.network";
            if (!window.ethereum) {
              throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);;
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            let allTrades
            let allResources
            try {
                  console.log(contract)
                  const tradeInfo = await contract.getAllGameTrades();
                  console.log(tradeInfo);
                  const GAME_TRADE_CONTRACT=tradeInfo[tradeInfo.length-1]
                  const contract_game = new ethers.Contract(GAME_TRADE_CONTRACT, GAME_TRADE_ABI, signer);
                  allTrades = await contract_game.getAllActiveTrades();
                  allResources = await contract_game.getAllResources();

                  const tx = await contract_game.buyTrade(
                      data.trade_id,
                      data.buyerid,
                      data.signature,
                      { value: ethers.parseEther(data.item_price.toString()) } // ✅ Converts 98 ETH to wei
                  );
                  await tx.wait();




              } catch (error) {
                  console.error("Error fetching trade info:", error);
              }



        });

    }
};

export default client;
