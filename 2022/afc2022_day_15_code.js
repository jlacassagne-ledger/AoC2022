with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var key = {};
    var lines = new Array();

    on('line', (line) =>
    {
	lines.push(new Array());
	line.replace(/[^-0-9]+/g, ',').replace(/,+/g, ',').replace(/^,/, '').split(',').forEach(function(e)
	{
	    lines[lines.length - 1].push(parseInt(e));
	});
    });
    once('close', () => {
	lines.forEach(function(line)
        {
	    if (line[1] == 2000000)
		key[line[0]] = 'S';
	    if (line[3] == 2000000)
		key[line[2]] = 'B';
	    check_beacon(key, ...line);
	});
	console.log(Object.values(key).filter(k => k == '#').length);
    });
};

function check_beacon(key, x1, y1, x2, y2)
{
    var man = Math.abs(x1 - x2) + Math.abs(y1 - y2);

    for (var x = x1 - man; x <= x1 + man; ++x)
	if (Math.abs(x1 - x) + Math.abs(y1 - 2000000) <= man)
	    if (typeof key[x] === 'undefined' || (key[x] != 'S' && key[x] != 'B'))
		key[x] = '#';
}
