const { program } = require('commander');
const fs = require('fs');
const fsPromises = fs.promises;
const zlib = require('zlib');
const { pipeline } = require('stream');
const path = require('path');

program
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <type>,', 'an action encode/decode')
  .parse(process.argv);

function copyFile(oldFilePath, newFilePath) {
  console.log('Reading file ...');
  return fsPromises
    .readFile(oldFilePath, 'utf-8')
    .then(fileContent => fsPromises.writeFile(newFilePath, fileContent))
    .catch(error => {
      console.error(error);
      throw error;
    });
}

copyFile(process.argv[2], process.argv[3]).then(
  () => console.log('Copied!'),
  () => console.log('NOT Copied!')
);

function shiftFile(file, encoding) {
  return new Promise((resolve, reject) => {
    fs.copyFile(file, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
const promise = shiftFile('input.txt');
promise.then(console.log, console.error);

const buff01 = Buffer.from('hello');
console.log(buff01);

const buff02 = Buffer.from([0x61, 0x62, 0x63]);
console.log(buff02);
console.log(buff02.toString());

const filepath = path.join(__dirname, 'input.txt');
const rStream = fs.createReadStream(filepath, {
  highWaterMark: 10
});
rStream.on('data', chunk => {
  console.log(chunk.length);
});
rStream.on('close', () => {
  console.log('file was closed');
});
rStream.on('error', error => {
  console.log(error.message);
});

const writable = fs.createWriteStream(filepath, 'utf8');
writable.write('writing some data,');
writable.write(' writing some more data,');
writable.end(' last write,');

pipeline(
  fs.createReadStream(filepath),
  zlib.createGzip(),
  fs.createWriteStream('out.txt.gz'),
  error => {
    if (error) {
      console.error(error);
    } else {
      console.log('finished');
    }
  }
);

if (program.shift) {
  console.log(`shift: ${program.shift}`);
}

if (program.input) {
  console.log('input');
}

if (program.output) {
  console.log('output');
}

if (program.action) {
  console.log('action');
}
