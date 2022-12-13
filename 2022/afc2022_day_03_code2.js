const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var score = 0;
var groupidx = 0;
var group1 = "";
var group2 = "";

rl.on('line', (line) => {
    if (++groupidx > 3)
	groupidx = 0;
    if (groupidx == 1)
	group1 = line;
    if (groupidx == 2)
	group2 = line;
    if (groupidx == 3)
    {
	(function ()
	 {
	     for (var i = 0; i < group1.length; ++i)
		 for (var j = 0; j < group2.length; ++j)
	         {
		     if (group1[i] == group2[j])
		     {
			 for (var k = 0; k < line.length; ++k)
			     if (line[k] == group1[i])
		             {
				 score += group1.charCodeAt(i) - (group1.charCodeAt(i) >= 97 ? 96 : 38);
				 groupidx = 0;
				 return ;
		             }
		     }
		 }
	     groupidx = 0;
	 })();
    }

});

rl.once('close', () => {
    console.log(score);
});
