with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var r = 0, v = 0;
    var valves = {};
    var arooms = [];
    var avalves = [];

    on('line', (line) =>
    {
	valves[line.substring(6, 8)] = {
	    id: r++,
	    rate: parseInt(line.replace(/[^0-9]+/g, '')),
	    paths: line.match(/( [A-Z]{2},?)+$/g)[0].replace(/ /g, '').split(',')
	};
	arooms.push(line.substring(6, 8));
	if (valves[line.substring(6, 8)].rate > 0)
	    avalves.push(line.substring(6, 8));
    });
    once('close', () => {
	console.log(p1('AA', 30, [], []));
	console.log(p1('AA', 26, [], new Array((1 << (15 + 6 + 5 + 1 + 1))), 1));
    });
};

function p1(node, time_left, opened, dp, elephant = 0)
{
    if (time_left <= 0)
	return elephant ? p1('AA', 26, [ ...opened ], dp, --elephant) : 0;

    var dp_key = elephant                   // 1 bit  - 0 ou 1
	+ (time_left << 1)                  // 5 bits - 1 à 30 (0 est retourné avant)
        + (arooms.indexOf(node) << (1 + 5)) // 6 bits - 0 à 59
        + (opened.reduce((a, v) => a + (1 << avalves.indexOf(v)), 0) << (1 + 5 + 6));
    if (typeof dp[dp_key] !== 'undefined')
	return dp[dp_key];

    var max_flow = 0;
    if ((pressure = (time_left - 1) * valves[node].rate) != 0 && opened.find(e => e === node) === undefined)
	max_flow = Math.max(max_flow, pressure + p1(node, time_left - 1, [ ...opened, node ], dp, elephant));
    valves[node].paths.forEach(function(path)
    {
	max_flow = Math.max(max_flow, p1(path, time_left - 1, [ ...opened ], dp, elephant));
    });

    dp[dp_key] = max_flow;
    return max_flow;
}
