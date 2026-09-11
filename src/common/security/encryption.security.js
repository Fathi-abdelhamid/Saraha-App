import crypto from 'crypto'
import { ENC_KEY, IV_LENGTH } from '../../config.js'

export const encryption =(plaintext)=>{
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc',ENC_KEY ,iv)
    let encryptData = cipher.update(plaintext, 'utf-8', 'hex')
encryptData += cipher.final('hex').toString()
    console.log(iv,cipher, encryptData);
    return `${iv.toString("hex")}::${ encryptData}`
    
}


export const decryption = async (cipherText) => {
  const [iv, encryptData] = cipherText.split("::");
  console.log({ iv, encryptData });
  const iv_vector = Buffer.from(iv, "hex");
  console.log({ iv_vector });
  const decipherVector = crypto.createDecipheriv('aes-256-cbc',ENC_KEY ,iv_vector);
  let plainText = decipherVector.update(encryptData, "hex", "utf-8");
  plainText += decipherVector.final("utf-8");
  return plainText;
};
