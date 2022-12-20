with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var blueprints = new Array();

    on('line', (line) =>
    {
	blueprints.push(line.match(/[0-9]+/g).map(Number).slice(1));
    });
    once('close', () => {
	
	for (var i = 1, result = 0; i <= blueprints.length; ++i)
	{
	    result += i * p1(blueprints[i - 1], 24);
	    process.stdout.write("\r" + Math.floor(i / blueprints.length * 100) + "%");
	}
	process.stdout.write("\r    \r");
	console.log('p1:', result);

    });
};

function p1(bp, t, r = [[0, 0, 0, 0], [1, 0, 0, 0]], dp = {})
{
    if (t < 0)
	return 0;

    var memo = t + '_' + r.flat().join('_');
    if (typeof dp[memo] !== 'undefined')
	return dp[memo];

    var max_geode = r[0][3];
    if (r[0][0] / bp[4] >= 1 && r[0][2] / bp[5] >= 1)
    {
	max_geode = Math.max(max_geode, p1(bp, t - 1,
	 	    [
			[ r[0][0] + r[1][0] - bp[4], r[0][1] + r[1][1], r[0][2] + r[1][2] - bp[5], r[0][3] + r[1][3] ],
			[ r[1][0], r[1][1], r[1][2], r[1][3] + 1 ]
		    ], dp));
    }
    else
    {
	if (r[0][0] / bp[2] >= 1 && r[0][1] / bp[3] >= 1)
	{
	    max_geode = Math.max(max_geode, p1(bp, t - 1,
	 		[
			    [ r[0][0] + r[1][0] - bp[2], r[0][1] + r[1][1] - bp[3], r[0][2] + r[1][2], r[0][3] + r[1][3] ],
			    [ r[1][0], r[1][1], r[1][2] + 1, r[1][3] ]
			], dp));
	}
	if (r[0][0] / bp[0] >= 1 && r[1][0] < Math.max(bp[0], bp[1], bp[2], bp[4]))
	{
	    max_geode = Math.max(max_geode, p1(bp, t - 1,
	 		[
			    [ r[0][0] + r[1][0] - bp[0], r[0][1] + r[1][1], r[0][2] + r[1][2], r[0][3] + r[1][3] ],
			    [ r[1][0] + 1, r[1][1], r[1][2], r[1][3] ]
			], dp));
	}
	if (r[0][0] / bp[1] >= 1 && r[1][1] < bp[3])
	{
	    max_geode = Math.max(max_geode, p1(bp, t - 1,
	 	        [
			    [ r[0][0] + r[1][0] - bp[1], r[0][1] + r[1][1], r[0][2] + r[1][2], r[0][3] + r[1][3] ],
			    [ r[1][0], r[1][1] + 1, r[1][2], r[1][3] ]
			], dp));
	}
	max_geode = Math.max(max_geode, p1(bp, t - 1,
  		    [
			[ r[0][0] + r[1][0], r[0][1] + r[1][1], r[0][2] + r[1][2], r[0][3] + r[1][3] ],
			[ r[1][0], r[1][1], r[1][2], r[1][3] ]
		    ], dp));
    }
    
    if (typeof dp[memo] === 'undefined')
	dp[memo] = max_geode;
    return dp[memo];
}
