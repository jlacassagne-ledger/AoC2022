const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var cargo = [
    ['R', 'N', 'F', 'V', 'L', 'J', 'S', 'M'],
    ['P', 'N', 'D', 'Z', 'F', 'J', 'W', 'H'],
    ['W', 'R', 'C', 'D', 'G'],
    ['N', 'B', 'S'],
    ['M', 'Z', 'W', 'P', 'C', 'B', 'F', 'N'],
    ['P', 'R', 'M', 'W'],
    ['R', 'T', 'N', 'G', 'L', 'S', 'W'],
    ['Q', 'T', 'H', 'F', 'N', 'B', 'V'],
    ['L', 'M', 'H', 'Z', 'N', 'F']
];

rl.on('line', (line) => {
    var ops = line.replace(/\D+/g, ' ').trim().split(' ');
    var pickup = cargo[ops[1] - 1].splice(cargo[ops[1] - 1].length - ops[0], ops[0]);
    cargo[ops[2] - 1] = cargo[ops[2] - 1].concat(pickup);
});

rl.once('close', () => {
    var result = new String();
    for (var i = 0; i < cargo.length; ++i)
	result += cargo[i][cargo[i].length - 1];
    console.log(result);
});
