const readline = require('readline');

var myscore = 0;
var mytotalscore = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
    var player1 = line.split(" ")[0];
    var player2 = line.split(" ")[1];

    switch (player1)
    {
	case 'A':
	switch (player2)
	{
	    case 'X': myscore = 3; break;
	    case 'Y': myscore = 4; break;
	    case 'Z': myscore = 8; break;
	}; break;
	case 'B':
	switch (player2)
	{
	    case 'X': myscore = 1; break;
	    case 'Y': myscore = 5; break;
	    case 'Z': myscore = 9; break;
	}; break;
	case 'C':
	switch (player2)
	{
	    case 'X': myscore = 2; break;
	    case 'Y': myscore = 6; break;
	    case 'Z': myscore = 7; break;
	}; break;
    }
    console.log(player1.charCodeAt(0));
    mytotalscore += myscore;
});

rl.once('close', () => {
    console.log(mytotalscore);
});
