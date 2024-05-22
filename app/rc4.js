function KSA(key) {
    let S = [];
    for (let i = 0; i < 256; i++) {
        S[i] = i;
    }
    let j = 0;
    for (let i = 0; i < 256; i++) {
        j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
        [S[i], S[j]] = [S[j], S[i]];
    }
    return S;
}

function PRGA(S) {
    let i = 0;
    let j = 0;
    return function() {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        [S[i], S[j]] = [S[j], S[i]];
        return S[(S[i] + S[j]) % 256];
    };
}

function rc4(key, data) {
    let S = KSA(key);
    let keystream = PRGA(S);
    let result = '';
    for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(data.charCodeAt(i) ^ keystream());
    }
    return result;
}

function encrypt() {
    let key = document.getElementById('key').value;
    let plaintext = document.getElementById('plaintext').value;
    let ciphertext = rc4(key, plaintext);
    document.getElementById('ciphertext').value = btoa(ciphertext);
}

function decrypt() {
    let key = document.getElementById('key').value;
    let ciphertext = atob(document.getElementById('ciphertext').value);
    let plaintext = rc4(key, ciphertext);
    document.getElementById('plaintext').value = plaintext;
}
