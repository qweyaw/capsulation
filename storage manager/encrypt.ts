/*
 * @Description: encrypt.js
 * @Author: Amy
 */
// eslint-disable
import CryptoJS from 'crypto-js/crypto-js'
// 设置密钥和偏移量
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161')
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a')

// 加密
export function encrypt(data) {
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log(error)
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
    
}

/**
 * @description: 
 * @param data
 * @return {string}
 */
export function decrypt(data) {
    const encryptedHex = CryptoJS.enc.Hex.parse(data)
    const str = CryptoJS.enc.Base64.stringify(encryptedHex)
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}