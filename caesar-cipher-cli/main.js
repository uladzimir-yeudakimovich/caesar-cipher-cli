const { program } = require('commander');
const { pipeline, Transform } = require('stream');
const fs = require('fs');
const path = require('path');

program
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <type>,', 'an action encode/decode')
  .parse(process.argv);

if (
  !['encode', 'decode'].includes(program.action) ||
  isNaN(program.shift) ||
  !Number.isInteger(+program.shift)
) {
  console.log('Please, enter valid data!');
  // process.exit(1);
}

function caesarEncode(shift, text) {
  let code = '';
  for (let i = 0; i < text.length; i++) {
    if (/[A-Z]/gi.test(text[i])) {
      const alphabet =
        text[i].toUpperCase() === text[i]
          ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          : 'abcdefghijklmnopqrstuvwxyz';
      code += alphabet[(alphabet.indexOf(text[i]) + +shift) % 26];
    } else {
      code += text[i];
    }
  }
  return code;
}

function caesarDecode(shift, text) {
  let code = '';
  for (let i = 0; i < text.length; i++) {
    if (/[A-Z]/gi.test(text[i])) {
      const alphabet =
        text[i].toUpperCase() === text[i]
          ? 'ZYXWVUTSRQPONMLKJIHGFEDCBA'
          : 'zyxwvutsrqponmlkjihgfedcba';
      code += alphabet[(alphabet.indexOf(text[i]) + +shift) % 26];
    } else {
      code += text[i];
    }
  }
  return code;
}

const shiftTr = new Transform({
  transform(chunk, encoding, callback) {
    if (program.action === 'encode') {
      this.push(caesarEncode(program.shift, chunk.toString()));
    } else if (program.action === 'decode') {
      this.push(caesarDecode(program.shift, chunk.toString()));
    }
    callback();
  }
});

pipeline(
  program.input
    ? fs.createReadStream(path.join(__dirname, program.input))
    : process.stdin,
  shiftTr,
  program.output
    ? fs.createWriteStream(path.join(__dirname, program.output))
    : process.stdout,
  error => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('No such file or directory, please check input path!');
      } else {
        console.error(error);
      }
    } else {
      console.log('finished');
    }
  }
);
