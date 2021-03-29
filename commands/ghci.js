/* 
  Credit goes to @mesaglio and @fedescarpa for this amazing script c:
*/

const exec = require('child_process');

const ghci = (message) => {
  const expression = message.content.replace(/^!ghci /, '');
  eval_expression = /^\s*:/.test(expression) ? expression : `pp $ ${expression}`
  exec.execFile('docker', ['exec', '-i', 'haskell', 'bash', '-c', 'timeout 5 ghci prettify.hs <<< $0', eval_expression],
    (error, stdout, stderr) => {
      var rta = stdout.split('\n')[3];
      if (error) {
        message.reply(error.toString());
      } else {
        message.reply(`Expresión evaluada:\n\`\`\`haskell\n ${stderr.trim() || rta}\`\`\``);
      }
    });
}

module.exports = ghci;
