cipher = "iptkaeneotsstrtapaitthnirvhssyaclhaslswtoenntbropveendeeulhaetl"

splited = list(cipher)
divisors = []

# finding the divisors (possible key lengths)
for i in range(1, len(cipher) + 1):    
    if len(cipher) % i == 0:
        divisors.append(i)

for k in divisors:
    print("*-*-*-*-*-*-*-*-*")
    print ("Key Length:",k)
    print("*-*-*-*-*-*-*-*-*\n")
    
    # claculating the rows of the array
    rows = (len(cipher)//k)

    for i in range(rows):  
        for j in range(i, len(cipher), rows):  
            index = splited[j]  
            print(index, end=" ")
        print ("\n")


