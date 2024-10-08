// Fungsi untuk mengubah string menjadi buffer byte
function stringToByteArray(str) {
    return Buffer.from(str, 'utf-8');
}

// Fungsi untuk mengubah buffer byte menjadi string
function byteArrayToString(bytes) {
    return Buffer.from(bytes).toString('utf-8');
}

// Fungsi untuk menghasilkan kunci acak
function generateRandomKey(length) {
    const key = Buffer.alloc(length);
    for (let i = 0; i < length; i++) {
        key[i] = Math.floor(Math.random() * 256); // Setiap byte acak (0-255)
    }
    return key;
}

// Fungsi untuk enkripsi/dekripsi menggunakan One-Time Pad
function oneTimePadEncryptDecrypt(inputBytes, keyBytes) {
    const result = Buffer.alloc(inputBytes.length);
    for (let i = 0; i < inputBytes.length; i++) {
        result[i] = inputBytes[i] ^ keyBytes[i]; // Operasi XOR antara plaintext dan kunci
    }
    return result;
}

export default {
    oneTimePadEncryptDecrypt, stringToByteArray, byteArrayToString, generateRandomKey
}

// function test() {

//     // Contoh penggunaan
//     const plainText = "Hello, World!";
//     const plainTextBytes = stringToByteArray(plainText);

//     // Menghasilkan kunci acak dengan panjang yang sama dengan plainteks
//     const key = generateRandomKey(plainTextBytes.length);
//     console.log("Key (hex):", key.toString('hex'));

//     // Enkripsi teks asli
//     const encryptedBytes = oneTimePadEncryptDecrypt(plainTextBytes, key);
//     console.log("Encrypted (hex):", encryptedBytes.toString('hex'));

//     // Dekripsi teks (menggunakan kunci yang sama)
//     const decryptedBytes = oneTimePadEncryptDecrypt(encryptedBytes, key);
//     const decryptedText = byteArrayToString(decryptedBytes);
//     console.log("Decrypted Text:", decryptedText);
// }
