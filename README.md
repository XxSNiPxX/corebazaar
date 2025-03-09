# CoreBazaar: Plug-and-Play In-Game P2P Exchange Infrastructure

## Overview
CoreBazaar is a seamless plug-and-play in-game peer-to-peer (P2P) and direct exchange infrastructure, enabling gamers and developers to integrate decentralized trading mechanisms into their gaming ecosystems. By leveraging blockchain technology, CoreBazaar enhances player ownership, facilitates trustless transactions, and creates a thriving in-game economy.

## Key Features
- **Seamless Integration**: Simple SDKs and APIs allow game developers to plug CoreBazaar into their games effortlessly without smart contract creation.
- **Game Economy**: Enables developers to create and manage game economies efficiently.

## How It Works
1. **Game Developers Integrate CoreBazaar**: Developers use the CoreBazaar contract factory to create an exchange with their game's public key for asset verification and a fee to extract from each transaction.
2. **Frontend Integration**: Developers integrate CoreBazaar SDKs (currently in development) or direct contract calls into their frontend stores.
3. **Backend Integration**: Developers listen to `TradeCompleted` and `TradeCreation` events to update user assets and enable exchanges.


## Execution
1. **Clone the repository**:
```
git clone https://github.com/XxSNiPxX/corebazaar.git
cd corebazaar

```

2. **Dashboard execution**:
```
cd corebazzar-dashboard
pnpm i
pnpm run dev
```
Here game developers need to go to integrate tab and type in the required details. A public key of the game server and the fee that the game developers earn from each transaction,

3. **Game Integration Example**:

> Remember to update the PRIVATE KEY of your game server in /src/game/main/events/UIEvent.ts

```
cd game-integration-example
npm i
npm run dev
```


## Use Cases
- **MMORPGs & Open-World Games**: Players can trade weapons, skins, and rare items without intermediaries.
- **Esports & Competitive Games**: Secure trading of tournament rewards and digital collectibles.
- **Direct Selling**: Developers can integrate a payment platform for in-game currency easily.
- **Metaverse & Virtual Worlds**: A decentralized marketplace for in-game land, avatars, and accessories.

## Why CoreBazaar?
- **Decentralization**: No central authority controls transactions, ensuring fairness and security.
- **Revenue Opportunities**: Developers can monetize transactions via fees while maintaining a fair economy.
- **Enhanced Player Engagement**: A thriving in-game economy boosts user retention and participation.

## Roadmap
- **Phase 1**: Creation of SDKs to enhance integration for developers.
- **Phase 2**: Implementation of direct in-game currency payments in the smart contract.
- **Phase 3**: Development of a statistics dashboard for game developers to track transactions.

## Links
- **Website**: [Coming Soon]
- **GitHub**: [CoreBazaar Repository](https://github.com/XxSNiPxX/corebazaar)
- **Twitter**: [Coming Soon]
- **Telegram**: [Coming Soon]
