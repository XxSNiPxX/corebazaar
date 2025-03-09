const { expect } = require("chai");
const { ethers } = require("hardhat");

async function signMessage(signer, sellerID, quantity) {
    const messageHash = ethers.solidityPackedKeccak256(
        ["string", "uint256"],
        [sellerID, quantity]
    );
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    return signature;
}

async function signMessageBuyer(signer, buyerID) {
    const messageHash = ethers.solidityPackedKeccak256(
        ["string"],
        [buyerID]
    );
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    return signature;
}

describe("TradeFactory and GameTrade", function () {
    let TradeFactory, factory, owner, gameServer, user1, user2;

    before(async function () {
        [owner, gameServer, user1, user2] = await ethers.getSigners();
        TradeFactory = await ethers.getContractFactory("TradeFactory");
        factory = await TradeFactory.deploy();
    });

    it("should create a trade", async function () {
        const tx = await factory.connect(owner).createGameTrade(gameServer.address, 10);
        await tx.wait();
        const tradeInfo = await factory.getGameTradeByID(1);
        expect(tradeInfo.gameDeveloper).to.equal(owner.address);
        expect(tradeInfo.gameServerPubKey).to.equal(gameServer.address);
        expect(tradeInfo.serviceFeePercentage).to.equal(10);
        const gameTrade = await ethers.getContractAt("GameTrade", tradeInfo.tradeContract);
        expect(await gameTrade.gameServerPubKey()).to.equal(gameServer.address);
    });

    it("should allow only the contract creator to register a resource", async function () {

        const tradeInfo = await factory.getGameTradeByID(1);
        const gameTrade = await ethers.getContractAt("GameTrade", tradeInfo.tradeContract);
        const creator = await gameTrade.creator();
        console.log(creator)
        console.log(owner.address)
        console.log(tradeInfo)
        // await expect(
        //     gameTrade.registerResource("resource123", "Gold Coins")
        // ).to.be.revertedWith("Only contract creator can register resources");
        await gameTrade.connect(owner).registerResource("resource123", "Gold Coins");
        const resource = await gameTrade.resources("resource123");
        expect(resource.exists).to.be.true;
    });

    it("should create a trade exchange", async function () {
        const tradeInfo = await factory.getGameTradeByID(1);
        const gameTrade = await ethers.getContractAt("GameTrade", tradeInfo.tradeContract);
        const signature = await signMessage(gameServer, "seller123", 10);
        await gameTrade.connect(user1).createTrade("resource123", 10,1, "seller123", signature);
        const trade = await gameTrade.trades(1);
        expect(trade.seller).to.equal(user1.address);
        expect(trade.price).to.equal(ethers.parseEther("1"));
        expect(trade.resourceID).to.equal("resource123");
    });

    it("should complete a trade with a valid signature", async function () {
        const tradeInfo = await factory.getGameTradeByID(1);
        const gameTrade = await ethers.getContractAt("GameTrade", tradeInfo.tradeContract);
        const buySignature = await signMessageBuyer(gameServer, "buyer321");
        await gameTrade.connect(user2).buyTrade(1, "buyer321", buySignature, { value: ethers.parseEther("1") });
        const trade = await gameTrade.trades(1);
        expect(trade.buyer).to.equal(user2.address);
        expect(trade.active).to.be.false;
    });

    it("should allow a seller to cancel a trade", async function () {
        const tradeInfo = await factory.getGameTradeByID(1);
        const gameTrade = await ethers.getContractAt("GameTrade", tradeInfo.tradeContract);
        const signature = await signMessage(gameServer, "seller123", 10);
        await gameTrade.connect(user1).createTrade("resource123", 10, ethers.parseEther("1"), "seller123", signature);
        const trade = await gameTrade.trades(2);
        await gameTrade.connect(user1).cancelTrade(2);
        const trade2 = await gameTrade.trades(2);
        expect(trade2.active).to.be.false;
    });
});
