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
  let out = '';
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (/[A-Z]/gi.test(text[i])) {
      code += +shift;
    }
    out += String.fromCharCode(code);
  }
  console.log(out);
  return out;
}

function caesarDecode(shift, text) {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (/[A-Z]/gi.test(text[i])) {
      code -= +shift;
    }
    out += String.fromCharCode(code);
  }
  console.log(out);
  return out;
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
