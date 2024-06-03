// @ts-nocheck

import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"
import "hardhat-contract-sizer"
import { HardhatUserConfig } from "hardhat/config"

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "privateKey"
const SCROLL_SEPOLIA_RPC_URL = process.env.SCROLL_SEPOLIA_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const SCROLLSCAN_API_KEY = process.env.SCROLLSCAN_API_KEY

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        scrollSepolia: {
            url:
                SCROLL_SEPOLIA_RPC_URL !== undefined
                    ? SCROLL_SEPOLIA_RPC_URL
                    : "",
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 534351,
        },
    },
    solidity: {
        compilers: [
            { version: "0.8.20" },
        ],
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
            scrollSepolia: SCROLLSCAN_API_KEY,
        },
        customChains: [
            {
                network: "scrollSepolia",
                chainId: 534351,
                urls: {
                    apiURL: "https://sepolia-rpc.scroll.io/api",
                    browserURL: "https://sepolia-rpc.scroll.io/",
                },
            },
        ],
    },

    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
        only: [":ERC20$"],
    },

    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}

export default config
