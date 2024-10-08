// Fungsi untuk enkripsi menggunakan Vigenère cipher
function encrypt(plainText, key) {
    let encryptedText = '';
    let keyIndex = 0;

    // Proses enkripsi setiap huruf
    for (let i = 0; i < plainText.length; i++) {
        let char = plainText[i];

        // Hanya enkripsi huruf (a-z, A-Z)
        if (/[a-zA-Z]/.test(char)) {
            let isUpperCase = char === char.toUpperCase();

            // Ubah ke huruf kecil untuk perhitungan
            char = char.toLowerCase();

            // Dapatkan indeks huruf dalam alfabet (0-25)
            let charCode = char.charCodeAt(0) - 97;
            let keyChar = key[keyIndex % key.length].toLowerCase();
            let keyCode = keyChar.charCodeAt(0) - 97;

            // Geser huruf berdasarkan key
            let encryptedCharCode = (charCode + keyCode) % 26;
            let encryptedChar = String.fromCharCode(encryptedCharCode + 97);

            // Jika huruf asli uppercase, buat hasil uppercase
            if (isUpperCase) {
                encryptedChar = encryptedChar.toUpperCase();
            }

            encryptedText += encryptedChar;
            keyIndex++;
        } else {
            // Jika bukan huruf, tambahkan langsung tanpa enkripsi
            encryptedText += char;
        }
    }

    return encryptedText;
}

// Fungsi untuk dekripsi menggunakan Vigenère cipher
function decrypt(encryptedText, key) {
    let decryptedText = '';
    let keyIndex = 0;

    // Proses dekripsi setiap huruf
    for (let i = 0; i < encryptedText.length; i++) {
        let char = encryptedText[i];

        // Hanya dekripsi huruf (a-z, A-Z)
        if (/[a-zA-Z]/.test(char)) {
            let isUpperCase = char === char.toUpperCase();

            // Ubah ke huruf kecil untuk perhitungan
            char = char.toLowerCase();

            // Dapatkan indeks huruf dalam alfabet (0-25)
            let charCode = char.charCodeAt(0) - 97;
            let keyChar = key[keyIndex % key.length].toLowerCase();
            let keyCode = keyChar.charCodeAt(0) - 97;

            // Geser huruf kembali berdasarkan key
            let decryptedCharCode = (charCode - keyCode + 26) % 26;
            let decryptedChar = String.fromCharCode(decryptedCharCode + 97);

            // Jika huruf asli uppercase, buat hasil uppercase
            if (isUpperCase) {
                decryptedChar = decryptedChar.toUpperCase();
            }

            decryptedText += decryptedChar;
            keyIndex++;
        } else {
            // Jika bukan huruf, tambahkan langsung tanpa dekripsi
            decryptedText += char;
        }
    }

    return decryptedText;
}

export default {
    encrypt, decrypt
}