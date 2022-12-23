with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var map = [];
    var elves = [];

    on('line', (line) =>
    {
	map.push(line.split(''));
	for (var i = 0; i < map[map.length - 1].length; ++i)
	    if (map[map.length - 1][i] == '#')
		elves.push([map.length - 1, i, 0]);
    });
    once('close', () =>
    {
	console.log(
	    p1(JSON.parse(JSON.stringify(map)),
	       JSON.parse(JSON.stringify(elves)),
	       10, 1)
	);
	console.log(
	    p1(JSON.parse(JSON.stringify(map)),
	       JSON.parse(JSON.stringify(elves)),
	       Infinity, 2));
    });
};

function p1(map, elves, limit, part)
{
    var proposals = propose(map, elves, 0);
    for (var c = 1; Object.entries(proposals).length && c <= limit; ++c)
    {
	march(map, proposals);
	draw_map(map, elves);
	proposals = propose(map, elves, c);
    }
    return part == 1 ? (map.length - 2) * (map[0].length - 2) - elves.length : c;
}

function draw_map(m, es)
{
    var min_y = es.reduce((a, e) => a = Math.min(a, e[0]), Infinity) - 1;
    var min_x = es.reduce((a, e) => a = Math.min(a, e[1]), Infinity) - 1;
    var max_y = es.reduce((a, e) => a = Math.max(a, e[0]), 0) + 1;
    var max_x = es.reduce((a, e) => a = Math.max(a, e[1]), 0) + 1;
    
    for (var y = 0; y <= max_y - Math.min(0, min_y); ++y)
    {
	if (typeof m[y] === 'undefined')
	    m[y] = [];
	for (var x = 0; x <= max_x - Math.min(0, min_x); ++x)
	    m[y][x] = '.';
    }

    for (var y = 0; y < m.length; ++y)
	for (var x = 0; x < m[y].length; ++x)
	    m[y][x] = '.';
    es.forEach(e =>
    {
	e[0] += min_y < 0 ? -min_y : 0;
	e[1] += min_x < 0 ? -min_x : 0;
	m[e[0]][e[1]] = '#';
    });
}

function march(m, ps)
{
    Object.entries(ps).forEach(p =>
    {
	if (p[1].length > 1)
	    delete p;
	else
	{
	    p[1][0][0][0] = p[1][0][1][0];
	    p[1][0][0][1] = p[1][0][1][1];
	}
    });
}

function propose(map, es, move)
{
    var proposals = {};
    es.forEach(e => 
    {
	if (is_alone(map, e))
	    return ;
	for (var m = 0, done = false; m <= 3 && !done; ++m)
	{
	    switch ((move + m) % 4)
	    {
		case 0:
		if (e[0] == 0 ||
		    (map[e[0] - 1][e[1] - 1] != '#' &&
		     map[e[0] - 1][e[1]    ] != '#' &&
		     map[e[0] - 1][e[1] + 1] != '#' ))
		    done = add_proposal(proposals, [e, [e[0] - 1, e[1]]]);
		break;
		case 1:
		if (e[0] == map.length - 1 ||
                    (map[e[0] + 1][e[1] - 1] != '#' &&
                     map[e[0] + 1][e[1]    ] != '#' &&
                     map[e[0] + 1][e[1] + 1] != '#' ))
		    done = add_proposal(proposals, [e, [e[0] + 1, e[1]]]);
		break;
		case 2:
		if (e[1] == 0 ||
                    (map[e[0] - 1][e[1] - 1] != '#' &&
                     map[e[0]    ][e[1] - 1] != '#' &&
                     map[e[0] + 1][e[1] - 1] != '#' ))
		    done = add_proposal(proposals, [e, [e[0], e[1] - 1]]);
		break;
		case 3:
		if (e[1] == map[0].length - 1 ||
                    (map[e[0] - 1][e[1] + 1] != '#' &&
                     map[e[0]    ][e[1] + 1] != '#' &&
                     map[e[0] + 1][e[1] + 1] != '#' ))
		    done = add_proposal(proposals, [e, [e[0], e[1] + 1]]);
		break;
	    }
	}
    });
    return proposals;
}

function add_proposal(o, p)
{
    p[0][2] += 1;
    if (typeof o['_' + p[1][0] + '_' + p[1][1] + '_'] === 'undefined')
	o['_' + p[1][0] + '_' + p[1][1] + '_'] = new Array(p);
    else
	o['_' + p[1][0] + '_' + p[1][1] + '_'].push(p);
    return true;
}

function is_alone(m, e)
{
    for (var y = -1; y <= 1; ++y)
    {
	if (e[0] + y < 0 || e[0] + y >= m.length)
	    continue;
	for (var x = -1; x <= 1; ++x)
	{
	    if ((y == 0 && x == 0) || e[1] + x < 0 || e[1] + x >= m[e[0] + y].length)
		continue;
	    if (m[e[0] + y][e[1] + x] == '#')
		return false;
	}
    }
    return true;
}

