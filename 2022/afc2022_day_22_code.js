with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var path;
    var map = [];
    var mapmax = 0;

    on('line', (line) =>
    {
	if (line.length)
	{
	    if (line.match(/[0-9RL]+/g))
		path = line.match(/([LR])|([0-9]+)/g);
	    else
	    {
		map.push(line.split(''));
		mapmax = Math.max(mapmax, line.length);
	    }
	}
    });
    once('close', () =>
    {
	for (var i = 0; i < map.length; ++i)
	    for (var j = map[i].length; j < mapmax; ++j)
		map[i][j] = ' ';
	console.log(p1(map, path, [0, map[0].findIndex(x => /\./.test(x)), 0]));
    });
};

function p1(map, p, c = [0, 0, 0])
{
    for (var i = 0; i < p.length; ++i)
    {
	switch (p[i])
	{
	    case (p[i].match(/^[LR]$/) || {}).input:
	        turn(c, p[i]);
	        break;
	    case (p[i].match(/^[0-9]+$/) || {}).input:
	        march(map, c, [
		    c[2] % 2 == 0 ? 0 : p[i] * (c[2] >= 2 ? -1 : 1),
		    c[2] % 2 == 1 ? 0 : p[i] * (c[2] >= 2 ? -1 : 1)
		]);
	        break;
	    default:
	        console.error('Error1');
	        break;
	}
    }
    return (c[0] + 1) * 1000 + (c[1] + 1) * 4 + c[2];
}

function march(m, c, s)
{
    var yt = s[0] ? s[0] / Math.abs(s[0]) : 0;
    var xt = s[1] ? s[1] / Math.abs(s[1]) : 0;
    
    for (y = yt, x = xt; Math.abs(y) <= Math.abs(s[0]) && Math.abs(x) <= Math.abs(s[1]); y += yt, x += xt)
    {
	if (c[0] + yt < 0 || (yt == -1 && m[c[0] + yt][c[1]] == ' '))
	    for (var i = yt; true; --i)
	    {
		i = c[0] + i < 0 ? m.length - 1 - c[0] : i;
		if (m[c[0] + i][c[1]] == '.') { c[0] += i; break; }
		else if (m[c[0] + i][c[1]] == '#') return ;		    
	    }
	else if (c[0] + yt >= m.length || (yt == 1 && m[c[0] + yt][c[1]] == ' '))
	    for (var i = yt; true; ++i)
	    {
		i = c[0] + i >= m.length ? -c[0] : i;
		if (m[c[0] + i][c[1]] == '.') { c[0] += i; break; }
		else if (m[c[0] + i][c[1]] == '#') return ;
	    }
	else if (c[1] + xt < 0 || (xt == -1 && m[c[0]][c[1] + xt] == ' '))
	    for (var i = xt; true; --i)
            {
		i = c[1] + i < 0 ? m[c[0]].length - 1 - c[1] : i;
                if (m[c[0]][c[1] + i] == '.') { c[1] += i; break; }
                else if (m[c[0]][c[1] + i] == '#') return ;
            }
	else if (c[1] + xt >= m[c[0]].length || (xt == 1 && m[c[0]][c[1] + xt] == ' '))
	    for (var i = xt; true; ++i)
            {
		i = c[1] + i >= m[c[0]].length ? -c[1] : i;
                if (m[c[0]][c[1] + i] == '.') { c[1] += i; break; }
                else if (m[c[0]][c[1] + i] == '#') return ;
            }
	else if (m[c[0] + yt][c[1] + xt] == '#')
	    return ;
	else
	{
	    c[0] += yt;
	    c[1] += xt;
	}
    }
}

function turn(c, t)
{
    if (t == 'L')
	c[2] = c[2] ? c[2] - 1 : 3;
    else
	c[2] = c[2] == 3 ? 0 : c[2] + 1;
}
