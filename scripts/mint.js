require("dotenv").config();

const ethers = require("ethers");
const { abi } = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const { API_KEY, PRIVATE_KEY } = process.env;

const provider = new ethers.providers.AlchemyProvider("goerli", API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractAddress = "0xAdEc9c114D4E094545E60E2e856Ab57552831c00";

const myNftContract = new ethers.Contract(contractAddress, abi, signer);

const tokenURI = "https://gateway.pinata.cloud/ipfs/QmPkfQpZAARb4ZoQVHyLfktvLS6x8WJ9w2yp1XRrZuEeqU";

const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenURI);
    await nftTxn.wait();
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
