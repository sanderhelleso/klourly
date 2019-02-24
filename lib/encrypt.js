const crypto = require('crypto');

function encrypt(data) {

    // generate random bytes
    const iv = crypto.randomBytes(process.env.CRYPTO_RB);

    // create cipher with set algo, secret and generated iv
    const cipher = crypto.createCipheriv(
        process.env.CRYPTO_ALGO, process.env.CRYPTO_SECRET, iv);

    // encrypt the passed in data
    const encrypted = cipher.update(
        data, process.env.CRYPTO_DIGEST, process.env.CRYPTO_OUT);

    // return the encrypted message with the generated iv
    return `${encrypted}?${iv}`;
}