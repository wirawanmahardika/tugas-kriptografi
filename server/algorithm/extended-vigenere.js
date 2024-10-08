// Fungsi untuk enkripsi menggunakan Extended Vigenère cipher
function encryptExtended(plainText, key) {
    let encryptedText = '';
    let keyIndex = 0;

    // Proses enkripsi setiap karakter berdasarkan kode ASCII
    for (let i = 0; i < plainText.length; i++) {
        let charCode = plainText.charCodeAt(i);  // Dapatkan kode ASCII dari karakter
        let keyCode = key.charCodeAt(keyIndex % key.length); // Kode ASCII karakter kunci

        // Enkripsi dengan menambahkan kode ASCII karakter dan kunci
        let encryptedCharCode = (charCode + keyCode) % 256;

        // Tambahkan hasil ke teks enkripsi
        encryptedText += String.fromCharCode(encryptedCharCode);

        // Pindahkan ke karakter berikutnya pada kunci
        keyIndex++;
    }

    return encryptedText;
}

// Fungsi untuk dekripsi menggunakan Extended Vigenère cipher
function decryptExtended(encryptedText, key) {
    let decryptedText = '';
    let keyIndex = 0;

    // Proses dekripsi setiap karakter berdasarkan kode ASCII
    for (let i = 0; i < encryptedText.length; i++) {
        let charCode = encryptedText.charCodeAt(i);  // Dapatkan kode ASCII dari karakter terenkripsi
        let keyCode = key.charCodeAt(keyIndex % key.length); // Kode ASCII karakter kunci

        // Dekripsi dengan mengurangi kode ASCII karakter dengan kode ASCII kunci
        let decryptedCharCode = (charCode - keyCode + 256) % 256;

        // Tambahkan hasil ke teks dekripsi
        decryptedText += String.fromCharCode(decryptedCharCode);

        // Pindahkan ke karakter berikutnya pada kunci
        keyIndex++;
    }

    return decryptedText;
}

export default {
    encryptExtended, decryptExtended
}