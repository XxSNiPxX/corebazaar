
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // Load private key
  const secret = JSON.parse(fs.readFileSync("./secret.json", "utf8"));
  const privateKey = secret.PrivateKey;
  console.log("Loaded private key:", privateKey);

  // Setup provider and wallet
  const provider = new hre.ethers.JsonRpcProvider("https://rpc.test2.btcs.network");
  const wallet = new hre.ethers.Wallet(privateKey, provider);
  console.log("Using wallet address:", wallet.address);

  // Use the wallet as the deployer
  const TradeFactory = await hre.ethers.getContractFactory("TradeFactory", wallet);
  const factory = await TradeFactory.deploy();

  await factory.waitForDeployment(); // Ensure deployment completes

  console.log("TradeFactory contract deployed to:", await factory.getAddress());
}

// Proper error handling
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
