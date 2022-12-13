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
	this.knots = new Array(10);
	for (var i = 0; i < 10; ++i)
            this.knots[i] = new Location(0, 0);
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
	    knots[0].y -= +moves[moves.length - 1][1];
	    min.y = (knots[0].y < min.y) ? knots[0].y : min.y;
	    break;
	    
	    case 'D':
	    knots[0].y += +moves[moves.length - 1][1];
	    max.y = (knots[0].y > max.y) ? knots[0].y : max.y;
	    break;
	    
	    case 'L':
	    knots[0].x -= +moves[moves.length - 1][1];
	    min.x = (knots[0].x < min.x) ? knots[0].x : min.x;
	    break;
	    
	    case 'R':
	    knots[0].x += +moves[moves.length - 1][1];
	    max.x = (knots[0].x > max.x) ? knots[0].x : max.x;
	    break;
	}
    }
});

rl.once('close', () => {
    with (rl.context)
    {
	for (var i = 0; i < 10; ++i)
	{
            knots[i].x = -min.x;
            knots[i].y = -min.y;
	}
	tail_hist_grid = new Array(max.y - min.y + 1);
	for (var i = 0; i < max.y - min.y + 1; ++i)
	    tail_hist_grid[i] = new Array(max.x - min.x + 1).fill(0);
	tail_hist_grid[knots[knots.length - 1].y][knots[knots.length - 1].x] = 1;
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

function move_tail(head, tail)
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
}

function take_steps(ctx)
{
    with (ctx)
	moves.forEach(function(element)
	{
	    for (var i = 0; i < +element[1]; ++i)
		for (var knot_idx = 0; knot_idx < knots.length - 1; ++knot_idx)
		{
		    if (knot_idx == 0)
			switch (element[0])
			{
			    case 'U': knots[0].y -= 1; break;
			    case 'D': knots[0].y += 1; break;
			    case 'L': knots[0].x -= 1; break;
			    case 'R': knots[0].x += 1; break;
			}
		    move_tail(knots[knot_idx], knots[knot_idx + 1]);
		    tail_hist_grid[knots[knots.length - 1].y][knots[knots.length - 1].x] = 1;
		}
	});
}
