import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../utils/verify.ts"
import {
    networkConfig,
    developmentChains,
    PRICE_FEED,
} from "../helper-config"
import { ethers } from "hardhat"

const deployBPassContract: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")

    log("Testnet Network detected: Deploying BPass Contract...")

    const bPass = await deploy("BPass", {
        from: deployer,
        log: true,
        args: [PRICE_FEED],
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })

    log(`BPass Contract Deployed at ${bPass.address}`)
    log("---------------------------------------------------")

    log("Deployed Contract address detected: Verifying BPass Contract...")

    if (
        (!developmentChains.includes(network.name) &&
            process.env.ETHERSCAN_API_KEY) ||
        process.env.SCROLLSCAN_API_KEY
    ) {
        await verify(bPass.address, [PRICE_FEED])
    }
}

export default deployBPassContract
deployBPassContract.tags = ["all", "bPass"]
