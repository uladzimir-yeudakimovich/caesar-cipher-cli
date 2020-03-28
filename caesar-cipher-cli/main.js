const { pipeline, Transform } = require('stream');
const fs = require('fs');
const path = require('path');

const { program } = require('./validation');
const { caesarEncode, caesarDecode } = require('./encryption');

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
      console.log('Finished');
    }
  }
);
