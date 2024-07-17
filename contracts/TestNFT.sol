// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract TestNFT is ERC721URIStorage {
    address payable owner;

    uint256 public _tokenIds;

    struct NftRender {
        uint256 id;
        string uri;
    }

    //-----------------------------------------------------------------------
    //EVENTS

    event TokenCreated(uint256 tokenId, address indexed creator, string uri);
    event TokenBurned(uint256 tokenId);

    //-----------------------------------------------------------------------
    //ERRORS

    error OnlyTokenOwner(uint256 tokenId);

    constructor() ERC721("Test NFT", "TNFT") {
        owner = payable(msg.sender);
    }

    // ************************ //
    //      Main Functions      //
    // ************************ //

    function mintNFT(string memory uri) external returns (uint256) {
        uint256 tokenId = _mintNFT(uri);

        emit TokenCreated(tokenId, msg.sender, uri);

        return tokenId;
    }

    function _mintNFT(string memory uri) internal returns (uint256) {
        uint256 tokenId = _tokenIds;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        tokenId += 1;
        _tokenIds = tokenId;

        return tokenId - 1;
    }

    function getAllNfts() external view returns (NftRender[] memory) {
        uint256 tokenId = _tokenIds;
        NftRender[] memory items = new NftRender[](tokenId);

        for (uint256 i; i < tokenId; ) {
            items[i] = NftRender(i, super.tokenURI(i));

            unchecked {
                ++i;
            }
        }

        return items;
    }

    function getUserNfts(
        address account
    ) external view returns (NftRender[] memory) {
        uint256 tokenId = _tokenIds;
        uint256 nftsCount = balanceOf(account);
        NftRender[] memory items = new NftRender[](nftsCount);

        uint256 counter;
        for (uint256 i; i < tokenId; ) {
            if (ownerOf(i) == account) {
                string memory uri = super.tokenURI(i);
                items[counter] = NftRender(i, uri);
                counter++;
            }

            unchecked {
                ++i;
            }
        }

        return items;
    }

    function burn(uint256 tokenId) external {
        if (msg.sender != ownerOf(tokenId)) revert OnlyTokenOwner(tokenId);
        super._burn(tokenId);

        emit TokenBurned(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
