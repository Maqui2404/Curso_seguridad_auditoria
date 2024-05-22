package main

import (
    "fmt"
)

func rc4(key, data []byte) []byte {
    S := make([]byte, 256)
    var j byte
    out := make([]byte, len(data))

    // Key Scheduling Algorithm (KSA)
    for i := range S {
        S[i] = byte(i)
    }

    for i := range S {
        j = (j + S[i] + key[i%len(key)]) % 256
        S[i], S[j] = S[j], S[i]
    }

    // Pseudo-Random Generation Algorithm (PRGA)
    i := byte(0)
    j = 0
    for y := range data {
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]
        out[y] = data[y] ^ S[(S[i]+S[j])%256]
    }

    return out
}

func main() {
    key := []byte("clave")
    plaintext := []byte("texto plano")
    ciphertext := rc4(key, plaintext)
    fmt.Printf("Cifrado: %s\n", ciphertext)
}
