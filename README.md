# paillier-solidity

A PoC to demonstrate homomorphic addition of two ciphertexts using the [Paillier](https://en.wikipedia.org/wiki/Paillier_cryptosystem) cryptosystem. 

By default, Solidity is unable to perform certain cryptographic operations due to the restrictions on the size of some of its data types. With the use of the [solidity-BigNumber](https://github.com/firoorg/solidity-BigNumber) library, we can bypass these restrictions and finally perform cryptography from within a smart contract.

## Prerequisites
`Node.js  >=16.0` - required for Hardhat

## Installation
Clone the repo:
`git clone https://github.com/jahali6128/paillier-solidity.git`

Change to the `paillier-solidity` directory:
`cd paillier-solidity`

Install the dependencies:
`npm install`

Compile the smart contracts in the `contracts` directory:
`npx hardhat compile`

## Deploy Contracts
Once compiled they can be deployed using the JS script `scripts/deploy.js`:
```
npx hardhat run scripts/deploy.js
PaillierSolidity deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Running Unit Tests
There are two tests for both of the functions in the `PaillierSolidity` contract: `addEncSum` and `encZero`.

To run these tests, enter the command:
`npx hardhat test`

You should see an output like this if both tests passed:
```  
  PaillierSolidity.sol
Decrypted Sum: 3
    ✔ Adding Encrypted Sums - E(a) + E(b) = E(a + b) (6289ms)
Decrypted Zero: 0
    ✔ Encrypting Zero (779ms)
    
  2 passing (7s)
```



