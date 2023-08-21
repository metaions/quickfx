import React from 'react'
import { NativeModules, Platform } from 'react-native'
import Aes from 'react-native-aes-crypto'

export default function App(){
    // const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc')
    // decrypt(base64, key, iv, algorithm)
    const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)

    const encryptData = (text, key) => {
        return Aes.randomKey(16).then(iv => {
            return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
                cipher,
                iv,
            }))
        })
    }
    const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc')

try {
    generateKey('Arnold', 'salt', 5000, 256).then(key => {
        console.log('Key:', key)
        encryptData('These violent delights have violent ends', key)
            .then(({ cipher, iv }) => {
                console.log('Encrypted:', cipher)

                decryptData({ cipher, iv }, key)
                    .then(text => {
                        console.log('Decrypted:', text)
                    })
                    .catch(error => {
                        console.log(error)
                    })

                Aes.hmac256(cipher, key).then(hash => {
                    console.log('HMAC', hash)
                })
            })
            .catch(error => {
                console.log(error)
            })
    })
} catch (e) {
    console.error(e)
}
    React.useEffect(() => {
    
    }, [])
    async function callme(){

        console.log(Aes.encrypt('navpreet', '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',  '', 'aes-256-cbc'))
    }
    return(
        <>
        </>
    )
}