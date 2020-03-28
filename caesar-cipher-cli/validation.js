const { program } = require('commander');

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .requiredOption('-a, --action <type>,', 'an action encode/decode')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .parse(process.argv);

if (
  !['encode', 'decode'].includes(program.action) ||
  isNaN(program.shift) ||
  !Number.isInteger(+program.shift)
) {
  process.stderr.write(
    'Action and shift are required. Please, enter valid data and try again!'
  );
  process.exitCode = 1;
}

module.exports = program;
