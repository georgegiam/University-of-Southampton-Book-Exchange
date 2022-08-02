from itertools import permutations 

alphabet = "abcdefghijklmnopqrstuvwxyz"

splited = list(alphabet)
key = ""
missing = []
cipher_missing = []

# input letters replacements
for i in range(len(splited)):
    print("Replace '", splited[i], "' from plaintext with:")
    current = input()

    if current == "-":
        missing.append(splited[i])

    key = key + current

# detcting non existing characters in cipher text
for i in range(len(alphabet)):
    if alphabet[i] not in key:
        cipher_missing.append(alphabet[i])

print(cipher_missing)

# calculates the missong letters combinations
perm = list(permutations(cipher_missing))
splited_key = list(key)

print("----------------------")

# generating the possible keys
for i in range(len(perm)):
    for j in range(len(perm[i])):
        for s in range(len(splited_key)):
            if splited_key[s] == "-":
                splited_key[s] = perm[i][j] 
                break 

    enc_key = ''.join(splited_key)
    print("key:",i, " ", enc_key)
    splited_key = list(key)