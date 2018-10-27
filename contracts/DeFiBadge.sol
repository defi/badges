pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";

contract DeFiBadge is ERC721Full, MinterRole {
    constructor() ERC721Full("DeFi Badge", "DEFI") public {
    }

    uint256 nextTokenId = 1;

    function mint(address to, string tokenURI) public onlyMinter {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function approve(address to, uint256 tokenId) public {
        revert("Cannot transfer badges.");
    }

    function getApproved(uint256 tokenId) public view returns (address operator) {
        revert("Cannot transfer badges.");
    }

    function setApprovalForAll(address operator, bool _approved) public {
        revert("Cannot transfer badges.");
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        revert("Cannot transfer badges.");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        revert("Cannot transfer badges.");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes data
    ) public {
        revert("Cannot transfer badges.");
    }
}