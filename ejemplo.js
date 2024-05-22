function rc4(key, plaintext) {
    var S = [];
    var j = 0;
    var out = "";

    // Key Scheduling Algorithm (KSA)
    for (var i = 0; i < 256; i++) {
        S[i] = i;
    }

    for (var i = 0; i < 256; i++) {
        j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
        [S[i], S[j]] = [S[j], S[i]];
    }

    // Pseudo-Random Generation Algorithm (PRGA)
    i = j = 0;
    for (var y = 0; y < plaintext.length; y++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        [S[i], S[j]] = [S[j], S[i]];
        var K = S[(S[i] + S[j]) % 256];
        out += String.fromCharCode(plaintext.charCodeAt(y) ^ K);
    }

    return out;
}

var key = "clave";
var plaintext = "texto plano";
var ciphertext = rc4(key, plaintext);
console.log("Cifrado: " + ciphertext);
