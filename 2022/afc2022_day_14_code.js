with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var lines = new Array();

    on('line', (line) =>
    {
	lines.push(line.split(' -> '));
	for (var i = 0; i < lines[lines.length - 1].length; ++i)
	    lines[lines.length - 1][i] = lines[lines.length - 1][i].split(',');
    });
    once('close', () => {
	[ min_x, min_y ] = [ Infinity, Infinity ];
	[ max_x, max_y ] = [ 0, 0 ];
	lines.forEach(function(line)
	{
	    line.forEach(function(e)
	    {
		min_x = +e[0] < min_x ? +e[0] : min_x;
		min_y = +e[1] < min_y ? +e[1] : min_y;
		max_x = +e[0] > max_x ? +e[0] : max_x;
		max_y = +e[1] > max_y ? +e[1] : max_y;
	    });
	});
	var mountain = create_mountain(lines, min_x, max_x, max_y);
	for (var sand = 0, rest = true; rest; )
	    if ((rest = sand_fall(mountain, 500 - min_x, 0, max_x - min_x, max_y)) === true)
		sand++;
	console.log(sand);
    });
};

function sand_fall(mountain, start_x, start_y, max_x, max_y)
{
    if (start_y + 1 > max_y)
	return false;
    if (mountain[start_y + 1][start_x] == '.')
	return sand_fall(mountain, start_x, start_y + 1, max_x, max_y);
    if (start_x - 1 >= 0 && mountain[start_y + 1][start_x - 1] == '.')
	return sand_fall(mountain, start_x - 1, start_y + 1, max_x, max_y);
    if (start_x + 1 <= max_x && mountain[start_y + 1][start_x + 1] == '.')
	return sand_fall(mountain, start_x + 1, start_y + 1, max_x, max_y);
    if (start_x - 1 < 0 || start_x + 1 > max_x)
        return false;
    if (mountain[start_y][start_x] == '.')
    {
	mountain[start_y][start_x] = 'o';
	return true;
    }
    else
	return false;
}

function fill_rocks(mountain, x1, x2, y1, y2)
{
    if (x1 < x2)
	for (var x = x1; x <= x2; ++x)
	    mountain[y1][x] = '#';
    if (x1 > x2)
	for (var x = x1; x >= x2; --x)
	    mountain[y1][x] = '#';
    if (y1 < y2)
	for (var y = y1; y <= y2; ++y)
	    mountain[y][x1] = '#';
    if (y1 > y2)
	for (var y = y1; y >= y2; --y)
	    mountain[y][x1] = '#';
}

function create_mountain(lines, min_x, max_x, max_y)
{
    var mountain = new Array();
    for (var y = 0; y <= max_y; ++y)
	mountain.push(new Array(max_x - min_x + 1).fill('.'));
    lines.forEach(function(line)
    {
	for (var i = 0; i < line.length - 1; ++i)
	    fill_rocks(mountain,
		       line[i][0] - min_x,
		       line[i + 1][0] - min_x,
		       line[i][1],
		       line[i + 1][1]);
    });
    return (mountain);
}
