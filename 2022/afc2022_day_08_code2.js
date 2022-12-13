const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var forest = new Array();
var result = new Array();

rl.on('line', (line) => {
    forest.push(line.split(''));
});

rl.once('close', () => {
    result = forest.map((x) => new Array(x.length));
    for (var y = 0; y < forest.length; ++y)
	for (var x = 0; x < forest[0].length; ++x)
	    check_tree_surroundings(x, y);
    var count = result.reduce(function(n, val) {
	var icount = val.reduce(function(m, ival) {
	    return Math.max(m, ival);
	}, 0);
	return Math.max(n, icount);
    }, 0);
    console.log(count);
});

function check_tree_surroundings(x, y)
{
    var tree_line_views = 0;

    if (x == 0 || y == 0 || x == forest[0].length - 1 || y == forest.length - 1)
    {
	result[y][x] = 0;
	return ;
    }
    result[y][x] = 1;

    for (var i = y - 1, tree_line_views = 0; i >= 0 && forest[y][x] > forest[i][x]; --i)
	++tree_line_views;
    result[y][x] *= ++tree_line_views ? tree_line_views : 1;

    for (var i = y + 1, tree_line_views = 0; i < forest.length && forest[y][x] > forest[i][x]; ++i)
	++tree_line_views;
    result[y][x] *= ++tree_line_views ? tree_line_views : 1;

    for (var j = x - 1, tree_line_views = 0; j >= 0 && forest[y][x] > forest[y][j]; --j)
	++tree_line_views;
    result[y][x] *= ++tree_line_views ? tree_line_views : 1;

    for (var j = x + 1, tree_line_views = 0; j < forest[y].length && forest[y][x] > forest[y][j]; ++j)
	++tree_line_views;
    result[y][x] *= ++tree_line_views ? tree_line_views : 1;
}
