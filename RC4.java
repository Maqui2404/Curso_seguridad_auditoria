public class RC4 {
    public static byte[] rc4(byte[] key, byte[] plaintext) {
        byte[] S = new byte[256];
        byte[] K = new byte[256];
        byte[] ciphertext = new byte[plaintext.length];

        int i, j = 0, t;

        // Key Scheduling Algorithm (KSA)
        for (i = 0; i < 256; i++) {
            S[i] = (byte) i;
            K[i] = key[i % key.length];
        }

        for (i = 0; i < 256; i++) {
            j = (j + S[i] + K[i]) & 0xFF;
            byte temp = S[i];
            S[i] = S[j];
            S[j] = temp;
        }

        // Pseudo-Random Generation Algorithm (PRGA)
        i = j = 0;
        for (int k = 0; k < plaintext.length; k++) {
            i = (i + 1) & 0xFF;
            j = (j + S[i]) & 0xFF;
            byte temp = S[i];
            S[i] = S[j];
            S[j] = temp;
            t = (S[i] + S[j]) & 0xFF;
            ciphertext[k] = (byte) (plaintext[k] ^ S[t]);
        }

        return ciphertext;
    }

    public static void main(String[] args) {
        String key = "clave";
        String plaintext = "texto plano";
        byte[] ciphertext = rc4(key.getBytes(), plaintext.getBytes());
        System.out.println("Cifrado: " + new String(ciphertext));
    }
}
