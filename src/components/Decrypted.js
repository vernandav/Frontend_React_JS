import CryptoJS from "crypto-js";
const SECRET_KEY = CryptoJS.enc.Utf8.parse("nasipadangdimanaksamadudunapa???"); // 32 byte key
const IV = CryptoJS.enc.Utf8.parse("1234567890123456");

function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export default decryptData;