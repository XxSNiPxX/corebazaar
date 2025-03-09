"use client"

import type React from "react"
import { useState } from "react"
import { ethers } from "ethers"
import { Button } from "~/components"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/TypescriptUI/card"
import { Input } from "~/components/TypescriptUI/input"
import { Label } from "~/components/TypescriptUI/label"
import { toast } from "~/components/TypescriptUI/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "~/components/TypescriptUI/alert"

// Smart Contract Details
const CONTRACT_ADDRESS = "0x1EB42a77f2c9394025c54F5922A7E9e6F28Ce0cd"
const ABI = [
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

export function GameServerForm() {
  const [gameServerPubKey, setGameServerPubKey] = useState("")
  const [serviceFeePercentage, setServiceFeePercentage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validate inputs
    if (!gameServerPubKey.trim()) {
      setError("Game Server Public Key is required")
      return
    }

    if (!serviceFeePercentage.trim() || isNaN(Number(serviceFeePercentage))) {
      setError("Service Fee Percentage must be a valid number")
      return
    }

    const feeValue = Number(serviceFeePercentage)
    if (feeValue < 0 || feeValue > 100) {
      setError("Service Fee Percentage must be between 0 and 100")
      return
    }

    setIsSubmitting(true)

    try {
      // Check for MetaMask
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed")
      }

      // Connect to Ethereum wallet
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // Connect to the contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)

      // Send transaction
      const tx = await contract.createGameTrade(gameServerPubKey, feeValue)
      await tx.wait()

      setSuccess("Game server configuration submitted successfully!")
      toast({
        title: "Success",
        description: "Game server configuration submitted successfully",
      })

      // Reset form
      setGameServerPubKey("")
      setServiceFeePercentage("")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error occurred")
      toast({
        title: "Transaction failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-t-lg">
        <CardTitle className="text-white">Game Server Configuration</CardTitle>
        <CardDescription className="text-gray-200">
          Configure your game server public key and service fee
        </CardDescription>
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
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gameServerPubKey" className="text-gray-300">
              Game Server Public Key <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gameServerPubKey"
              value={gameServerPubKey}
              onChange={(e) => setGameServerPubKey(e.target.value)}
              placeholder="0x..."
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
            <p className="text-xs text-gray-400">Enter the public key for your game server</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceFeePercentage" className="text-gray-300">
              Service Fee Percentage <span className="text-red-500">*</span>
            </Label>
            <Input
              id="serviceFeePercentage"
              value={serviceFeePercentage}
              onChange={(e) => setServiceFeePercentage(e.target.value)}
              placeholder="5.0"
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
            <p className="text-xs text-gray-400">Enter the service fee percentage (0-100)</p>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
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
                Submitting...
              </div>
            ) : (
              "Submit Configuration"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
