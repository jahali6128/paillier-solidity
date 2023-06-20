const { expect } = require("chai");
const paillierBigint = require('paillier-bigint');
const bigintConversion = require('bigint-conversion');


describe("PaillierSolidity.sol", function() {

    it("Adding Encrypted Sums - E(a) + E(b) = E(a + b)", async function () { 
    
    // Generate temp public, private keys
    const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(256);

    const a = 1;
    const b = 2;

    // enc_a
    const enc_a = ethers.toBeHex(publicKey.encrypt(a));
    const enc_a_bitlength = enc_a.toString(16).length * 4;
    // console.log("enc_a: %s\nenc_a_bitlength: %s\n", enc_a, enc_a_bitlength);

    // enc_b
    const enc_b = ethers.toBeHex(publicKey.encrypt(b));
    const enc_b_bitlength = enc_a.toString(16).length * 4;
    // console.log("enc_b: %s\nenc_b_bitlength: %s\n", enc_b, enc_b_bitlength);

    // Public key
    const pub_n = ethers.toBeHex(publicKey.n);
    const pub_n_bitlength = pub_n.toString(16).length * 4;
    // console.log("pub_n: %s\npub_n_bitlength: %s\n", pub_n, pub_n_bitlength);

    // bit length will differ to what has been stated in this script.
    // if using 256-bit key, bit_length will be 264 as "0x" prefix may have been factored in  


    // Now lets deploy the contract
    const [owner] = await ethers.getSigners();
    const paillierSolidity = await ethers.deployContract("PaillierSolidity");
    
    const enc_sum = await paillierSolidity.addEncSum(enc_a, enc_a_bitlength, 
                                                        enc_b, enc_b_bitlength,
                                                        pub_n, pub_n_bitlength);
    
    // Will return tuple so get first index
    const enc_sum_int = bigintConversion.hexToBigint(enc_sum[0]);
    // console.log("enc_sum_int:", enc_sum_int);

    // Conversion to int not neccesary - but will save me trying to figure out what 'n' is in the future
    const dec_sum = Number(privateKey.decrypt(enc_sum_int));
    console.log("Decrypted Sum:", dec_sum);

    // We want dec_sum to equal 3
    expect(dec_sum).to.equal(3);
    
    });

    it("Encrypting Zero", async function() {

        const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(256);

        const [owner] = await ethers.getSigners();
        const paillierSolidity = await ethers.deployContract("PaillierSolidity");
        

        // Arbitary random number - 10000
        const rand = ethers.toBeHex(Math.floor(Math.random() * 10000));
        const rand_bitlength = rand.toString(16).length * 4;

        // Public key
        const pub_n = ethers.toBeHex(publicKey.n);
        const pub_n_bitlength = pub_n.toString(16).length * 4;
        // console.log("pub_n: %s\npub_n_bitlength: %s\n", pub_n, pub_n_bitlength);

        
        const enc_zero = await paillierSolidity.encZero(rand, rand_bitlength, 
                                                        pub_n, pub_n_bitlength);

        // Will return tuple so get first index
        const enc_zero_int = bigintConversion.hexToBigint(enc_zero[0]);
        // console.log("enc_zero_int:", enc_zero_int);

        const dec_zero = Number(privateKey.decrypt(enc_zero_int));
        console.log("Decrypted Zero:", dec_zero);

        // We want dec_zero to equal 0 
        expect(dec_zero).to.equal(0);

    });



});




