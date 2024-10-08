const {network} = require("hardhat");
const {developmentChains} = require("../helper-hardhat-config");
const {verify} = require("../utils/verification");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();

    log("-------------------------------------");

    const arguments = [];

    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("-------------------------------------");

    if(!developmentChains.includes(network.name)  && process.env.ETHERSCAN_API_KEY) {
        log("Verifying contract please wait...");
        await verify(basicNft.address, arguments);
    }
}

module.exports.tags = ["all", "basicNft"];

