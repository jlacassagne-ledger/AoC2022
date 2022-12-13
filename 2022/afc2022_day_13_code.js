with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var pairs = new Array();

    on('line', (line) =>
    {
	if (line.length != 0)
	{
	    if (pairs.length == 0 || pairs[pairs.length - 1].length == 2)
		pairs[pairs.length] = new Array();
	    pairs[pairs.length - 1].push(eval(line));
	}
    });
    once('close', () => {
	var i = 0, res = 0;
	pairs.forEach(function(elem){
	    i++;
	    if (calc(elem[0], elem[1]) < 0)
		res += i;
	});
	console.log(res);
    });
};

function calc(x, y)
{
    if (typeof x === 'number')
	return (typeof y === 'number') ? x - y : calc([x], y);
    else if (typeof y === 'number')
	return calc(x, [y]);

    while (x.length && y.length)
	if ((ret = calc(x.shift(), y.shift())))
	    return ret;

    return (x.length - y.length);
}
