const { pipeline, Transform } = require('stream');
const fs = require('fs');
const path = require('path');

const { program } = require('./validation');
const { caesarCode } = require('./encryption');

const shiftTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(caesarCode(program.shift, chunk.toString(), program.action));
    callback();
  }
});

pipeline(
  program.input
    ? fs.createReadStream(path.join(__dirname, program.input), { flags: 'r' })
    : process.stdin,
  shiftTr,
  program.output
    ? fs.createWriteStream(path.join(__dirname, program.output), {
        flags: 'a+'
      })
    : process.stdout,
  error => {
    if (error) {
      if (error.code === 'ENOENT') {
        process.stderr.write(
          'No such file or directory, please check input path!'
        );
      } else {
        console.error(error);
      }
    } else {
      console.log('Encryption finished');
    }
  }
);
