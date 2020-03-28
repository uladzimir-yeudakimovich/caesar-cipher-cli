module.exports = {
  caesarCode: (shift, text, action) => {
    let alphabet;
    let code = '';
    for (let i = 0; i < text.length; i++) {
      if (/[A-Za-z]/.test(text[i])) {
        if (action === 'encode') {
          alphabet =
            text[i].toUpperCase() === text[i]
              ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
              : 'abcdefghijklmnopqrstuvwxyz';
        } else {
          alphabet =
            text[i].toUpperCase() === text[i]
              ? 'ZYXWVUTSRQPONMLKJIHGFEDCBA'
              : 'zyxwvutsrqponmlkjihgfedcba';
        }
        code += alphabet[(alphabet.indexOf(text[i]) + +shift) % 26];
      } else {
        code += text[i];
      }
    }
    return code;
  }
};
