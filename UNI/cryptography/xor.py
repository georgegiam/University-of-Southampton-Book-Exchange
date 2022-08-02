cipher = "04 e4 3f f9 23 ff 35 ad 3f e5 23 ff 38 e8 3f f9 \
6c fa 2d ff 6c fa 2d fe 6c ef 29 f9 3b e8 29 e3 \
6c c8 22 ea 20 ec 22 e9 6c ec 22 e9 6c d7 2d e3 \
36 e4 2e ec 3e ad 05 f9 6c e1 2d fe 38 e8 28 ad \
23 e3 20 f4 6c be 74 ad 21 e4 22 f8 38 e8 3f 80 \
46"

# convert cipher from string to list
cipher_table = li = list(cipher.split(" "))

plain = ""
key = "8d"

# key length = 2
for i in range(len(cipher_table)):
    # calculate the even positions
    if i % 2 == 0:
         plain += "-" 
    else:            
        cipher = cipher_table[i]

        # convert cipher from string to hex
        hex_cipher = int(cipher, 16)
        new_cipher = hex_cipher + 0x200

        # convert key from string to hex
        hex_key = int(key, 16)
        new_key = hex_key + 0x200

        xor = hex(new_cipher^new_key)
        # remove 0x from the hex value
        clean_xor = xor.replace("0x", "", 1)         

        plain += clean_xor      

print(plain)



