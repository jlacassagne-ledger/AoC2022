with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var DP = {};
    var valves = {};

    on('line', (line) =>
    {
	valves[line.substring(6, 8)] = {
	    rate: parseInt(line.replace(/[^0-9]+/g, '')),
	    paths: line.match(/( [A-Z]{2},?)+$/g)[0].replace(/ /g, '').split(',')
	};
    });
    once('close', () => {
	console.log(p1('AA', 30, [], DP));
    });
};

function p1(node, time_left, opened, DP)
{
    if (time_left <= 0)
	return 0;

    var dp_key = ((node.charCodeAt(0)-64)*26 + node.charCodeAt(1)-64) +
	'_' + opened.reduce(function(m, v){ return m + (v.charCodeAt(0)-64)*26 + v.charCodeAt(1)-64 }, 0) +
	'_' + time_left;
    if (typeof DP[dp_key] !== 'undefined')
	return DP[dp_key];

    var max_flow = 0;
    if ((pressure = (time_left - 1) * valves[node].rate) != 0 && opened.find(e => e === node) === undefined)
	max_flow = Math.max(max_flow, pressure + p1(node, time_left - 1, [ ...opened, node ], DP));
    valves[node].paths.forEach(function(path)
    {
	max_flow = Math.max(max_flow, p1(path, time_left - 1, [ ...opened ], DP));
    });

    if (typeof DP[dp_key] === 'undefined')
	DP[dp_key] = max_flow;
    return DP[dp_key];
}
