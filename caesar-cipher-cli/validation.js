const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .parse(process.argv);

if (!['encode', 'decode'].includes(program.action)) {
  process.stderr.write(
    "Action is required and should be have name 'encode' or 'decode'. Please, enter the correct data and try again!"
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
} else if (isNaN(program.shift)) {
  process.stderr.write(
    'Shift should be number. Please, enter the correct data and try again!'
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
} else if (!Number.isInteger(+program.shift)) {
  process.stderr.write(
    'Shift should be integer. Please, enter the correct data and try again!'
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
} else if (+program.shift < 1) {
  process.stderr.write(
    'Shift should be positive integer. Please, enter the correct data and try again!'
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

if (program.input) {
  fs.access(path.join(__dirname, program.input), fs.F_OK, error => {
    if (error) {
      if (error.code === 'ENOENT') {
        process.stderr.write(
          'Path is not exist. Please, enter the correct path for input file and try again!'
        );
      } else {
        console.error(error);
      }
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  });
}

if (program.output) {
  fs.access(path.join(__dirname, program.output), fs.F_OK, error => {
    if (error) {
      if (error.code === 'ENOENT') {
        process.stderr.write(
          'Path is not exist. Please, enter the correct path for output file and try again!'
        );
      } else {
        console.error(error);
      }
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  });
}

module.exports = program;
