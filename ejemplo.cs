using System;

class RC4
{
    public static byte[] Encrypt(byte[] key, byte[] data)
    {
        byte[] S = new byte[256];
        byte[] K = new byte[256];
        byte[] result = new byte[data.Length];
        int i, j = 0, t;

        // Key Scheduling Algorithm (KSA)
        for (i = 0; i < 256; i++)
        {
            S[i] = (byte)i;
            K[i] = key[i % key.Length];
        }

        for (i = 0; i < 256; i++)
        {
            j = (j + S[i] + K[i]) & 255;
            byte temp = S[i];
            S[i] = S[j];
            S[j] = temp;
        }

        // Pseudo-Random Generation Algorithm (PRGA)
        i = j = 0;
        for (int x = 0; x < data.Length; x++)
        {
            i = (i + 1) & 255;
            j = (j + S[i]) & 255;
            byte temp = S[i];
            S[i] = S[j];
            S[j] = temp;
            t = (S[i] + S[j]) & 255;
            result[x] = (byte)(data[x] ^ S[t]);
        }

        return result;
    }

    static void Main()
    {
        byte[] key = System.Text.Encoding.ASCII.GetBytes("clave");
        byte[] plaintext = System.Text.Encoding.ASCII.GetBytes("texto plano");
        byte[] ciphertext = Encrypt(key, plaintext);
        Console.WriteLine("Cifrado: " + System.Text.Encoding.ASCII.GetString(ciphertext));
    }
}
