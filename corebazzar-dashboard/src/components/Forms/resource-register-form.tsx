"use client";

import type React from "react";
import { useState } from "react";
import { ethers } from "ethers"; // Import ethers.js
import { Button } from "~/components";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/TypescriptUI/card";
import { Input } from "~/components/TypescriptUI/input";
import { Label } from "~/components/TypescriptUI/label";
import { toast } from "~/components/TypescriptUI/use-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "~/components/TypescriptUI/alert";

// Smart Contract Details
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
export function ResourceRegistrationForm() {
  const [resourceID, setResourceID] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!resourceID.trim()) {
      setError("Resource ID is required");
      return;
    }

    if (!resourceName.trim()) {
      setError("Resource Name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tradeInfo = await contract.getAllGameTrades();
      console.log(tradeInfo.length)

      const GAME_TRADE_CONTRACT=tradeInfo[tradeInfo.length-1]
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
      const game_contract = new ethers.Contract(GAME_TRADE_CONTRACT, GAME_TRADE_ABI, signer);



      const tx = await game_contract.registerResource(resourceID, resourceName);
      await tx.wait(); // Wait for transaction confirmation

      setSuccess(`Resource "${resourceName}" registered successfully with ID: ${resourceID}`);
      toast({
        title: "Success",
        description: `Resource "${resourceName}" registered successfully on the blockchain.`,
      });

      setResourceID("");
      setResourceName("");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Transaction failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-t-lg">
        <CardTitle className="text-white">Register Resource</CardTitle>
        <CardDescription className="text-gray-200">Register a new game resource on the blockchain</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-900/20 border-green-800 text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resourceID" className="text-gray-300">
              Resource ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="resourceID"
              value={resourceID}
              onChange={(e) => setResourceID(e.target.value)}
              placeholder="unique-resource-id"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
            <p className="text-xs text-gray-400">Enter a unique identifier for this resource</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resourceName" className="text-gray-300">
              Resource Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="resourceName"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="Legendary Sword"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
            <p className="text-xs text-gray-400">Enter a descriptive name for this resource</p>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </div>
            ) : (
              "Register Resource"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
