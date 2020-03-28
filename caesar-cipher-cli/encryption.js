module.exports = {
  caesarEncode: (shift, text) => {
    let code = '';
    for (let i = 0; i < text.length; i++) {
      if (/[A-Z]/gi.test(text[i])) {
        const alphabet =
          text[i].toUpperCase() === text[i]
            ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            : 'abcdefghijklmnopqrstuvwxyz';
        code += alphabet[(alphabet.indexOf(text[i]) + +shift) % 26];
      } else {
        code += text[i];
      }
    }
    return code;
  },

  caesarDecode: (shift, text) => {
    let code = '';
    for (let i = 0; i < text.length; i++) {
      if (/[A-Z]/gi.test(text[i])) {
        const alphabet =
          text[i].toUpperCase() === text[i]
            ? 'ZYXWVUTSRQPONMLKJIHGFEDCBA'
            : 'zyxwvutsrqponmlkjihgfedcba';
        code += alphabet[(alphabet.indexOf(text[i]) + +shift) % 26];
      } else {
        code += text[i];
      }
    }
    return code;
  }
};
