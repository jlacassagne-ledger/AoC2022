with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var lines = new Array();

    on('line', (line) =>
    {
	if (line.length != 0)
	    lines.push(eval(line));
    });
    once('close', () => {
	[ key1, key2 ] = [ [[2]], [[6]] ];
	lines.push(key1, key2);
	for (var i = 0; i < lines.length - 1; ++i)
	    for (var j = i + 1; j < lines.length; ++j)
		if (calc(JSON.parse(JSON.stringify(lines[i])), JSON.parse(JSON.stringify(lines[j]))) > 0)
		    [ lines[i], lines[j] ] = [ lines[j], lines[i] ];
	console.log((1 + lines.indexOf(key1)) * (1 + lines.indexOf(key2)));
    });
};

function calc(x, y)
{
    if (typeof x === 'number')
	return (typeof y === 'number') ? x - y : calc([x], y);
    if (typeof y === 'number')
	return calc(x, [y]);

    while (x.length && y.length)
	if ((ret = calc(x.shift(), y.shift())))
	    return ret;

    return (x.length - y.length);
}
