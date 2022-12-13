const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const ops = [
    ['noop', 1, function(x, val){ return x; }],
    ['addx', 2, function(x, val){ return x + val; }]
];

var regx = 1;
var totalcycles = 0;
var result = 0;

rl.on('line', (line) => {
    var op = line.trim().split(' ');
    for (var opid = 0; opid < ops.length; ++opid)
	if (ops[opid][0] === op[0])
	    for (var cycles = ops[opid][1]; cycles >= 1; --cycles)
            {
		totalcycles++;
		if (totalcycles == 20 || (totalcycles + 20) % 40 == 0)
		    if (totalcycles <= 220)
			result += totalcycles * regx;
		if (cycles == 1)
		    regx = ops[opid][2](regx, parseInt(op[1]));
	    }
});

rl.once('close', () => {
    console.log(result);
});
