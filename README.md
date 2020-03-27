# caesar-cipher-cli

CLI tool accept 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

Action (encode/decode) and the shift are required.
If the input file is missed - use console as an input source.
If the output file is missed - use console as an output destination.
For encoding/decoding use only the English alphabet.

**Usage example:**

$ cd caesar-cipher-cli
$ node main -a encode -s 7 -i "./input.txt" -o "./output.txt"

> input.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> output.txt
> `This is secret. Message about "_" symbol!`


$ cd caesar-cipher-cli
$ node main --action decode --shift 7 --input decoded.txt --output plain.txt

> decoded.txt
> `This is secret. Message about "_" symbol!`

> plain.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`