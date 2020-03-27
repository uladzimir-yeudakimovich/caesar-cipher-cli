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
  process.exit(1);
}

const inputPathath = path.join(__dirname, program.input);
const outputPathath = path.join(__dirname, program.output);

const shiftTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

pipeline(
  fs.createReadStream(inputPathath),
  shiftTr,
  fs.createWriteStream(outputPathath),
  error => {
    if (error) {
      console.error(error);
    } else {
      console.log('finished');
    }
  }
);
