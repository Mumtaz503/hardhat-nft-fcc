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
        // beforeEach(async ()=>{

        // });
        it("Should mint the NFT to the user", async function(){
            const transactionResponse = await basicNft.mintNFT();
            await transactionResponse.wait(1);

            const tokenCounter = await basicNft.getTokenCounter();
            const tokenURI = await basicNft.tokenURI(0);

            assert.equal(tokenCounter.toString(), "1"); //Assertion Error here. will fix later :(
            assert.equal(tokenURI, basicNft.TOKEN_URI());
        });
    });
});