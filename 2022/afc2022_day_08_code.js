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
    for (var x = 0; x < forest[0].length; ++x)
    {
	check_forest_line(x, x, 1, 0, forest.length - 1, 1);
	check_forest_line(x, x, 1, forest.length - 1, 0, -1);
    }
    for (var y = 0; y < forest.length; ++y)
    {
	check_forest_line(0, forest[y].length - 1, 1, y, y, 1);
	check_forest_line(forest[y].length - 1, 0, -1, y, y, 1);
    }
    result.forEach(element => console.log(element.join('')));
    var count = result.reduce(function(n, val) {
	var icount = val.reduce(function(m, ival) {
	    return m + (ival === 1);
	}, 0);
	return n + icount;
    }, 0);
    console.log(count);
});

function check_forest_line(start_x, end_x, incr_x, start_y, end_y, incr_y)
{
    var tree_height = -1;

    if (incr_y > 0 && incr_x > 0)
	for (var i = start_y; i <= end_y; i += incr_y)
	    for (var j = start_x; j <= end_x; j += incr_x)
            {
		result[i][j] = (typeof result[i][j] === 'undefined') ? 0 : result[i][j];
		if (forest[i][j] > tree_height)
		{
		    result[i][j] = 1;
		    tree_height = forest[i][j];
		}
	    }
    else if (incr_y < 0 && incr_x < 0)
	for (var i = start_y; i >= end_y; i += incr_y)
	    for (var j = start_x; j >= end_x; j += incr_x)
            {
		result[i][j] = (typeof result[i][j] === 'undefined') ? 0 : result[i][j];
		if (forest[i][j] > tree_height)
		{
		    result[i][j] = 1;
		    tree_height = forest[i][j];
		}
	    }
    else if (incr_y > 0 && incr_x < 0)
	for (var i = start_y; i <= end_y; i += incr_y)
	    for (var j = start_x; j >= end_x; j += incr_x)
            {
		result[i][j] = (typeof result[i][j] === 'undefined') ? 0 : result[i][j];
		if (forest[i][j] > tree_height)
		{
		    result[i][j] = 1;
		    tree_height = forest[i][j];
		}
	    }
    else if (incr_y < 0 && incr_x > 0)
	for (var i = start_y; i >= end_y; i += incr_y)
	    for (var j = start_x; j <= end_x; j += incr_x)
            {
		result[i][j] = (typeof result[i][j] === 'undefined') ? 0 : result[i][j];
		if (forest[i][j] > tree_height)
		{
		    result[i][j] = 1;
		    tree_height = forest[i][j];
		}
	    }
}
