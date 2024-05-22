from flask import Flask, request, render_template
from rc4 import rc4_encrypt, rc4_decrypt

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/encrypt', methods=['POST'])
def encrypt():
    key = request.form['key']
    plaintext = request.form['plaintext']
    ciphertext = rc4_encrypt([ord(c) for c in key], plaintext)
    return render_template('index.html', ciphertext=ciphertext, key=key, plaintext=plaintext)

@app.route('/decrypt', methods=['POST'])
def decrypt():
    key = request.form['key']
    ciphertext = request.form['ciphertext']
    plaintext = rc4_decrypt([ord(c) for c in key], ciphertext)
    return render_template('index.html', ciphertext=ciphertext, key=key, plaintext=plaintext)

if __name__ == '__main__':
    app.run(debug=True)
