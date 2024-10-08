import express from "express"
import vigenere from "./algorithm/vigenere.js"
import extendedVigenere from "./algorithm/extended-vigenere.js"
import onetimepad from "./algorithm/onetimepad.js"
import cors from 'cors'
import playfair from "./algorithm/playfair.js"
import enigma from "./algorithm/enigma.js"



const app = express()

app.use(cors())
app.use(express.json())



//////////// vigenere
app.post("/vigenere/encrypt", (req, res) => {
    const plainText = req.body.text;
    const key = req.body.key;
    const result = vigenere.encrypt(plainText, key)

    return res.send(result);
})

app.post("/vigenere/decrypt", (req, res) => {
    const cipherText = req.body.ciphertext;
    const key = req.body.key;
    const result = vigenere.decrypt(cipherText, key)

    return res.send(result);
})



//////////// extended vigenere
app.post("/extended-vigenere/encrypt", (req, res) => {
    const plainText = req.body.text;
    const key = req.body.key;
    const result = extendedVigenere.encryptExtended(plainText, key)

    return res.send(result);
})

app.post("/extended-vigenere/decrypt", (req, res) => {
    const cipherText = req.body.ciphertext;
    const key = req.body.key;
    const result = extendedVigenere.decryptExtended(cipherText, key)

    return res.send(result);
})



//////////// onetimepad
app.post("/onetimepad/encrypt", (req, res) => {
    const plainText = req.body.text;
    const byteText = onetimepad.stringToByteArray(plainText)

    const key = onetimepad.generateRandomKey(byteText.length);
    const result = onetimepad.oneTimePadEncryptDecrypt(byteText, key);

    return res.json({ cipherText: result.toString("hex"), key: key.toString("hex") })
})

app.post("/onetimepad/decrypt", (req, res) => {
    const cipherText = req.body.ciphertext;
    const key = req.body.key;

    const byteCipherText = Buffer.from(cipherText, "hex")
    const byteKey = Buffer.from(key, "hex")

    const plainTextBuffer = onetimepad.oneTimePadEncryptDecrypt(byteCipherText, byteKey)
    const plainText = onetimepad.byteArrayToString(plainTextBuffer)

    return res.send(plainText);
})


//////////// playfair
app.post("/playfair/encrypt", (req, res) => {
    const plainText = req.body.text;
    const key = req.body.key

    const playfairIstance = new playfair.PlayfairCipher(key);
    const result = playfairIstance.encrypt(plainText)
    console.log(plainText, key, result)

    res.send(result)
})

app.post("/playfair/decrypt", (req, res) => {
    const cipherText = req.body.ciphertext;
    const key = req.body.key

    const playfairIstance = new playfair.PlayfairCipher(key);
    const result = playfairIstance.decrypt(cipherText)

    res.send(result)
})


//////////// enigma
app.post("/enigma/encrypt", (req, res) => {
    const plainText = req.body.text;

    const enigmaInstance = new enigma.EnigmaCipher(enigma.rotors, enigma.reflector, enigma.plugboard)
    const encyptedText = enigmaInstance.encryptMessage(plainText)

    return res.send(encyptedText)
})

app.post("/enigma/decrypt", (req, res) => {
    const cipherText = req.body.ciphertext;

    const enigmaInstance = new enigma.EnigmaCipher(enigma.rotors, enigma.reflector, enigma.plugboard)
    enigmaInstance.setRotorPositions([0, 0, 0])
    const result = enigmaInstance.decryptMessage(cipherText)

    return res.send(result)
})

app.listen(1000, () => console.log("Server is listening at port 1000"))