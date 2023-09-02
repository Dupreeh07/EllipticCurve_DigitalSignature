# Elliptic curve signature  

This project demonstrates a basic signature proccess.
https://www.youtube.com/watch?v=IgXvI42TcuM&ab_channel=Dupreeh7

I implemented arithmetic operations for modular math for an abealian group: division, inverse and etc. 
Also the addition-doubling algorithm to multiply numbers by a point in polonomial time instead O(k). 
it works like that:

1. Double and Add algorithm for finding 16P
2. 16 = binary [1, 0, 0, 0, 0]
3. first digit = 1 skipped, first digit is always skipped
4. second == 0 means double: add2IdenPoints P+P=2P 
5. 0 2P + 2P = 4P
6. 0 4p + 4P = 8P
7. 0 8p + 4P = 16P 

After i implemented a simple digital signature (r,s) using a pair of public and private keys. 
But when I decrypt the signature, sometimes I get this error:

1. U = Public key * (r * s^(-1))
2. V = Gp * (msg * s^(-1))
3. P=(V + U) if y coordinate of V and U is the same
4. then delta y = y2 - y1 = 0 => tangent = vertical asymptote => V + U = point of infinity

In this case, I don't understand what to do and how to check Cx = r mod n. Mb some signatures are not valid
The code works correctly if the group order and subgroup order are prime numbers. 
Also the code does not work well when selecting a big number of finite field (p). 
Because the charting function uses a huge number of iterations. 
I was trying to find the optimal algorithm for finding the Gp. Gp was supposed to create prime number subgroup order.
But I didn't come up with anything, just a brute force =)

if you get the point (0,0) when multiplying, this is equivalent to the infinity point

