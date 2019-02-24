const crypto = require('crypto');

module.exports = {
    encrypt,
    decrypt
}

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
    return `${encrypted}${cipher.final(process.env.CRYPTO_DIGEST)}?${iv}`;
}

function decrypt(data) {

    // get args from encrypted data (message, iv)
    data = data.split('?');

    // create decipher with set algo, secret and generated iv
    const decipher = crypto.createDecipheriv(
        process.env.CRYPTO_ALGO, process.env.CRYPTO_SECRET, data[1]);

    // deencrypt the passed in data
    const decrypted = decipher.update(
        data[0], process.env.CRYPTO_DIGEST, process.env.CRYPTO_OUT);

    // return the decrypted message
    return `${decrypted}${deciper.final(process.env.CRYPTO_OUT)}`;
}