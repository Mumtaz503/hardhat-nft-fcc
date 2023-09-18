const { assert } = require("chai");
const { getNamedAccounts, ethers, deployments } = require("hardhat");


describe("Basic NFT unit tests", function() {
    let basicNft, deployer, deployerSigner, user, userSigner;

    beforeEach(async ()=>{
        deployer = (await getNamedAccounts()).deployer;
        user = (await getNamedAccounts()).user;
        userSigner = ethers.provider.getSigner(user);
        await deployments.fixture(["basicNft"]);
        deployerSigner = ethers.provider.getSigner(deployer);
        basicNft = await ethers.getContract("BasicNft", deployer);
    });

    describe("Constructor", function() {
       it("Should correctly set the name and the symbol of the NFT", async ()=> {
        const name = await basicNft.name();
        const symbol = await basicNft.symbol();
        const tokenCounter = await basicNft.getTokenCounter();
        assert.equal(name.toString(), "Dog Token");
        assert.equal(symbol.toString(), "DAWG");
        assert.equal(tokenCounter.toString(), 0);
       }); 
    });
    describe("mintNFT function", function() {
        let txResponse;
        beforeEach(async ()=>{
            txResponse = await basicNft.connect(userSigner).mintNFT();
            await txResponse.wait(1);
        });
        it("Should update the values correctly upon minting", async function(){
            const tokenCounter = await basicNft.getTokenCounter();
            const tokenURI = await basicNft.tokenURI(0);

            assert.equal(tokenCounter.toString(), "1");
            assert.equal(tokenURI, await basicNft.TOKEN_URI());
        });
        it("Should update the balances of the owner", async function(){
            const userAddress = user;
            const tokenId = 0;

            const userBalance = await basicNft.balanceOf(userAddress);
            const nftOwner = await basicNft.ownerOf(tokenId);
            assert.equal(userBalance.toString(), "1");
            assert.equal(nftOwner, userAddress);
        });
    });
});