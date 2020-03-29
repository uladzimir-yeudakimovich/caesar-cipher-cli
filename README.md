# caesar-cipher-cli

CLI tool accept 4 options (short alias and full name):

# Options

1. -s or --shift: a shift
2. -a or --action: an action encode/decode
3. -i or --input: an input file
4. -o or --output: an output file

# Navigate to `caesar-cipher-cli` folder and use encode/decode

$ cd caesar-cipher-cli

# Instruction

1. Action (encode/decode) and the shift are required.
2. Action maybe only encode or decode.
3. Shift maybe only positive integer number not equal to 0.
4. If the input file is not selected - use the console for input.
5. If the output file is not selected - see result in the console.
6. If path to file is not correct - enter right path and try again.
7. Encoding / decoding only supports the English alphabet.

# Usage example:

$ node main -a encode -s 7 -i "./input.txt" -o "./output.txt"

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`


$ node main --action decode --shift 7 --input decoded.txt --output plain.txt

> decoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`