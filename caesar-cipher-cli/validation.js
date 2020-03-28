const { program } = require('commander');

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
  process.stderr.write(
    'Action and shift are required. Please, stop server and enter valid data!'
  );
  process.exitCode = 1;
}

module.exports = program;
