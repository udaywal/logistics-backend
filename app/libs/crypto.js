const crypto = require('crypto');
const cryptoJS = require("crypto-js");

const algorithm = 'aes-256-ctr';
const secretKey = 'secretpasswordthatnobodycanguess';
const iv = crypto.randomBytes(16);

const encrypt = val => {
    let cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

const decrypt = encrypted => {
    let decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
};

const decryptJS = encrypted => {
    let bytes  = cryptoJS.AES.decrypt(encrypted, secretKey);
    return JSON.parse(JSON.parse(bytes.toString(cryptoJS.enc.Utf8)))
}

module.exports = {
    encrypt,
    decrypt,
    decryptJS
};