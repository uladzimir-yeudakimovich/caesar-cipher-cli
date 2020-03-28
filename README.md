# caesar-cipher-cli

CLI tool accept 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

Action (encode/decode) and the shift are required.
Action maybe only encode or decode.
Shift maybe only integer number.
If the input file is missed - use the console for input.
If the output file is missed - see result in the console.
Encoding / decoding only supports the English alphabet.

**Usage example:**

$ cd caesar-cipher-cli
$ node main -a encode -s 7 -i "./input.txt" -o "./output.txt"

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`


$ cd caesar-cipher-cli
$ node main --action decode --shift 7 --input decoded.txt --output plain.txt

> decoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`