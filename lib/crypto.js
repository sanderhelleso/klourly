const crypto = require('crypto');

module.exports = {
    encrypt,
    decrypt
}

function encrypt(data) {

    // create cipher with set algo, secret and generated iv
    const cipher = crypto.createCipher(
        process.env.CRYPTO_ALGO, process.env.CRYPTO_SECRET
    );

    // encrypt the passed in data
    const encrypted = cipher.update(
        data, process.env.CRYPTO_OUT, process.env.CRYPTO_DIGEST
    );

    // return the encrypted message
    return `${encrypted}${cipher.final(process.env.CRYPTO_DIGEST)}`;
}

function decrypt(data) {

    // create decipher with set algo, secret and generated iv
    const decipher = crypto.createDecipher(
        process.env.CRYPTO_ALGO, process.env.CRYPTO_SECRET
    );

    // deencrypt the passed in data
    const decrypted = decipher.update(
        data, process.env.CRYPTO_DIGEST, process.env.CRYPTO_OUT
    );

    // return the decrypted message
    return `${decrypted}${deciper.final(process.env.CRYPTO_OUT)}`;
}