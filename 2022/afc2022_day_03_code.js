const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var score = 0;

rl.on('line', (line) => {
    var rs_length = line.length / 2;

    for (var i = 0; i < rs_length; ++i)
	for (var j = rs_length; j < line.length; ++j)
	    if (line[i] == line[j])
            {
		score += line.charCodeAt(i) - (line.charCodeAt(i) >= 97 ? 96 : 38);
		i = rs_length;
		break;
            }
});

rl.once('close', () => {
    console.log(score);
});
