
import CryptoJS from 'crypto-js'

export const encryptData = (data: any) => {

    const encrypted = CryptoJS.AES.encrypt(data, import.meta.env.VITE_CRYPTO_SECRET_KEY)

    return encrypted;
    
}

export const decryptData = (data: any) => {

    const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_CRYPTO_SECRET_KEY)
    const decrypted  = bytes.toString(CryptoJS.enc.Utf8)

    return decrypted
} 