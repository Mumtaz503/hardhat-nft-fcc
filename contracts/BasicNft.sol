// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.18;

contract BasicNft is ERC721{

    uint256 private s_tokenCounter;
    string public constant TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    constructor() ERC721("Dog Token", "DAWG") {
        s_tokenCounter = 0;
    }

    function mintNFT() public returns (uint256){
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += s_tokenCounter;
        return s_tokenCounter;
    }

    function tokenURI(uint256 /*_tokenId*/) public view override returns (string memory) {
        return TOKEN_URI;
    }

    //View & Pure Functions for testing and help

    function getTokenCounter() public view returns(uint256) {
        return s_tokenCounter;
    }
}