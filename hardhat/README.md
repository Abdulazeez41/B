### BPass SmartContract: Decentralized Event Ticketing Contract

Welcome to BPass, the decentralized contract revolutionizing event ticketing through blockchain technology and non-fungible tokens (NFTs). This README will guide you through the process of getting started with BPass, from installation to using the Smartcontract effectively.

### Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
    - [Creating a New Pass](#creating-a-new-pass)
    - [Purchasing a Pass](#purchasing-a-pass)
4. [Key Features](#key-features)
5. [Chainlink Integration](#chainlink-integration)
6. [The Graph Protocol Integration](#the-graph-protocol-integration)
7. [Contributing](#contributing)
8. [Deployed Address](#deployed-address)
9. [Support](#support)
10. [License](#license)

### Introduction
BPass is a decentralized platform built on the Scroll blockchain, designed to address the challenges of traditional event ticketing systems. By leveraging blockchain technology and NFTs, BPass ensures fair ticket pricing, prevents scalping, and guarantees the authenticity of event tickets.

### Installation
To get started with BPass, follow these steps:

1. Clone the BPass repository to your local machine:
   ```
   git clone https://github.com/alade-dev/Bpass
   ```

2. Install dependencies:
   ```
   cd bpass
   npm install
   ```

3. Compile the smart contracts:
   ```
   npx hardhat compile
   ```

4. Deploy the contracts to the Scroll blockchain:
   ```
   npx hardhat run scripts/deploy.js --network scrollSepolia
   ```

### Usage
#### Creating a New Pass
To create a new pass on BPass, organizers can follow these steps:

1. Connect your Scroll wallet to the BPass platform.
2. Navigate to the "Create New Pass" section.
3. Fill in the details of the pass, including maximum pass count, start time, sales end time, initial pass price, metadata, and category.
4. Confirm the creation of the pass, and it will be deployed on the blockchain.

#### Purchasing a Pass
To purchase a pass on BPass as an attendee, follow these steps:

1. Connect your Scroll wallet to the BPass platform.
2. Browse the available passes and select the desired pass.
3. Review the pass details, including pricing and availability.
4. Click "Purchase Pass" and confirm the transaction using your wallet.
5. Upon successful purchase, the pass will be minted as an NFT in your wallet.

### Key Features
- **Dynamic Pricing:** Prices of passes are dynamically adjusted based on real-time market conditions using Chainlink price feeds.
- **Fair Access:** Unique NFT-based passes prevent scalping and ensure fair access for genuine fans.
- **Immutable Records:** All ticket transactions are recorded on the blockchain, ensuring transparency and preventing fraud.

### Chainlink Integration
BPass integrates Chainlink price feeds to enable dynamic pricing of event passes. The `updateFeedPrice` function in the smart contract retrieves real-time asset prices from Chainlink oracles and adjusts the pass price accordingly. This ensures that pass prices remain fair and reflect current market conditions.

### The Graph Protocol Integration
BPass utilizes the Graph Protocol for efficient indexing and querying of blockchain data. The BPass subgraph indexes data related to event passes, including pass details, transaction history, and user interactions. Users can query the subgraph to retrieve information such as available event passes, pass prices, user bookings, and more, facilitating seamless interaction with the BPass platform.

#### New Subgraph(s) for BPass

**Link to the Deployed Subgraph:**
- [BPass Subgraph](https://thegraph.com/studio/subgraph/bpass)

**Link to the Subgraph Source Code:**
- [BPass Subgraph Source Code](../hardhat/bpass)

**Data Indexed and Queried Using the Subgraph:**
- The BPass subgraph indexes data related to event passes, including pass details (such as metadata, category, and pricing), transaction history (pass purchases), and user interactions (pass bookings). 
- Users can query the subgraph to retrieve information such as available event passes, pass prices, user bookings, and more, facilitating seamless interaction with the BPass platform.

### Contributing
We welcome contributions from the community to help improve BPass. If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Make your changes in a new branch.
3. Submit a pull request detailing your changes.

### Deployed Address

Find below the address of the deployed BPass smart contract on the Scroll network:

- [BPass Address](https://sepolia.scrollscan.com/address/0xD05E461F5CE3D721d614aD881FcB73cCA74D61D4#code)

### Support
If you encounter any issues or have questions about BPass, please reach out to us through the following channels:
- Email: support@bpass.com
- Discord: [BPass Discord Server](https://discord.gg/bpass)

### License
BPass is licensed under the MIT License. See the [LICENSE](../hardhat/LICENSE.md) file for more details.

Thank you for choosing BPass for your event ticketing needs! 🎫🚀
