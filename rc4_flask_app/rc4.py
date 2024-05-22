def rc4(key, data):
    S = list(range(256))
    j = 0
    out = []

    # Key Scheduling Algorithm (KSA)
    for i in range(256):
        j = (j + S[i] + key[i % len(key)]) % 256
        S[i], S[j] = S[j], S[i]

    # Pseudo-Random Generation Algorithm (PRGA)
    i = j = 0
    for char in data:
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]
        K = S[(S[i] + S[j]) % 256]
        out.append(chr(ord(char) ^ K))

    return ''.join(out)

def rc4_encrypt(key, plaintext):
    return rc4(key, plaintext)

def rc4_decrypt(key, ciphertext):
    return rc4(key, ciphertext)
