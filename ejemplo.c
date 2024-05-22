//SSL/TLS, WEP (Wired Equivalent Privacy)

#include <stdio.h>
#include <string.h>

void rc4(const unsigned char *key, int key_len, unsigned char *data, int data_len) {
    unsigned char S[256];
    int i, j, k, t;
    
    // KSA
    for (i = 0; i < 256; i++) {
        S[i] = i;
    }
    j = 0;
    for (i = 0; i < 256; i++) {
        j = (j + S[i] + key[i % key_len]) % 256;
        t = S[i];
        S[i] = S[j];
        S[j] = t;
    }

    // PRGA
    i = j = 0;
    for (k = 0; k < data_len; k++) {
        // XOR es reversble x2
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        t = S[i];
        S[i] = S[j]; // valor de S[j] se coloca en S[i]
        S[j] = t; // valor temporal de t a S[j]
        data[k] ^= S[(S[i] + S[j]) % 256];
        // Si el byte actual de data[k] es 65 (que es el valor ASCII de 'A'), el cálculo será:
        // data[k] = 65 ^ 120;
    }
}
int main() {
    unsigned char key[] = "clave";
    unsigned char data[] = "mi contraseña 1234";
    int data_len = strlen((char *)data);
    
    rc4(key, strlen((char *)key), data, data_len);
    printf("Cifrado: %s\n", data);

    return 0;
}






























// Ha mostrado ser inseguro frente a las técnicas modernas de criptoanálisis.
