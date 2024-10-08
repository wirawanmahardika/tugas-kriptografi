class PlayfairCipher {
    constructor(key) {
        this.key = this.prepareKey(key);
        this.digraphs = [];
        this.table = this.createTable(this.key);
    }

    prepareKey(key) {
        // Hapus spasi dan ubah menjadi huruf besar
        key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
        // Hapus duplikat
        let uniqueChars = [...new Set(key)];
        return uniqueChars.join('');
    }

    createTable(key) {
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // I/J digabung
        let table = [];
        let usedChars = new Set();

        // Tambahkan karakter kunci ke dalam tabel
        for (let char of key) {
            if (!usedChars.has(char)) {
                usedChars.add(char);
                table.push(char);
            }
        }

        // Tambahkan sisa huruf dari alfabet
        for (let char of alphabet) {
            if (!usedChars.has(char)) {
                usedChars.add(char);
                table.push(char);
            }
        }

        return table;
    }

    getDigraphs(text) {
        // Mengubah teks menjadi pasangan huruf (digraphs)
        text = text.replace(/[^A-Z]/g, '').toUpperCase();
        const digraphs = [];
        for (let i = 0; i < text.length; i += 2) {
            let firstChar = text[i];
            let secondChar = text[i + 1] || 'X'; // Tambahkan 'X' jika tidak ada pasangan
            if (firstChar === secondChar) {
                secondChar = 'X'; // Jika kedua huruf sama, ganti dengan 'X'
                i--; // Mundurkan indeks untuk mengulangi huruf pertama
            }
            digraphs.push(firstChar + secondChar);
        }
        return digraphs;
    }

    encrypt(plaintext) {
        this.digraphs = this.getDigraphs(plaintext);
        let ciphertext = '';

        for (let digraph of this.digraphs) {
            const [char1, char2] = digraph.split('');
            const [row1, col1] = this.findPosition(char1);
            const [row2, col2] = this.findPosition(char2);

            if (row1 === row2) {
                // Jika pada baris yang sama
                ciphertext += this.table[row1 * 5 + (col1 + 1) % 5];
                ciphertext += this.table[row2 * 5 + (col2 + 1) % 5];
            } else if (col1 === col2) {
                // Jika pada kolom yang sama
                ciphertext += this.table[((row1 + 1) % 5) * 5 + col1];
                ciphertext += this.table[((row2 + 1) % 5) * 5 + col2];
            } else {
                // Jika membentuk persegi
                ciphertext += this.table[row1 * 5 + col2];
                ciphertext += this.table[row2 * 5 + col1];
            }
        }

        return ciphertext;
    }

    decrypt(ciphertext) {
        this.digraphs = this.getDigraphs(ciphertext);
        let plaintext = '';

        for (let digraph of this.digraphs) {
            const [char1, char2] = digraph.split('');
            const [row1, col1] = this.findPosition(char1);
            const [row2, col2] = this.findPosition(char2);

            if (row1 === row2) {
                // Jika pada baris yang sama
                plaintext += this.table[row1 * 5 + (col1 + 4) % 5];
                plaintext += this.table[row2 * 5 + (col2 + 4) % 5];
            } else if (col1 === col2) {
                // Jika pada kolom yang sama
                plaintext += this.table[((row1 + 4) % 5) * 5 + col1];
                plaintext += this.table[((row2 + 4) % 5) * 5 + col2];
            } else {
                // Jika membentuk persegi
                plaintext += this.table[row1 * 5 + col2];
                plaintext += this.table[row2 * 5 + col1];
            }
        }

        return plaintext;
    }

    findPosition(char) {
        const index = this.table.indexOf(char);
        return [Math.floor(index / 5), index % 5];
    }
}

export default {
    PlayfairCipher
}


// function test() {
//     // Contoh penggunaan
//     const key = "PLAYFAIR EXAMPLE";
//     const playfair = new PlayfairCipher(key);

//     const plaintext = "HIDE THE GOLD IN THE TREASURE";
//     const encrypted = playfair.encrypt(plaintext);
//     const decrypted = playfair.decrypt(encrypted);

//     console.log("Plaintext: ", plaintext);
//     console.log("Encrypted: ", encrypted);
//     console.log("Decrypted: ", decrypted);
// }
