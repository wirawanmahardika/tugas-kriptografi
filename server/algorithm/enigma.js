class EnigmaCipher {
    constructor(rotors, reflector, plugboard) {
        this.rotors = rotors;
        this.reflector = reflector;
        this.plugboard = plugboard;
        this.rotorPositions = [0, 0, 0]; // Posisi awal rotor
    }

    rotateRotors() {
        // Putar rotor ke-1 setelah setiap input
        this.rotorPositions[0] = (this.rotorPositions[0] + 1) % 26;

        // Putar rotor ke-2 setelah rotor ke-1 mencapai posisi penuh
        if (this.rotorPositions[0] === 0) {
            this.rotorPositions[1] = (this.rotorPositions[1] + 1) % 26;
        }

        // Putar rotor ke-3 setelah rotor ke-2 mencapai posisi penuh
        if (this.rotorPositions[1] === 0 && this.rotorPositions[0] === 0) {
            this.rotorPositions[2] = (this.rotorPositions[2] + 1) % 26;
        }
    }

    plugboardSwap(letter) {
        // Tukar huruf berdasarkan pengaturan plugboard
        return this.plugboard[letter] || letter;
    }

    passThroughRotors(letter, reverse = false) {
        let index = letter.charCodeAt(0) - 65; // Mengonversi huruf ke indeks (A = 0, B = 1, ...)

        if (!reverse) {
            // Lalui rotor dari kiri ke kanan
            for (let i = 0; i < 3; i++) {
                index = (index + this.rotorPositions[i]) % 26;
                letter = this.rotors[i][index];
                index = letter.charCodeAt(0) - 65;
            }
        } else {
            // Lalui rotor dari kanan ke kiri (setelah pantulan dari reflector)
            for (let i = 2; i >= 0; i--) {
                index = (index - this.rotorPositions[i] + 26) % 26;
                letter = String.fromCharCode(65 + this.rotors[i].indexOf(String.fromCharCode(65 + index)));
                index = letter.charCodeAt(0) - 65;
            }
        }

        return String.fromCharCode(65 + index);
    }

    encryptLetter(letter) {
        if (letter === ' ') return ' '; // Biarkan spasi tidak terenkripsi

        // 1. Plugboard pertukaran pertama
        letter = this.plugboardSwap(letter);

        // 2. Lalui rotor dari kiri ke kanan
        letter = this.passThroughRotors(letter);

        // 3. Pantulan melalui reflector
        let index = letter.charCodeAt(0) - 65;
        letter = this.reflector[index];

        // 4. Lalui rotor dari kanan ke kiri
        letter = this.passThroughRotors(letter, true);

        // 5. Plugboard pertukaran terakhir
        letter = this.plugboardSwap(letter);

        // 6. Putar rotor untuk huruf berikutnya
        this.rotateRotors();

        return letter;
    }

    encryptMessage(message) {
        let ciphertext = '';
        for (let letter of message.toUpperCase()) {
            ciphertext += this.encryptLetter(letter);
        }
        return ciphertext;
    }

    decryptMessage(ciphertext) {
        // Proses dekripsi identik dengan enkripsi pada mesin Enigma
        return this.encryptMessage(ciphertext);
    }

    setRotorPositions(positions) {
        this.rotorPositions = positions.slice(); // Salin posisi rotor
    }
}

// Pengaturan rotor dan reflector
const rotors = [
    'EKMFLGDQVZNTOWYHXUSPAIBRCJ', // Rotor I
    'AJDKSIRUXBLHWTMCQGZNPYFVOE', // Rotor II
    'BDFHJLCPRTXVZNYEIWGAKMUSQO'  // Rotor III
];

const reflector = 'YRUHQSLDPXNGOKMIEBFZCWVJAT'; // Reflector B

// Pengaturan plugboard (pertukaran huruf)
const plugboard = {
    'A': 'B', 'B': 'A',  // Pertukaran A dengan B
    'C': 'D', 'D': 'C',  // Pertukaran C dengan D
};

export default {
    EnigmaCipher, rotors, reflector, plugboard
}

// function test( ) {
//     // Contoh penggunaan mesin Enigma
//     const enigma = new Enigma(rotors, reflector, plugboard);
    
//     // Set posisi rotor awal sebelum enkripsi
//     const initialRotorPositions = [0, 0, 0];
//     enigma.setRotorPositions(initialRotorPositions);
    
//     const plaintext = "HELLO WORLD";
//     const encryptedMessage = enigma.encryptMessage(plaintext);
    
//     // Reset posisi rotor ke awal sebelum melakukan dekripsi
//     enigma.setRotorPositions(initialRotorPositions);
//     const decryptedMessage = enigma.decryptMessage(encryptedMessage);
    
//     console.log("Plaintext:  ", plaintext);
//     console.log("Encrypted:  ", encryptedMessage);
//     console.log("Decrypted:  ", decryptedMessage);

// }
