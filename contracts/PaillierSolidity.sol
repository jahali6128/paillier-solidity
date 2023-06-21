// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./BigNumbers.sol";

contract PaillierSolidity {

    using BigNumbers for *;

    function encZero(bytes calldata bytesRand, bytes calldata bytesPub) public view returns (BigNumber memory) {
        
        BigNumber memory rand = BigNumber(bytesRand, false, BigNumbers.bitLength(bytesRand));
        BigNumber memory pub_n = BigNumber(bytesPub, false, BigNumbers.bitLength(bytesPub));

        BigNumber memory enc_zero;

        // Encryption - g^m * r^n mod n^2
        // Since m = 0, we simplify to r^n mod n^2
        enc_zero = BigNumbers.mod(BigNumbers.mul(rand, pub_n), BigNumbers.pow(pub_n, 2));

        return enc_zero;
    }    

    function addEncSum(bytes calldata bytesA, bytes calldata bytesB, 
                        bytes calldata bytesPub ) public view returns (BigNumber memory) {
        
        // Represent encrypted sums and public key in "BigNumber" datatype 
        // We assume enc_x to always be postive so enc_x.neg set to false 
        BigNumber memory enc_a = BigNumber(bytesA, false, BigNumbers.bitLength(bytesA));
        BigNumber memory enc_b = BigNumber(bytesB, false, BigNumbers.bitLength(bytesB));
        BigNumber memory pub_n = BigNumber(bytesPub, false, BigNumbers.bitLength(bytesPub));

        BigNumber memory enc_sum;

        // a * b mod n^2 - Enc(a) + Enc(b)
        enc_sum = BigNumbers.mod(BigNumbers.mul(enc_a, enc_b), BigNumbers.pow(pub_n, 2));

        return enc_sum;
    }


}
