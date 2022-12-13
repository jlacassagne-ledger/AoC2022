const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

class Location
{
    constructor(start_x, start_y)
    {
	this.x = start_x;
	this.y = start_y;
    }
}

class Context
{
    constructor()
    {
	this.head = new Location(0, 0);
	this.tail = new Location(0, 0);
	this.min = new Location(0, 0);
	this.max = new Location(0, 0);
	this.tail_hist_grid = null;
	this.moves = new Array();
    }
}

rl.context = new Context();
rl.on('line', (line) => {
    with (rl.context)
    {
	moves.push(line.split(" "));
	switch (moves[moves.length - 1][0])
	{
	    case 'U':
	    head.y -= +moves[moves.length - 1][1];
	    min.y = (head.y < min.y) ? head.y : min.y;
	    break;
	    
	    case 'D':
	    head.y += +moves[moves.length - 1][1];
	    max.y = (head.y > max.y) ? head.y : max.y;
	    break;
	    
	    case 'L':
	    head.x -= +moves[moves.length - 1][1];
	    min.x = (head.x < min.x) ? head.x : min.x;
	    break;
	    
	    case 'R':
	    head.x += +moves[moves.length - 1][1];
	    max.x = (head.x > max.x) ? head.x : max.x;
	    break;
	}
    }
});

rl.once('close', () => {
    with (rl.context)
    {
	head.x = tail.x = -min.x;
	head.y = tail.y = -min.y;
	tail_hist_grid = new Array(max.y - min.y + 1);
	for (var i = 0; i < max.y - min.y + 1; ++i)
	    tail_hist_grid[i] = new Array(max.x - min.x + 1).fill(0);
	tail_hist_grid[tail.y][tail.x] = 1;
	take_steps(rl.context);
	var count = tail_hist_grid.reduce(function(n, val) {
	    var icount = val.reduce(function(m, ival) {
		return m + (ival === 1);
	    }, 0);
	    return n + icount;
	}, 0);
	console.log(count);
    }
});

function move_tail(ctx)
{
    with (ctx)
    {
	if (   (tail.x >= head.x - 1 && tail.x <= head.x + 1)
	    && (tail.y >= head.y - 1 && tail.y <= head.y + 1))
	    return ;
	if (head.x == tail.x)
	    tail.y += (tail.y < head.y) ? 1 : -1;
	else if (head.y == tail.y)
	    tail.x += (tail.x < head.x) ? 1 : -1;
	else
	{
	    tail.x += (tail.x < head.x) ? 1 : -1;
	    tail.y += (tail.y < head.y) ? 1 : -1;
	}
	tail_hist_grid[tail.y][tail.x] = 1;
    }
}

function take_steps(ctx)
{
    ctx.moves.forEach(function(element)
    {
	for (var i = 0; i < +element[1]; ++i)
	{
	    switch (element[0])
	    {
		case 'U': ctx.head.y -= 1; break;
		case 'D': ctx.head.y += 1; break;
		case 'L': ctx.head.x -= 1; break;
		case 'R': ctx.head.x += 1; break;
	    }
	    move_tail(ctx);
	}
    });
}
