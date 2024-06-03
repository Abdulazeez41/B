export interface NetworkConfigItem {
    //ethUsdPriceFeed?: string
    blockConfirmations?: number
    name?: string
    priceFeedRouter?: string
    ROUTER?: string
    TUSD?: string
}

export interface NetworkConfigInfo {
    [key: string]: NetworkConfigItem
}

export const networkConfig: NetworkConfigInfo = {
    localhost: {},
    hardhat: {},
    scrollSepolia: {
        blockConfirmations: 6,
    },
}

export const PRICE_FEED: string = "0xb84a700192A78103B2dA2530D99718A2a954cE86", //Scroll-Sepolia USDT/usd 
export const developmentChains: string[] = ["hardhat", "localhost", "scrollSepolia"];
