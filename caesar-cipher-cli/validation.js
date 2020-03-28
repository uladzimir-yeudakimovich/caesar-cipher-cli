const { program } = require('commander');

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .parse(process.argv);

if (!['encode', 'decode'].includes(program.action)) {
  process.stderr.write(
    "Action is required and should be have name 'encode' or 'decode'. Please stop the server, enter the correct data and try again!"
  );
  process.exitCode = 1;
} else if (isNaN(program.shift)) {
  process.stderr.write(
    'Shift should be number. Please stop the server, enter the correct data and try again!'
  );
  process.exitCode = 1;
} else if (!Number.isInteger(+program.shift)) {
  process.stderr.write(
    'Shift should be integer. Please stop the server, enter the correct data and try again!'
  );
  process.exitCode = 1;
}

module.exports = program;
