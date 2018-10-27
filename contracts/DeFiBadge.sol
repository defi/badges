pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract DeFiBadge is ERC721Full {
    constructor() ERC721Full("DeFi Badge", "DEFI") public
    {
    }
}