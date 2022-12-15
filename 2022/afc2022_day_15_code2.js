with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var lines = new Array();

    on('line', (line) =>
    {
	lines.push(new Array());
	line.replace(/[^-0-9]+/g, ',').replace(/,+/g, ',').replace(/^,/, '').split(',').forEach(function(e)
	{
	    lines[lines.length - 1].push(parseInt(e));
	});
	[x1, y1, x2, y2 ] = lines[lines.length - 1];
	lines[lines.length - 1].push(Math.abs(x1 - x2) + Math.abs(y1 - y2));
    });
    once('close', () => {
	for (y = 0; y <= 4 * 1000 * 1000; ++y)
	    if (part2(y, lines) >= 0)
		break ;
    });
};

function part2(y, lines)
{
    for (x = 0; x <= 4 * 1000 * 1000; ++x)
    {
	for (i = 0, found = true; i < lines.length; ++i)
	    if (Math.abs(lines[i][0] - x) + Math.abs(lines[i][1] - y) <= lines[i][4])
	    {
		x = lines[i][0] + lines[i][4] - Math.abs(lines[i][1] - y);
		found = false;
		break ;
	    }
	if (found)
	{
	    console.log(x * 4000000 + y);
	    return x;
	}
    }
    return -1;
}
